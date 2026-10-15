import { APP_URL, COMPANY, SITE_URL } from '@/lib/site'

/**
 * Legal documents. The English text is the binding version.
 *
 * The Privacy Policy and Terms follow the section structure of Rankoya's
 * documents, with product clauses modeled on Viktor's published legal pages
 * (viktor.com/legal): Slack and Teams data, workspace-shared connections,
 * AI subprocessors with no training, autonomous actions with approvals, and
 * credits. The Refund Policy is Rankoya's, word for word.
 *
 * Drafted with the legal plan's defaults (docs/crewhir_legal_pages_plan.md §7):
 * England and Wales law, US hosting, 30-day production deletion and 35-day
 * backups, minimum age 18, a 12-month liability cap, Google sign-in only,
 * no Shopify section, a DPA on request, and Crewhir-hosted apps.
 * Have a lawyer review these documents before launch.
 */
export type LegalBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] } | { type: 'h3'; text: string }
export type LegalSection = { heading?: string; blocks: LegalBlock[] }
export type LegalDocument = {
  slug: 'privacy-policy' | 'terms-of-service' | 'refund-policy'
  title: string
  description: string
  lastUpdated: string
  sections: LegalSection[]
}

const name = 'Crewhir'
const { name: company, address, jurisdiction, supportEmail } = COMPANY
const appUrl = `${APP_URL}/`
const marketingUrl = `${SITE_URL}/`

const p = (text: string): LegalBlock => ({ type: 'p', text })
const ul = (...items: string[]): LegalBlock => ({ type: 'ul', items })
const h3 = (text: string): LegalBlock => ({ type: 'h3', text })

/** Set both to the launch date. */
const EFFECTIVE = '2026-10-15'
const EFFECTIVE_LONG = '15 October 2026'

