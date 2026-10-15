/**
 * Landing page copy (plan §6). Voice rules: sentence case, no exclamation
 * marks, verbs first, none of the banned words in plan §9.
 */
import { PROOF } from './proof'

export const hero = {
  eyebrow: 'Now in Slack and Microsoft Teams',
  title: 'Your crew, plus one.',
  sub: 'Crewhir is an AI teammate that lives in Slack and Microsoft Teams. Connect your tools, ask in plain words, and get finished work back: reports, dashboards, code and campaigns.',
  primary: 'Start free',
  secondary: 'Book a demo',
  /** Each item shows only when it is true (plan D3). */
  trust: [
    PROOF.freeCredits && `${PROOF.freeCredits} in free credits`,
    PROOF.noCardNeeded && 'No card needed',
    'Set up in minutes',
    PROOF.complianceBadge,
  ].filter((item): item is string => Boolean(item)),
  previewSummary:
    'Example: Crewhir audits ad spend in a Slack channel, returns a PDF and asks before pausing two campaigns.',
}

export type ChatPlatform = 'slack' | 'teams'

export const heroChat = {
  company: 'Lumen Bikes',
  channel: 'growth',
  request: {
    name: 'Maya',
    role: 'Head of Growth',
    text: "pull last month's ad spend by channel and flag anything over budget",
  },
  ack: 'On it. Pulling from Google Ads, Meta and your budget sheet.',
  tools: ['Google Ads', 'Meta Ads', 'Budget sheet'],
  done: 'Done. Spend was $48,210 against a $45,000 budget. Two campaigns ran over.',
  file: { name: 'ad-spend-audit-sep.pdf', meta: '6 pages' },
  approval: {
    text: ['Pause ', 'Retargeting – Broad', ' and ', 'Lookalike 3%', ' until Monday?'],
    approve: 'Approve',
    review: 'Review first',
  },
}

/** Integrations named in the plan. Only `live` ones are shown (plan Q5). */
export const integrations: { name: string; live: boolean }[] = [
  { name: 'Slack', live: true },
  { name: 'Microsoft Teams', live: true },
  { name: 'Google Workspace', live: false },
  { name: 'Google Ads', live: false },
  { name: 'Notion', live: false },
  { name: 'Stripe', live: false },
  { name: 'GitHub', live: false },
  { name: 'HubSpot', live: false },
  { name: 'Linear', live: false },
  { name: 'Jira', live: false },
  { name: 'Salesforce', live: false },
  { name: 'Shopify', live: false },
  { name: 'Airtable', live: false },
  { name: 'Meta Ads', live: false },
]

export const worksWith = {
  label: 'Works with the tools your team already uses',
  seeAll: PROOF.integrationCount ? `See all ${PROOF.integrationCount} integrations` : null,
}

export const comparison = {
  eyebrow: 'Why Crewhir',
  title: 'Most AI tools give you advice. Crewhir gives you the finished thing.',
  columns: ['The task', 'Typical AI tool', 'Crewhir'],
  rows: [
    {
      task: 'Audit ad spend',
      typical: 'A chat assistant explains how to do the audit.',
      crewhir: 'Pulls the numbers, does the audit and posts a PDF in the channel.',
    },
    {
      task: 'Follow up after a meeting',
      typical: 'A meeting bot writes a summary.',
      crewhir: 'Creates the tasks, sends the follow-ups and updates the CRM.',
    },
    {
      task: 'Automate a workflow',
      typical: 'An automation builder runs the rules you write.',
      crewhir: 'Spots the repetitive work, proposes the automation and runs it after you approve.',
    },
    {
      task: 'Build an internal tool',
      typical: 'A coding assistant writes code and leaves the rest to you.',
      crewhir: 'Builds it, deploys it and sends you the link.',
    },
  ],
}

