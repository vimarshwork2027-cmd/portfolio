import { DesignExperiments } from "@/components/DesignExperiments";
import { site } from "@/lib/site";

export const metadata = {
  title: "Design Experiments — Vimarsh Tiwari",
  description: "A collection of conceptual product designs, micro-interactions, and spatial interfaces.",
};

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-bg antialiased font-sans">
      {/* Spacer for fixed nav */}
      <div className="h-32"></div> 
      <main className="mb-24">
         <DesignExperiments experiments={site.experiments} hideHeader={true} />
      </main>
    </div>
  );
}
