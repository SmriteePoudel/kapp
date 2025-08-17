// types/member.ts


export interface Member {
  id?: number;
  slug: string;
  name: string;
  image: string;
  role?: string;
  relationship?: string;
  fullBio?: string;
  email?: string;
  phone?: string;
  address?: string;
  birthdate?: string;
  favoriteQuote?: string;
  skills?: string[];
  languages?: string[];
  hobbies?: string[];
  personality?: string[] | { title: string }[];
  achievements?: { title: string; year?: number }[];
  education?: { title: string; startYear?: number; endYear?: number }[];
  career?: string[] | { title: string; company?: string; year?: number }[];
  createdAt?: string;
  updatedAt?: string;
}


export interface FamilyMember {
  id: number;
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
  personality?: string[] | { title: string }[];
  
  
  achievements?: { title: string; year?: number }[];
  education?: { title: string; startYear?: number; endYear?: number }[];
  career?: string[] | { title: string; company?: string; year?: number }[];
}


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}


export interface MemberUpdate {
  slug: string;
  name?: string;
  role?: string;
  relationship?: string;
  fullBio?: string;
  email?: string;
  phone?: string;
  address?: string;
  skills?: string[];
  languages?: string[];
  hobbies?: string[];
  personality?: string[] | { title: string }[];
  achievements?: { title: string; year?: number }[];
  education?: { title: string; startYear?: number; endYear?: number }[];
  career?: string[] | { title: string; company?: string; year?: number }[];
}