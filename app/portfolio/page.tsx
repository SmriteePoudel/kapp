"use client";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 py-16 px-4">
      <h1 className="text-4xl font-bold text-amber-600 dark:text-amber-500 mb-4">Portfolio</h1>
      <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 text-center max-w-2xl">
        Welcome to my portfolio! Here you'll find a selection of my recent projects, showcasing my skills in web development, design, and more.
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-400 mb-2">Family Tree App</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">A modern web app to visualize and manage family trees, built with Next.js, TypeScript, and Tailwind CSS.</p>
          <a href="#" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">View Project</a>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-400 mb-2">Personal Blog Platform</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">A customizable blogging platform with markdown support, user authentication, and responsive design.</p>
          <a href="#" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">View Project</a>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-400 mb-2">Photo Gallery</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">A beautiful gallery app to showcase family and event photos, featuring smooth animations and lightbox viewing.</p>
          <a href="#" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">View Project</a>
        </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-400 mb-2">Family History</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">A family history which shows about your family's history, culture and tradition.</p>
          <a href="#" className="text-amber-600 dark:text-amber-400 font-medium hover:underline">View Project</a>
        </div>
      </div>
    </main>
  );
} 