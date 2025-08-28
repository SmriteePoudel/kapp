"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
            console.log("API Response:", data); // Debug log
            
            if (data.success && data.data) {
              // Transform the API response to match the Member type
              const apiMember = data.data;
              const transformedMember: Member = {
                id: apiMember.id,
                slug: apiMember.slug,
                name: apiMember.name,
                image: apiMember.image || "/images/family1.png",
                role: apiMember.role || "Family Member",
                relationship: apiMember.relationship || "User",
                fullBio: apiMember.fullBio || `Welcome ${user.name || user.email.split("@")[0]}! This is your personal profile page.`,
                skills: Array.isArray(apiMember.skills) ? apiMember.skills : [],
                languages: Array.isArray(apiMember.languages) ? apiMember.languages : [],
                hobbies: Array.isArray(apiMember.hobbies) ? apiMember.hobbies : [],
                personality: Array.isArray(apiMember.personality) ? apiMember.personality : [],
                achievements: Array.isArray(apiMember.achievements) ? apiMember.achievements : [],
                education: Array.isArray(apiMember.education) ? apiMember.education : [],
                career: Array.isArray(apiMember.career) ? apiMember.career : [],
                phone: Array.isArray(apiMember.phone) ? apiMember.phone : [],
                address: Array.isArray(apiMember.address) ? apiMember.address : [],
                birthday: apiMember.birthdate || "1999-08-27", // Note the field name difference
                email: Array.isArray(apiMember.email) ? apiMember.email : [apiMember.email].filter(Boolean),
              };
              
              setMember(transformedMember);
            } else {
              // Create fallback member
              const memberData: Member = {
                id: 0,
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
                phone: [],
                address: [],
                birthday: "1999-08-27",
                email: user.email ? [user.email] : [],
              };
              setMember(memberData);
            }
          } else {
            console.error("Failed to fetch profile:", res.status, res.statusText);
            
            // Create fallback member on error too
            const memberData: Member = {
              id: 0,
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
              phone: [],
              address: [],
              birthday: "1999-08-27",
              email: user.email ? [user.email] : [],
            };
            setMember(memberData);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          
          // Create fallback member on error
          const memberData: Member = {
            id: 0,
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
            phone: [],
            address: [],
            birthday: "1999-08-27",
            email: user.email ? [user.email] : [],
          };
          setMember(memberData);
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
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {member && <FullProfilePageClient member={member} />}
      
    </div>
  );
}
