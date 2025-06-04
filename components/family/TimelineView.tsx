"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Users } from "lucide-react";
import { FamilyMember } from "@/types/familytree";
import { FamilyEvent } from "@/data/family";

type TimelineItem =
  | { type: "member"; date: string; data: FamilyMember }
  | { type: "event"; date: string; data: FamilyEvent };

interface TimelineViewProps {
  timelineItems: TimelineItem[];
}

export function TimelineView({ timelineItems }: TimelineViewProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Family Timeline
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Chronological view of our family&apos;s
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 to-rose-500"></div>
        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.type + item.data.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center"
            >
              <div className="absolute left-6 w-4 h-4 bg-white dark:bg-slate-800 border-4 border-amber-500 rounded-full z-10"></div>
              <div className="ml-16 flex-1">
                <Card className="bg-white dark:bg-slate-800">
                  <CardContent className="p-4 flex items-center gap-4">
                    {item.type === "member" ? (
                      <>
                        <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-amber-200 dark:border-amber-800 flex-shrink-0">
                          {item.data.image ? (
                            <Image
                              src={item.data.image}
                              alt={item.data.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 96px, 128px"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                              <Users className="h-6 w-6 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                            {item.data.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Born {item.data.birthDate.split("-")[0]}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                          {item.data.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {item.data.date.split("-")[0]}:{" "}
                          {item.data.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
