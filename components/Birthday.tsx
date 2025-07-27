"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Birthday() {
  const [currentBirthdayIndex, setCurrentBirthdayIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedBirthday, setEditedBirthday] = useState({
    name: "",
    birthDate: "",
  });

  const [birthdays, setBirthdays] = useState([
    {
      name: "John Doe",
      birthDate: "1990-01-01",
      photo: "/images/oldman.webp",
    },
    {
      name: "Jane Smith",
      birthDate: "1985-05-15",
      photo: "/images/oldwoman.webp",
    },
    {
      name: "Rajesh Khanal",
      birthDate: "1990-01-01",
      photo: "/images/oldman1.webp",
    },
    {
      name: "Sita Devi Khanal",
      birthDate: "1990-01-01",
      photo: "/images/olwoman2.webp",
    },
    {
      name: "Radha Khanal",
      birthDate: "1993-11-17",
      photo: "/images/oldwoman4.webp",
    },
    {
      name: "Som Khanal",
      birthDate: "1992-12-25",
      photo: "/images/oldman4.webp",
    },
  ]);

  const [randomPositions, setRandomPositions] = useState<
    Array<{ left: string; top: string }>
  >([]);

  useEffect(() => {
    setMounted(true);
    setRandomPositions(
      Array.from({ length: 12 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  return (
    <section className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-amber-600 dark:text-amber-500"
          >
            🎉 Birthdays This Week
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
            Celebrating our amazing community members
          </p>
        </div>

        <div className="relative group">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-14 h-14 border border-slate-300 dark:border-slate-600 hover:border-amber-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              onClick={() =>
                setCurrentBirthdayIndex((prev) =>
                  prev > 0 ? prev - 1 : birthdays.length - 1
                )
              }
            >
              <ArrowLeft className="h-8 w-8 text-amber-600 dark:text-amber-500" />
            </Button>

            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {birthdays.map((birthday, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={cn(
                        "relative group/card overflow-hidden border-2 transition-all p-0",
                        index === currentBirthdayIndex
                          ? "border-amber-500 scale-100 shadow-lg"
                          : "border-slate-300 dark:border-slate-700 scale-95 opacity-80 hover:opacity-100 hover:border-slate-400 dark:hover:border-slate-600"
                      )}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={birthday.photo}
                          alt={birthday.name}
                          fill
                          className="object-cover group-hover/card:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all">
                          <Link href="/familytree">
                            <Button
                              variant="default"
                              className="w-full bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 text-white"
                            >
                              View Family Tree
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="p-6 bg-slate-100 dark:bg-slate-800">
                        <h3 className="text-xl font-bold text-amber-600 dark:text-amber-500">
                          {birthday.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300">
                          <CalendarDays className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                          <p className="text-sm font-medium">
                            {new Date(birthday.birthDate)
                              .toISOString()
                              .split("T")[0]}
                          </p>
                        </div>
                        <div className="absolute top-4 right-4 bg-amber-600 dark:bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium border border-amber-500 dark:border-amber-400">
                          {new Date().getFullYear() -
                            new Date(birthday.birthDate).getFullYear()}{" "}
                          Years
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full"
                          onClick={() => {
                            setEditingIndex(index);
                            setEditedBirthday({
                              name: birthday.name,
                              birthDate: birthday.birthDate,
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-14 h-14 border border-slate-300 dark:border-slate-600 hover:border-amber-500 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              onClick={() =>
                setCurrentBirthdayIndex((prev) =>
                  prev < birthdays.length - 1 ? prev + 1 : 0
                )
              }
            >
              <ArrowRight className="h-8 w-8 text-amber-600 dark:text-amber-500" />
            </Button>
          </div>
        </div>

        {/* Floating animated dots */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            {randomPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 bg-amber-500/20 dark:bg-amber-500/20 rounded-full"
                style={pos}
                animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-amber-600 dark:text-amber-500">
                Edit Birthday
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    value={editedBirthday.name}
                    onChange={(e) =>
                      setEditedBirthday({
                        ...editedBirthday,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Birth Date</label>
                  <input
                    type="date"
                    value={editedBirthday.birthDate}
                    onChange={(e) =>
                      setEditedBirthday({
                        ...editedBirthday,
                        birthDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="ghost" onClick={() => setEditingIndex(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const updated = [...birthdays];
                      updated[editingIndex] = {
                        ...updated[editingIndex],
                        ...editedBirthday,
                      };
                      setBirthdays(updated);
                      setEditingIndex(null);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
