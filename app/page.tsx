import { site } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { Testimonial } from "@/components/Testimonial";
import { AboutTeaser } from "@/components/AboutTeaser";
import { DesignExperiments } from "@/components/DesignExperiments";
import { PhotographySection } from "@/components/PhotographySection";

export default function Home() {
  const profileData = site;
  const publishedProjects = site.projects;
  const testimonialData = site.testimonials;
  const experimentData = site.experiments;
  const buckets = site.pegboard.buckets.map(bucket => ({
    ...bucket,
    items: site.pegboard.items.filter(item => item.bucketId === bucket.id)
  }));
  const standaloneItems = site.pegboard.items.filter(item => !item.bucketId);

  return (
    <main className="min-h-screen bg-bg selection:bg-accent-soft selection:text-accent-ink">
      <Hero
        part2={profileData.headline.part2}
        subCopy={profileData.tagline}
        profilePhotoUrl={profileData.avatarUrl}
        statusLabel={profileData.status.label}
      />

      <WorkSection
        experience={profileData.experience}
      />

      <DesignExperiments experiments={experimentData} />



      <PhotographySection />

      <AboutTeaser
        aboutCopy={profileData.about.body.join(" ")}
        buckets={buckets}
        standaloneItems={standaloneItems}
      />

      <Testimonial
        testimonials={testimonialData}
      />
    </main>
  );
}
