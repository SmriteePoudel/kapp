"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Heart,
  GraduationCap,
  Trophy,
  Share2,
  Save,
  Edit3,
  Plus,
  Trash2,
  Briefcase,
  Smile,
  Languages,
} from "lucide-react";
import type { Member } from "@/types/member";


interface Props {
  member: Member;
}

export default function ProfileEditor({ member }: Props) {
  const [profile, setProfile] = useState<Member>(member);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFieldChange = <K extends keyof Member>(field: K, value: Member[K]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateProfile = async (updatedData: Member) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/members/${updatedData.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const updated: Member = await response.json();
      setProfile(updated);
      alert("Changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    await updateProfile(profile);
    setIsEditing(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: profile.name,
      text: profile.fullBio || "",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4 py-8 mt-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/members">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Members
            </Button>
          </Link>
          <div className="flex gap-2">
            {isEditing ? (
              <Button onClick={handleSaveAll} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save All"}
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-8 mb-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-8 ring-white/30">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={192}
                  height={192}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{profile.name}</h1>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={profile.role || ""}
                    onChange={(e) => handleFieldChange("role", e.target.value)}
                    className="text-xl p-1 rounded text-black"
                    placeholder="Role"
                  />
                  <input
                    type="text"
                    value={profile.relationship || ""}
                    onChange={(e) => handleFieldChange("relationship", e.target.value)}
                    className="text-xl p-1 rounded text-black ml-2"
                    placeholder="Relationship"
                  />
                </>
              ) : (
                <p className="text-xl opacity-90 mb-4">{profile.role}</p>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Section
              title={`About ${profile.name}`}
              icon={<Heart className="w-6 h-6 text-rose-500" />}
              isEditing={isEditing}
              value={profile.fullBio || ""}
              onChange={(val) => handleFieldChange("fullBio", val)}
            />

<EditableListWithYearSection
  title="Education"
  icon={<GraduationCap className="w-6 h-6 text-blue-500" />}
  items={
    Array.isArray(profile.education)
      ? profile.education.map((item) =>
          typeof item === "object"
            ? (item as { title: string; year?: number })
            : { title: item as string }
        )
      : []
  }
  isEditing={isEditing}
  onChange={(val: { title: string; year?: number }[]) =>
    handleFieldChange("education", val)
  }
/>

<EditableListWithYearSection
  title="Achievements"
  icon={<Trophy className="w-6 h-6 text-amber-500" />}
  items={
    Array.isArray(profile.achievements)
      ? profile.achievements.map((item) =>
          typeof item === "object"
            ? (item as { title: string; year?: number })
            : { title: item as string }
        )
      : []
  }
  isEditing={isEditing}
  onChange={(val: { title: string; year?: number }[]) =>
    handleFieldChange("achievements", val)
  }
/>



            <EditableListSection
              title="Career Journey"
              icon={<Briefcase className="w-6 h-6 text-purple-500" />}
              items={Array.isArray(profile.career) ? profile.career : [profile.career].filter(Boolean)}
              isEditing={isEditing}
              onChange={(val: string[]) => handleFieldChange("career", val)}
            />
          </div>

          <div className="space-y-6">
            <ContactSection profile={profile} isEditing={isEditing} onFieldChange={handleFieldChange} />

            <TagListSection
              title="Skills"
              icon={<Heart className="w-5 h-5 text-sky-500" />}
              tags={Array.isArray(profile.skills)?profile.skills : [profile.skills].filter(Boolean)}
              isEditing={isEditing}
              onChange={(val) => handleFieldChange("skills", val)}
            />

            <TagListSection
              title="Languages"
              icon={<Languages className="w-5 h-5 text-lime-500" />}
              tags={profile.languages}
              isEditing={isEditing}
              onChange={(val) => handleFieldChange("languages", val)}
            />

            <TagListSection
              title="Hobbies & Interests"
              icon={<Heart className="w-5 h-5 text-pink-400" />}
              tags={profile.hobbies}
              isEditing={isEditing}
              onChange={(val) => handleFieldChange("hobbies", val)}
            />

            <TagListSection
            title="Personality"
            icon={<Smile className="w-5 h-5 text-yellow-500" />}
            tags={
              Array.isArray(profile.personality)
                ? profile.personality.map((item: any) =>
                    typeof item === "string"
                      ? item
                      : typeof item === "object" && item !== null && "title" in item
                      ? String(item.title)
                      : ""
                  )
                : []
            }
            isEditing={isEditing}
            onChange={(val: string[]) => handleFieldChange("personality", val.map(title => ({ title })))}
            />


          </div>
        </div>
      </div>
    </motion.div>
  );
}



function Section({ title, icon, isEditing, value, onChange }: {
  title: string;
  icon: React.ReactNode;
  isEditing: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded p-2"
          rows={4}
        />
      ) : (
        <p className="whitespace-pre-line">{value}</p>
      )}
    </div>
  );
}

function EditableListWithYearSection({ title, icon, items, isEditing, onChange }: {
  title: string;
  icon: React.ReactNode;
  items: { title: string; year?: number }[];
  isEditing: boolean;
  onChange: (items: { title: string; year?: number }[]) => void;
}) {
  const handleChange = (index: number, key: "title" | "year", value: string) => {
    const updated = [...items];
    if (key === "year") {
      
      updated[index] = { ...updated[index], year: value === "" ? undefined : Number(value) };
    } else {
      updated[index] = { ...updated[index], title: value };
    }
    onChange(updated as { title: string; year?: number }[]);
  };

  const handleAdd = () => onChange([...items, { title: "", year: undefined }]);
  const handleRemove = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {isEditing ? (
            <>
              <input
                value={item.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="border p-1 rounded flex-1"
                placeholder="Title"
              />
              <input
                value={item.year}
                onChange={(e) => handleChange(index, "year", e.target.value)}
                className="border p-1 rounded w-24"
                placeholder="Year"
              />
              <Button size="icon" variant="ghost" onClick={() => handleRemove(index)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </>
          ) : (
            <p>• {item.title} {item.year && `(${item.year})`}</p>
          )}
        </div>
      ))}
      {isEditing && (
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      )}
    </div>
  );
}

function EditableListSection({ title, icon, items, isEditing, onChange }: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  isEditing: boolean;
  onChange: (items: string[]) => void;
}) {
  const handleChange = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };
  const handleAdd = () => onChange([...items, ""]);
  const handleRemove = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {isEditing ? (
            <>
              <input
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border p-1 rounded flex-1"
              />
              <Button size="icon" variant="ghost" onClick={() => handleRemove(index)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </>
          ) : (
            <p>• {item}</p>
          )}
        </div>
      ))}
      {isEditing && (
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      )}
    </div>
  );
}

