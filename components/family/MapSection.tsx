'use client';
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
const DynamicMap = dynamic(() => import("@/components/family/Map"), {
  ssr: false,
});

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  members: number[];
}

export function MapSection() {
  const familyLocations: Location[] = [
    { id: 1, name: 'Location 1', lat: 12.34, lng: 56.78, members: [101, 102] },
    { id: 2, name: 'Location 2', lat: 23.45, lng: 67.89, members: [103, 104] },
    // Add more locations as needed
  ];
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
