import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";

export default function Anniversary() {
  const anniversaries = {
    name: "Krishna & Radha Khanal",
    photo: "/images/bird.png",
    dateOfBirth: "1955-04-20",
    dateOfDeath: "2023-01-15",
    slogan: "Forever in our hearts",
    location: "Kathmandu, Nepal",
  };

  return (
    <section className="relative py-20 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className="space-y-6"
            // initial={{ opacity: 0, x: -50 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-500">
              In Loving Memory
            </h2>
            <p className="text-lg text-slate-300">
              Remembering those who have passed but forever remain in our
              hearts.
            </p>
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              View All Members
            </Button>
          </div>

          {/* Image Card */}
          <div
            className="relative group"
            // initial={{ opacity: 0, x: 50 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden p-0 border-2 border-slate-700 hover:border-amber-500 transition-all duration-300">
              <div className="relative h-[400px]">
                <div className="absolute inset-0 bg-slate-800/30 z-10" />
                <Image
                  src={anniversaries.photo}
                  alt={anniversaries.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900/90 backdrop-blur-lg">
                  <h3 className="text-2xl font-bold text-amber-500">
                    {anniversaries.name}
                  </h3>
                  <p className="text-slate-300 mt-2">{anniversaries.slogan}</p>
                </div>
              </div>

              <div className="p-6 bg-slate-800">
                <div className="space-y-2 text-slate-300">
                  <p className="text-sm">
                    <span className="font-semibold text-amber-500">Born:</span>{" "}
                    {new Date(anniversaries.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-amber-500">
                      Passed:
                    </span>{" "}
                    {new Date(anniversaries.dateOfDeath).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-amber-500">
                      Location:
                    </span>{" "}
                    {anniversaries.location}
                  </p>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
                  >
                    View Tree
                  </Button>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Single Member
                  </Button>
                </div>
              </div>
            </Card>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-500/10 rounded-full blur-xl" />
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 bg-amber-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              // animate={{
              //     y: [0, -20, 0],
              //     opacity: [0.2, 0.8, 0.2]
              // }}
              // transition={{
              //     duration: 3 + Math.random() * 2,
              //     repeat: Infinity,
              //     delay: Math.random() * 2
              // }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