function ContactSection({ profile, isEditing, onFieldChange }: {
  profile: Member;
  isEditing: boolean;
  onFieldChange: (field: "email" | "phone" | "address", value: string) => void;
}) {
  const fields = [
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
  ] as const;

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Contact</h2>
      {fields.map(({ label, key }) => (
        <div key={key}>
          <label className="block text-sm font-medium">{label}</label>
          {isEditing ? (
            <input
              value={profile[key] || ""}
              onChange={(e) => onFieldChange(key, e.target.value)}
              className="border rounded p-1 w-full"
            />
          ) : (
            <p>{profile[key]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function TagListSection({ title, icon, tags, isEditing, onChange }: {
  title: string;
  icon: React.ReactNode;
  tags: string[];
  isEditing: boolean;
  onChange: (tags: string[]) => void;
}) {
  const handleChange = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    onChange(updated);
  };
  const handleAdd = () => onChange([...tags, ""]);
  const handleRemove = (index: number) => onChange(tags.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) =>
          isEditing ? (
            <div key={i} className="flex items-center gap-2">
              <input
                value={tag}
                onChange={(e) => handleChange(i, e.target.value)}
                className="border px-2 py-1 rounded"
              />
              <Button size="icon" variant="ghost" onClick={() => handleRemove(i)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ) : (
            <span key={i} className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          )
        )}
      </div>
      {isEditing && (
        <Button variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      )}
    </div>
  );
}
