import { NextResponse } from 'next/server';
import collegesData from '../../colleges.json';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    
    // Find the college in the preloaded dataset
    const college = collegesData.find((c: any) => c.name === name);

    // If a specific pitch exists in the database, return it natively, else return a highly generic fallback.
    const pitch = college?.pitch || "A truly exceptional opportunity awaits you here. With renowned programs and immersive campus culture, you'll be integrated into a deeply supportive community that values ambition. Embrace this chance to define your legacy!";

    return NextResponse.json({ pitch });
  } catch (error: any) {
    console.error("Pitch error:", error);
    return NextResponse.json({ error: error.message, pitch: "Our system is currently unavailable, but this college remains an exceptional recommendation based on your profile." }, { status: 500 });
  }
}
