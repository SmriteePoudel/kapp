"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FamilyMemberCard } from "./FamilyMemberCard";
import { FamilyPhoto } from "@/data/family";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FamilyMember } from "@/types/familytree";

interface TreeViewProps {
  membersByGeneration: Record<number, FamilyMember[]>;
  expandedNodes: Set<number>;
  toggleNode: (memberId: number) => void;
  getSpouse: (spouseId: number | null) => FamilyMember | null;
  getChildren: (parentId: number) => FamilyMember[];
  photos: FamilyPhoto[];
}

export function TreeView({
  membersByGeneration,
  expandedNodes,
  toggleNode,
  getSpouse,
  getChildren,
  photos,
}: TreeViewProps) {
  return (
    <AnimatePresence>
      {Object.entries(membersByGeneration)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([generation, generationMembers]) => (
          <motion.div
            key={generation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2 bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-900/30 dark:to-amber-900/10 text-rose-800 dark:text-rose-300"
              >
                Generation {generation}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {generationMembers.map((member) => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  spouse={getSpouse(member.spouseId)}
                  isExpanded={expandedNodes.has(member.id)}
                  onToggle={() => toggleNode(member.id)}
                >
                  {getChildren(member.id).map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-700/50 rounded"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {child.name.charAt(0)}
                        </span>
                      </div>
                      <span>{child.name}</span>
                      {child.birthDate && (
                        <span className="text-xs">
                          (b. {child.birthDate.split("-")[0]})
                        </span>
                      )}
                    </div>
                  ))}
                </FamilyMemberCard>
              ))}
            </div>
            <div className="mt-8">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                    Family Moments
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo) => (
                      <Dialog key={photo.id}>
                        <DialogTrigger asChild>
                          <div className="relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                            <Image
                              src={photo.image}
                              alt={photo.event}
                              fill
                              className="object-cover hover:scale-105 transition-transform"
                              sizes="(max-width: 640px) 50vw, 33vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <p className="text-white text-sm text-center">
                                {photo.event}
                              </p>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{photo.event}</DialogTitle>
                          </DialogHeader>
                          <div className="relative h-64">
                            <Image
                              src={photo.image}
                              alt={photo.event}
                              fill
                              className="object-cover rounded-lg"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Date: {photo.date} | Members:{" "}
                            {photo.memberIds.join(", ")}
                          </p>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}
