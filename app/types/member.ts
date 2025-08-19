// app/types/member.ts

export interface Education {
  title: string;
  startDate?: Date;
  endDate?: Date;
  endYear?: number;
}

export interface Achievement {
  title: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CareerItem {
  title: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  year: number;
}

export interface Member {
  id?: number;
  slug: string;
  name: string;
  image: string;
  role?: string;
  relationship?: string;
  fullBio?: string;
  email?: string[];          
  phone?: string[];
  address?: string[];
  birthdate?: string;
  favoriteQuote?: string;
  skills?: string[];
  languages?: string[];
  hobbies?: string[];
  personality?: string[] | { title: string }[];

  achievements?: Achievement[];
  education?: Education[];
  career?: string[] | CareerItem[];

  createdAt?: string;
  updatedAt?: string;
}

export interface FamilyMember extends Member {
  id: number;
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
  email?: string[];
  phone?: string[];
  address?: string[];
  skills?: string[];
  languages?: string[];
  hobbies?: string[];
  personality?: string[] | { title: string }[];
  achievements?: Achievement[];
  education?: Education[];
  career?: string[] | CareerItem[];
}
