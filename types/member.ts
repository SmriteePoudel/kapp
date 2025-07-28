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
  education: string[];
  career: string[];
  hobbies: string[];
  achievements: string[];
  favoriteQuote: string;
  personality: string[];
  skills: string[];
  languages: string[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
} 