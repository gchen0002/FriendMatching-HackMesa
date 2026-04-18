import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function run() {
  const dbPath = 'app/colleges.json';
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  // Use the fast 2.5 flash model
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

  console.log("Generating unique bios for 40 colleges...");

  // Generate in batches of 10 to respect rate limits
  for (let i = 0; i < data.length; i += 10) {
    const batch = data.slice(i, i + 10);
    await Promise.all(batch.map(async (c) => {
      try {
        const prompt = `Write a single, compelling 2-sentence bio for ${c.name} (${c.state}). It should highlight what the college is best known for academically or culturally, and mention a current trend or vibe there. Keep it snappy, engaging, and under 250 characters.`;
        const res = await model.generateContent(prompt);
        c.bio = res.response.text().trim();
        console.log("Done:", c.name);
      } catch (err) {
        console.log("Error on:", c.name, err.message);
        c.bio = `Known for its strong ${c.tags[0]} programs and ${c.tags[1]} culture.`;
      }
    }));
    await new Promise(r => setTimeout(r, 2000));
  }

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log("Updated colleges.json with unique bios!");
}

run();
