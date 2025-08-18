"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import FullProfilePageClient from "@/components/profile/FullProfilePage";
import { Member } from "@/app/types/member";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [member, setMember] = useState<Member | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    } else if (user) {
      
      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/members/me");
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              setMember(data.data);
            } else {
              
              const memberData: Member = {
                slug: "me",
                name: user.name || user.email.split("@")[0],
                image: "/images/family1.png",
                role: "Family Member",
                relationship: "User",
                
                fullBio: `Welcome ${user.name || user.email.split("@")[0]}! This is your personal profile page.`,
                skills: [],
                languages: [],
                hobbies: [],
                personality: [],
                achievements: [],
                education: [],
                career: [],
                id: 0,
                phone: [],
                address: [],
              };
              setMember(memberData);
            }
          } else {
            
            console.error("Failed to fetch profile:", res.status, res.statusText);
            
            try {
              const errorData = await res.json();
              console.error("Error data:", errorData);
            } catch (parseError) {
              console.error("Could not parse error response:", parseError);
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoadingProfile(false);
        }
      };

      fetchProfile();
    }
  }, [user, loading, router]);

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6"> Profile</h1>
      
      {member && <FullProfilePageClient member={member} />}
    </div>
  );
}