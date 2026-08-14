import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/landing/hero'
import {
  TrustBar,
  WorkflowSection,
  FeatureGrid,
  CtaSection,
} from '@/components/landing/sections'

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <WorkflowSection />
        <FeatureGrid />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
