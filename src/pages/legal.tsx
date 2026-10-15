import { LegalDocument } from '@/components/legal/legal-document'
import { legalDocuments } from '@/content/legal'
import { usePathname } from '@/lib/router'
import NotFound from './not-found'

export default function Legal() {
  const path = usePathname()
  const doc = legalDocuments.find((d) => `/${d.slug}` === path)
  return doc ? <LegalDocument doc={doc} /> : <NotFound />
}
