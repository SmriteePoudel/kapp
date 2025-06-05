import { FamilyMember } from '@/types/familytree';
import { Member } from '@/types/member';


export interface FamilyLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  members: number[];
}

export interface FamilyPhoto {
  id: number;
  event: string;
  image: string;
  date: string;
  memberIds: number[];
}

export interface FamilyRecipe {
  id: number;
  title: string;
  story: string;
  memberId: number;
}

export interface FeaturedStory {
  id: number;
  title: string;
  excerpt: string;
  memberId: number;
  slug: string;
  content: string; // Full story text
  image: string; // URL to the story image
  author: string; // Author of the story
  date: string; // Publication date
}

export interface FamilyEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  memberIds: number[];
}

export const familyLocations: FamilyLocation[] = [
  {
    id: 1,
    name: "Kathmandu, Nepal",
    lat: 27.7172,
    lng: 85.324,
    members: [1, 2, 3, 4, 7, 8],
  },
  {
    id: 2,
    name: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    members: [5, 6, 9, 10],
  },
  {
    id: 3,
    name: "Sydney, Australia",
    lat: -33.8688,
    lng: 151.2093,
    members: [7],
  },
];

export const familyPhotos: FamilyPhoto[] = [
  {
    id: 1,
    event: "Family Reunion 2024",
    image: "/images/reunion.jpg",
    date: "2024-04-15",
    memberIds: [1, 2, 3, 4, 7, 8],
  },
  {
    id: 2,
    event: "Arjun's Graduation",
    image: "/images/graduation.jpg",
    date: "2024-05-20",
    memberIds: [7],
  },
];

