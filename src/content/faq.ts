import { COMPANY } from '@/lib/site'
import { PROOF } from './proof'

export type FaqItem = { q: string; a: string }
export type FaqGroup = { title: string; items: FaqItem[] }

/**
 * Grouped FAQ (plan §6.13). Answers stay under about 60 words and must match
 * the legal pages. Items that depend on an unconfirmed fact are dropped until
 * it is filled in `proof.ts`.
 */
const groups: { title: string; items: (FaqItem | false | null)[] }[] = [
  {
    title: 'The basics',
    items: [
      {
        q: 'What is Crewhir?',
        a: 'An AI teammate that works inside Slack and Microsoft Teams. You ask it for work in plain words, and it uses your connected tools to do that work and hand back the result.',
      },
      {
        q: 'How is it different from a chat assistant?',
        a: 'A chat assistant answers questions. Crewhir connects to your live tools, takes actions, produces files and apps, and runs recurring jobs on a schedule.',
      },
      PROOF.integrationListSummary
        ? {
            q: 'What tools does Crewhir connect to?',
            a: `${PROOF.integrationListSummary}. If a tool you need is missing, tell us.`,
          }
        : null,
      {
        q: "What if it can't do something?",
        a: 'It says so, and tells you what it would need, rather than guessing.',
      },
      {
        q: 'Can Crewhir make mistakes?',
        a: 'Yes. It checks its own work, shows its sources and asks before high-stakes actions. Review important output before you rely on it.',
      },
    ],
  },
  {
    title: 'Setup and team use',
    items: [
      {
        q: 'How long does setup take?',
        a: 'Minutes: install the app, then connect the tools you want it to use.',
      },
      {
        q: 'Can my whole team use it?',
        a: 'Yes. Anyone in a channel Crewhir has joined can @mention it. Credits are shared across the workspace.',
      },
      {
        q: 'How does it learn about my team?',
        a: "From the channels it's in and the corrections you give it. It keeps notes you can review and edit.",
      },
    ],
  },
  {
    title: 'Data and privacy',
    items: [
      {
        q: 'Can Crewhir read all my messages?',
        a: 'No. Only channels it has been added to, and direct messages sent to it.',
      },
      {
        q: 'Is my data used to train AI models?',
        a: "No. Your data powers your workspace only, and our AI providers don't train on it either.",
      },
      {
        q: 'Are connected tools shared with my team?',
        a: 'Yes. A connection works for everyone in the workspace, so only connect accounts the whole team should use.',
      },
      {
        q: 'Can I delete my data?',
        a: `Yes. Remove the app or contact ${COMPANY.supportEmail}, and we delete it on the schedule in our privacy policy.`,
      },
    ],
  },
  {
    title: 'Billing',
    items: [
      {
        q: 'How do credits work?',
        a: PROOF.freeCredits
          ? `Work uses credits from your workspace's shared balance. You start with ${PROOF.freeCredits} free, and paid plans add a monthly allowance.`
          : "Work uses credits from your workspace's shared balance. Paid plans add a monthly allowance.",
      },
      {
        q: 'Can I get a refund?',
        a: 'Yes, within 14 days of your first purchase. See the refund policy.',
      },
    ],
  },
]

export const faqGroups: FaqGroup[] = groups.map((g) => ({
  title: g.title,
  items: g.items.filter((i): i is FaqItem => Boolean(i)),
}))

export const faq = { eyebrow: 'FAQ', title: 'Straight answers.' }
