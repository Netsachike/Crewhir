# Crewhir Legal Pages Plan (Privacy, Terms, Refund)

Plan for recreating this project's three legal pages in the new **Crewhir** project. Crewhir is modeled on [Viktor](https://viktor.com/).

| Page | Route | Content source |
| --- | --- | --- |
| Terms of Service | `/terms-of-service` | Rankoya's structure (`src/content/legal.ts`) plus Viktor's agent, integration and credit clauses |
| Privacy Policy | `/privacy-policy` | Rankoya's structure plus Viktor's Slack/Teams, OAuth, AI-subprocessor and marketplace compliance sections |
| Refund Policy | `/refund-policy` | **Same content as Rankoya's.** Only the name, entity and email change. |

> These documents need review by a lawyer before launch, just like the Rankoya versions (see the header comment in `src/content/legal.ts`). This plan is a drafting brief, not legal advice.

---

## 1. What we are copying from

### 1.1 This project (Rankoya): structure and code

| File | Role |
| --- | --- |
| `src/content/legal.ts` | All three documents as typed data (`LegalDocument` → `sections` → `p` / `ul` / `h3` blocks). It reads `name`, `company`, `address`, `jurisdiction`, `appUrl`, `marketingUrl` and `supportEmail` from `PRODUCT`. |
| `src/components/legal/legal-page.tsx` | Shared page shell: sticky header with logo and links between documents, overline, title, "Last updated" date, and automatic linking of URLs and emails. The English text is binding (`lang="en"`). |
| `src/app/(legal)/{privacy-policy,terms-of-service,refund-policy}/page.tsx` | Three 10-line route files. Each sets `metadata` from the document and renders `<LegalPage>`. |
| `src/config/product.ts` | Name, company, address, jurisdiction, URLs and support email. |
| next-intl `legal` namespace | Header text only: `home`, `nav`, `links.terms/privacy/refunds/signIn`, `backHome`, `overline`, `lastUpdated`. |

Rankoya privacy sections: intro · 1 Information We Collect (log data, personal info, user content, connected-source data, product data, agent conversations, cookies) · 2 Legal Bases (UK GDPR/GDPR) · 3 How We Use Information · 4 AI Processing · 5 Google API Services · 6 Telegram and Autopilot · 7 Workspaces, Agencies and White Label · 8 Disclosure to Third Parties · 9 Website Access Credentials · 10 International Transfers · 11 Data Security · 12 Your Rights · 13 Retention · 14 Children · 15 Complaints · 16 Changes · 17 Contact.

Rankoya terms sections: intro · Use of Services · Workspaces and Team Members · Acceptable Conduct · Prohibited Usage · Your Content · Content Moderation Policy · Approvals and Autopilot · Invoicing and Payment (Paddle as Merchant of Record) · White Label · Explicit Content Disclaimer · Warranty Disclaimer · Limitation of Liability · Indemnity · API Usage · Changes to Service and Pricing · Termination · Notice · Entire Agreement · Choice of Law and Forum · Waiver and Severability · Statute of Limitations · Copyright Infringement · Updates · Third-Party Platform Policies · Contact.

### 1.2 Viktor: product context and approval-driven clauses

Viktor (Zeta AI, Inc., Delaware) is an AI "employee" that works inside **Slack and Microsoft Teams**. It connects to thousands of tools over OAuth, runs tasks and recurring jobs, builds reports, spreadsheets, code and internal web apps, and bills with **credits** ($100 in free credits, paid plans from $50/month). Its legal hub at `viktor.com/legal` is split into: Definitions, General Terms, Acceptable Use Policy, Product Terms, Usage Terms, License Terms, Privacy Policy, DPA, and a Trust Center with the sub-processor list.

Viktor clauses Crewhir needs, because they cover things Rankoya doesn't do:

