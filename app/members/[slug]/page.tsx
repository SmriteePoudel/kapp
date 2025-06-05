import { notFound } from "next/navigation";
import { FullProfilePageClient } from "@/components/profile/FullProfilePage";
import { familyMembers } from "@/data/family";

export async function generateStaticParams() {
  return familyMembers.map((member) => ({
    slug: member.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MemberPage({ params }: Props) {
  const resolvedParams = await params;
  const member =
    familyMembers.find((m) => m.slug === resolvedParams.slug) || null;
  if (!member) {
    notFound();
  }
  return <FullProfilePageClient member={member} />;
}
