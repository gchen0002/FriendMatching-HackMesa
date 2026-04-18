import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function run() {
  const dbPath = 'app/colleges.json';
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

  console.log("Generating unique pitches for all colleges...");

  // Generate in batches to respect rate limits
  for (let i = 0; i < data.length; i += 5) {
    const batch = data.slice(i, i + 5);
    await Promise.all(batch.map(async (c) => {
      try {
        const prompt = `Give a compelling 3-4 sentence pitch on why a student should attend ${c.name} in ${c.state}. You MUST strictly reference real resources, actual distinctive academic programs, or unique authentic traditions from this college itself. Be inspiring, direct, and conversational. Respond ONLY with the pitch text.`;
        const res = await model.generateContent(prompt);
        c.pitch = res.response.text().trim();
        console.log("Done:", c.name);
      } catch (err) {
        console.log("Error on:", c.name, err.message);
        c.pitch = `A truly exceptional opportunity awaits you here at ${c.name}. With renowned ${c.tags[0]} and ${c.tags[1]} programs, you'll be integrated into a deeply supportive community that values ambition. Embrace this chance to define your legacy!`;
      }
    }));
    await new Promise(r => setTimeout(r, 2000));
  }

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log("Updated colleges.json with preloaded pitches!");
}

run();
