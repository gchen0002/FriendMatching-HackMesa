import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    // Generates the personalized pitch locally
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Give a compelling 3-4 sentence pitch on why a student should attend ${name}. You MUST strictly reference real resources, actual distinctive academic programs, or unique authentic traditions from this college itself. Be inspiring, direct, and conversational.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ pitch: text.trim() });
  } catch (error: any) {
    console.error("Pitch error:", error);
    return NextResponse.json({ error: error.message, pitch: "This college is fantastic, known for exceptional programs and a booming campus culture." }, { status: 500 });
  }
}