- **Slack data disclosure** (privacy §2D, §10): reads messages in channels it has joined, including messages not addressed to it, with about 90 days of history on join. It reads DMs with the bot, and private channels and DMs only where a user grants search scopes. It lists every data type: messages, DMs, threads, profiles, channel info, files.
- **Slack AI affirmation, quoted verbatim:** *"We affirm Slack APIs are not used to develop, improve, or train generalized AI/ML models."* It also states *"We do not sell Slack data."*
- **Workspace-shared integrations** (privacy §2B, product terms §4.2): a connected tool acts with the permissions of the account that authorised it, and any authorised member can invoke it.
- **Uninstall vs deletion** (privacy §7C, product terms §4.5): uninstalling stops new collection and deletes OAuth tokens. It does not delete existing data, which follows the retention schedule.
- **AI subprocessors with no training** (privacy §3B/§4B, product terms §3.5): Anthropic, OpenAI and Google, used under terms that bar them from training on customer data. Providers may keep data briefly for abuse monitoring.
- **Autonomous actions** (product terms §3.2 to §3.4): outputs are probabilistic, and the customer stays the operator. "High-risk actions" always need per-action approval. Admins can enable, disable or require approval per action type.
- **Credits** (usage terms §1): no cash value. Monthly allocation rolls over one period. Top-up and promo credits don't expire while the account is active. Credit-consuming features are suspended at zero. Team plans share one pool.
- **Retention numbers** (privacy §6): about 30 days from production after deletion, about 35-day backup rotation, and derived data (indexes, embeddings) deleted with the source.
- **Regulated data ban** (AUP §3): no HIPAA PHI, PCI card data, GLBA data, GDPR Art. 9 special categories, children's data or export-controlled data.
- **Security** (product terms §5): encryption in transit (TLS) and at rest (AES-256), RBAC, MFA, audit logs, breach notification, SOC 2.
- **Shopify section** (privacy §11): only needed if Crewhir offers a Shopify integration. Covers the three mandatory GDPR webhooks.