export const pillars = {
  eyebrow: 'What makes it different',
  title: 'A teammate, not another tab.',
  items: [
    {
      title: 'It does the work, not the write-up.',
      body: 'Crewhir runs the queries, builds the files and ships the change. You get the result, not a to-do list.',
      vignette: 'tools',
    },
    {
      title: 'It works across your tools.',
      body: 'One request can touch your CRM, ad accounts, docs and code. Connect a tool once and the whole team can use it.',
      vignette: 'connected',
    },
    {
      title: 'It learns how your team works.',
      body: 'Crewhir keeps notes on your processes, names and preferences, so the tenth request needs less explaining than the first.',
      vignette: 'notes',
    },
  ] as const,
  vignettes: {
    tools: ['Query run', 'Sheet built', 'Change shipped'],
    connected: ['CRM', 'Ads', 'Docs', 'Code'],
    note: { label: 'Learned', text: 'Monday reports go to #leadership' },
  },
}

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'From invite to first result in one sitting.',
  steps: [
    {
      title: 'Add Crewhir to your workspace',
      body: 'Install it from the Slack App Directory or Microsoft Teams, then connect the tools you want it to use.',
    },
    {
      title: "Ask like you'd ask a colleague",
      body: 'Mention @Crewhir in any channel it\'s in: "Turn this week\'s feedback into tickets" or "Send me revenue by plan every Monday."',
    },
    {
      title: 'Get the finished work back',
      body: 'Crewhir does the work across your tools and replies with the file, the link or the change, and offers to make it recurring.',
    },
  ],
  cta: 'Start free',
}

export type TeamId = 'founders' | 'marketing' | 'engineering' | 'operations'

export const useCases = {
  eyebrow: 'Use cases',
  title: 'One hire, every team.',
  cta: 'Start free',
  teams: [
    {
      id: 'founders',
      label: 'Founders',
      items: [
        { title: 'Daily numbers in Slack', body: 'Revenue, signups and burn posted every morning, with what changed and why.' },
        { title: 'Investor updates', body: 'A monthly draft pulled from your metrics, ready for you to edit.' },
        { title: 'Outbound', body: 'Lead lists researched and sequences drafted for your review.' },
        { title: 'Internal tools', body: 'Describe the tool, get a working web app and a link.' },
      ],
      thread: {
        ask: 'draft the October investor update',
        reply: "Draft's ready: MRR +8%, 3 new logos, runway 19 months. Doc linked.",
      },
    },
    {
      id: 'marketing',
      label: 'Marketing',
      items: [
        { title: 'Ad performance', body: 'Spend, CPA and ROAS across channels, with where to move budget.' },
        { title: 'Content engine', body: 'Briefs, drafts and a publishing schedule that keeps running.' },
        { title: 'Lead sourcing', body: 'Target accounts found and enriched in your CRM.' },
        { title: 'Reports', body: 'A weekly PDF your leadership will actually read.' },
      ],
      thread: {
        ask: 'which channel had the cheapest signups last week?',
        reply: 'Search: $18 per signup, down 12%. Meta: $31. Chart attached.',
      },
    },
    {
      id: 'engineering',
      label: 'Engineering',
      items: [
        { title: 'Bug triage', body: 'Reports turned into scoped tickets with steps to reproduce.' },
        { title: 'Code contributions', body: 'Small fixes on a branch, opened as a pull request for review.' },
        { title: 'Internal tools', body: 'Full-stack apps for the team, built and deployed.' },
        { title: 'Incident follow-up', body: 'Timelines written and action items chased until closed.' },
      ],
      thread: {
        ask: 'the export button 500s on large workspaces',
        reply: 'Found it: the query has no pagination. PR #482 is open for review.',
      },
    },
    {
      id: 'operations',
      label: 'Operations & Finance',
      items: [
        { title: 'Board packs', body: 'Numbers, charts and commentary assembled from your sources.' },
        { title: 'Invoices and contracts', body: 'Key terms pulled out and logged where you track them.' },
        { title: 'Forecasts', body: 'Refreshed on schedule when new actuals land.' },
        { title: 'Cross-team nudges', body: 'Owners reminded and data synced between tools.' },
      ],
      thread: {
        ask: 'refresh the Q4 forecast with September actuals',
        reply: 'Updated. Revenue tracking 3% under plan, mostly from the delayed enterprise deal. Sheet linked.',
      },
    },
  ] satisfies {
    id: TeamId
    label: string
    items: { title: string; body: string }[]
    thread: { ask: string; reply: string }
  }[],
}

