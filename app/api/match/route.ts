import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { answers, quizDetails } = await request.json();
    
    // Read local database
    const dbPath = path.join(process.cwd(), 'app', 'colleges.json');
    let collegesData: any[] = [];
    try {
      collegesData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (err) {
      console.warn("Could not read colleges.json, falling back empty");
    }

    // Programmatic matching algorithm
    // 1. Filter by location if specified
    const filteredColleges = collegesData.filter(c => {
      if (answers.q9 && answers.q9 !== 'Any') {
        return c.state.endsWith(answers.q9);
      }
      return true;
    });

    // We assign points to each college based on user properties
    const matches = filteredColleges.map(c => {
      let score = 50; // base score

      // Scale (q2): A: small, B: mid, C: large, D: very large
      if (answers.q2 === 'A' && c.size.includes('Small')) score += 15;
      if (answers.q2 === 'B' && c.size.includes('Mid')) score += 15;
      if (answers.q2 === 'C' && c.size.includes('Large') && !c.size.includes('Very')) score += 15;
      if (answers.q2 === 'D' && c.size.includes('Very Large')) score += 15;

      // Budget (q4): A: Very important (low/mid), B: kinda, C/D: NA
      if (answers.q4 === 'A' && c.band === 'low') score += 12;
      if (answers.q4 === 'A' && c.band === 'mid') score += 6;
      if (answers.q4 === 'B' && (c.band === 'low' || c.band === 'mid')) score += 8;

      // Vibe (q5): A: intellectual, B: creative, C: outdoorsy, D: spirited
      if (answers.q5 === 'A' && c.tags.includes('intellectual')) score += 12;
      if (answers.q5 === 'B' && (c.tags.includes('creative') || c.tags.includes('arts-forward'))) score += 12;
      if (answers.q5 === 'C' && (c.tags.includes('nature') || c.tags.includes('outdoorsy') || c.tags.includes('lake') || c.tags.includes('coastal'))) score += 12;
      if (answers.q5 === 'D' && c.tags.includes('spirited')) score += 12;

      // Location (q3): A: town, B: near city, C: city, D: nature
      if (answers.q3 === 'A' && c.tags.includes('college-town')) score += 8;
      if (answers.q3 === 'C' && c.tags.includes('urban')) score += 8;
      if (answers.q3 === 'D' && (c.tags.includes('rural') || c.tags.includes('nature'))) score += 8;

      // General tags match
      let matchedTag = '';
      ['intellectual','tech','creative','spirited','nature','urban','historic','close-knit','writing'].forEach(t => {
        if (c.tags.includes(t)) {
          score += 2;
          if (!matchedTag) matchedTag = t;
        }
      });

      // Cap at 99
      score = Math.min(99, score + Math.floor(Math.random() * 5)); 

      return {
        ...c,
        score,
        why: c.bio
      };
    });

    // Sort by score
    matches.sort((a, b) => b.score - a.score);

    // Return top 8
    return NextResponse.json(matches.slice(0, 8));

  } catch (error: any) {
    console.error("Match error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
