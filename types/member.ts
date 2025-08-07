export interface Member {
  id: number;
  name: string;
  slug: string;
  role: string;
  bio: string;
  fullBio: string;
  image: string;
  birthdate: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  education:{title:string; year?: number| string}[];
 career: string[];
  hobbies: string[];
  achievements: {title:string; year?: number}[];
  favoriteQuote: string;
  personality: {title:string; year?: number}[];
  skills: string[];
  languages: string[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export type Achievement = {
  title: string;
  year: number;
};

export type Career = {
  title: string;
  company: string;
  year: number;

};

export type Education = {
  title: string;
  year: number;
};

