// types/member.ts

export interface Member {
  id: string;
  slug: string;
  name: string;
  image: string;
  role?: string;
  relationship?: string;
  fullBio?: string;
  email?: string;
  phone?: string;
  address?: string;

  skills?: string[];
  languages?: string[];
  hobbies?: string[];
  personality?: string[];

  education?: { title: string; year?: string }[];
  career?: { title: string; year?: string }[];
  achievements?: { title: string; year?: string }[];
}


export interface FamilyMember {
  id: number;
  slug: string;
  name: string;
  image: string;
  relationship?: string;
  personality?: string[];
}


export interface FamilyMember {
  id: number; 
  slug: string;
  
  personality?: string[]; 
}