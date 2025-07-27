// app/members/[slug]/page.tsx

import { notFound } from "next/navigation";
import { familyMembers } from "@/data/family";
import { FullProfilePageClient } from "@/components/profile/FullProfilePage";

interface PageProps {
  params: { slug: string };
}

interface Member {
  id: string;
  slug: string;
  name: string;
  image: string;
  role: string;
  relationship: string;
  fullBio: string;
  email: string;
  phone: string;
  address: string;

  education: { degree: string; year: string }[];
  achievements: { title: string; year: string }[];

  career: string[];
  skills: string[];
  languages: string[];
  hobbies: string[];
  personality: string[];
}


const createMemberData = (raw: Partial<Member>): Member => ({
  id: typeof raw.id === "string" ? raw.id : "",
  slug: raw.slug ?? "",
  name: raw.name ?? "",
  image: raw.image ?? "",
  role: raw.role ?? "",
  relationship: raw.relationship ?? "",
  fullBio: raw.fullBio ?? "",
  email: raw.email ?? "",
  phone: raw.phone ?? "",
  address: raw.address ?? "",

  education: raw.education
    ? raw.education.map((item) =>
        typeof item === "string"
          ? { degree: item, year: "" }
          : {
              degree: item.degree ?? "",
              year: item.year ?? "",
            }
      )
    : [],

  achievements: raw.achievements
    ? raw.achievements.map((item) =>
        typeof item === "string"
          ? { title: item, year: "" }
          : {
              title: item.title ?? "",
              year: item.year ?? "",
            }
      )
    : [],

  career: raw.career ?? [],
  skills: raw.skills ?? [],
  languages: raw.languages ?? [],
  hobbies: raw.hobbies ?? [],
  personality: raw.personality ?? [],
});

export default async function MemberPage({ params }: PageProps) {
  const slug = await params.slug;

  console.log(params)
  
  const fMember = familyMembers.find((m) => m.slug == params.slug);

  if (!fMember) {
    notFound();
    return null;
  }

 
  return <FullProfilePageClient member={createMemberData(fMember)} />;
}
