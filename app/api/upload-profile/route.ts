// app/api/upload/route.ts

// app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies as nextCookies } from "next/headers";
import { writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import {prisma} from "@/lib/prisma";;
import { existsSync } from "fs";
import { verifyToken, getAuthToken } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export async function POST(req: NextRequest) {
  try {
    
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
   
    let token: string | undefined = getAuthToken(req) || (await nextCookies()).get("auth-token")?.value || undefined;
    if (!token && authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
      const parts = authHeader.split(" ");
      token = parts.length > 1 ? parts[1] : undefined;
    }
    
    if (!token || token === 'null' || token === 'undefined') {
      return NextResponse.json({ error: "Authentication required (no cookie or bearer token)" }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token (failed to verify)" }, { status: 401 });
    }


    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({
        error: "Invalid file type",
        allowedTypes: ALLOWED_FILE_TYPES.join(", "),
      }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        error: "File too large",
        maxSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
      }, { status: 400 });
    }


    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = path.parse(file.name).name;
    const extension = path.extname(file.name);
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const safeName = originalName.replace(/\s+/g, "_").replace(/[^\w.-]/g, "").toLowerCase();
    const fileName = `${safeName}-${timestamp}-${randomString}${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const fileStats = await stat(filePath);
    if (fileStats.size === 0) {
      throw new Error("File write failed - empty file");
    }

    const fileUrl = `/uploads/${fileName}`;
    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName,
      fileSize: file.size,
      fileType: file.type,
    });

  } catch (error: any) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
  
  
  
}

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const dirExists = existsSync(uploadDir);

    let stats = null;
    if (dirExists) {
      try {
        stats = await stat(uploadDir);
      } catch (error) {
        console.error("Error getting upload directory stats:", error);
      }
    }

    return NextResponse.json({
      uploadDirectory: {
        exists: dirExists,
        path: uploadDir,
        stats: stats,
      },
      limits: {
        maxFileSize: MAX_FILE_SIZE,
        allowedTypes: ALLOWED_FILE_TYPES,
      },
    });
  } catch (error) {
    console.error("Error checking upload directory:", error);
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }
}