/** Must match the Terms, "AI Functionality and Autonomous Actions" (plan Q6). */
export const control = {
  eyebrow: 'In your control',
  title: 'Works on its own. Checks in when it counts.',
  sub: 'Crewhir handles routine work without waiting on you, and asks a person before anything high-stakes. You decide where that line sits.',
  points: [
    {
      title: 'Approval before high-stakes actions.',
      body: 'Sending external email, spending money, deleting data and changing its own access always need a yes.',
      icon: 'approval',
    },
    { title: 'You set the rules.', body: 'Turn action types on or off, or require approval per tool.', icon: 'rules' },
    {
      title: 'Every action is logged.',
      body: 'See who asked, what Crewhir did and who approved it.',
      icon: 'log',
    },
  ] as const,
  log: [
    { time: '09:14', text: 'Maya asked for an ad spend audit', who: 'Requested' },
    { time: '09:16', text: 'Read Google Ads, Meta Ads, Budget sheet', who: 'Crewhir' },
    { time: '09:17', text: 'Posted ad-spend-audit-sep.pdf to #growth', who: 'Crewhir' },
    { time: '09:21', text: 'Paused 2 campaigns', who: 'Approved by Maya' },
  ],
}

/** Every claim must match the Privacy Policy (legal plan §3). */
export const security = {
  eyebrow: 'Security',
  title: "Your data stays your team's.",
  cards: [
    {
      title: "Only what it's invited to.",
      body: "Crewhir reads the channels it's added to and the tools you connect. Nothing else.",
      icon: 'scope',
    },
    {
      title: 'Never used to train AI models.',
      body: 'Your messages and data power your workspace only.',
      icon: 'train',
    },
    {
      title: 'Encrypted everywhere.',
      body: 'Encrypted in transit and at rest. Workspaces are isolated from each other.',
      icon: 'lock',
    },
    {
      title: 'Delete anytime.',
      body: 'Disconnect a tool or remove your data whenever you choose.',
      icon: 'delete',
    },
  ] as const,
  badge: PROOF.complianceBadge,
  privacyLink: 'Read our privacy policy',
}

export const testimonials = {
  eyebrow: 'Stories',
  title: 'Teams that hired Crewhir',
}

const ASK_PROMPT =
  'What is Crewhir (crewhir.com)? What does it do well, where does it fall short, and what kind of team is it best for?'
const q = encodeURIComponent(ASK_PROMPT)

export const askAi = {
  title: "Don't take our word for it. Ask your AI.",
  sub: 'Open your assistant with this question already filled in.',
  prompt: ASK_PROMPT,
  links: [
    { label: 'Ask ChatGPT', href: `https://chatgpt.com/?q=${q}` },
    { label: 'Ask Claude', href: `https://claude.ai/new?q=${q}` },
    { label: 'Ask Perplexity', href: `https://www.perplexity.ai/search?q=${q}` },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  title: "Start free. Pay when it's pulling its weight.",
  sub: PROOF.freeCredits
    ? `Every workspace starts with ${PROOF.freeCredits} in free credits.${PROOF.noCardNeeded ? ' No card, no sales call.' : ' No sales call.'}`
    : 'Try it with your team before you pay. No sales call.',
  price: PROOF.startingPrice ? `Paid plans from ${PROOF.startingPrice}/month` : null,
  included: [
    'Slack and Microsoft Teams',
    PROOF.integrationCount && `${PROOF.integrationCount} integrations`,
    'Reports, dashboards and apps',
    'Code and pull requests',
    'Approvals and audit log',
    'Shared credits for the whole team',
  ].filter((item): item is string => Boolean(item)),
  primary: 'Start free',
  secondary: 'Talk to us',
}

export const finalCta = {
  title: 'Consider it done.',
  sub: 'Add Crewhir to your workspace and hand it the first thing on your list.',
  cta: 'Start free',
  note: PROOF.noCardNeeded ? 'No card needed' : null,
}
