"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CardGridSectionProps<T> {
  title: string;
  description: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  ctaText?: string;
  ctaAction?: () => void;
}

export function CardGridSection<T>({
  title,
  description,
  items,
  renderItem,
  ctaText,
  ctaAction,
}: CardGridSectionProps<T>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16"
    >
      <Card className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-900/10 dark:to-amber-900/10">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {items.map((item, index) => (
              <div key={index}>{renderItem(item)}</div>
            ))}
          </div>
          {ctaText && ctaAction && (
            <div className="text-center">
              <Button
                className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white"
                onClick={ctaAction}
              >
                {ctaText}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
