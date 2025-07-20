"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Users,
  HeartHandshake,
  GalleryThumbnails,
  Mail,
  Search,
  ArrowRight,
  ArrowLeft,
  Heart,
  Star,
  Clock,
  ChefHat,
  Camera,
  User,
  Award,
} from "lucide-react";

const FamilyPagesApp = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const HomePage = () => {
    const pages = [
      {
        title: "Family Tree",
        description:
          "Explore our family lineage through generations with detailed profiles and connections",
        icon: Users,
        link: "family-tree",
        color: "text-rose-500",
        stats: "150+ Members",
      },
      {
        title: "Photo Gallery",
        description:
          "Memorable moments from our family archive spanning decades of celebrations",
        icon: GalleryThumbnails,
        link: "gallery",
        color: "text-amber-500",
        stats: "500+ Photos",
      },
      {
        title: "Family Values",
        description:
          "Core principles and traditions that guide our family through generations",
        icon: HeartHandshake,
        link: "values",
        color: "text-emerald-500",
        stats: "10 Core Values",
      },
      {
        title: "Family Recipes",
        description:
          "Traditional dishes and secret recipes passed down through our heritage",
        icon: BookOpen,
        link: "recipes",
        color: "text-sky-500",
        stats: "25+ Recipes",
      },
    ];

    const filteredPages = pages.filter(
      (page) =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-amber-500/10 dark:from-rose-500/5 dark:to-amber-500/5"></div>
          <div className="container mx-auto px-4 text-center relative">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent dark:from-rose-400 dark:via-purple-400 dark:to-amber-400">
                Family Pages
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Discover the rich tapestry of our family&apos;s story,
                traditions, and memories preserved for generations
              </p>
              {/* Search Bar */}
              <div className="max-w-lg mx-auto mt-12">
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search family content..."
                    className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-lg"
                  />
                  <Search className="absolute left-5 top-5 w-6 h-6 text-slate-400 dark:text-slate-500 group-focus-within:text-rose-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "150+", label: "Family Members", icon: Users },
                { number: "500+", label: "Memories", icon: Camera },
                { number: "75+", label: "Years of History", icon: Clock },
                { number: "25+", label: "Recipes", icon: ChefHat },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-rose-500 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Pages Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-slate-800 dark:text-slate-100">
              Explore Our Family Legacy
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {filteredPages.map((page, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-amber-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <page.icon
                        className={`w-16 h-16 ${page.color} group-hover:scale-110 transition-transform`}
                      />
                      <span className="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                        {page.stats}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                      {page.description}
                    </p>
                    <button
                      onClick={() => setCurrentPage(page.link)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl hover:from-rose-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Explore Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-rose-500 to-amber-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">Stay Connected</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get exclusive family updates, stories, and memories delivered to
              your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border bg-white/20 border-slate-200 text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/20"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-rose-600 rounded-xl hover:bg-slate-100 transition-colors font-semibold shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  };

  // Family Tree Page
  const FamilyTreePage = () => (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => setCurrentPage("home")}
          className="inline-flex items-center gap-2 mb-8 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <Users className="w-20 h-20 mx-auto mb-6 text-rose-500" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Family Tree
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover our family lineage spanning five generations with detailed
            profiles and connections
          </p>
        </div>

        
        <div className="space-y-12">
          {[
            {
              generation: "Great Grandparents",
              members: [
                {
                  name: "William Johnson",
                  birth: "1920",
                  role: "Patriarch",
                  details: "Founded the family business in 1945",
                },
                {
                  name: "Mary Johnson",
                  birth: "1923",
                  role: "Matriarch",
                  details: "Known for her famous apple pie recipe",
                },
              ],
            },
            {
              generation: "Grandparents",
              members: [
                {
                  name: "Robert Johnson",
                  birth: "1945",
                  role: "Family Historian",
                  details: "Documented our family history",
                },
                {
                  name: "Susan Johnson",
                  birth: "1948",
                  role: "Community Leader",
                  details: "Volunteer at local library for 30 years",
                },
                {
                  name: "Michael Davis",
                  birth: "1943",
                  role: "War Veteran",
                  details: "Served in Vietnam, received Purple Heart",
                },
                {
                  name: "Linda Davis",
                  birth: "1946",
                  role: "Teacher",
                  details: "Elementary school teacher for 35 years",
                },
              ],
            },
            {
              generation: "Parents",
              members: [
                {
                  name: "David Johnson",
                  birth: "1970",
                  role: "Engineer",
                  details: "Software engineer, loves hiking",
                },
                {
                  name: "Jennifer Johnson",
                  birth: "1972",
                  role: "Doctor",
                  details: "Pediatrician, marathon runner",
                },
                {
                  name: "Sarah Davis",
                  birth: "1975",
                  role: "Artist",
                  details: "Professional photographer and painter",
                },
                {
                  name: "Mark Davis",
                  birth: "1973",
                  role: "Chef",
                  details: "Owns local restaurant, cookbook author",
                },
              ],
            },
          ].map((gen, genIndex) => (
            <div
              key={genIndex}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100 text-center">
                {gen.generation}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gen.members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2 text-slate-800 dark:text-slate-100">
                      {member.name}
                    </h3>
                    <p className="text-center text-slate-600 dark:text-slate-300 mb-2">
                      Born: {member.birth}
                    </p>
                    <p className="text-center text-rose-600 dark:text-rose-400 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                      {member.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );

  // Photo Gallery Page
  const GalleryPage = () => (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => setCurrentPage("home")}
          className="inline-flex items-center gap-2 mb-8 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <GalleryThumbnails className="w-20 h-20 mx-auto mb-6 text-amber-500" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Photo Gallery
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Treasured moments captured through the decades of family
            celebrations and milestones
          </p>
        </div>

        {/* Gallery Categories */}
        <div className="space-y-16">
          {[
            {
              category: "Family Celebrations",
              description:
                "Birthdays, anniversaries, and special occasions that brought us together",
              photos: [
                {
                  title: "Golden Anniversary",
                  year: "2023",
                  description:
                    "Grandparents' 50th wedding anniversary celebration",
                  image: "/images/group.jpeg",
                },
                {
                  title: "Christmas 2024",
                  year: "2024",
                  description: "Our annual Christmas family gathering",
                  image: "/images/group.jpeg",
                },
                {
                  title: "Family Reunion",
                  year: "2022",
                  description: "The biggest family gathering in 20 years",
                  image: "/images/group.jpeg",
                },
                {
                  title: "Birthday Bash",
                  year: "2023",
                  description: "Uncle Mike's surprise 50th birthday party",
                  image: "/images/group.jpeg",
                },
              ],
            },
            {
              category: "Travel Adventures",
              description:
                "Family trips and vacations that created lasting memories",
              photos: [
                {
                  title: "European Journey",
                  year: "2023",
                  description: "Three-week tour of France, Italy, and Spain",
                  image: "/images/group.jpeg",
                },
                {
                  title: "National Parks Tour",
                  year: "2022",
                  description: "Visiting Yellowstone and Grand Canyon",
                  image: "/images/group.jpeg",
                },
                {
                  title: "Beach Vacation",
                  year: "2024",
                  description: "Annual summer trip to the coast",
                  image: "/images/group.jpeg",
                },
                {
                  title: "Mountain Retreat",
                  year: "2023",
                  description: "Camping in the Rocky Mountains",
                  image: "/images/group.jpeg",
                },
              ],
            },
            {
              category: "Historical Moments",
              description:
                "Significant family milestones and achievements through the years",
              photos: [
                {
                  title: "Wedding Day",
                  year: "1995",
                  description: "Mom and Dad's beautiful wedding ceremony",
                  image: "/images/group.jpeg",
                },
                {
                  title: "Graduation Day",
                  year: "2020",
                  description: "First family member to graduate college",
                  image: "/images/group.jpeg",
                },
                {
                  title: "New Home",
                  year: "2018",
                  description: "Moving into our forever family home",
                  image: "/images/group.jpeg",
                },
                {
                  title: "Baby's First Steps",
                  year: "2021",
                  description: "Capturing precious first moments",
                  image: "/images/group.jpeg",
                },
              ],
            },
          ].map((category, catIndex) => (
            <div
              key={catIndex}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                {category.category}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                {category.description}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.photos.map((photo, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover rounded-xl"
                        fill
                      />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">
                      {photo.year}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {photo.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );

  // Family Values Page
  const ValuesPage = () => (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => setCurrentPage("home")}
          className="inline-flex items-center gap-2 mb-8 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <HeartHandshake className="w-20 h-20 mx-auto mb-6 text-emerald-500" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Family Values
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            The core principles and traditions that have guided our family
            through generations
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              value: "Love & Compassion",
              icon: Heart,
              description:
                "We lead with love in all our interactions and show compassion to those in need.",
              example:
                "Supporting each other through difficult times and celebrating successes together.",
            },
            {
              value: "Integrity & Honesty",
              icon: Star,
              description:
                "We value truth and transparency in all our relationships and endeavors.",
              example:
                "Always being truthful with each other and taking responsibility for our actions.",
            },
            {
              value: "Respect & Understanding",
              icon: Users,
              description:
                "We respect different perspectives and strive to understand before being understood.",
              example:
                "Listening actively to family members and valuing diverse opinions and experiences.",
            },
            {
              value: "Gratitude & Appreciation",
              icon: Award,
              description:
                "We express gratitude for our blessings and appreciate the small moments.",
              example:
                "Regular family gratitude circles and acknowledging each other's contributions.",
            },
            {
              value: "Growth & Learning",
              icon: BookOpen,
              description:
                "We embrace continuous learning and personal growth throughout our lives.",
              example:
                "Encouraging education, trying new experiences, and learning from mistakes.",
            },
            {
              value: "Unity & Support",
              icon: HeartHandshake,
              description:
                "We stand together as a family unit and support each other's dreams.",
              example:
                "Being present for important events and offering help when family members need it.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
            >
              <item.icon className="w-12 h-12 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                {item.value}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {item.description}
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                  In Practice:
                </h4>
                <p className="text-emerald-700 dark:text-emerald-400 text-sm">
                  {item.example}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Family Motto */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Our Family Motto</h2>
          <p className="text-2xl italic mb-4">
            Together we grow, together we thrive.
          </p>
          <p className="text-lg opacity-90">
            This motto reminds us that our strength comes from unity and that we
            achieve more when we support each other.
          </p>
        </div>
      </div>
    </main>
  );

  // Family Recipes Page
  const RecipesPage = () => (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-white dark:from-slate-900 dark:to-slate-800 -mt-[900px]">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => setCurrentPage("home")}
          className="inline-flex items-center gap-2 mb-8 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <ChefHat className="w-20 h-20 mx-auto mb-6 text-sky-500" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            Family Recipes
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Traditional dishes and secret recipes passed down through
            generations of our family
          </p>
        </div>

        {/* Recipe Categories */}
        <div className="space-y-16">
          {[
            {
              category: "Grandma's Classics",
              description:
                "Time-tested recipes that have been family favorites for decades",
              recipes: [
                {
                  name: "Famous Apple Pie",
                  origin: "Great Grandma Mary (1950s)",
                  description:
                    "The secret is in the cinnamon-sugar blend and double crust technique",
                  difficulty: "Medium",
                  time: "3 hours",
                },
                {
                  name: "Sunday Pot Roast",
                  origin: "Grandma Susan (1970s)",
                  description:
                    "Slow-cooked with root vegetables and secret herb blend",
                  difficulty: "Easy",
                  time: "4 hours",
                },
                {
                  name: "Chocolate Chip Cookies",
                  origin: "Aunt Linda (1980s)",
                  description:
                    "Crispy outside, chewy inside - the perfect cookie texture",
                  difficulty: "Easy",
                  time: "1 hour",
                },
              ],
            },
            {
              category: "Holiday Specials",
              description:
                "Traditional dishes that make our holiday celebrations memorable",
              recipes: [
                {
                  name: "Christmas Sugar Cookies",
                  origin: "Family tradition since 1960s",
                  description:
                    "Decorated with royal icing, made together every December",
                  difficulty: "Medium",
                  time: "5 hours",
                },
                {
                  name: "Thanksgiving Stuffing",
                  origin: "Uncle Robert's recipe (1990s)",
                  description:
                    "Sage and sausage stuffing that's requested every year",
                  difficulty: "Medium",
                  time: "2 hours",
                },
                {
                  name: "Easter Honey Ham",
                  origin: "Traditional family method",
                  description:
                    "Glazed with honey and brown sugar, perfectly caramelized",
                  difficulty: "Hard",
                  time: "6 hours",
                },
              ],
            },
            {
              category: "Modern Favorites",
              description:
                "New recipes that have become family favorites in recent years",
              recipes: [
                {
                  name: "Fusion Tacos",
                  origin: "Cousin Maria's creation (2020)",

                  description:
                    "Asian-Mexican fusion with Korean BBQ beef and kimchi slaw",
                  difficulty: "Medium",
                  time: "2 hours",
                },
                {
                  name: "Quinoa Power Bowl",
                  origin: "Sister Sarah's healthy twist (2019)",
                  description:
                    "Nutritious bowl with roasted vegetables and tahini dressing",
                  difficulty: "Easy",
                  time: "45 minutes",
                },
                {
                  name: "Artisan Pizza",
                  origin: "Dad's weekend project (2021)",
                  description:
                    "Homemade sourdough crust with seasonal toppings",
                  difficulty: "Hard",
                  time: "24 hours (with rising)",
                },
              ],
            },
          ].map((category, catIndex) => (
            <div
              key={catIndex}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                {category.category}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                {category.description}
              </p>
              <div className="grid lg:grid-cols-3 gap-6">
                {category.recipes.map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <ChefHat className="w-8 h-8 text-sky-500" />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          recipe.difficulty === "Easy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : recipe.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {recipe.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-sky-600 dark:text-sky-400 mb-3">
                      {recipe.origin}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                      {recipe.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Sharing Section */}
        <div className="mt-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl shadow-2xl p-12 text-white text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Share Your Recipe</h2>
          <p className="text-xl mb-8 opacity-90">
            Have a family recipe to add to our collection? We&apos;d love to
            preserve it for future generations!
          </p>
          <button className="px-8 py-4 bg-white text-sky-600 rounded-xl hover:bg-slate-100 transition-colors font-semibold shadow-lg">
            Submit Recipe
          </button>
        </div>
      </div>
    </main>
  );

  // Main App Component
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {currentPage === "home" && <HomePage />}
      {currentPage === "family-tree" && <FamilyTreePage />}
      {currentPage === "gallery" && <GalleryPage />}
      {currentPage === "values" && <ValuesPage />}
      {currentPage === "recipes" && <RecipesPage />}
    </div>
  );
};

export default FamilyPagesApp;
