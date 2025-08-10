import { notFound } from "next/navigation";
import { familyMembers } from "@/data/family";
import FullProfilePageClient from "@/components/profile/FullProfilePage";
import { Member } from "@/types/member";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Member | { error: string }>
) {
  const { slug } = req.query;
  if (typeof slug !== "string") {
    return res.status(400).json({ error: "Invalid slug" });
  }
  if (typeof slug !== "string"){
    return res.status(400).json({ error: "Invalid slug" });
  }
  if (req.method === "PUT"){
    const updateData = req.body;
    const index = familyMembers.findIndex((m) => m.slug === slug);
    if (index === -1){
      return res.status(404).json({ error: "Member not found" });
    }
    familyMembers[index] = {
      ...familyMembers[index],
      ...updateData,
      slug,

  };
  return res.status(200).json(familyMembers[index]);
}
else {
  res.setHeaders({ "Allow": "PUT" });
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

interface PageProps {
  params: { slug: string };
}

const parseYear = (value: any, fallback: number): number => {
  return typeof value === "number" ? value : Number(value) || fallback;
};

const createMemberData = (
  raw: Partial<{ id: string } & Omit<Member, "id">>
): Member => ({
  id: raw.id !== undefined && raw.id !== null ? Number(raw.id) : "0",
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
    ? raw.career.map((item: any) =>
        typeof item === "object"
          ? `${item.title} at ${item.company} (${parseYear(item.year, 0)})`
          : item
      )
    : [],

  skills: Array.isArray(raw.skills)
    ? raw.skills.map((s: any) => (typeof s === "string" ? s : s?.title || ""))
    : [],

  languages: Array.isArray(raw.languages)
    ? raw.languages.map((l: any) => (typeof l === "string" ? l : l?.title || ""))
    : [],

  hobbies: Array.isArray(raw.hobbies)
    ? raw.hobbies.map((h: any) => (typeof h === "string" ? h : h?.title || ""))
    : [],

  personality: Array.isArray(raw.personality)
    ? raw.personality.map((p: any) => (typeof p === "string" ? p : p?.title || ""))
    : [],
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


