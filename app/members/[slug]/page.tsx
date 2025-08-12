import { notFound } from "next/navigation";
import { familyMembers } from "@/data/family";
import FullProfilePageClient from "@/components/profile/FullProfilePage";
import { Member } from "@/types/member";

interface PageProps {
  params: { slug: string };
}

function parseYear(year: any, fallback?: number): number | undefined {
  
  if (!year) return fallback;
  const parsed = Number(year);
  return isNaN(parsed) ? fallback : parsed;
}

const createMemberData = (raw: any): Member => ({
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

  education:
    raw.education && raw.education.length > 0
      ? raw.education.map((item: any) => ({
          title: typeof item === "string" ? item : item.title || "",
          year: typeof item === "object" && item.year ? parseYear(item.year) : undefined
        }))
      : [],

  achievements:
    raw.achievements && raw.achievements.length > 0
      ? raw.achievements.map((item: any) => ({
          title: typeof item === "string" ? item : item.title || "",
          year: typeof item === "object" && item.year ? parseYear(item.year) : undefined
        }))
      : [],

  career:
    raw.career && raw.career.length > 0
      ? raw.career.map((item: any) =>
          typeof item === "object"
            ? `${item.title}${item.company ? ` at ${item.company}` : ''}${item.year ? ` (${item.year})` : ''}`
            : item
        )
      : [],

  skills:
    raw.skills && raw.skills.length > 0
      ? raw.skills.map((s: any) =>
          typeof s === "string" ? s : s?.title || ""
        )
      : [],

  languages:
    raw.languages && raw.languages.length > 0
      ? raw.languages.map((l: any) =>
          typeof l === "string" ? l : l?.title || ""
        )
      : [],

  hobbies:
    raw.hobbies && raw.hobbies.length > 0
      ? raw.hobbies.map((h: any) =>
          typeof h === "string" ? h : h?.title || ""
        )
      : [],

  personality:
    raw.personality && raw.personality.length > 0
      ? raw.personality.map((p: any) =>
          typeof p === "string" ? p : p?.title || ""
        )
      : [],
});

async function updateProfile(updatedField: Partial<Member>) {

  console.log("Updating profile with:", updatedField);
  
  return new Promise((resolve) => setTimeout(resolve, 500));
}

export default async function MemberPage({ params }: PageProps) {
  const { slug } = await params;

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
