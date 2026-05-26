import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GeneratedProfile } from "@/components/generated-profile";
import { ProfileReport } from "@/components/profile-report";
import { demoCandidate } from "@/lib/demo-data";
import { skillGraphSchema } from "@/lib/skill-graph-schema";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "generated") {
    return (
      <>
        <Nav />
        <GeneratedProfile />
        <Footer />
      </>
    );
  }

  if (id !== "demo") notFound();
  const c = skillGraphSchema.parse(demoCandidate);

  return (
    <>
      <Nav />
      <ProfileReport candidate={c} demo />
      <Footer />
    </>
  );
}
