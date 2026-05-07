import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCaseStudy } from "@/lib/case-studies";

const SLUG = "things-to-do";

export const metadata: Metadata = {
  title: "Things to Do — Coming Soon",
  description: "Full case study launching February 2026.",
};

export default function Page() {
  const cs = getCaseStudy(SLUG);
  if (!cs) notFound();

  return (
    <article className="container-content py-24 min-h-[70vh] flex items-center">
      <div className="max-w-2xl">
        <Link
          href="/"
          className="label-mono inline-flex items-center gap-2 mb-12 hover:text-ink transition-colors"
        >
          ← All work
        </Link>

        <div className="label-mono text-accent-warm mb-4">
          Coming February 2026
        </div>

        <h1 className="font-serif text-display-lg tracking-tight mb-6">
          {cs.title}
        </h1>

        <p className="font-serif text-2xl italic font-light text-ink-dim mb-10 leading-tight">
          {cs.tagline}
        </p>

        <p className="text-lg leading-relaxed text-ink-dim mb-12">
          {cs.hero}
        </p>

        <div className="bg-bg-2 border border-rule rounded-2xl p-8 mb-12">
          <div className="label-mono mb-3">Status</div>
          <p className="leading-relaxed text-ink-dim">
            The Things to Do vertical is launching publicly in February 2026.
            I&rsquo;ll publish the full case study after rollout — covering the
            information architecture, content taxonomy, and early retention
            data. Check back, or follow me on{" "}
            <a
              href="https://www.linkedin.com/in/vimarsh-tiwari/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-ink transition-colors"
            >
              LinkedIn
            </a>{" "}
            for the launch.
          </p>
        </div>

        <Link href="/#work" className="btn-ghost">
          See published case studies
        </Link>
      </div>
    </article>
  );
}
