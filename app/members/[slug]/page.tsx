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

const createMemberData = (raw: Partial<Member>): Member => ({
  id: raw.id !== undefined && raw.id !== null ? String(raw.id) : "",
  slug: raw.slug || "",
  name: raw.name || "",
  image: raw.image || "",
  role: raw.role || "",
  relationship: raw.relationship || "",
  fullBio: raw.fullBio || "",
  email: raw.email || "",
  phone: raw.phone || "",
  address: raw.address || "",

  education: Array.isArray(raw.education)
    ? raw.education.map((e: any) => ({
        title: typeof e?.title === "string" ? e.title : "SEE",
        year: parseYear(e?.year, 2025),
      }))
    : [],

  achievements: Array.isArray(raw.achievements)
    ? raw.achievements.map((a: any) => ({
        title: typeof a?.title === "string" ? a.title : "Most entertaining person",
        year: parseYear(a?.year, 2002),
      }))
    : [],

  career: Array.isArray(raw.career)
    ? raw.career.map((c: any) => ({
        title: typeof c?.title === "string" ? c.title : "",
        company: typeof c?.company === "string" ? c.company : "",
        year: c?.year ? parseYear(c.year, 0) : 0,
      }))
    : [],

  skills: Array.isArray(raw.skills)
    ? raw.skills.map((s: any) =>
        typeof s === "string" ? s : s?.title || ""
      )
    : [],

  languages: Array.isArray(raw.languages)
    ? raw.languages.map((l: any) =>
        typeof l === "string" ? l : l?.title || ""
      )
    : [],

  hobbies: Array.isArray(raw.hobbies)
    ? raw.hobbies.map((h: any) =>
        typeof h === "string" ? h : h?.title || ""
      )
    : [],

  personality: Array.isArray(raw.personality)
    ? raw.personality.map((p: any) =>
        typeof p === "string" ? p : p?.title || ""
      )
    : [],
});

export default async function MemberPage(props: PageProps) {
  // Await props to access params asynchronously
  const { params } = await props;
  const { slug } = params;

  const fMember = familyMembers.find((m) => m.slug === slug);

  if (!fMember) {
    notFound();
    return null;
  }

  const member = createMemberData({
    ...fMember,
    id: fMember.id?.toString() ?? "",
  });

  return <FullProfilePageClient member={member} />;
}
