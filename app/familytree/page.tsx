"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FamilyMember } from "@/types/familytree";
import {
  familyMembers,
  buildFamilyTree,
  familyPhotos,
  familyRecipes,
  featuredStories,
  familyEvents,
} from "@/data/family";
import { FeaturedStories } from "@/components/family/FeaturedStory";
import { ViewControls } from "@/components/family/ViewControls";
import { FamilyLegacySection } from "@/components/family/FamilyLegacySection";
import { MapSection } from "@/components/family/MapSection";
import { RelationshipExplorer } from "@/components/family/RelationshipExplorer";
import { TreeView } from "@/components/family/TreeView";
import { SvgTreeView } from "@/components/family/SvgTreeView";
import { TimelineView } from "@/components/family/TimelineView";
import { CardGridSection } from "@/components/family/CardGridSection";
import { FamilyTreeSkeleton } from "@/components/family/FamilyTreeSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Utensils, Calendar, BookOpen, Heart } from "lucide-react";

// Debounce delay
const DEBOUNCE_DELAY = 300; // ms

// Add these interfaces at the top with other imports
interface Recipe {
  id: number;
  title: string;
  story: string;
  memberId: number;
}

interface Reunion {
  title: string;
  content: string;
  cta: string;
}

interface Memory {
  type: "photo" | "story" | "recipe";
  title: string;
  author: string;
  content: string;
}

