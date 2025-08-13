// ... other interfaces ...

import { Member } from "@/app/types/member";

export interface FamilyMember {
  id: number;
  name: string;
  role: string;
  parentIds: number[];
  spouseId: number | null;
  birthDate: string;
  deathDate: string | null;
  image: string;
  bio: string;
  slug: string;
  generation: number;
  
  fullBio: string;
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
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface FeaturedStory {
  id: number;
  title: string;
  excerpt: string;
  memberId: number;
  slug: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export interface FamilyPhoto {
  id: number;
  event: string;
  image: string;
  date: string;
  memberIds: number[];
}

// ... other data ...

export const familyMembers: FamilyMember[] = [
  // Generation 1 (Grandparents)
  {
    id: 1,
    name: "Ram Bahadur Khanal",
    role: "Founding Patriarch",
    parentIds: [],
    spouseId: 2,
    birthDate: "1940-01-15",
    deathDate: "2020-12-10",
    image: "/images/oldman3.png",
    bio: "Founding patriarch of the Khanal family, dedicated farmer and community leader.",
    slug: "ram-bahadur-khanal",
    generation: 1,
    fullBio: "Founding patriarch of the Khanal family, dedicated farmer and community leader. He worked tirelessly to build a strong foundation for future generations.",
    birthdate: "1940-01-15",
    relationship: "Founding Patriarch",
    email: "ramkhanal121@gmail.com",
    phone: "9878188000",
    address: "Mangalbare, Ilam, Nepal",
    education: ["Traditional Education"],
    career: ["Farmer", "Community Leader"],
    hobbies: ["Farming", "Community Service"],
    achievements: ["Established Family Legacy", "Community Leadership"],
    favoriteQuote: "Education is the key to success",
    personalityTraits: ["Dedicated", "Hardworking", "Visionary"],
    skills: ["Farming", "Leadership"],
    languages: ["Nepali", "Hindi"],
    socialLinks: {
      facebook: "ram.khanal.family",
      instagram: "@ram.khanal",
      twitter: "@ramkhanal"
    }
  },
  {
    id: 2,
    name: "Sita Devi Khanal",
    role: "Matriarch",
    parentIds: [],
    spouseId: 1,
    birthDate: "1945-03-20",
    deathDate: null,
    image: "/images/oldwoman3.webp",
    bio: "Beloved matriarch, devoted mother and grandmother who kept the family united.",
    slug: "sita-devi-khanal",
    generation: 1,
    fullBio: "Sita Devi Khanal has been the heart and soul of the Khanal family for over five decades. Her wisdom, compassion, and unwavering dedication to family values have shaped generations. She is known for her exceptional cooking skills and her ability to bring the family together during festivals and celebrations.",
    birthdate: "1945-03-20",
    relationship: "Matriarch",
    email: "sita.khanal@family.com",
    phone: "+977-9841234567",
    address: "Kathmandu, Nepal",
    education: ["Traditional Education", "Home Economics"],
    career: ["Homemaker", "Community Leader"],
    hobbies: ["Cooking", "Gardening", "Storytelling"],
    achievements: ["Family Unity Award", "Community Service Recognition"],
    favoriteQuote: "Family is not an important thing, it's everything",
    personalityTraits: ["Compassionate", "Wise", "Nurturing"],
    skills: ["Cooking", "Conflict Resolution", "Traditional Medicine"],
    languages: ["Nepali", "Hindi", "Newari"],
    socialLinks: {
      facebook: "sita.khanal.family",
      instagram: "@sita.khanal",
      twitter: "@sitakhanal"
    }
  },
  // Generation 2 (Parents)
  {
    id: 3,
    name: "Prakash Khanal",
    role: "Businessman",
    parentIds: [1, 2],
    spouseId: 4,
    birthDate: "1970-05-12",
    deathDate: null,
    image: "/images/man5.webp",
    bio: "Eldest son, successful businessman and family coordinator.",
    slug: "prakash-khanal",
    generation: 2,
    fullBio: "Prakash Khanal has built a successful business empire while maintaining strong family values. He is known for his innovative business strategies and his commitment to family traditions. As the eldest son, he takes great pride in coordinating family events and maintaining family unity.",
    birthdate: "1970-05-12",
    relationship: "Businessman",
    email: "prakash.khanal@business.com",
    phone: "+977-9841234568",
    address: "Kathmandu, Nepal",
    education: ["MBA", "Business Administration"],
    career: ["Entrepreneur", "Business Consultant"],
    hobbies: ["Golf", "Reading", "Family Time"],
    achievements: ["Business Excellence Award", "Community Development"],
    favoriteQuote: "Success is not final, failure is not fatal",
    personalityTraits: ["Ambitious", "Organized", "Family-Oriented"],
    skills: ["Business Management", "Leadership", "Strategic Planning"],
    languages: ["Nepali", "English", "Hindi"],
    socialLinks: {
      facebook: "prakash.khanal.business",
      instagram: "@prakash.khanal",
      twitter: "@prakashkhanal",
      linkedin: "prakash-khanal"
    }
  },
  {
    id: 4,
    name: "Kamala Khanal",
    role: "Teacher",
    parentIds: [],
    spouseId: 3,
    birthDate: "1975-08-18",
    deathDate: null,
    image: "/images/oldwoman4.webp",
    bio: "Dedicated teacher and loving mother of three children.",
    slug: "kamala-khanal",
    generation: 2,
    fullBio: "Kamala Khanal has dedicated her life to education and family. As a respected teacher, she has influenced countless young minds while raising her own children with strong values. Her passion for learning and teaching has made her a role model in both her professional and personal life.",
    birthdate: "1975-08-18",
    relationship: "Teacher",
    email: "kamala.khanal@school.edu",
    phone: "+977-9841234569",
    address: "Kathmandu, Nepal",
    education: ["M.Ed", "Education Leadership"],
    career: ["School Teacher", "Education Consultant"],
    hobbies: ["Reading", "Painting", "Gardening"],
    achievements: ["Teacher of the Year", "Education Innovation Award"],
    favoriteQuote: "Education is the most powerful weapon",
    personalityTraits: ["Patient", "Creative", "Dedicated"],
    skills: ["Teaching", "Curriculum Development", "Child Psychology"],
    languages: ["Nepali", "English", "Sanskrit"],
    socialLinks: {
      facebook: "kamala.khanal.education",
      instagram: "@kamala.khanal",
      twitter: "@kamalakhanal",
      linkedin: "kamala-khanal"
    }
  },
  {
    id: 5,
    name: "Suresh Khanal",
    role: "Engineer",
    parentIds: [1, 2],
    spouseId: 6,
    birthDate: "1972-11-25",
    deathDate: null,
    image: "/images/oldman5.webp",
    bio: "Engineer working abroad, maintains strong family connections.",
    slug: "suresh-khanal",
    generation: 2,
    fullBio: "Suresh Khanal is a successful engineer who has worked on major international projects. Despite living abroad, he maintains strong connections with his family and regularly visits Nepal. His technical expertise and global perspective have been valuable assets to both his career and family.",
    birthdate: "1972-11-25",
    relationship: "Engineer",
    email: "suresh.khanal@tech.com",
    phone: "+1-234-567-8901",
    address: "New York, USA",
    education: ["MSc in Engineering", "Project Management"],
    career: ["Senior Engineer", "Project Manager"],
    hobbies: ["Photography", "Travel", "Technology"],
    achievements: ["Engineering Excellence Award", "Global Project Success"],
    favoriteQuote: "Innovation distinguishes between a leader and a follower",
    personalityTraits: ["Analytical", "Adventurous", "Family-Focused"],
    skills: ["Engineering", "Project Management", "Technical Leadership"],
    languages: ["Nepali", "English", "Japanese"],
    socialLinks: {
      facebook: "suresh.khanal.engineer",
      instagram: "@suresh.khanal",
      twitter: "@sureshkhanal",
      linkedin: "suresh-khanal"
    }
  },
  {
    id: 6,
    name: "Radha Khanal",
    role: "Healthcare Professional",
    parentIds: [],
    spouseId: 5,
    birthDate: "1976-02-14",
    deathDate: null,
    image: "/images/oldwoman5.webp",
    bio: "Healthcare professional and community volunteer.",
    slug: "radha-khanal",
    generation: 2,
    fullBio: "Radha Khanal is a dedicated healthcare professional who combines medical expertise with compassionate care. Her work in community health has made a significant impact on many lives. She balances her professional commitments with her role as a mother and active family member.",
    birthdate: "1976-02-14",
    relationship: "Healthcare Professional",
    email: "radha.khanal@health.com",
    phone: "+1-234-567-8902",
    address: "New York, USA",
    education: ["MD", "Public Health"],
    career: ["Medical Doctor", "Public Health Specialist"],
    hobbies: ["Yoga", "Meditation", "Community Service"],
    achievements: ["Healthcare Excellence Award", "Community Service Recognition"],
    favoriteQuote: "Health is a state of complete harmony of the body, mind and spirit",
    personalityTraits: ["Compassionate", "Professional", "Balanced"],
    skills: ["Medical Practice", "Public Health", "Patient Care"],
    languages: ["Nepali", "English", "Medical Terminology"],
    socialLinks: {
      facebook: "radha.khanal.health",
      instagram: "@radha.khanal",
      twitter: "@radhakhanal",
      linkedin: "radha-khanal"
    }
  },
  // Generation 3 (Children)
  {
    id: 7,
    name: "Arjun Khanal",
    role: "University Student",
    parentIds: [3, 4],
    spouseId: null,
    birthDate: "2000-07-10",
    deathDate: null,
    image: "/images/space.png",
    bio: "University student studying computer science, passionate about technology.",
    slug: "arjun-khanal",
    generation: 3,
    fullBio: "Arjun Khanal is a bright young computer science student with a passion for technology and innovation. He combines his technical skills with creative thinking to develop solutions for real-world problems. His enthusiasm for learning and family values makes him a promising future leader.",
    birthdate: "2000-07-10",
    relationship: "University Student",
    email: "arjun.khanal@student.edu",
    phone: "+977-9841234570",
    address: "Kathmandu, Nepal",
    education: ["BSc Computer Science", "Web Development"],
    career: ["Student", "Freelance Developer"],
    hobbies: ["Coding", "Gaming", "Basketball"],
    achievements: ["Hackathon Winner", "Academic Excellence"],
    favoriteQuote: "The best way to predict the future is to create it",
    personalityTraits: ["Innovative", "Determined", "Tech-Savvy"],
    skills: ["Programming", "Web Development", "Problem Solving"],
    languages: ["Nepali", "English", "Programming Languages"],
    socialLinks: {
      facebook: "arjun.khanal.tech",
      instagram: "@arjun.khanal",
      twitter: "@arjunkhanal",
      linkedin: "arjun-khanal"
    }
  },
  {
    id: 8,
    name: "Priya Khanal",
    role: "High School Student",
    parentIds: [3, 4],
    spouseId: null,
    birthDate: "2002-12-05",
    deathDate: null,
    image: "/images/Hemjakot.png",
    bio: "High school student with interests in arts and literature.",
    slug: "priya-khanal",
    generation: 3,
    fullBio: "Priya Khanal is a talented high school student with a passion for arts and literature. Her creative expression through various art forms has won her recognition in school competitions. She balances her artistic pursuits with academic excellence and family responsibilities.",
    birthdate: "2002-12-05",
    relationship: "High School Student",
    email: "priya.khanal@student.edu",
    phone: "+977-9841234571",
    address: "Kathmandu, Nepal",
    education: ["High School", "Art Classes"],
    career: ["Student", "Young Artist"],
    hobbies: ["Painting", "Writing", "Dancing"],
    achievements: ["Art Competition Winner", "Literary Award"],
    favoriteQuote: "Art is not what you see, but what you make others see",
    personalityTraits: ["Creative", "Expressive", "Dedicated"],
    skills: ["Painting", "Creative Writing", "Dance"],
    languages: ["Nepali", "English", "French"],
    socialLinks: {
      facebook: "priya.khanal.arts",
      instagram: "@priya.khanal",
      twitter: "@priyakhanal"
    }
  },
  {
    id: 9,
    name: "Anita Khanal",
    role: "Medical Student",
    parentIds: [5, 6],
    spouseId: null,
    birthDate: "2001-09-22",
    deathDate: null,
    image: "/images/woman7.webp",
    bio: "Medical student following in her mother's footsteps in healthcare.",
    slug: "anita-khanal",
    generation: 3,
    fullBio: "Anita Khanal is a dedicated medical student following her mother's footsteps in healthcare. Her commitment to medical studies and patient care shows her passion for the field. She combines her medical knowledge with compassion, making her a promising healthcare professional.",
    birthdate: "2001-09-22",
    relationship: "Medical Student",
    email: "anita.khanal@med.edu",
    phone: "+1-234-567-8903",
    address: "New York, USA",
    education: ["MD Program", "Medical Research"],
    career: ["Medical Student", "Research Assistant"],
    hobbies: ["Medical Research", "Volunteering", "Reading"],
    achievements: ["Research Grant", "Academic Excellence"],
    favoriteQuote: "The art of medicine consists of amusing the patient while nature cures the disease",
    personalityTraits: ["Compassionate", "Dedicated", "Analytical"],
    skills: ["Medical Knowledge", "Research", "Patient Care"],
    languages: ["Nepali", "English", "Medical Terminology"],
    socialLinks: {
      facebook: "anita.khanal.medical",
      instagram: "@anita.khanal",
      twitter: "@anitakhanal",
      linkedin: "anita-khanal"
    }
  },
  {
    id: 10,
    name: "Bikash Khanal",
    role: "Young Entrepreneur",
    parentIds: [5, 6],
    spouseId: null,
    birthDate: "2003-04-16",
    deathDate: null,
    image: "/images/man4.webp",
    bio: "Young entrepreneur with innovative ideas for sustainable farming.",
    slug: "bikash-khanal",
    generation: 3,
    fullBio: "Bikash Khanal is a young entrepreneur with innovative ideas for sustainable farming. His passion for agriculture and technology has led him to develop modern solutions for traditional farming practices. His vision combines family legacy with modern innovation.",
    birthdate: "2003-04-16",
    relationship: "Young Entrepreneur",
    email: "bikash.khanal@agri.com",
    phone: "+1-234-567-8904",
    address: "New York, USA",
    education: ["Agricultural Science", "Business Management"],
    career: ["Agri-Tech Entrepreneur", "Farm Manager"],
    hobbies: ["Farming", "Technology", "Nature Photography"],
    achievements: ["Innovation Award", "Young Entrepreneur Recognition"],
    favoriteQuote: "The best time to plant a tree was 20 years ago, the second best time is now",
    personalityTraits: ["Innovative", "Determined", "Nature-Loving"],
    skills: ["Sustainable Farming", "Business Management", "Technology"],
    languages: ["Nepali", "English", "Spanish"],
    socialLinks: {
      facebook: "bikash.khanal.agri",
      instagram: "@bikash.khanal",
      twitter: "@bikashkhanal",
      linkedin: "bikash-khanal"
    }
  },
];

export const familyEvents = [
  {
    id: 1,
    title: "Family Reunion",
    date: "2024-04-15",
    description: "A joyful gathering in Kathmandu",
    memberIds: [1, 2, 3, 4, 7, 8],
  },
  {
    id: 2,
    title: "Golden Jubilee",
    date: "2023-05-10",
    description: "Celebrating 50 years of family legacy",
    memberIds: [1, 2, 5, 6, 9, 10],
  },
];

export const familyPhotos = [
  {
    id: 1,
    event: "Family Reunion 2024",
    image: "/images/family1.png",
    date: "2024-04-15",
    memberIds: [1, 2, 3, 4, 7, 8],
  },
  {
    id: 2,
    event: "Arjun's Graduation",
    image: "/images/Family2.png",
    date: "2024-05-20",
    memberIds: [7],
  },
];

export const familyRecipes = [
  {
    id: 1,
    title: "Grandma's Dal Bhat",
    story: "Passed down from Sita Devi, this recipe brings warmth to every gathering.",
    memberId: 2,
  },
  {
    id: 2,
    title: "Mom's Momo",
    story: "Priya's secret spice mix makes these dumplings a favorite.",
    memberId: 8,
  },
];

export const featuredStories: FeaturedStory[] = [
  {
    id: 1,
    title: "Ram's Journey",
    excerpt: "From rural Nepal to educating a generation.",
    memberId: 1,
    slug: "ram-journey",
    content:
      "Ram Bahadur Khanal was born in a small village in rural Nepal, where access to education was a distant dream for many. With determination and grit, he walked miles to the nearest school, often barefoot, to gain knowledge that would change his life. Over the decades, Ram became a teacher, dedicating his life to educating children in his village, ensuring that future generations would have the opportunities he fought for.\n\nHis journey wasn't without challenges. During the 1970s, political unrest in Nepal made it difficult to secure funding for schools. Ram organized community efforts, building classrooms with mud and straw, and even taught under trees when resources were scarce. His legacy lives on through the countless students he inspired, many of whom went on to become doctors, engineers, and leaders.",
    image: "/images/panda.png",
    author: "Ram Bahadur Khanal",
    date: "June 04, 2025",
  },
  {
    id: 2,
    title: "Sita's Legacy",
    excerpt: "Her stories shaped our values.",
    memberId: 2,
    slug: "sita-legacy",
    content:
      "Sita Devi Khanal was the heart of our family, a storyteller who wove tales of courage, kindness, and resilience into the fabric of our values. Every evening, she gathered the children around a flickering oil lamp, sharing stories of our ancestors—tales of survival during floods, acts of generosity during famine, and the importance of unity in times of hardship.\n\nOne of her favorite stories was about her grandmother, who saved the village from a devastating drought by organizing a collective effort to dig a well. Sita's stories weren't just entertainment; they were lessons that taught us to value community, empathy, and perseverance. Even today, her words echo in our family gatherings, reminding us of the principles that hold us together.",
    image: "/images/istock.png",
    author: "Sita Devi Khanal",
    date: "June 04, 2025",
  },
];

// ... other data ...

export const members: Member[] = [
  // ... member data ...
];

// Helper function to build family tree structure
export function buildFamilyTree(members: FamilyMember[]) {
  // Add children arrays to each member
  const membersWithChildren = members.map((member) => ({
    ...member,
    children: members.filter((child) => child.parentIds.includes(member.id)).map((child) => child.id),
  }));
  return membersWithChildren;
}