export const privacyPolicy: LegalDocument = {
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  description: `How ${name} collects, uses, shares and keeps personal information.`,
  lastUpdated: EFFECTIVE,
  sections: [
    {
      blocks: [
        p(
          `This policy describes how ${company}, trading as ${name} ("${name}", "we", "us" or "our"), collects, uses, shares and keeps personal information across ${marketingUrl}, the ${name} application at ${appUrl}, the ${name} app for Slack, the ${name} app for Microsoft Teams, and the tools you connect to ${name}. ${company} is the controller of the personal information described in this policy, except where Section 6 says otherwise.`,
        ),
        p(
          'It is written to comply with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, the EU General Data Protection Regulation (GDPR), US state privacy laws and other applicable data protection laws.',
        ),
        p(`This policy is effective as of ${EFFECTIVE_LONG} and was last updated on ${EFFECTIVE_LONG}.`),
      ],
    },
    {
      heading: '1. Information We Collect',
      blocks: [
        p(
          'We collect information you provide to us, information the service produces while it works for you, and information your devices send while you use the service.',
        ),
        h3('1.1. Log Data'),
        p(
          'When you visit our website or use the application, our servers log the standard data your browser or client provides: your IP address, browser type and version, the pages you visit, the time and date of each request, and technical details of any errors. We use this data for troubleshooting, security and improving the service.',
        ),
        h3('1.2. Account Information'),
        ul(
          'Name',
          'Email address',
          'Profile photo, if you add one or your Slack, Microsoft or Google profile provides one',
          'The names, email addresses and roles of the members of your workspace',
          'Billing details, processed by our payment provider Paddle (see Section 7). We do not receive or store your full card details.',
        ),
        h3('1.3. Slack and Microsoft Teams Workspace Information'),
        p(
          `When you install ${name} in Slack or Microsoft Teams, we receive the workspace or tenant identifier and name, the name and email address of the person who installed it, the user identifiers and profile details (name, display name, email address, time zone and photo) of members who use ${name}, and the mapping between those Slack or Teams users and ${name} accounts.`,
        ),
        h3(`1.4. Messages and Files ${name} Can See`),
        p(`${name} can read only what it is given access to:`),
        ul(
          `Channels ${name} has been added to, including messages in those channels that are not addressed to ${name}, so that it has the context it needs to do the work you ask for.`,
          `When ${name} joins a channel, up to 90 days of that channel's earlier messages, so that it understands the conversation it is joining.`,
          `Direct messages sent to ${name}, and threads it is mentioned in or replies to.`,
          `Files shared in those channels, direct messages and threads.`,
          `Private channels and direct messages ${name} has not been added to, only where a user grants it search permissions, and only within that user's own access.`,
        ),
        p(`${name} cannot read channels or direct messages it has not been given access to in one of these ways.`),
        h3('1.5. Connected Tools and Credentials'),
        p(
          `To do work in other software, you connect it to ${name}, usually through an OAuth authorisation on that software's own sign-in page, and sometimes with an API key. We store the resulting tokens and keys encrypted, and we read and write data in the connected tool only to carry out the work you or your team ask for.`,
        ),
        p(
          `Connections are shared across the workspace: once a member connects a tool, any member of the workspace who can use ${name} may ask it to act in that tool, with the permissions of the account that authorised the connection. Only connect accounts that everyone in your workspace should be able to use.`,
        ),
        h3('1.6. Tasks, Outputs and Records'),
        p(
          `We store the requests made to ${name}, the threads they happen in, scheduled and recurring tasks, the tool calls ${name} makes and their results, approval requests and the decisions made on them, notes ${name} keeps about your team's processes and preferences, and the files, reports, code and apps it produces ("Generated Content"). We keep these so that you can return to them, so that ${name} can recall earlier work when you refer to it, and so that every action can be traced.`,
        ),
        h3('1.7. Communications With Us'),
        p(
          'When you email us, book a demo or contact support, we keep the messages and the contact details you give us so that we can reply and keep a record of the request.',
        ),
        h3('1.8. Cookies and Analytics'),
        p(
          'We use cookies and similar technologies (such as your browser\'s local storage) to operate the application, for example to keep you signed in. Our marketing website uses Vercel Web Analytics, which counts page views without cookies and without identifying you.',
        ),
        p('The following third-party services may set cookies when you use the parts of the service they provide:'),
        ul(
          'Paddle: checkout and subscription management, including fraud prevention. (https://www.paddle.com/legal/privacy)',
          'Google: signing in with your Google account. (https://policies.google.com/privacy)',
        ),
        p(
          'We do not currently use advertising cookies or advertising pixels. If we add them, we will update this section first and ask for your consent where the law requires it.',
        ),
        h3('1.9. Sensitive Data'),
        p(
          `We do not knowingly collect special categories of personal data, and our Terms of Service prohibit sending certain regulated data to ${name} (see "Prohibited Data" in the Terms). If such data reaches us through a channel or connected tool, we process it only as part of the work requested and delete it on the schedule in Section 14.`,
        ),
      ],
    },
    {
      heading: '2. Legal Bases for Processing (UK GDPR and GDPR)',
      blocks: [
        p(
          'If you are located in the United Kingdom or the European Economic Area (EEA), we rely on the following legal bases to process your personal information:',
        ),
        ul(
          'Contractual necessity: processing is necessary to perform the contract you or your organisation enter into with us (our Terms of Service), or to take steps at your request before entering into it, such as creating an account.',
          'Legitimate interests: we process personal information to secure and improve the service, to market it to existing customers, and to prevent fraud and abuse, where those interests are not overridden by your rights and freedoms.',
          'Consent: in some cases we rely on your consent, for example for marketing emails or for connecting a Google account. You may withdraw consent at any time.',
          'Legal obligation: we keep certain records, such as invoices, because the law requires it.',
        ),
      ],
    },
    {
      heading: '3. How We Use Information',
      blocks: [
        p('We collect, hold, use and disclose information for the following purposes:'),
        ul(
          `To provide the service: carrying out the tasks you and your team ask ${name} to do, running scheduled and recurring tasks, and producing the files, reports, code and apps you ask for.`,
          'To process AI requests with the providers described in Section 4.',
          'To ask for approval before high-stakes actions and to record the decisions made (Section 5).',
          'To process payments, plan changes and credits for your subscription.',
          'To contact you about your account, your workspace and support requests.',
          'For security, fraud prevention and audit, and to make sure the service is used in line with our Terms of Service.',
          'To improve the service, using aggregated or de-identified information about how it is used.',
          'For marketing about our products, which you may opt out of at any time.',
          'To comply with our legal obligations and resolve disputes.',
        ),
        p('We do not use Customer Data (the messages, files and connected-tool data described in Sections 1.4 to 1.6) for advertising.'),
      ],
    },
    {
      heading: '4. AI Processing',
      blocks: [
        p(
          `${name}'s work is performed by large language models operated by third-party providers. To complete a task, we send them the parts of your request, conversation, files and connected-tool data that the task needs, and receive the result back. The providers are:`,
        ),
        ul(
          'Anthropic (https://www.anthropic.com/privacy)',
          'OpenAI (https://openai.com/policies/privacy-policy)',
          'Google (https://policies.google.com/privacy)',
        ),
        p(
          'We use these providers under their business terms, which do not permit them to train their models on the content we send. They may keep it for a short period to monitor for abuse, as their terms allow, and then delete it.',
        ),
        p(`${name} does not train AI models on your Customer Data, your Generated Content or your Google user data.`),
      ],
    },
    {
      heading: '5. Autonomy and Approvals',
      blocks: [
        p(
          `${name} handles routine work without waiting on you, and asks a person before high-stakes actions. By default, ${name} always asks for approval before it sends email outside your organisation, spends money, deletes data, or changes its own access. Workspace admins can turn types of action on or off and require approval for others.`,
        ),
        p(
          'We record each approval request and decision, with who made it, when, and where (Slack, Microsoft Teams or the web application), together with the action that followed, so that every action can be traced.',
        ),
      ],
    },
    {
      heading: '6. Workspaces and Team Members',
      blocks: [
        ul(
          "Members of a workspace see each other's name, email address and role, and can see the requests, threads and outputs in the channels they share with Crewhir.",
          'Workspace admins can see the workspace\'s connected tools, approval settings, usage and activity log.',
          `Where an organisation uses ${name} for its staff, the organisation decides how ${name} is used with its data. For the Customer Data in its workspace, that organisation is the controller and ${company} processes it on the organisation's behalf. A data processing agreement is available on request at ${supportEmail}.`,
        ),
      ],
    },
    {
      heading: '7. Disclosure of Personal Information to Third Parties',
      blocks: [
        p('We disclose personal information to the following categories of recipients (our sub-processors):'),
        ul(
          'Paddle, our payment provider and Merchant of Record: payment, invoicing, tax and refunds. Receives your name, email address, billing address and payment details, and processes them under its own privacy policy as an independent controller.',
          'Hosting, database and storage providers: run the service and store your data.',
          'AI model providers (Anthropic, OpenAI and Google): process requests as described in Section 4.',
          'Email delivery providers: receive your email address and the emails we send you.',
          'Error monitoring providers: receive technical details of errors, which may include identifiers.',
          'Vercel: hosts our marketing website and counts page views without cookies.',
        ),
        ul(
          'The tools you connect, which receive the data Crewhir writes to them on your behalf.',
          'Slack and Microsoft, which carry the messages Crewhir sends in your workspace.',
          'Affiliates: a parent, subsidiary or affiliate of our company.',
          'A buyer or successor, if our business is sold or merged, under the same protections as this policy.',
          'Legal authorities: courts, regulators and law enforcement, as required by law or to establish, exercise or defend our legal rights.',
        ),
        p(
          'We do not sell personal information. Our service providers are bound by contracts that require them to protect personal information in accordance with applicable data protection law and to use it only to provide their service to us. Our website may link to third-party sites, which have their own privacy policies.',
        ),
      ],
    },
    {
      heading: '8. Slack',
      blocks: [
        p(`This section applies when ${name} is installed in a Slack workspace.`),
        ul(
          'Data we access: messages, threads and files in channels Crewhir has been added to (including up to 90 days of history on joining); direct messages with Crewhir; private channels and direct messages only where a user grants search permissions; user profiles (name, display name, email address, time zone, photo); and channel names and membership.',
          'Why: to understand requests, do the work asked for, reply in the right place, and recall earlier work.',
          'How long: as set out in Section 14.',
        ),
        p('We affirm Slack APIs are not used to develop, improve, or train generalized AI/ML models.'),
        p('We do not sell Slack data, and we do not use Slack data for advertising.'),
        p(
          `Revoking access: a workspace admin can remove ${name} at any time through Slack's App Management settings. Uninstalling stops new data collection and deletes our Slack access tokens. It does not delete data we already hold, which is deleted on the schedule in Section 14, or sooner if you ask us at ${supportEmail}.`,
        ),
      ],
    },
    {
      heading: '9. Microsoft Teams',
      blocks: [
        p(`This section applies when ${name} is installed in Microsoft Teams.`),
        ul(
          'Data we access through Microsoft Teams and Microsoft Graph: messages, threads and files in the teams, channels and chats Crewhir has been added to; direct chats with Crewhir; and user profiles (name, email address, time zone).',
          'Why: to understand requests, do the work asked for, reply in the right place, and recall earlier work.',
          'How long: as set out in Section 14.',
        ),
        p(
          'We do not use Microsoft 365 data to develop, improve or train generalised AI or machine learning models, we do not sell it, and we do not use it for advertising.',
        ),
        p(
          `Revoking access: a Teams administrator can remove or block ${name} in the Teams admin center, and users can remove it from their Teams client. Removing ${name} stops new data collection and deletes our access tokens. Existing data is deleted on the schedule in Section 14.`,
        ),
      ],
    },
    {
      heading: '10. Google API Services',
      blocks: [
        p(
          `${name}'s use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.`,
        ),
        p(
          'When you sign in with Google, we receive your name, email address and profile photo, and use them only to create and secure your account.',
        ),
        p(
          `In particular, we use Google user data only to provide and improve the features you see in the application, we do not sell it, we do not use it for advertising, and we do not use it to develop, improve or train generalised AI or machine learning models. People at ${name} do not read it unless you ask us to for support, it is needed for security, or the law requires it. You may revoke ${name}'s access at any time at https://myaccount.google.com/permissions.`,
        ),
      ],
    },
    {
      heading: '11. International Data Transfers',
      blocks: [
        p(
          'We store and process data in the United States. Several of the providers named above also operate there. The United States may have data protection laws that differ from the laws of your country.',
        ),
        p(
          'For transfers out of the United Kingdom or the EEA, we rely on appropriate safeguards, such as the UK International Data Transfer Agreement or Addendum, Standard Contractual Clauses approved by the European Commission, the UK Extension to the EU-US Data Privacy Framework or the EU-US Data Privacy Framework where the recipient is certified, or other legally recognised mechanisms.',
        ),
      ],
    },
    {
      heading: '12. Data Security',
      blocks: [
        p(
          'We implement commercially reasonable measures to protect personal information from loss, theft, unauthorised access, disclosure, copying, use or modification, including:',
        ),
        ul(
          'Encryption in transit (TLS) and at rest (AES-256), including the tokens and keys for connected tools.',
          'Isolation between workspaces.',
          'Role-based access controls and multi-factor authentication for our staff\'s access to production systems.',
          'Audit logs of access and of the actions Crewhir takes.',
          'Regular security assessments and updates.',
        ),
        p(
          'Your Slack or Microsoft Teams administrators are responsible for who can access your workspace, which channels Crewhir is added to, and which tools are connected.',
        ),
        p(
          'No method of electronic transmission or storage is completely secure, so we cannot guarantee absolute security. If a breach affects your personal information, we will notify you and the regulator as the law requires.',
        ),
      ],
    },
    {
      heading: '13. Your Rights',
      blocks: [
        p('If you are located in the United Kingdom or the EEA, you have the following rights:'),
        ul(
          'Right of access: to request a copy of the personal information we hold about you.',
          'Right to rectification: to request that we correct inaccurate or incomplete personal information.',
          'Right to erasure: to request that we delete your personal information, subject to exceptions such as a legal obligation to retain it.',
          'Right to restrict processing: to request that we restrict processing in certain circumstances.',
          'Right to data portability: to receive your personal information in a structured, commonly used, machine-readable format.',
          'Right to object: to object to processing based on legitimate interests and to processing for direct marketing.',
          'Right to withdraw consent: where processing is based on consent, to withdraw it at any time.',
        ),
        p(
          'If you live in a US state with a consumer privacy law, you may have the right to know and access the personal information we hold about you, to correct it, to delete it, and to opt out of its sale or use for targeted advertising (we do neither). We respond within 45 days. If we decline your request, you may appeal by replying to our decision, and we will respond to the appeal within the time the law sets. You may use an authorised agent, and we may ask for proof of the agent\'s authority. We will not discriminate against you for exercising these rights.',
        ),
        p(
          `To exercise any of these rights, contact us at ${supportEmail}. UK and EEA requests are answered within one month. Where your data is in an organisation's workspace (Section 6), we may refer your request to that organisation's administrator.`,
        ),
      ],
    },
    {
      heading: '14. Retention and Deletion',
      blocks: [
        p(
          'We keep personal information only for as long as we need it to provide the service, for legitimate business purposes, or as required by law. In particular:',
        ),
        ul(
          'Customer Data, Generated Content and the activity log are kept while the workspace exists.',
          'When you delete data, delete your account or delete a workspace, the data is removed from our production systems within 30 days and from our backups as they rotate, within a further 35 days, except where we must keep a record to comply with a legal obligation such as tax law.',
          'Derived data, such as search indexes and embeddings, is deleted with the data it came from.',
          'Tokens and keys for a connected tool are deleted when you disconnect it, and Slack and Teams tokens are deleted when Crewhir is uninstalled.',
          'Uninstalling Crewhir does not by itself delete data we already hold. Ask us to delete it, or delete the workspace in the application.',
          'You may ask us for an export of your data before deletion.',
          'Log data is kept for a limited period for troubleshooting and security.',
        ),
      ],
    },
    {
      heading: "15. Children's Privacy",
      blocks: [
        p(
          'The service is for businesses and is not directed at anyone under 18. We do not knowingly collect personal information from people under 18. If you believe we have, please contact us and we will delete it.',
        ),
      ],
    },
    {
      heading: '16. Complaints',
      blocks: [
        p(
          'If you believe we have breached a data protection law and wish to complain, please contact us using the details below with the details of the alleged breach. We will investigate and respond in writing with the outcome and the steps we will take.',
        ),
        p(
          "You also have the right to complain to a data protection authority: in the United Kingdom, the Information Commissioner's Office (https://ico.org.uk/make-a-complaint/), or in the EEA, the authority in the country where you live or work.",
        ),
      ],
    },
    {
      heading: '17. Changes to This Policy',
      blocks: [
        p(
          'We may change this policy to reflect changes to the service, to our providers or to the law. If we make significant changes, we will notify you by a notice in the application or by email before they take effect. Your continued use of the service after a change means you accept the updated policy.',
        ),
      ],
    },
    {
      heading: '18. Contact Us',
      blocks: [
        p('For questions about your privacy, or to exercise your rights, contact us at:'),
        p(`${company} (${name}) · ${address} · ${supportEmail}`),
      ],
    },
  ],
}

