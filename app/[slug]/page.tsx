import { site } from "@/lib/site";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/lib/case-studies";

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const allProjects = site.experience.flatMap(exp => exp.projects);
  const projectData = allProjects.find(p => p.slug === slug);

  if (!projectData) {
    notFound();
  }

  // Get detailed narrative if available
  const detailedData = getCaseStudy(slug);

  // Map site data to component expectations, merging with detailed narrative
  const caseStudy = {
    ...projectData,
    ...detailedData,
    description: detailedData?.hero || (projectData as any).heroParagraph || projectData.description, 
    failures: detailedData?.miss || (projectData as any).miss,
    // Ensure company logo is available (from parent experience)
    logo: site.experience.find(exp => exp.projects.some(p => p.slug === slug))?.logo
  };

  return (
    <div className="min-h-screen bg-bg">
      <CaseStudyPage caseStudy={caseStudy} />
    </div>
  );
}
