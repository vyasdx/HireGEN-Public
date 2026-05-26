import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BuilderForm } from "@/components/builder-form";

export default function BuilderPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pt-12 pb-24 max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="chip mb-3 mx-auto">Step 1 of 1</div>
          <h1 className="display text-4xl md:text-5xl">
            Build your <span className="gradient-text">proof profile.</span>
          </h1>
          <p className="mt-4 text-ink-700">
            Paste your evidence. We&apos;ll turn it into a structured skill graph in seconds.
          </p>
        </div>

        <BuilderForm />
      </main>
      <Footer />
    </>
  );
}