export const termsOfService: LegalDocument = {
  slug: 'terms-of-service',
  title: 'Terms of Service',
  description: `Terms and conditions for ${name}.`,
  lastUpdated: EFFECTIVE,
  sections: [
    {
      blocks: [
        p(
          `${company}, trading as ${name} ("${name}", "we", "us" or "our"), agrees to furnish services to the Subscriber (the "Subscriber", "you" or "your"), subject to the following Terms of Service. Use of ${name}'s service constitutes acceptance and agreement to these Terms of Service.`,
        ),
        p(
          `The Terms of Service ("Terms") govern your use of the ${name} website at ${marketingUrl} and the application at ${appUrl} (together, the "Site"), the ${name} apps for Slack and Microsoft Teams, ${name}'s AI teammate services, and any files, reports, code, apps and other content produced by ${name} for you ("Generated Content"). To make these Terms easier to read, the Site, the apps, our services and the Generated Content are collectively called the "Services."`,
        ),
        p(
          'The Services are provided for business purposes. If you use them as a consumer, nothing in these Terms affects the rights you have under the law of your country that cannot be excluded.',
        ),
      ],
    },
    {
      heading: 'Use of Services',
      blocks: [
        p(
          `You may use our Services, provided that you are at least 18, of legal age to form a binding contract and are not barred from receiving such services under the laws of ${jurisdiction} or other jurisdictions. In order to access our Services, you are required to provide current and factual identification, contact and other information as part of the registration process. You are responsible for the confidentiality of your account information and for all activities that occur under your account. You agree to immediately notify ${name} of any unauthorised use of your account or any other breach of security. ${name} will not be liable for any loss or damage as a result of your failure to provide us with accurate information or to keep your account secure.`,
        ),
      ],
    },
    {
      heading: 'Workspaces and Team Members',
      blocks: [
        p(
          `A ${name} workspace is linked to a Slack workspace, a Microsoft Teams tenant or both, and holds your team members, connected tools, approval settings, billing and credits. The workspace owner is responsible for the workspace's subscription and for the people who can use ${name} in it.`,
        ),
        ul(
          'Roles: owners and admins manage members, billing, connected tools and approval settings; members ask Crewhir for work.',
          `You are responsible for the actions of everyone who can use ${name} in your workspace, and for removing access when someone should no longer have it.`,
          'You confirm you have the authority to connect each third-party account you connect, and to let the members of your workspace use it.',
        ),
      ],
    },
    {
      heading: 'Connected Platforms (Slack, Teams and Tools)',
      blocks: [
        p(
          `${name} works inside Slack and Microsoft Teams and in the tools you connect ("Connected Platforms"). By installing ${name} or connecting a tool, you confirm you have the authority and any consents needed to do so, including from the people whose data is in the channels and tools you give ${name} access to.`,
        ),
        ul(
          `Scope of access: ${name} accesses only what the consent screens you approve allow, and what our Privacy Policy describes.`,
          `Shared connections: a connected tool is available to every member of the workspace who can use ${name}, and acts with the permissions of the account that authorised it.`,
          'Uninstalling: removing Crewhir from Slack or Teams, or disconnecting a tool, stops new access. Existing data is handled as described in our Privacy Policy.',
          `Third-party terms: each Connected Platform's own terms govern your use of it. We are not responsible for Connected Platforms, their outages, or changes to their APIs or terms, and ${name} may change or remove an integration when a platform requires it.`,
        ),
      ],
    },
    {
      heading: 'AI Functionality and Autonomous Actions',
      blocks: [
        p(
          `${name} uses AI models to produce Generated Content and to take actions. AI output is probabilistic: it may be incomplete, inaccurate or different each time, and it is not professional, legal, financial or medical advice. Review Generated Content before you rely on it.`,
        ),
        p(
          `${name} may take actions in Connected Platforms on your behalf, within the permissions you grant and the approval settings your workspace chooses. High-risk actions always need approval for each action, whatever your settings: sending email to people outside your organisation, making payments or other spending, deleting data, and changing ${name}'s own permissions. Workspace admins can turn other types of action on or off, or require approval for them.`,
        ),
        p(
          `You are the operator of ${name} in your workspace. You are responsible for the actions you approve and for actions your settings allow ${name} to take without asking, as if you had approved each one, except to the extent caused by our gross negligence or wilful misconduct. Changes to approval settings apply to future actions only.`,
        ),
      ],
    },
    {
      heading: 'Reporting AI Output',
      blocks: [
        p(
          `Content produced by ${name} is AI-generated. If ${name} produces output that is harmful, offensive or wrong, report it from the message in Slack or Teams, in the application, or by emailing ${supportEmail} with a link to or copy of the output. We review every report.`,
        ),
      ],
    },
    {
      heading: 'Acceptable Conduct',
      blocks: [
        p(
          `You are responsible for the actions of all users of your account and any data that is created, stored, displayed by, or transmitted by your account while using ${name}. You will not engage in any activity that interferes with or disrupts ${name}'s Services or networks connected to ${name}.`,
        ),
      ],
    },
    {
      heading: 'Prohibited Usage',
      blocks: [
        p(
          `You agree that any of the below activities are considered prohibited usage and may result in immediate account suspension or cancellation without a refund, and that ${name} may pursue the remedies available to it by law.`,
        ),
        ul(
          `Exploiting Services connected to ${name}: intentional misuse of services or networks connected to ${name}, including but not limited to attempting to alter the way ${name}'s software works, or generating content that is not allowed under the usage policies of the AI providers ${name} relies on: Anthropic (https://www.anthropic.com/legal/aup), OpenAI (https://openai.com/policies/usage-policies/) and Google (https://policies.google.com/terms/generative-ai/use-policy).`,
          'Attacking systems: distributing malware, denial-of-service attacks, unauthorised scanning, scraping or access to any system, including through Connected Platforms.',
          'Spam and deception: sending spam or phishing, or impersonating any person or organisation.',
          'Bypassing limits: circumventing usage limits, credits, approval requirements or security controls.',
          `Building a competing product: using ${name} or its output to build or train a competing product.`,
          'Sanctioned use: using the Services in or for a sanctioned country, or for a sanctioned person.',
          'High-risk uses: using the Services where failure could lead to death, personal injury or serious environmental damage.',
          `Activities viewed as illegal or harmful: engaging in illegal activities or activities harmful to the operations of ${name} or ${name}'s customers.`,
          'Providing false data on any contract or application, including fraudulent use of credit card numbers.',
        ),
      ],
    },
    {
      heading: 'Prohibited Data',
      blocks: [
        p(
          `Unless we have agreed a written addendum with you, you must not use ${name} to process, or give it access to channels or tools containing:`,
        ),
        ul(
          'Protected health information under HIPAA.',
          'Payment card data subject to PCI DSS.',
          'Non-public personal financial information under GLBA.',
          'Special categories of personal data under Article 9 of the GDPR or UK GDPR.',
          'Personal data of children.',
          'Export-controlled data.',
        ),
      ],
    },
    {
      heading: 'Your Content',
      blocks: [
        p(
          `Posting Content. Our Services allow you to give ${name} requests, instructions, messages, files and data. Anything (other than Feedback) that you or your Connected Platforms make available to ${name} is referred to as "User Content." User Content includes Customer Data: the messages and files in your Slack or Teams workspace that ${name} can access, and the data in your Connected Platforms.`,
        ),
        p(
          `Permissions to Your User Content. By making any User Content available through the Services you grant to ${name}, its licensors and their affiliates a non-exclusive, transferable, worldwide, royalty-free licence, with the right to sublicense to the service providers named in our Privacy Policy, to use, host, store, copy, communicate, modify, create derivative works based upon, distribute, publish and publicly display your User Content, for as long as needed to provide, operate and secure the Services for you.`,
        ),
        p(
          `Your Responsibility for User Content. You are solely responsible for all your User Content. You represent and warrant that you have (and will have) all rights that are necessary to grant us the licence rights in your User Content under these Terms. You represent and warrant that neither your User Content, nor your use and provision of your User Content to be made available through the Services, nor any use of your User Content by ${name} on or through the Services will infringe, misappropriate or violate a third party's intellectual property rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation.`,
        ),
        p(
          'Removal of User Content. You can remove your User Content by specifically deleting it. In certain instances, some of your User Content may not be completely removed and copies of it may continue to exist on the Services for the periods set out in our Privacy Policy. To the maximum extent permitted by law, we are not responsible or liable for the removal or deletion of (or the failure to remove or delete) any of your User Content.',
        ),
        p(
          `Your Use of Generated Content. Subject to your compliance with these Terms and payment of the fees that apply, ${name} assigns to you whatever rights it has in the Generated Content created for your workspace, and you may use, copy, modify, sell, create derivative works based upon, distribute, publicly display and publicly perform it for your lawful business purposes. AI-generated content may not be protected by copyright in every country, and similar content may be generated for other users.`,
        ),
        p(
          `Ownership of Intellectual Property. ${name} and its licensors (as applicable) retain all rights, title and interest in and to the Services, including all underlying technology, software, design and intellectual property. ${name} does not use your User Content or your Generated Content to train AI models.`,
        ),
      ],
    },
    {
      heading: 'Content Moderation Policy',
      blocks: [
        p(
          `${name} is committed to maintaining a safe and respectful environment. While we do not pre-screen User Content or Generated Content, we have a strict Content Moderation Policy.`,
        ),
        p(`Prohibited Content: you are strictly prohibited from using ${name} to create, store or share content that:`),
        ul(
          "Is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libellous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.",
          'Incites violence, promotes discrimination, or advocates hatred against any individual or group.',
          'Contains sexually explicit material, pornography, or exploits, abuses or endangers children.',
          'Infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party.',
          'Contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment.',
          'Constitutes unsolicited or unauthorised advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation.',
          'Impersonates any person or entity, or falsely states or otherwise misrepresents your affiliation with a person or entity.',
          'Violates any applicable local, national or international law.',
          'Spreads false or misleading information (misinformation or disinformation).',
          'Promotes or facilitates any illegal activity.',
          'Contains personally identifiable information (PII) of others without their express consent.',
        ),
        p(
          'Account Suspension and Termination: repeated or egregious violations of this policy will result in account suspension or termination.',
        ),
        p(
          `User Reporting: while we do not actively monitor all content, we encourage users to report any suspected violations of this policy to ${supportEmail}.`,
        ),
      ],
    },
    {
      heading: 'Apps and Files Crewhir Builds',
      blocks: [
        p(
          `${name} can build and host web apps, dashboards and files for your workspace. You decide who you share them with and are responsible for that sharing and for the data they show. We may take down a hosted app or file that breaks these Terms, and we will tell you when we do unless the law prevents it. Hosted apps are removed when your workspace is deleted.`,
        ),
      ],
    },
    {
      heading: 'Credits, Invoicing and Payment',
      blocks: [
        p(
          'Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.',
        ),
        p(
          `You agree that ${name}, through Paddle, shall be permitted to charge you on a monthly, annual or other agreed basis in advance of providing services. Fees for your plan renew automatically at the end of each billing period until you cancel. Payment is due upon invoicing. Service may be interrupted on accounts that reach 10 days past due. Accounts that are not collectable may be turned over to an outside collection agency.`,
        ),
        p(`${name} work uses credits. Credits work as follows:`),
        ul(
          'Credits have no cash value and cannot be transferred, sold or exchanged for money.',
          "Your plan's monthly credit allocation is added at the start of each billing period. Unused allocation rolls over for one billing period and then expires.",
          'Top-up credits you buy, and promotional credits we give you, do not expire while your account is active, unless we tell you otherwise when we give them.',
          'When your workspace runs out of credits, features that use credits pause until credits are added. We do not charge for usage beyond your credits without your agreement.',
          'All members of a workspace share its credit balance.',
        ),
        ul(
          'Upgrades: if you upgrade your plan, you are charged a pro-rated amount straight away and the full new rate from your next billing cycle.',
          'Downgrades: if you downgrade your plan, the new rate applies from your next billing cycle.',
        ),
        p(
          `Subscriber is aware that ${name} may prospectively change the rates and charges from time to time, with notice as described under Changes to Service and Pricing.`,
        ),
        p(
          `${name} is not responsible for any additional bank fees, interest charges, finance charges, overdraft charges or other fees resulting from charges billed by ${name} or Paddle. Currency exchange settlements will be based on agreements between you and your financial institution or payment provider. Refunds are governed by our Refund Policy (${marketingUrl}refund-policy).`,
        ),
      ],
    },
    {
      heading: 'Feedback',
      blocks: [
        p(
          `If you send us suggestions or feedback about the Services ("Feedback"), we may use it without restriction or obligation to you. Feedback does not include your User Content.`,
        ),
      ],
    },
    {
      heading: 'Confidentiality',
      blocks: [
        p(
          'Customer Data is your confidential information. We use it only to provide the Services to you and as our Privacy Policy describes, and we protect it with at least the care we use for our own confidential information. We may disclose it where the law requires, and will tell you first where the law allows.',
        ),
      ],
    },
    {
      heading: 'Security',
      blocks: [
        p(
          `We protect the Services and your data with the measures described in Section 12 of our Privacy Policy (${marketingUrl}privacy-policy). If a security breach affects your Customer Data, we will notify you without undue delay and give you the information we reasonably can.`,
        ),
      ],
    },
    {
      heading: 'AI Content Disclaimer and User Responsibility',
      blocks: [
        p(
          `${name} uses automated processes to produce Generated Content and take actions. While we strive for accuracy and quality, we do not review, edit or endorse Generated Content before it is shown to you or used in your workspace and connected tools. You are solely responsible for reviewing Generated Content and the actions you approve or allow. We make no warranties regarding the accuracy, completeness, truthfulness, originality, non-infringement or legality of any Generated Content. You acknowledge that Generated Content may contain errors, inaccuracies or opinions that you do not agree with, and that it may violate third-party rights or applicable laws. You use Generated Content at your sole risk.`,
        ),
        p(
          `${name} does not warrant that use of the Generated Content will not infringe the rights of any third party. It is your sole responsibility to investigate and ensure that use of the Generated Content does not infringe any third-party intellectual property or other rights.`,
        ),
        p(
          `${name} is not affiliated with, endorsed by or sponsored by Slack, Microsoft, Google, OpenAI, Anthropic, or any of the tools the Services connect to. Their names and logos are trademarks of their owners and are used only to identify the integration. We are not responsible for any issues arising from your use of these platforms, including but not limited to platform outages, security breaches or changes to their terms of service.`,
        ),
      ],
    },
    {
      heading: 'Warranty Disclaimer',
      blocks: [
        p(
          'We have no special relationship with or fiduciary duty to you. You acknowledge that we have no duty to take any action regarding: which Subscribers gain access to the Services; what Content you access via the Services; or how you may interpret or use the Content.',
        ),
        p(
          'You release us from all liability for you having acquired or not acquired Content through the Services. We make no representations concerning any Content contained in or accessed through the Services, and we will not be responsible or liable for the accuracy, copyright compliance or legality of material or Content contained in or accessed through the Services.',
        ),
        p(
          'TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES AND CONTENT ARE PROVIDED "AS IS", "AS AVAILABLE" AND WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OR CONDITIONS OF TITLE, NON-INFRINGEMENT, SATISFACTORY QUALITY, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE OF PERFORMANCE OR USAGE OF TRADE, ALL OF WHICH ARE EXPRESSLY DISCLAIMED. WE, AND OUR DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, PARTNERS AND CONTENT PROVIDERS DO NOT WARRANT THAT: (I) THE SERVICES WILL BE SECURE OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (II) ANY DEFECTS OR ERRORS WILL BE CORRECTED; (III) ANY CONTENT OR SOFTWARE AVAILABLE AT OR THROUGH THE SERVICES IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (IV) THE RESULTS OF USING THE SERVICES WILL MEET YOUR REQUIREMENTS. YOUR USE OF THE SERVICES IS SOLELY AT YOUR OWN RISK.',
        ),
      ],
    },
    {
      heading: 'Limitation of Liability',
      blocks: [
        p(
          'NOTHING IN THESE TERMS LIMITS OR EXCLUDES LIABILITY FOR DEATH OR PERSONAL INJURY CAUSED BY NEGLIGENCE, FOR FRAUD OR FRAUDULENT MISREPRESENTATION, OR FOR ANY OTHER LIABILITY THAT CANNOT BE LIMITED OR EXCLUDED BY LAW.',
        ),
        p(
          `SUBJECT TO THE PARAGRAPH ABOVE, IN NO EVENT SHALL WE, NOR OUR DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS OR CONTENT PROVIDERS, BE LIABLE UNDER CONTRACT, TORT, STRICT LIABILITY, NEGLIGENCE OR ANY OTHER LEGAL OR EQUITABLE THEORY WITH RESPECT TO THE SERVICES (I) FOR ANY LOST PROFITS, LOST REVENUE, DATA LOSS, DATA THEFT, COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR SPECIAL, INDIRECT, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER, (II) FOR ANY BUGS, VIRUSES, TROJAN HORSES OR THE LIKE (REGARDLESS OF THE SOURCE OF ORIGINATION), OR (III) FOR ANY DIRECT DAMAGES IN EXCESS OF (IN THE AGGREGATE) THE FEES PAID TO US FOR THE PARTICULAR SERVICES DURING THE IMMEDIATELY PREVIOUS TWELVE MONTH PERIOD, EVEN IF ${name.toUpperCase()} HAD BEEN ADVISED OF, KNEW OR SHOULD HAVE KNOWN OF THE POSSIBILITY THEREOF. SUBSCRIBER ACKNOWLEDGES THAT THE FEES PAID REFLECT THE ALLOCATION OF RISK SET FORTH IN THESE TERMS AND THAT ${name.toUpperCase()} WOULD NOT ENTER INTO THIS AGREEMENT WITHOUT THESE LIMITATIONS.`,
        ),
        p(
          `To the extent permitted by law, ${name} is not liable for the acts or omissions of AI model providers or Connected Platforms, or for the business outcomes of decisions you make using Generated Content.`,
        ),
      ],
    },
    {
      heading: 'Indemnity',
      blocks: [
        p(
          `You agree to indemnify and hold harmless ${company}, its officers, directors, employees, agents and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses or fees (including reasonable legal fees) arising out of or relating to (a) your use of the Services; (b) your User Content; (c) actions taken in Connected Platforms under your approval settings, whether approved by you or allowed without asking; (d) your violation of these Terms; (e) your violation of any rights of any other person or entity; or (f) your violation of any applicable laws or regulations.`,
        ),
      ],
    },
    {
      heading: 'Suspension',
      blocks: [
        p(
          'We may suspend your access to the Services, in whole or in part, if your account is past due, if your use poses a security risk to the Services or others, or if a court or authority requires it. We will tell you where we can and restore access once the reason is resolved.',
        ),
      ],
    },
    {
      heading: 'API Usage',
      blocks: [
        p(
          `If ${name} provides an Application Programming Interface (API) for accessing the Services, your use of the API is subject to these Terms and any additional API documentation provided by ${name}. Your use of the API must be reasonable and not place an excessive burden on our servers. We reserve the right to limit or restrict your API access at any time, for any reason, including but not limited to excessive usage or violation of these Terms.`,
        ),
      ],
    },
    {
      heading: 'Changes to Service and Pricing',
      blocks: [
        p(
          `${name} reserves the right to modify or discontinue, temporarily or permanently, the Services (or any part thereof). We may also change our pricing for the Services. We will give at least 30 days' notice of a price increase to an existing subscription, which takes effect from your next billing period, and reasonable notice of any other significant change.`,
        ),
      ],
    },
    {
      heading: 'Termination',
      blocks: [
        p(
          `For Cause: we may terminate your account immediately, without notice, for any violation of these Terms, including but not limited to violation of our Content Moderation Policy, non-payment, providing false or misleading information, or any activity that we deem harmful to ${name} or other users.`,
        ),
        p(
          "Without Cause: we may also terminate your account at any time, for any reason, with thirty (30) days' prior written notice.",
        ),
        p(
          'By You: you may cancel your subscription at any time in your account settings. Cancellation stops future billing, and you keep access until the end of the period you have paid for.',
        ),
        p(
          'Effect of Termination: upon termination of your account, your right to use the Services will immediately cease. You may ask us for an export of your data before termination takes effect. We are not responsible for any loss of data or content that may occur as a result of account termination. Sections regarding Your Content, Confidentiality, AI Content Disclaimer, Warranty Disclaimer, Limitation of Liability, Indemnity, Governing Law and Choice of Forum shall survive termination.',
        ),
      ],
    },
    {
      heading: 'Notice',
      blocks: [
        p(
          `You agree that ${name} may provide you with notices, including those regarding changes to the Terms of Service, by email, in the application, in Slack or Teams, or by postings on the Site.`,
        ),
      ],
    },
    {
      heading: 'Entire Agreement',
      blocks: [
        p(
          `The Terms of Service, together with our Privacy Policy and Refund Policy (including any policies, guidelines or amendments that may be presented to you from time to time), constitute the entire agreement between you and ${name} and govern your use of ${name}'s Services, superseding any prior agreements between you and ${name} for the use of ${name}'s Services.`,
        ),
      ],
    },
    {
      heading: 'Choice of Law and Forum',
      blocks: [
        p(
          `The Terms of Service and the relationship between you and ${name} shall be governed by the laws of ${jurisdiction} without regard to its conflict of law provisions. You and ${name} agree to submit to the exclusive jurisdiction of the courts of ${jurisdiction}. If you are a consumer living elsewhere in the United Kingdom or in the EEA, you may also bring proceedings in the courts of the country where you live.`,
        ),
      ],
    },
    {
      heading: 'Waiver and Severability of Terms',
      blocks: [
        p(
          `The failure of ${name} to exercise or enforce any right or provision of the Terms of Service shall not constitute a waiver of such right or provision. If any provision of the Terms of Service is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavour to give effect to the parties' intentions as reflected in the provision, and the other provisions of the Terms of Service remain in full force and effect.`,
        ),
      ],
    },
    {
      heading: 'Statute of Limitations',
      blocks: [
        p(
          `To the extent permitted by law, you agree that any claim or cause of action arising out of or related to use of ${name}'s Services or the Terms of Service must be filed within one (1) year after such claim or cause of action arose or be forever barred.`,
        ),
      ],
    },
    {
      heading: 'Copyright Infringement',
      blocks: [
        p(
          `${name} respects the intellectual property rights of others. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible through the Services, please notify us at ${supportEmail}. Your notice should include:`,
        ),
        ul(
          'A description of the copyrighted work that you claim has been infringed.',
          'A description of where the allegedly infringing material is located on the Services.',
          'Your contact information (name, address, telephone number and email address).',
          'A statement by you that you have a good faith belief that the disputed use is not authorised by the copyright owner, its agent or the law.',
          "A statement by you that the above information in your notice is accurate and that you are the copyright owner or authorised to act on the copyright owner's behalf.",
          'An electronic or physical signature.',
        ),
        p(
          'We will respond to notices of alleged copyright infringement in accordance with applicable law. We reserve the right to remove or disable access to any material claimed to be infringing and to terminate the accounts of repeat infringers.',
        ),
      ],
    },
    {
      heading: 'Updates to the Terms',
      blocks: [
        p(
          'We may update these Terms from time to time. We will notify you of any material changes by email or in the application, posting the new Terms on the Site and updating the "Last updated" date. You are advised to review these Terms periodically for any changes. Your continued use of the Services after the revised Terms take effect constitutes your acceptance of such changes.',
        ),
      ],
    },
    {
      heading: 'Third-Party Platform Policies',
      blocks: [
        p(
          `Slack, Microsoft and the tools you connect have their own terms and policies, which may change from time to time. You are solely responsible for making sure your use of ${name} in and with those platforms complies with them.`,
        ),
        p(
          `${name} may restrict, disable, modify or remove features or integrations where necessary to comply with third-party platform requirements or applicable law.`,
        ),
      ],
    },
    {
      heading: 'Contact Us',
      blocks: [
        p(`For questions about these Terms, contact us at ${supportEmail}.`),
        p(`${company} (${name}) · ${address}`),
      ],
    },
  ],
}

