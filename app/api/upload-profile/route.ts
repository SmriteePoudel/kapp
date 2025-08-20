// app/api/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { verifyToken } from "@/lib/auth"; 

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
    if (!req.headers.has("authorization")) {
      return NextResponse.json({ error: "No authorization header provided" }, { status: 401 });
    }
    const authHeader = req.headers.get("authorization"); 
    if (!authHeader) {
      return NextResponse.json({ error: "No authentication token found" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
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
