import { notFound } from "next/navigation";
import { familyMembers } from "@/data/family";
import FullProfilePageClient from "@/components/profile/FullProfilePage";
import { Member } from "@/types/member";

interface PageProps {
  params: { slug: string };
}

const parseYear = (value: any, fallback: number): number => {
  return typeof value === "number" ? value : Number(value) || fallback;
};

const createMemberData = (
  raw: any
): Member => ({
  id: raw.id !== undefined && raw.id !== null ? Number(raw.id) : 0,
  slug: raw.slug || "",
  name: raw.name || "",
  image: raw.image || "",
  role: raw.role || "",
  relationship: raw.relationship || "",
  bio: raw.bio || "",
  fullBio: raw.fullBio || "",
  birthdate: raw.birthdate || "",
  favoriteQuote: raw.favoriteQuote || "",
  email: raw.email || "",
  phone: raw.phone || "",
  address: raw.address || "",

  education: raw.education && raw.education.map((item: any) =>
    typeof item === "object"
      ? `${item.title} (${parseYear(item.year, 0)})`
      : item
  ) || [],
  achievements: raw.achievements && raw.achievements.map((item: any) =>
    typeof item === "object"
      ? `${item.title} (${parseYear(item.year, 0)})`
      : item
  ) || [],

  career: raw.career && raw.career.map((item: any) =>
    typeof item === "object"
      ? `${item.title} at ${item.company} (${parseYear(item.year, 0)})`
      : item
  ) || [],

  skills: raw.skills && raw.skills.map((s: any) => (typeof s === "string" ? s : s?.title || "")) || [],

  languages: raw.languages && raw.languages.map((l: any) => (typeof l === "string" ? l : l?.title || "")) || [],

  hobbies: raw.hobbies && raw.hobbies.map((h: any) => (typeof h === "string" ? h : h?.title || "")) || [],

  personality: raw.personality && raw.personality.map((p: any) => (typeof p === "string" ? p : p?.title || "")) || [],
});

export default async function MemberPage({ params }: PageProps) {
  const { slug } = params;

  const fMember = familyMembers.find((m) => m.slug === slug);
  if (!fMember) return notFound();

  const member = createMemberData(fMember);

  if (!member.id) {
    member.id = familyMembers.length + 1;
  }

  if (fMember.education && member.education.length === 0) {
    member.education = [{ title: "SEE", year: 2025 }];
  }

  if (fMember.hobbies && member.hobbies.length === 0) {
    member.hobbies = ["Reading", "Traveling"];
  }

  if (!member.name || !member.slug) return notFound();


  return <FullProfilePageClient member={member} />;
}


