'use client';
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { familyLocations } from "@/data/family";

const DynamicMap = dynamic(() => import("@/components/family/Map"), {
  ssr: false,
});

export function MapSection() {
  return (
    <div className="bg-white dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Our Global Family
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Discover where the Khanal family has spread across the world.
          </p>
        </motion.div>
        <Card className="bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <DynamicMap locations={familyLocations} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
