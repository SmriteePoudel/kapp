"use client";

import React, { useState, useRef, ChangeEvent} from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  X,
} from "lucide-react";
import type { Member } from "@/app/types/member";

interface ImageUploadProps{
  onImageUpload:(url: string)=> void;
  currentImage?: string | null;
}


export default function ProfileEditor({ member }: { member: Member }) {
  const [profile, setProfile] = useState<Member>(member);
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({});
  const [savingSections, setSavingSections] = useState<Record<string, boolean>>({});
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  

  const handleFieldChange = <K extends keyof Member>(field: K, value: Member[K]) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateProfile = async (updatedData: Member) => {
    try {
      const res = await fetch(`/api/members/${profile.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error("Update failed:", errorMessage);
        throw new Error(`Failed to update profile: ${errorMessage}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw error;
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          image: result.url
        }));
        
        await updateProfile({
          ...profile,
          image: result.url
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSectionEdit = (sectionName: string, isEditing: boolean) => {
    setEditingSections(prev => ({ ...prev, [sectionName]: isEditing }));
  };

  const handleSectionSave = async (sectionName: string) => {
    setSavingSections(prev => ({ ...prev, [sectionName]: true }));
    try {
      await updateProfile(profile);
      setEditingSections(prev => ({ ...prev, [sectionName]: false }));
    } finally {
      setSavingSections(prev => ({ ...prev, [sectionName]: false }));
    }
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
            <div className="relative group">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-8 ring-white/30 relative">
                <Image
                  src={profile.image || '/default-profile.png'}
                  alt={profile.name}
                  width={192}
                  height={192}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer p-2 bg-white/80 rounded-full">
                    <Edit3 className="w-6 h-6 text-gray-800" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              {isUploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{profile.name}</h1>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {editingSections.header ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={profile.role || ""}
                        onChange={(e) => handleFieldChange("role", e.target.value)}
                        className="text-xl p-1 rounded text-black w-full"
                        placeholder="Role"
                      />
                      <p className="text-xl opacity-90 mb-4">
                        {profile.relationship || "User"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl opacity-90 mb-2">{profile.role}</p>
                      <p className="text-xl opacity-90 mb-4">
                        {profile.relationship || "User"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  {editingSections.header ? (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleSectionSave('header')}
                        disabled={savingSections.header}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleSectionEdit('header', false)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20"
                      onClick={() => handleSectionEdit('header', true)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Section
              title={`About ${profile.name}`}
              icon={<Heart className="w-6 h-6 text-rose-500" />}
              isEditing={editingSections.about || false}
              isSaving={savingSections.about || false}
              value={profile.fullBio || ""}
              onChange={(val) => handleFieldChange("fullBio", val)}
              onEdit={(editing) => handleSectionEdit('about', editing)}
              onSave={() => handleSectionSave('about')}
            />

            <EditableListWithDateSection
              title="Education"
              icon={<GraduationCap className="w-6 h-6 text-blue-500" />}
              items={
                Array.isArray(profile.education)
                  ? profile.education.map((item) =>
                      typeof item === "object"
                        ? (item as { title: string; startDate?: Date; endDate?: Date })
                        : { title: item as string }
                    )
                  : []
              }
              isEditing={editingSections.education || false}
              isSaving={savingSections.education || false}
              onChange={(val: { title: string; startDate?: Date; endDate?: Date }[]) =>
                handleFieldChange("education", val)
              }
              onEdit={(editing) => handleSectionEdit('education', editing)}
              onSave={() => handleSectionSave('education')}
            />

            <EditableListWithDateSection
              title="Achievements"
              icon={<Trophy className="w-6 h-6 text-amber-500" />}
              items={
                Array.isArray(profile.achievements)
                  ? profile.achievements.map((item) =>
                      typeof item === "object"
                        ? (item as { title: string; startDate?: Date; endDate?: Date })
                        : { title: item as string }
                    )
                  : []
              }
              isEditing={editingSections.achievements || false}
              isSaving={savingSections.achievements || false}
              onChange={(val: { title: string; startDate?: Date; endDate?: Date }[]) =>
                handleFieldChange("achievements", val)
              }
              onEdit={(editing) => handleSectionEdit('achievements', editing)}
              onSave={() => handleSectionSave('achievements')}
            />

            <EditableListSection
              title="Career Journey"
              icon={<Briefcase className="w-6 h-6 text-purple-500" />}
              items={
                Array.isArray(profile.career)
                  ? profile.career.map(item =>
                      typeof item === "string" ? item : `${item.title}${item.company ? ` at ${item.company}` : ""}${item.year ? ` (${item.year})` : ""}`
                    )
                  : []
              }
              isEditing={editingSections.career || false}
              isSaving={savingSections.career || false}
              onChange={(val: string[]) => handleFieldChange("career", val)}
              onEdit={(editing) => handleSectionEdit('career', editing)}
              onSave={() => handleSectionSave('career')}
            />
          </div>

          <div className="space-y-6">
            <ContactSection 
              profile={profile} 
              isEditing={editingSections.contact || false}
              isSaving={savingSections.contact || false}
              onFieldChange={handleFieldChange}
              onEdit={(editing) => handleSectionEdit('contact', editing)}
              onSave={() => handleSectionSave('contact')}
            />

            <TagListSection
              title="Skills"
              icon={<Heart className="w-5 h-5 text-sky-500" />}
              tags={Array.isArray(profile.skills) ? profile.skills : profile.skills ? [profile.skills].filter(Boolean) : []}
              isEditing={editingSections.skills || false}
              isSaving={savingSections.skills || false}
              onChange={(val) => handleFieldChange("skills", val)}
              onEdit={(editing) => handleSectionEdit('skills', editing)}
              onSave={() => handleSectionSave('skills')}
            />

            <TagListSection
              title="Languages"
              icon={<Languages className="w-5 h-5 text-lime-500" />}
              tags={profile.languages || []}
              isEditing={editingSections.languages || false}
              isSaving={savingSections.languages || false}
              onChange={(val) => handleFieldChange("languages", val)}
              onEdit={(editing) => handleSectionEdit('languages', editing)}
              onSave={() => handleSectionSave('languages')}
            />

            <TagListSection
              title="Hobbies & Interests"
              icon={<Heart className="w-5 h-5 text-pink-400" />}
              tags={profile.hobbies || []}
              isEditing={editingSections.hobbies || false}
              isSaving={savingSections.hobbies || false}
              onChange={(val) => handleFieldChange("hobbies", val)}
              onEdit={(editing) => handleSectionEdit('hobbies', editing)}
              onSave={() => handleSectionSave('hobbies')}
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
              isEditing={editingSections.personality || false}
              isSaving={savingSections.personality || false}
              onChange={(val: string[]) =>
                handleFieldChange(
                  "personality",
                  val.map((title) => ({ title }))
                )
              }
              onEdit={(editing) => handleSectionEdit('personality', editing)}
              onSave={() => handleSectionSave('personality')}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Section({
  title,
  icon,
  isEditing,
  isSaving,
  value,
  onChange,
  onEdit,
  onSave,
}: {
  title: string;
  icon: React.ReactNode;
  isEditing: boolean;
  isSaving: boolean;
  value: string;
  onChange: (value: string) => void;
  onEdit: (editing: boolean) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave} disabled={isSaving}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => onEdit(true)}>
            <Edit3 className="w-4 h-4" />
          </Button>
        )}
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

function EditableListWithDateSection({
  title,
  icon,
  items,
  isEditing,
  isSaving,
  onChange,
  onEdit,
  onSave,
}: {
  title: string;
  icon: React.ReactNode;
  items: { title: string; startDate?: Date; endDate?: Date }[];
  isEditing: boolean;
  isSaving: boolean;
  onChange: (items: { title: string; startDate?: Date; endDate?: Date }[]) => void;
  onEdit: (editing: boolean) => void;
  onSave: () => void;
}) {
  const handleChange = (index: number, key: "title", value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], title: value };
    onChange(updated);
  };

  const handleDateChange = (index: number, key: "startDate" | "endDate", value: Date | null) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value || undefined };
    onChange(updated);
  };

  const handleAdd = () => onChange([...items, { title: "", startDate: undefined, endDate: undefined }]);
  const handleRemove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave} disabled={isSaving}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => onEdit(true)}>
            <Edit3 className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white dark:bg-slate-800">
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    value={item.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    className="border rounded p-2 flex-1 text-sm"
                    placeholder="Title"
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <DatePicker
                      selected={item.startDate}
                      onChange={(date) => handleDateChange(index, "startDate", date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="Select start date"
                      className="w-full border rounded p-2 text-sm"
                      isClearable
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date
                    </label>
                    <DatePicker
                      selected={item.endDate}
                      onChange={(date) => handleDateChange(index, "endDate", date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="Select end date"
                      className="w-full border rounded p-2 text-sm"
                      isClearable
                      minDate={item.startDate}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                {(item.startDate || item.endDate) && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {formatDate(item.startDate)} 
                    {item.startDate && item.endDate && " - "} 
                    {formatDate(item.endDate)}
                    {item.startDate && !item.endDate && " - Present"}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isEditing && (
        <Button variant="outline" size="sm" onClick={handleAdd} className="w-full">
          <Plus className="w-4 h-4 mr-2" /> Add {title.slice(0, -1)}
        </Button>
      )}
    </div>
  );
}

function EditableListSection({
  title,
  icon,
  items,
  isEditing,
  isSaving,
  onChange,
  onEdit,
  onSave,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  isEditing: boolean;
  isSaving: boolean;
  onChange: (items: string[]) => void;
  onEdit: (editing: boolean) => void;
  onSave: () => void;
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave} disabled={isSaving}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => onEdit(true)}>
            <Edit3 className="w-4 h-4" />
          </Button>
        )}
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

function ContactSection({
  profile,
  isEditing,
  isSaving,
  onFieldChange,
  onEdit,
  onSave,
}: {
  profile: Member;
  isEditing: boolean;
  isSaving: boolean;
  onFieldChange: <K extends keyof Member>(field: K, value: Member[K]) => void;
  onEdit: (editing: boolean) => void;
  onSave: () => void;
}) {
  const fields = [
    { label: "Email", key: "email" as const },
    { label: "Phone", key: "phone" as const },
    { label: "Address", key: "address" as const },
  ];

  const handleArrayFieldChange = (
    field: "email" | "phone" | "address",
    index: number,
    value: string
  ) => {
    const currentArray = Array.isArray(profile[field]) ? [...profile[field]] : [];
    currentArray[index] = value;
    onFieldChange(field, currentArray as any);
  };

  const handleAddItem = (field: "email" | "phone" | "address") => {
    const currentArray = Array.isArray(profile[field]) ? [...profile[field]] : [];
    currentArray.push("");
    onFieldChange(field, currentArray as any);
  };

  const handleRemoveItem = (field: "email" | "phone" | "address", index: number) => {
    const currentArray = Array.isArray(profile[field]) ? [...profile[field]] : [];
    currentArray.splice(index, 1);
    onFieldChange(field, currentArray as any);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Contact</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave} disabled={isSaving}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => onEdit(true)}>
            <Edit3 className="w-4 h-4" />
          </Button>
        )}
      </div>
      {fields.map(({ label, key }) => (
        <div key={key}>
          <label className="block text-sm font-medium">{label}</label>
          {isEditing ? (
            <div className="space-y-2">
              {(Array.isArray(profile[key]) ? profile[key] : []).map((value, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={value || ""}
                    onChange={(e) => handleArrayFieldChange(key, index, e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveItem(key, index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddItem(key)}
              >
                <Plus className="w-4 h-4 mr-1" /> Add {label}
              </Button>
            </div>
          ) : (
            <div>
              {(Array.isArray(profile[key]) ? profile[key] : []).map((value, index) => (
                <p key={index}>{value}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TagListSection({
  title,
  icon,
  tags,
  isEditing,
  isSaving,
  onChange,
  onEdit,
  onSave,
}: {
  title: string;
  icon: React.ReactNode;
  tags: string[];
  isEditing: boolean;
  isSaving: boolean;
  onChange: (tags: string[]) => void;
  onEdit: (editing: boolean) => void;
  onSave: () => void;
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={onSave} disabled={isSaving}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => onEdit(true)}>
            <Edit3 className="w-4 h-4" />
          </Button>
        )}
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