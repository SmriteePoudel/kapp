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

  
  achievements?: { title: string; year: number }[];
  education?: { title: string; year: number }[];
  career?: { title: string; company: string; year?: number }[];
}





export interface FamilyMember {
  id: number; 
  slug: string;
  name:  string;
  image: string;
  relationship?: string;
  
  personality?: string[]; 
  achievements?: { title: string; year: number }[];
  education?: { title: string; year: number }[];
  career?: { title: string; company: string; year?: number }[];
}