/** Rankoya's Refund Policy, word for word (legal plan §5, Q8: wording kept). */
export const refundPolicy: LegalDocument = {
  slug: 'refund-policy',
  title: 'Refund Policy',
  description: `Refund policy for ${name} subscriptions.`,
  lastUpdated: EFFECTIVE,
  sections: [
    {
      blocks: [
        p(
          `By accessing or using ${name}, you agree to these terms. Please read them carefully before subscribing. If you do not agree with these terms, please do not use our services.`,
        ),
        p(
          'Before you subscribe or make any payment, please take a moment to read and understand this Refund Policy. It outlines your rights, responsibilities and options regarding subscription payments and cancellations.',
        ),
      ],
    },
    {
      heading: '1. Refund Policy',
      blocks: [
        p(
          "Customers are entitled to request a refund within 14 days of initial purchase, in accordance with our payment processor's refund policy.",
        ),
        p(
          `No refunds after the initial period: outside of the 14-day initial purchase window, once a subscription payment has been successfully processed, ${name} does not offer refunds. This includes but is not limited to:`,
        ),
        ul(
          'Forgetting to cancel your subscription before renewal.',
          'No longer needing or using the service.',
          'Changes to your marketing plans or priorities.',
          'Unsatisfactory experience after payment.',
          'Duplicate subscriptions purchased by the user.',
        ),
        p(`All payments made to ${name} outside the initial 14-day window are final, non-refundable, and non-transferable.`),
        p(`By subscribing to ${name}, you acknowledge and accept that all processed payments are binding and non-refundable.`),
      ],
    },
    {
      heading: '2. Managing Your Subscription and Avoiding Future Billing',
      blocks: [
        p('You may cancel your subscription at any time through your account settings to prevent future renewal charges.'),
        p('Cancellation stops future billing only.'),
        ul(
          'To avoid being charged for the next billing cycle, you must cancel your subscription before your next renewal date.',
          'After cancelling, you will continue to have access to your subscription benefits until the end of your current paid period, but no further charges will be made.',
          "It is the user's sole responsibility to manage and monitor their subscription status and billing cycles.",
        ),
        p(`${name} is not responsible for subscription charges resulting from failure to cancel before renewal.`),
      ],
    },
    {
      heading: '3. Billing Questions and Payment Support',
      blocks: [
        p(
          'If you believe there is an unauthorised or incorrect charge on your account, contact our support team immediately so we can investigate the transaction details with you.',
        ),
        p(
          'In rare cases where a technical billing error has occurred (such as duplicate charges caused by a system issue), you may be eligible for a refund review:',
        ),
        ul(
          'You were charged multiple times for the same subscription within the same billing cycle.',
          `A billing error caused by ${name}'s system.`,
        ),
        p(
          `If you believe a technical billing error has occurred, contact us within 7 days of the charge at ${supportEmail}. Each request will be reviewed individually, and approved refunds (if any) will be issued to your original payment method.`,
        ),
        p(`For billing questions, contact us at ${supportEmail}.`),
      ],
    },
    {
      heading: '4. Policy Agreement',
      blocks: [
        p(
          `By purchasing or subscribing to ${name}, you acknowledge and agree to abide by this Refund Policy. This policy is binding once a payment is processed.`,
        ),
        p(
          `We strongly encourage you to consider your purchase carefully and ensure that ${name} meets your needs before subscribing.`,
        ),
      ],
    },
    {
      heading: 'Summary',
      blocks: [
        ul(
          'Refunds are available within 14 days of initial purchase.',
          'No refunds for renewals or after the initial 14-day period.',
          'You can cancel anytime to avoid future billing.',
          `${name} is not responsible for late cancellations.`,
          `Only technical billing errors caused by ${name}'s system are eligible for special review.`,
          `For help, contact us at ${supportEmail}.`,
        ),
        p(`${company} · ${address}`),
        p(`${name} is a fully automated SaaS platform. We do not provide human-driven or manually delivered services.`),
      ],
    },
  ],
}

export const legalDocuments = [privacyPolicy, termsOfService, refundPolicy] as const
