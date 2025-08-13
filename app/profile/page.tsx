"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import FullProfilePageClient from "@/components/profile/FullProfilePage";
import { Member } from "@/app/types/member";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const router = useRouter();
  
  

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    } else if (user) {
      
      const memberData: Member = {
          slug: "me",
          name: user.name || user.email.split("@")[0],
          image: "/images/family1.png",
          role: "Family Member",
          relationship: "User",
          email: user.email,
          fullBio: `Welcome ${user.name || user.email.split("@")[0]}! This is your personal profile page.`,
          skills: [],
          languages: [],
          hobbies: [],
          personality: [],
          achievements: [],
          education: [],
          career: [],
          id: 0,
          phone: "",
          address: ""
      };
      
      setMember(memberData);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return notFound();
  }

  return <FullProfilePageClient member={member} />;
}