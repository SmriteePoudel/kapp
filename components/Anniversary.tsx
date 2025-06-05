import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Anniversary() {
  const anniversaries = {
    name: "Krishna & Radha Khanal",
    photo: "/images/krishna.png",
    dateOfBirth: "1955-04-20",
    dateOfDeath: "2023-01-15",
    slogan: "Forever in our hearts",
    location: "Kathmandu, Nepal",
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-600 dark:text-amber-500">
              In Loving Memory
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Remembering those who have passed but forever remain in our
              hearts.
            </p>
            <Link href="/members">
              <Button
                size="lg"
                className="bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-600/30 dark:hover:shadow-amber-500/30 transition-all"
              >
                View All Members
              </Button>
            </Link>
          </div>
          <Card className="overflow-hidden p-0 border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-amber-500 transition-all duration-300">
            <div className="relative h-[400px]">
              <Image
                src={anniversaries.photo}
                alt={anniversaries.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-4 bg-slate-100 dark:bg-slate-800">
              <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-500">
                {anniversaries.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {anniversaries.slogan}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {anniversaries.dateOfBirth} - {anniversaries.dateOfDeath}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {anniversaries.location}
              </p>
              <div className="flex gap-4">
                <Link href="/familytree">
                  <Button
                    variant="outline"
                    className="border-amber-600 dark:border-amber-200 text-amber-600 dark:text-white hover:bg-amber-50 dark:hover:bg-amber-900/10"
                  >
                    View Tree
                  </Button>
                </Link>
                <Button className="bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 text-white">
                  Single Member
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
