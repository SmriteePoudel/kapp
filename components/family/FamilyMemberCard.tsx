
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp, Heart, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FamilyMember } from "@/types/familytree";

interface FamilyMemberCardProps {
  member: FamilyMember;
  spouse: FamilyMember | null;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export function FamilyMemberCard({
  member,
  spouse,
  isExpanded,
  onToggle,
  children,
}: FamilyMemberCardProps) {
  const isLiving = !member.deathDate;
  const hasChildren = Boolean(children);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm mx-auto lg:max-w-none"
    >
      <Card className="h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardHeader className="text-center p-4">
          <div className="relative mx-auto mb-4">
            <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-amber-200 dark:border-amber-800 group-hover:border-amber-300 dark:group-hover:border-amber-700 transition-colors">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 128px"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                  <Users className="h-8 w-8 text-slate-400" />
                </div>
              )}
            </div>
            {isLiving && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
            )}
          </div>
          <CardTitle className="text-lg md:text-xl text-slate-800 dark:text-slate-100 mb-2">
            {member.name}
          </CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-2">
            <Calendar className="h-4 w-4" />
            <span>
              {member.birthDate.split("-")[0]}
              {member.deathDate && ` - ${member.deathDate.split("-")[0]}`}
              {!member.deathDate && " - Present"}
            </span>
          </div>
          {spouse && (
            <div className="flex items-center justify-center gap-1 text-sm text-rose-600 dark:text-rose-400">
              <Heart className="h-4 w-4" />
              <span>Married to {spouse.name}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-slate-600 dark:text-slate-300 text-center mb-4">
            {isLiving && member.birthDate > "2000-01-01"
              ? "Young family member with bright future ahead."
              : member.bio}
          </p>
          <div className="flex flex-col gap-2">
            {member.slug && (
              <Link href={`/story/${member.slug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 dark:text-rose-400 dark:border-rose-800 dark:hover:bg-rose-900/20 group"
                >
                  <BookOpen className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                  Read Their Story
                </Button>
              </Link>
            )}
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="w-full text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                aria-label={`${
                  isExpanded ? "Hide" : "Show"
                } children of ${member.name}`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Hide Children
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show Children
                  </>
                )}
              </Button>
            )}
          </div>
          <AnimatePresence>
            {isExpanded && hasChildren && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
              >
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Children:
                </h4>
                <div className="space-y-2">{children}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
