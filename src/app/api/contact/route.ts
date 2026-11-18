import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting store (IP -> timestamp)
const rateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous-ip";
    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip) || 0;

    // Rate limit: 1 request every 8 seconds per IP
    if (now - lastRequest < 8000) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few moments before submitting again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      message,
      preferredContact,
      honeypot,
    } = body;

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide at least 10 characters describing your project." },
        { status: 400 }
      );
    }

    // Update rate limit
    rateLimitMap.set(ip, now);

    if (rateLimitMap.size > 1000) {
      rateLimitMap.clear();
    }

    // Structured logging for inquiry tracking
    console.log("========================================");
    console.log("[NEW CLIENT INQUIRY RECEIVED]");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Client: ${name.trim()} <${email.trim()}>`);
    console.log(`Company: ${company?.trim() || "N/A"}`);
    console.log(`Service: ${projectType || "General Web"}`);
    console.log(`Budget: ${budget || "Not Specified"}`);
    console.log(`Timeline: ${timeline || "Flexible"}`);
    console.log(`Preferred Contact: ${preferredContact || "Email"}`);
    console.log(`Description: ${message.trim()}`);
    console.log("========================================");

    // Optional webhook or transactional email notification:
    // If process.env.INQUIRY_WEBHOOK_URL or process.env.RESEND_API_KEY is configured, trigger notification
    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `**New Portfolio Inquiry**\n**From:** ${name} (${email})\n**Service:** ${projectType}\n**Budget:** ${budget}\n**Timeline:** ${timeline}\n**Message:** ${message}`,
          }),
        });
      } catch (webhookErr) {
        console.error("Webhook notification error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your project inquiry has been received. I'll review the details and get back to you soon.",
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error while processing your inquiry." },
      { status: 500 }
    );
  }
}
