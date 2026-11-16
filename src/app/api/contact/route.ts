import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting store (IP -> timestamp)
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous-ip";
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip) || 0;

    // Rate limit: 1 request every 10 seconds per IP
    if (now - lastRequest < 10000) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few moments before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, projectType, budget, message, honeypot } = body;

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide a valid name (at least 2 characters)." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Project description should be at least 10 characters." }, { status: 400 });
    }

    // Update rate limit
    rateLimitMap.set(ip, now);

    // Clean up stale rate limit entries occasionally
    if (rateLimitMap.size > 1000) {
      rateLimitMap.clear();
    }

    console.log(`[CONTACT INQUIRY] From: ${name} (${email}) | Type: ${projectType} | Budget: ${budget || "N/A"}`);
    console.log(`[MESSAGE]: ${message}`);

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out, Suvradip will review your project details and respond promptly.",
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred while processing your message." },
      { status: 500 }
    );
  }
}
