export interface Member {
  id: number;
  name: string;
  slug: string;
  role: string;
  bio: string;
  fullBio: string;
  photo: string;
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
  personalityTraits: string[];
  skills: string[];
  languages: string[];
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
  };
} 