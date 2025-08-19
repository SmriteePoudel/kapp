import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

   
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    
    const originalName = path.basename(file.name);
    const timestamp = Date.now();
    const safeName = originalName.replace(/\s+/g, "_").replace(/[^\w.-]/g, "");
    const fileName = `${timestamp}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    
    await writeFile(filePath, buffer);

    
    const fileUrl = `/uploads/${fileName}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