export default function FamilyTreePage() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(
    new Set([1, 2])
  );
  const [viewMode, setViewMode] = useState<"tree" | "timeline" | "svg">("tree");
  const [showRelationshipExplorer, setShowRelationshipExplorer] =
    useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    null
  );
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [person1Id, setPerson1Id] = useState<string>("");
  const [person2Id, setPerson2Id] = useState<string>("");
  const [relationship, setRelationship] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Load family data
  useEffect(() => {
    const loadFamilyData = async () => {
      try {
        setLoading(true);
        // Fetch database members
        const response = await fetch('/api/members');
        const result = await response.json();
        
        let allMembers = [...familyMembers];
        
        if (result.success) {
          // Combine static family members with database members
          allMembers = [...familyMembers, ...result.data];
        }
        
        const familyData = buildFamilyTree(allMembers);
        setMembers(familyData);
      } catch (err) {
        setError(
          `Failed to load family tree data: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };
    loadFamilyData();
  }, []);

  // Find relationship
  const findRelationship = useCallback(
    (id1: number, id2: number): string => {
      if (id1 === id2) return "Same person";
      const person1 = members.find((m) => m.id === id1);
      const person2 = members.find((m) => m.id === id2);
      if (!person1 || !person2) return "Member not found";
      if (person1.parentIds.includes(person2.id)) {
        return `${person2.name} is ${person1.name}'s parent`;
      }
      if (person2.parentIds.includes(person1.id)) {
        return `${person1.name} is ${person2.name}'s parent`;
      }
      if (person1.spouseId === person2.id) {
        return `${person1.name} is married to ${person2.name}`;
      }
      const commonParents = person1.parentIds.filter((id) =>
        person2.parentIds.includes(id)
      );
      if (commonParents.length > 0) {
        return `${person1.name} and ${person2.name} are siblings`;
      }
      return "Relationship not directly traceable";
    },
    [members]
  );

  // Filter members
  const filteredMembers = useMemo(() => {
    let filtered = members;
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          (member.bio &&
            member.bio
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()))
      );
    }
    if (selectedGeneration !== null) {
      filtered = filtered.filter(
        (member) => member.generation === selectedGeneration
      );
    }
    return filtered;
  }, [members, debouncedSearchTerm, selectedGeneration]);

  // Group by generation
  const membersByGeneration = useMemo(() => {
    const grouped = filteredMembers.reduce((acc, member) => {
      const gen = member.generation || 1;
      if (!acc[gen]) acc[gen] = [];
      acc[gen].push(member);
      return acc;
    }, {} as Record<number, FamilyMember[]>);
    return grouped;
  }, [filteredMembers]);

  // SVG tree data
  const svgTreeData = useMemo(() => {
    const nodeWidth = 150;
    const nodeHeight = 150;
    const nodes = members.map((m, i) => ({
      id: m.id,
      name: m.name,
      x: i * nodeWidth + 20,
      y: (m.generation ?? 1) * nodeHeight + 20,
    }));
    const links = members.flatMap((m) =>
      m.parentIds.map((parentId) => ({
        source: parentId,
        target: m.id,
      }))
    );
    return { nodes, links };
  }, [members]);

  // Timeline items
  const timelineItems = useMemo(() => {
    const memberItems = members.map((m) => ({
      type: "member" as const,
      date: m.birthDate,
      data: m,
    }));
    const eventItems = familyEvents.map((e) => ({
      type: "event" as const,
      date: e.date,
      data: e,
    }));
    return [...memberItems, ...eventItems].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [members]);

  const toggleNode = (memberId: number) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(memberId)) {
        newSet.delete(memberId);
      } else {
        newSet.add(memberId);
      }
      return newSet;
    });
  };

  const getSpouse = (spouseId: number | null) => {
    if (!spouseId) return null;
    return members.find((m) => m.id === spouseId) ?? null;
  };

  const getChildren = (parentId: number) => {
    return members.filter((member) => member.parentIds.includes(parentId));
  };

  if (loading) {
    return <FamilyTreeSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Failed to Load Family Tree
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
      {/* <HeroSection /> */}
      <div className="container mx-auto px-4 py-8 mt-16">
        <ViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGeneration={selectedGeneration}
          setSelectedGeneration={setSelectedGeneration}
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Full-width Featured Story section */}
          <FeaturedStories
            currentStoryIndex={currentStoryIndex}
            setCurrentStoryIndex={setCurrentStoryIndex}
            stories={featuredStories}
          />
          {/* Family tree content below */}
          <div className="w-full">
            {/* Add your family tree content here */}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="w-full">
          <RelationshipExplorer
            members={members}
            person1Id={person1Id}
            setPerson1Id={setPerson1Id}
            person2Id={person2Id}
            setPerson2Id={setPerson2Id}
            relationship={relationship}
            setRelationship={setRelationship}
            findRelationship={findRelationship}
            show={showRelationshipExplorer}
            setShow={setShowRelationshipExplorer}
          />
          {viewMode === "timeline" ? (
            <TimelineView timelineItems={timelineItems} />
          ) : viewMode === "svg" ? (
            <SvgTreeView svgTreeData={svgTreeData} members={members} />
          ) : (
            <TreeView
              membersByGeneration={membersByGeneration}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              getSpouse={getSpouse}
              getChildren={getChildren}
              photos={familyPhotos}
            />
          )}
          <CardGridSection
            title="Family Recipes"
            description="Savor the flavors of our heritage with these cherished family recipes."
            items={familyRecipes}
            renderItem={(recipe: Recipe) => (
              <Card className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      By Member {recipe.memberId}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {recipe.story}
                  </p>
                </CardContent>
              </Card>
            )}
            ctaText="Share Your Recipe"
            ctaAction={() => {}}
          />
          <CardGridSection
            title="Family Reunions"
            description="Join us for our next gathering or share memories from past reunions."
            items={[
              {
                title: "Upcoming Reunion: Summer 2026",
                content:
                  "Plan to join us in Kathmandu for a weekend of celebration.",
                cta: "RSVP Now",
              },
              {
                title: "Past Reunion: April 2024",
                content:
                  "Share your photos and stories from our last gathering.",
                cta: "Upload Photos",
              },
            ]}
            renderItem={(reunion: Reunion) => (
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {reunion.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {reunion.content}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-900/20"
                  >
                    {reunion.cta}
                  </Button>
                </CardContent>
              </Card>
            )}
          />
          <CardGridSection
            title="Family Memory Wall"
            description="Share your favorite family memories, photos, and stories. Help us preserve our heritage for future generations."
            items={[
              {
                type: "photo",
                title: "Family Picnic 2023",
                author: "Shared by Priya",
                content: "Remember our amazing day at the park!",
              },
              {
                type: "story",
                title: "Grandpa's Wisdom",
                author: "Shared by Prakash",
                content:
                  "He always said 'Education is the light that guides us through darkness'",
              },
              {
                type: "recipe",
                title: "Grandma's Dal Bhat",
                author: "Shared by Kamala",
                content: "The secret ingredient was always love and patience",
              },
            ]}
            renderItem={(memory: Memory) => (
              <Card className="bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {memory.type === "photo" && (
                      <Calendar className="h-4 w-4 text-blue-500" />
                    )}
                    {memory.type === "story" && (
                      <BookOpen className="h-4 w-4 text-emerald-500" />
                    )}
                    {memory.type === "recipe" && (
                      <Heart className="h-4 w-4 text-rose-500" />
                    )}
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {memory.author}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {memory.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {memory.content}
                  </p>
                </CardContent>
              </Card>
            )}
            ctaText="Share Your Memory"
            ctaAction={() => {}}
          />
          <FamilyLegacySection />

          {filteredMembers.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                No family members found
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
          <MapSection />
          <div className="text-center mt-16 py-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Family data shared with consent • Living member's information
              protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