Viktor clauses we are **not** copying (they don't fit a self-serve Paddle checkout): Order Forms, invoice net-30, ACH/wire payments, KYC suspension, DMCA agent registration, and a separate DPA page (see open question Q6).

---

## 2. Approval requirements the documents must meet

Each row is a reviewer who will open these URLs. The "Must say" column is what the copy has to contain.

| Reviewer | Must say / provide | Where it lands |
| --- | --- | --- |
| **Slack Marketplace** (App Directory review) | A public privacy policy that names the Slack data collected, why, how long it's kept and how to delete it. Slack's AI-app guidelines require the statement that Slack data is not used to train LLMs or generalised AI/ML models, plus a statement that Slack data is not sold or used for ads. Also needs support/contact details and a retention policy. | Privacy §8 "Slack" + §14 Retention; Terms "Connected Platforms" |
| **Microsoft Teams Store / Partner Center** | Privacy and Terms URLs on the publisher's verified domain, loading without sign-in. For AI apps: a disclosure that content is AI-generated, a way for users to report harmful output, and no training on Microsoft 365 data. | Privacy §9 "Microsoft Teams"; Terms "AI Output" + "Reporting" |
| **Google OAuth verification** (sign-in, plus Gmail/Drive/Calendar connectors if offered) | The Limited Use statement verbatim (already in Rankoya §5), each Google data type listed, a link to the privacy policy from the homepage, and a verified domain. Restricted scopes such as Gmail or Drive also trigger a CASA security assessment. | Privacy §10 "Google API Services" |
| **Paddle domain review** (Merchant of Record) | Company legal name on the Terms, a statement that Paddle is the Merchant of Record, a visible Refund Policy with a refund window, public pricing, and a description of the product as software (Rankoya's "fully automated SaaS" line). | Terms "Invoicing and Payment"; Refund Policy (unchanged) |
| **AI model providers** (Anthropic, OpenAI, Google usage policies) | Prohibited uses must flow down to users (already in Rankoya's "Prohibited Usage" with AUP links). | Terms "Prohibited Usage" |
| **Shopify App Store** *(only if a Shopify connector ships)* | Shopify data handling, the three GDPR webhooks, and how merchants revoke access. | Privacy §11 (optional) |
| **GDPR / UK GDPR / US state laws** | Legal bases, rights, transfers, a complaint route, and US state rights (access, delete, correct, opt-out) with a 45-day response and an appeal path. | Privacy §2, §12, §13 |

---

## 3. Privacy Policy: target outline for Crewhir

Keep Rankoya's numbered structure and voice. **R** = carry over from Rankoya with edits. **V** = new, modeled on Viktor.

0. **Intro** (R): `${company}` trading as Crewhir is the controller. Scope covers the marketing site, the web app, the Crewhir Slack app, the Crewhir Teams app and connected tools. Effective date.
1. **Information We Collect**
   - 1.1 Log Data (R)
   - 1.2 Account Information (R): name, email, photo, workspace members and roles, Paddle billing (no card storage).
   - 1.3 **Slack and Teams Workspace Information** (V): workspace/tenant IDs, installer name and email, user IDs, the mapping from Slack/Teams users to Crewhir users.
   - 1.4 **Messages and Files Crewhir Can See** (V): channels the bot was invited to (including messages not addressed to it), the history window on join (*decide: Viktor uses 90 days*), DMs with the bot, files shared with it, and private channels or DMs only under search scopes a user grants.
   - 1.5 **Connected Tools and Credentials** (V, absorbs Rankoya §9): OAuth tokens and API keys for connected tools, encrypted. The workspace-shared model: any authorised member can use a connection with the authorising account's permissions.
   - 1.6 **Tasks, Outputs and Records** (V, absorbs Rankoya "Agent Conversations"): threads, scheduled/recurring tasks, approval decisions, tool calls, generated files, reports and apps.
   - 1.7 Communications with us (V)
   - 1.8 Cookies and Analytics (R): update the list if we add PostHog or ad pixels (Viktor does; Rankoya says it doesn't).
   - 1.9 Sensitive Data (V): we don't knowingly collect it. Points to the Terms' prohibited data list.
2. **Legal Bases** (R)
3. **How We Use Information** (R + V): operate tasks, process AI requests, security and audit, aggregated/de-identified improvement, communications, billing and credits, compliance. **No advertising use of Customer Data.**
4. **AI Processing** (R + V): which providers, what's sent (only what a task needs), no training by providers or by Crewhir, short abuse-monitoring retention by providers. Disclose any internal routing classifiers if we build them (Viktor does).
5. **Autonomy and Approvals** (R §6 rewritten): default approval mode, the high-risk actions that always ask, and a log of who approved what, when, and where (Slack, Teams or web).
6. **Workspaces and Team Members** (R §7, minus White Label unless Crewhir resells)
7. **Disclosure to Third Parties** (R §8 + V): sub-processor table (hosting, database, AI providers, Paddle, email, error monitoring, analytics) with purpose and data type for each. "We do not sell personal information." Business transfers, legal requests, third-party links.
8. **Slack** (V, Slack Marketplace section): scopes and data list, purposes, *"Slack APIs are not used to develop, improve, or train generalized AI/ML models"*, no sale and no ads, revoking through Slack App Management, and that uninstalling doesn't delete existing data (point to §14).
9. **Microsoft Teams** (V, same pattern as §8 for Graph/Teams data): no training on Microsoft 365 data, revoking through Teams admin.
10. **Google API Services** (R §5, kept verbatim): Limited Use statement and the Google data types per connector. Revoking at myaccount.google.com/permissions.
11. **Shopify** (V, optional): only if the connector ships.
12. **International Transfers** (R + V): name where data is stored (*decide: US like Viktor, or UK/EU*). SCCs, UK IDTA, DPF.
13. **Data Security** (R + V): TLS, AES-256 at rest, RBAC, MFA, audit logs, breach notification, and the customer's own Slack/Teams admin responsibilities. Mention SOC 2 only if we hold it.
14. **Retention and Deletion** (R + V): production deletion window (*Rankoya says 7 days in-app and 90 days to erasure; Viktor says about 30 and about 35. Pick one*), backup rotation, derived data deleted with its source, token deletion on uninstall or disconnect, export before deletion.
15. **Your Rights** (R + V): UK/EEA rights (R) plus US state rights with a 45-day response, an appeal process, authorised agents, and workspace-admin routing for workspace-level requests.
16. **Children** (R): *decide the age: Rankoya uses 16, Viktor uses 18. For a B2B agent, 18 is cleaner.*
17. **Complaints** (R)
18. **Changes** (R)
19. **Contact** (R)

## 4. Terms of Service: target outline for Crewhir

Keep Rankoya's flat-heading style in a single document. Fold in the Viktor product and usage clauses rather than splitting into six pages.

- **Intro** (R): parties, definitions of "Services" (site, app, Slack app, Teams app, Generated Content), business use, consumer rights preserved.
- **Use of Services / Accounts** (R)
- **Workspaces and Team Members** (R): roles, responsibility for invitees, and authority to connect third-party accounts.
- **Connected Platforms (Slack, Teams and Tools)** (V, product terms §4): you warrant authority and consents for each connection. The workspace-shared model. Slack/Teams consent screens. Scope of access. Uninstall effects. Third-party terms govern each platform, and we're not liable for their outages or API changes.
- **AI Functionality and Autonomous Actions** (V, product terms §3, replaces Rankoya's "Approvals and Autopilot"): outputs are probabilistic and not professional advice, so review before relying on them. Crewhir may act on connected platforms within the permissions and approval levels you set. **High-risk actions always need per-action approval** (*list them: sending external email, payments, deleting data, changing Crewhir's own permissions…*). You are the operator and responsible for pre-authorised actions, except for our gross negligence or wilful misconduct. Approval changes apply going forward only.
- **AI Output Reporting** (V, Teams requirement): how to report harmful or incorrect output (in-app and `${supportEmail}`).
- **Acceptable Conduct** (R)
- **Prohibited Usage** (R + V AUP §1): keep Rankoya's AI-provider AUP links. Add Viktor's list: malware/DoS/scraping, spam/phishing, impersonation, bypassing limits, building a competing product, sanctioned countries, high-risk uses (death or injury).
- **Prohibited Data** (V AUP §3): no PHI, PCI card data, GLBA data, Art. 9 special categories, children's data or export-controlled data without a written addendum.
- **Your Content** (R): User Content licence, Generated Content assigned to you, Crewhir doesn't train on it. Add that **Customer Data** includes connected-tool data and Slack/Teams messages.
- **Content Moderation Policy** (R, trimmed: drop "sites" wording)
- **Apps and Files Crewhir Builds** (V, *only if Crewhir hosts generated apps*): hosting, you're responsible for who you share them with, and we may take them down if they break these Terms.
- **Credits, Invoicing and Payment** (R + V usage terms §1): Paddle as Merchant of Record (R, keep verbatim for the Paddle review). Then credits: no cash value, monthly allocation, rollover rule, top-up and promo credits, suspension at zero (no surprise overage), shared team pool, upgrades and downgrades (R). Refunds point to the Refund Policy.
- **Feedback** (V General Terms §4)
- **Confidentiality** (V §3, short version): Customer Data is your confidential information.
- **Security** (V product terms §5, short): pointer to the Privacy Policy §13 and breach notification.
- **Explicit Content / AI Disclaimer** (R): reword "website" to "workspace and connected tools". Keep the "not affiliated with Slack, Microsoft, Google, OpenAI, Anthropic…" paragraph. Slack and Microsoft both expect this.
- **Warranty Disclaimer** (R)
- **Limitation of Liability** (R): *decide the cap: Rankoya uses fees from the previous 1 month, Viktor 12 months.* Add Viktor §6.1: not liable for AI subprocessors, connected platforms or business outcomes.
- **Indemnity** (R + V): add actions executed through connected platforms under your approval settings.
- **Suspension** (V §10, short): for non-payment, security risk or legal order.
- **API Usage** (R)
- **Changes to Service and Pricing** (R)
- **Termination** (R)
- **Notice · Entire Agreement · Choice of Law and Forum · Waiver and Severability · Statute of Limitations · Copyright Infringement · Updates · Third-Party Platform Policies · Contact** (R)
  - *Choice of law: keep England and Wales (Rankoya) or switch to Delaware with AAA arbitration and a class waiver (Viktor). See Q2.*

## 5. Refund Policy

**Copy Rankoya's `refundPolicy` word for word.** The `${name}`, `${company}`, `${address}` and `${supportEmail}` substitutions change automatically once `PRODUCT` points at Crewhir. That covers: the 14-day window from initial purchase, no refunds on renewals, cancel anytime, a 7-day window for billing errors, a summary, and the "fully automated SaaS" line Paddle looks for.

Only check: "Changes to your marketing plans or priorities" in the list of non-refundable reasons is Rankoya-specific wording. Leaving it unchanged meets "same content". Swapping it for "Changes to your business plans or priorities" is the only edit I'd suggest. Flagged as Q8.

---

## 6. Implementation steps in the Crewhir project

> **Update:** for v1 the legal pages live on the Crewhir landing site with Crewhir's own design and dependencies (see `docs/crewhir_landing_page_implementation_plan.md` §6.16). Reuse only the `LegalDocument` data shape and the content below. Don't copy Rankoya's `legal-page.tsx`, tokens or next-intl setup.

1. **Read the Next.js docs first.** The repo's `AGENTS.md` warns that this Next.js version differs. Check `node_modules/next/dist/docs/` for route groups and `metadata` before copying the route files.
2. **Copy the files:**
   - `src/content/legal.ts`
   - `src/components/legal/legal-page.tsx`
   - `src/app/(legal)/privacy-policy/page.tsx`, `terms-of-service/page.tsx`, `refund-policy/page.tsx`
   - the `legal` namespace from the next-intl messages (or replace `getTranslations`/`getFormatter` with plain strings and `Intl.DateTimeFormat` if Crewhir doesn't use next-intl)
   - make sure `Logo`, `Button` and the design tokens (`text-display`, `text-overline`, `bg-surface`, …) exist, or map them to Crewhir's.
3. **Update `src/config/product.ts`:** `name: "Crewhir"`, plus company, address, jurisdiction, `appUrl`, `marketingUrl`, `supportEmail` (answers to Q1 to Q3).
4. **Rewrite `privacyPolicy` and `termsOfService`** following §3 and §4. Rewrite the header comment in `legal.ts` to say the documents follow Rankoya's structure and Viktor's (viktor.com/legal) product clauses.
5. **Leave `refundPolicy` unchanged** (§5). Set its `lastUpdated` to the Crewhir launch date.
6. **Set `EFFECTIVE` / `EFFECTIVE_LONG`** to the launch date.
7. **Make them public and linked:** no auth on `/(legal)`, footer links on the marketing site, links in the sign-up flow ("By continuing you agree to…"), and the same URLs entered in Slack app config, Teams/Partner Center, the Google OAuth consent screen and Paddle.
8. **Verify:** `next build`; open all three pages signed out; test at phone width; check linkify on every email and URL; check that each marketplace's required sentence appears verbatim (checklist below).

### Approval checklist (tick before submitting each listing)

- [ ] Privacy page lists every Slack scope's data and matches the scopes actually requested in the Slack manifest
- [ ] Slack no-training affirmation present verbatim
- [ ] "We do not sell Slack data" and no-ads statement present
- [ ] Uninstall / revoke / delete steps for Slack, Teams and Google all present
- [ ] Teams: AI-generated-content disclosure plus a way to report output, in the Terms
- [ ] Google Limited Use paragraph verbatim, Google data types listed per connector, privacy link on the homepage
- [ ] Paddle named as Merchant of Record; company legal name and address on the Terms; Refund Policy linked from checkout and footer
- [ ] Retention numbers in the Privacy Policy match what the backend actually does
- [ ] Sub-processor list matches the services actually in use
- [ ] All three pages load on the production domain without signing in

---

## 7. Open questions (need answers before drafting copy)

| # | Question | Default if no answer |
| --- | --- | --- |
| Q1 | Legal entity and registered address for Crewhir. Is it still NETSACH TECH LTD? | NETSACH TECH LTD; confirm the address |
| Q2 | Governing law: England and Wales (Rankoya) or Delaware with arbitration (Viktor)? | England and Wales |
| Q3 | Domains and support email (e.g. `crewhir.com`, `app.crewhir.com`, `support@…`) | (none; needed before submitting) |
| Q4 | Which surfaces ship at launch: Slack, Teams, web app, Telegram? | Slack + web app; Teams section drafted but hidden |
| Q5 | Which connectors at launch, especially Google restricted scopes (Gmail, Drive) and Shopify? | Google sign-in only; no Shopify section |
| Q6 | Separate DPA page for B2B customers (Viktor has one)? | No; add a "DPA on request" line in Privacy §7 |
| Q7 | Credits model: free credits amount, rollover rule, top-ups? | Viktor's model (one-period rollover; top-ups never expire while active) |
| Q8 | Refund wording: keep "marketing plans" exactly, or change to "business plans"? | Keep exactly (same content) |
| Q9 | Where data is stored, and the retention windows | US hosting; 30-day production deletion, 35-day backups |
| Q10 | Minimum age: 16 or 18? | 18 |
| Q11 | Liability cap: fees from the previous 1 month or 12 months? | 12 months |
| Q12 | Does Crewhir host apps it builds for users? | Yes, include the "Apps and Files" clause |

---

### Sources

- This repo: `src/content/legal.ts`, `src/components/legal/legal-page.tsx`, `src/app/(legal)/*`, `src/config/product.ts`
- https://viktor.com/ (product, pricing, security claims)
- https://viktor.com/legal (document index)
- https://viktor.com/legal/privacy (last updated 31 July 2026)
- https://viktor.com/legal/general-terms (last updated 31 July 2026)
- https://viktor.com/legal/product-terms
- https://viktor.com/legal/usage-terms
- https://viktor.com/legal/acceptable-use-policy