export const familyRecipes: FamilyRecipe[] = [
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

export const familyEvents: FamilyEvent[] = [
  {
    id: 1,
    title: "Ram and Sita's Marriage",
    date: "1945-06-10",
    description: "A union in rural Nepal",
    memberIds: [1, 2],
  },
  {
    id: 2,
    title: "Family Reunion",
    date: "2024-04-15",
    description: "A joyful gathering in Kathmandu",
    memberIds: [1, 2, 3, 4, 7, 8],
  },
];

export const familyMembers: FamilyMember[] = [
  // Generation 1 (Grandparents)
  {
    id: 1,
    name: "Ram Bahadur Khanal",
    parentIds: [],
    spouseId: 2,
    birthDate: "1940-01-15",
    deathDate: "2020-12-10",
    image: "/images/panda.png",
    bio: "Founding patriarch of the Khanal family, dedicated farmer and community leader.",
    slug: "ram-bahadur-khanal",
    generation: 1,
  },
  {
    id: 2,
    name: "Sita Devi Khanal",
    parentIds: [],
    spouseId: 1,
    birthDate: "1945-03-20",
    deathDate: null,
    image: "/images/istock.png",
    bio: "Beloved matriarch, devoted mother and grandmother who kept the family united.",
    slug: "sita-devi-khanal",
    generation: 1,
  },
  // Generation 2 (Parents)
  {
    id: 3,
    name: "Prakash Khanal",
    parentIds: [1, 2],
    spouseId: 4,
    birthDate: "1970-05-12",
    deathDate: null,
    image: "/images/prakash.jpg",
    bio: "Eldest son, successful businessman and family coordinator.",
    slug: "prakash-khanal",
    generation: 2,
  },
  {
    id: 4,
    name: "Kamala Khanal",
    parentIds: [],
    spouseId: 3,
    birthDate: "1975-08-18",
    deathDate: null,
    image: "/images/kamala.jpg",
    bio: "Dedicated teacher and loving mother of three children.",
    slug: "kamala-khanal",
    generation: 2,
  },
  {
    id: 5,
    name: "Suresh Khanal",
    parentIds: [1, 2],
    spouseId: 6,
    birthDate: "1972-11-25",
    deathDate: null,
    image: "/images/suresh.jpg",
    bio: "Engineer working abroad, maintains strong family connections.",
    slug: "suresh-khanal",
    generation: 2,
  },
  {
    id: 6,
    name: "Radha Khanal",
    parentIds: [],
    spouseId: 5,
    birthDate: "1976-02-14",
    deathDate: null,
    image: "/images/radha.jpg",
    bio: "Healthcare professional and community volunteer.",
    slug: "radha-khanal",
    generation: 2,
  },
  // Generation 3 (Children)
  {
    id: 7,
    name: "Arjun Khanal",
    parentIds: [3, 4],
    spouseId: null,
    birthDate: "2000-07-10",
    deathDate: null,
    image: "/images/arjun.jpg",
    bio: "University student studying computer science, passionate about technology.",
    slug: "arjun-khanal",
    generation: 3,
  },
  {
    id: 8,
    name: "Priya Khanal",
    parentIds: [3, 4],
    spouseId: null,
    birthDate: "2002-12-05",
    deathDate: null,
    image: "/images/priya.jpg",
    bio: "High school student with interests in arts and literature.",
    slug: "priya-khanal",
    generation: 3,
  },
  {
    id: 9,
    name: "Anita Khanal",
    parentIds: [5, 6],
    spouseId: null,
    birthDate: "2001-09-22",
    deathDate: null,
    image: "/images/anita.jpg",
    bio: "Medical student following in her mother's footsteps in healthcare.",
    slug: "anita-khanal",
    generation: 3,
  },
  {
    id: 10,
    name: "Bikash Khanal",
    parentIds: [5, 6],
    spouseId: null,
    birthDate: "2003-04-16",
    deathDate: null,
    image: "/images/bikash.jpg",
    bio: "Young entrepreneur with innovative ideas for sustainable farming.",
    slug: "bikash-khanal",
    generation: 3,
  },
];



export const members: Member[] = [
  {
    id: 1,
    slug: "krishna-khanal",
    name: "Krishna Khanal",
    role: "Family Head",
    bio: "Dedicated family patriarch with 40+ years of leadership experience",
    fullBio:
      "Krishna Khanal is the cornerstone of our family, a man whose wisdom and dedication have shaped generations. With over four decades of professional experience in agriculture and community leadership, he has been instrumental in building not just our family legacy but also contributing significantly to our local community. His journey from a small village to becoming a respected figure in our region is a testament to his perseverance and values.",
    photo: "/images/sessler.png",
    birthdate: "April 20, 1955",
    relationship: "Father",
    email: "krishna.khanal@email.com",
    phone: "+977-98XXXXXXXX",
    address: "Kathmandu, Nepal",
    education: [
      "Bachelor of Agriculture - Tribhuvan University (1978)",
      "Certificate in Community Leadership - Local Institute (1985)",
    ],
    career: [
      "Senior Agricultural Officer - Ministry of Agriculture (1979-2010)",
      "Community Development Coordinator (2010-2015)",
      "Family Business Consultant (2015-Present)",
    ],
    hobbies: ["Gardening", "Reading Historical Books", "Chess", "Community Service"],
    achievements: [
      "Outstanding Service Award - Ministry of Agriculture (2005)",
      "Community Leader of the Year (2012)",
      "Lifetime Achievement in Agriculture (2018)",
    ],
    favoriteQuote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    personalityTraits: ["Wise", "Patient", "Generous", "Traditional", "Caring"],
    skills: ["Leadership", "Agriculture", "Problem Solving", "Mentoring"],
    languages: ["Nepali", "Hindi", "English"],
  },
  {
    id: 2,
    slug: "radha-khanal",
    name: "Radha Khanal",
    role: "Matriarch",
    bio: "Heart of the family with exceptional culinary skills",
    fullBio:
      "Radha Khanal is the beating heart of our family, whose love and care have nurtured every member with unwavering devotion. Known throughout our community for her exceptional culinary talents and warm hospitality, she has been the anchor that keeps our family traditions alive. Her kitchen is not just a place where meals are prepared, but where stories are shared, lessons are taught, and bonds are strengthened.",
    photo: "/images/wild.png",
    birthdate: "June 15, 1960",
    relationship: "Mother",
    email: "radha.khanal@email.com",
    phone: "+977-98XXXXXXXX",
    address: "Kathmandu, Nepal",
    education: [
      "High School Certificate - Local School (1978)",
      "Culinary Arts Certificate - Women's Development Center (1985)",
      "Healthcare Training - Red Cross (1990)",
    ],
    career: [
      "Full-time Homemaker and Family Manager (1980-Present)",
      "Community Health Volunteer (1990-2010)",
      "Cooking Instructor - Local Women's Group (2000-2015)",
    ],
    hobbies: ["Cooking", "Knitting", "Gardening", "Temple Visits", "Storytelling"],
    achievements: [
      "Best Traditional Cook - Community Festival (Multiple Years)",
      "Volunteer Recognition - Red Cross (2005)",
      "Women's Leadership Award - Local NGO (2010)",
    ],
    favoriteQuote: "A home cooked meal is love made visible.",
    personalityTraits: ["Nurturing", "Creative", "Spiritual", "Organized", "Compassionate"],
    skills: ["Cooking", "Household Management", "Child Care", "Traditional Crafts"],
    languages: ["Nepali", "Hindi", "Basic English"],
  },
  {
    id: 3,
    slug: "ramesh-khanal",
    name: "Ramesh Khanal",
    role: "Software Engineer",
    bio: "Tech enthusiast building the future with code",
    fullBio:
      "Ramesh Khanal represents the bridge between our family's traditional values and the modern digital world. As a passionate software engineer, he has dedicated his career to creating innovative solutions that make technology accessible and meaningful. His journey in tech began early, and he has consistently pushed the boundaries of what's possible while staying grounded in the values instilled by our family.",
    photo: "/images/unsplash.png",
    birthdate: "March 12, 1990",
    relationship: "Son",
    email: "ramesh.khanal@email.com",
    phone: "+977-98XXXXXXXX",
    address: "Kathmandu, Nepal",
    education: [
      "Bachelor of Computer Science - Kathmandu University (2012)",
      "Master of Software Engineering - Tribhuvan University (2015)",
      "Various Online Certifications - Coursera, edX (2016-Present)",
    ],
    career: [
      "Junior Developer - Local Tech Company (2012-2014)",
      "Senior Software Engineer - International Firm (2015-2019)",
      "Lead Developer - Current Company (2019-Present)",
      "Freelance Consultant (2020-Present)",
    ],
    hobbies: ["Programming Personal Projects", "Gaming", "Photography", "Hiking", "Teaching Coding"],
    achievements: [
      "Best Innovative Solution - Tech Conference (2018)",
      "Open Source Contributor - GitHub (2016-Present)",
      "Mentor of the Year - Coding Bootcamp (2020)",
    ],
    favoriteQuote: "Code is poetry written in logic.",
    personalityTraits: ["Innovative", "Analytical", "Patient", "Detail-oriented", "Collaborative"],
    skills: ["Full-Stack Development", "System Architecture", "Project Management", "Mentoring"],
    languages: ["Nepali", "English", "Hindi", "Japanese (Basic)"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/rameshkhanal",
      instagram: "https://instagram.com/ramesh_codes",
    },
  },
  {
    id: 4,
    slug: "sita-khanal",
    name: "Sita Khanal",
    role: "Medical Student",
    bio: "Aspiring doctor passionate about community health",
    fullBio:
      "Sita Khanal embodies the spirit of service and healing that runs deep in our family. As a dedicated medical student, she has shown exceptional commitment to understanding not just the science of medicine, but also the art of caring for people. Her passion for community health stems from witnessing the impact of healthcare accessibility in rural areas, driving her to pursue medicine with a focus on serving underserved communities.",
    photo: "/images/willian.png",
    birthdate: "August 5, 1995",
    relationship: "Daughter",
    email: "sita.khanal@email.com",
    phone: "+977-98XXXXXXXX",
    address: "Kathmandu, Nepal",
    education: [
      "Bachelor of Medicine, Bachelor of Surgery (MBBS) - Currently Pursuing",
      "Pre-Medical Certificate - Science College (2013)",
      "High School - Local School (2011)",
    ],
    career: [
      "Medical Student - Current (2015-Present)",
      "Health Volunteer - Local Clinic (2013-2015)",
      "Research Assistant - Medical College (2018-Present)",
    ],
    hobbies: ["Medical Research", "Volunteer Work", "Reading Medical Journals", "Yoga", "Community Outreach"],
    achievements: [
      "Dean's List - Medical College (Multiple Semesters)",
      "Best Research Paper - Student Conference (2020)",
      "Community Service Award - Medical Association (2021)",
    ],
    favoriteQuote: "Healing is a matter of time, but it is sometimes also a matter of opportunity.",
    personalityTraits: ["Empathetic", "Dedicated", "Studious", "Caring", "Determined"],
    skills: ["Medical Knowledge", "Patient Care", "Research", "Communication", "Emergency Response"],
    languages: ["Nepali", "English", "Hindi", "Sanskrit (Basic)"],
  },
  {
    id: 5,
    slug: "hari-khanal",
    name: "Hari Khanal",
    role: "Business Student",
    bio: "Entrepreneurial spirit learning the ropes of commerce",
    fullBio:
      "Hari Khanal is the entrepreneurial force of our new generation, combining traditional business wisdom with modern innovative approaches. As the youngest member pursuing higher education, he brings fresh perspectives and boundless energy to everything he does. His vision extends beyond personal success to creating opportunities that can benefit our entire community and carry forward our family's legacy of contribution to society.",
    photo: "/images/marek.png",
    birthdate: "November 30, 2000",
    relationship: "Son",
    email: "hari.khanal@email.com",
    phone: "+977-98XXXXXXXX",
    address: "Kathmandu, Nepal",
    education: [
      "Bachelor of Business Administration - Currently Pursuing (2019-Present)",
      "High School - Local School (2018)",
      "Various Business Workshops and Seminars (2019-Present)",
    ],
    career: [
      "Business Student - Current (2019-Present)",
      "Intern - Local Business (Summer 2021)",
      "Freelance Social Media Manager (2020-Present)",
      "Co-founder - Student Startup Initiative (2021-Present)",
    ],
    hobbies: ["Entrepreneurship", "Digital Marketing", "Sports", "Travel", "Networking Events"],
    achievements: [
      "Best Business Plan - University Competition (2021)",
      "Young Entrepreneur Award - Local Chamber (2022)",
      "Academic Excellence - Dean's List (2020, 2021)",
    ],
    favoriteQuote: "Success is not just about what you accomplish in your life, it's about what you inspire others to do.",
    personalityTraits: ["Ambitious", "Creative", "Social", "Optimistic", "Adaptable"],
    skills: ["Business Strategy", "Digital Marketing", "Leadership", "Communication", "Innovation"],
    languages: ["Nepali", "English", "Hindi", "Korean (Learning)"],
    socialLinks: {
      instagram: "https://instagram.com/hari_entrepreneur",
      linkedin: "https://linkedin.com/in/harikhanal",
    },
  },
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