/**
 * Renders the brand files into public/ and src/assets/brand/: icon.svg,
 * icon.png (512), apple-icon.png (180, opaque), favicon.ico (16/32/48),
 * og-image.png (1200×630) and the logo SVGs. Run with `npm run assets`
 * after changing the mark; the outputs are committed.
 */
import { Resvg } from '@resvg/resvg-js'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const pub = join(root, 'public')
const brandDir = join(root, 'src', 'assets', 'brand')
await mkdir(brandDir, { recursive: true })

// Keep in sync with MARK_PATH / MARK_DOT in src/components/brand/logo.tsx.
const logoSrc = await readFile(join(root, 'src', 'components', 'brand', 'logo.tsx'), 'utf8')
const MARK_PATH = logoSrc.match(/MARK_PATH =\s*'([^']+)'/)[1]
const [, cx, cy, r] = logoSrc.match(/MARK_DOT = \{ cx: ([\d.]+), cy: ([\d.]+), r: ([\d.]+) \}/)

const C = { harbor: '#0D1F1C', foam: '#EAF2EE', brass: '#F5B83D', paper: '#F6F4EE', foam2: '#A9BDB5', line: '#25453D' }

const mark = (stroke, { x = 0, y = 0, scale = 1 } = {}) =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><path d="${MARK_PATH}" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.brass}"/></g>`

/** App icon: Foam symbol on a Harbor tile. `rounded` false for the opaque Apple icon. */
const tile = (rounded = true) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="${rounded ? 7 : 0}" fill="${C.harbor}"/>${mark(C.foam, { x: 4, y: 4.2, scale: 0.75 })}</svg>`

const png = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()

await writeFile(join(pub, 'icon.svg'), tile())
await writeFile(join(pub, 'icon.png'), png(tile(), 512))
await writeFile(join(pub, 'apple-icon.png'), png(tile(false), 180))

// favicon.ico with PNG-encoded 16, 32 and 48px images.
const sizes = [16, 32, 48]
const images = sizes.map((s) => png(tile(), s))
const header = Buffer.alloc(6 + 16 * sizes.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
sizes.forEach((s, i) => {
  const e = 6 + 16 * i
  header.writeUInt8(s, e)
  header.writeUInt8(s, e + 1)
  header.writeUInt16LE(1, e + 4)
  header.writeUInt16LE(32, e + 6)
  header.writeUInt32LE(images[i].length, e + 8)
  header.writeUInt32LE(offset, e + 12)
  offset += images[i].length
})
await writeFile(join(pub, 'favicon.ico'), Buffer.concat([header, ...images]))

// Logo SVGs (symbol only; the wordmark is set in Bricolage Grotesque in the page).
for (const [name, stroke] of [
  ['mark-primary', C.harbor],
  ['mark-reversed', C.foam],
  ['mark-on-green', '#FFFFFF'],
]) {
  await writeFile(
    join(brandDir, `${name}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${mark(stroke)}</svg>\n`,
  )
}

// Open Graph card: Harbor, grain, reversed lockup, "Consider it done."
const font = (pkg, file) => readFile(require.resolve(`${pkg}/files/${file}`))
const fonts = [
  {
    name: 'Bricolage',
    data: await font('@fontsource/bricolage-grotesque', 'bricolage-grotesque-latin-700-normal.woff'),
    weight: 700,
  },
  {
    name: 'Instrument',
    data: await font('@fontsource/instrument-sans', 'instrument-sans-latin-500-normal.woff'),
    weight: 500,
  },
]
const markUri = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${mark(C.foam)}</svg>`,
).toString('base64')}`
const grainUri = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity=".05"/></svg>`,
).toString('base64')}`

const h = (type, style, children) => ({ type, props: { style, children } })
const og = await satori(
  h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 80,
      paddingTop: 80,
      gap: 190,
      backgroundColor: C.harbor,
      backgroundImage: `url(${grainUri})`,
      fontFamily: 'Instrument',
      color: C.foam,
    },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
        { type: 'img', props: { src: markUri, width: 64, height: 64 } },
        h('div', { fontFamily: 'Bricolage', fontSize: 52, letterSpacing: -1.5 }, 'crewhir'),
      ]),
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h(
          'div',
          { display: 'flex', fontFamily: 'Bricolage', fontSize: 116, letterSpacing: -3, lineHeight: 1.1 },
          'Consider it done.',
        ),
        h(
          'div',
          { display: 'flex', marginTop: 20, fontSize: 32, color: C.foam2 },
          'The AI teammate in Slack and Microsoft Teams',
        ),
      ]),
    ],
  ),
  { width: 1200, height: 630, fonts },
)
await writeFile(join(pub, 'og-image.png'), new Resvg(og).render().asPng())

console.log('brand assets written')
