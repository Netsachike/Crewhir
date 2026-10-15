import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { AskAi, Faq, FinalCta, PricingTeaser, Testimonials } from '@/components/sections/closing'
import { Hero, WorksWith } from '@/components/sections/hero'
import { Control, Security, UseCases } from '@/components/sections/teams'
import { Comparison, HowItWorks, Pillars } from '@/components/sections/why'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WorksWith />
        <Comparison />
        <Pillars />
        <HowItWorks />
        <UseCases />
        <Control />
        <Security />
        <Testimonials />
        <AskAi />
        <PricingTeaser />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
