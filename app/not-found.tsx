import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content py-32 min-h-[70vh] flex items-center">
      <div className="max-w-xl">
        <div className="label-mono mb-4">404</div>
        <h1 className="font-serif text-display-lg tracking-tight mb-6">
          This page doesn&rsquo;t exist <span className="italic text-accent">yet.</span>
        </h1>
        <p className="text-ink-dim text-lg mb-10 leading-relaxed">
          You may have followed a broken link, or the page has moved. If it was
          a case study — I may still be writing it.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
