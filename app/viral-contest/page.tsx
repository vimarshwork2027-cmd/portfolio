import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCaseStudy } from "@/lib/case-studies";
import { CaseStudyPage } from "@/components/CaseStudyPage";

const SLUG = "viral-contest";

export function generateMetadata(): Metadata {
  const cs = getCaseStudy(SLUG);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.tagline,
    openGraph: {
      title: cs.title,
      description: cs.tagline,
    },
  };
}

export default function Page() {
  const cs = getCaseStudy(SLUG);
  if (!cs) notFound();
  return <CaseStudyPage caseStudy={cs} />;
}
