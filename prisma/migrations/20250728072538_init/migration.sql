-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "role" TEXT,
    "relationship" TEXT,
    "spouseName" TEXT,
    "children" INTEGER,
    "fullBio" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "career" TEXT[],
    "skills" TEXT[],
    "languages" TEXT[],
    "hobbies" TEXT[],
    "personality" TEXT[],

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_slug_key" ON "Member"("slug");

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
