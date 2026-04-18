import fs from 'fs';
import google from 'googlethis';

const newColleges = [
  // UCs
  { id: 'uc3', name: 'UC San Diego', state: 'La Jolla, CA', size: 'Large · 33k', tuition: '$$', band: 'low', tags: ['coastal','tech','intellectual'], bio: 'Famous for stunning coastal views and rigorous STEM programs. Currently seeing massive growth in cognitive science and oceanographic tech.' },
  { id: 'uc4', name: 'UC Santa Barbara', state: 'Santa Barbara, CA', size: 'Large · 23k', tuition: '$$', band: 'low', tags: ['coastal','spirited','active'], bio: 'Perched on the cliffs overlooking the Pacific, balancing fierce academics with a renowned social scene. There is a trending focus on environmental science and physics.' },
  { id: 'uc5', name: 'UC Irvine', state: 'Irvine, CA', size: 'Large · 30k', tuition: '$$', band: 'low', tags: ['suburban','tech','creative'], bio: 'Known for its giant circular campus and powerhouse esports program. Trending heavily in tech incubation, game design, and cybersecurity.' },
  { id: 'uc6', name: 'UC Davis', state: 'Davis, CA', size: 'Large · 31k', tuition: '$$', band: 'low', tags: ['nature','college-town','active'], bio: 'The ultimate quintessential college town famous for its bicycles and agricultural prestige. Massive trends currently in sustainable farming and veterinary sciences.' },
  { id: 'uc7', name: 'UC Santa Cruz', state: 'Santa Cruz, CA', size: 'Large · 19k', tuition: '$$', band: 'low', tags: ['nature','progressive','creative'], bio: 'Nestled completely inside a redwood forest with a deep counter-cultural history. Video game design and astrophysics are buzzing trends among students.' },
  { id: 'uc8', name: 'UC Riverside', state: 'Riverside, CA', size: 'Large · 23k', tuition: '$$', band: 'low', tags: ['diverse','suburban','active'], bio: 'One of the most diverse and rapidly climbing research universities in the UC system. Currently heavily trending in citrus research and public health initiatives.' },
  { id: 'uc9', name: 'UC Merced', state: 'Merced, CA', size: 'Mid · 9k', tuition: '$$', band: 'low', tags: ['close-knit','new','nature'], bio: 'The newest UC campus sitting near Yosemite, offering immense hands-on research. There is a huge push toward sustainability and mechanical engineering.' },
  
  // CSUs
  { id: 'csu1', name: 'Cal Poly San Luis Obispo', state: 'San Luis Obispo, CA', size: 'Large · 22k', tuition: '$', band: 'low', tags: ['tech','outdoorsy','active'], bio: 'Renowned for its "Learn by Doing" motto and fiercely competitive engineering programs. Aerospace and green architecture are massive trends here.' },
  { id: 'csu2', name: 'San Diego State University', state: 'San Diego, CA', size: 'Very Large · 36k', tuition: '$', band: 'low', tags: ['spirited','sunny','active'], bio: 'A highly spirited, beautiful campus with deep athletic traditions and greek life. Currently buzzing with international business and physical therapy trends.' },
  { id: 'csu3', name: 'Cal State Long Beach', state: 'Long Beach, CA', size: 'Very Large · 39k', tuition: '$', band: 'low', tags: ['coastal','creative','diverse'], bio: 'Often referred to as "The Beach," boasting incredible art, nursing, and business programs. The campus trend heavily features marine biology and graphic design.' },
  { id: 'csu4', name: 'San Jose State University', state: 'San Jose, CA', size: 'Very Large · 36k', tuition: '$', band: 'low', tags: ['urban','tech','industry'], bio: 'Sitting directly in the heart of downtown San Jose, acting as a direct pipeline to Silicon Valley. Software engineering and animation are hyper-competitive trends.' },
  { id: 'csu5', name: 'Cal Poly Pomona', state: 'Pomona, CA', size: 'Large · 29k', tuition: '$', band: 'low', tags: ['tech','hands-on','diverse'], bio: 'Known for spectacular polytechnic programs and its own horse Arabian center. Hospitality management and civil engineering are currently booming.' },
  { id: 'csu6', name: 'CSU Fullerton', state: 'Fullerton, CA', size: 'Very Large · 41k', tuition: '$', band: 'low', tags: ['suburban','diverse','active'], bio: 'The largest CSU campus with renowned communications and education colleges. Current trends include booming growth in the cinematic and performing arts.' },
  { id: 'csu7', name: 'San Francisco State University', state: 'San Francisco, CA', size: 'Large · 25k', tuition: '$', band: 'low', tags: ['urban','creative','progressive'], bio: 'A deeply progressive campus with iconic roots in ethnic studies and writing. The vibe heavily leans into broadcast media and social justice advocacy.' },
  { id: 'csu8', name: 'Fresno State', state: 'Fresno, CA', size: 'Large · 24k', tuition: '$', band: 'low', tags: ['nature','spirited','diverse'], bio: 'Deeply connected to the Central Valley with spectacular agriculture and winemaking programs. Athletic spirit and criminology are major pillars on campus.' },
  { id: 'csu9', name: 'Sacramento State', state: 'Sacramento, CA', size: 'Large · 31k', tuition: '$', band: 'low', tags: ['urban','civic','spirited'], bio: 'Sitting right in the state capital beneath thousands of trees. Public policy, criminal justice, and nursing are extremely popular campus trends.' },
  { id: 'csu10', name: 'CSU Northridge', state: 'Northridge, CA', size: 'Very Large · 38k', tuition: '$', band: 'low', tags: ['urban','creative','diverse'], bio: 'Located in the core of the Valley, holding massive influence in music and film industries. The campus is widely trending for its exceptional Deaf studies program.' },
  { id: 'csu11', name: 'Cal State LA', state: 'Los Angeles, CA', size: 'Large · 27k', tuition: '$', band: 'low', tags: ['urban','diverse','hands-on'], bio: 'An incredibly diverse urban campus known for profound upward mobility. Nursing, engineering, and criminal justice are rapid growth trends here.' },
  { id: 'csu12', name: 'Chico State', state: 'Chico, CA', size: 'Large · 15k', tuition: '$', band: 'low', tags: ['college-town','nature','spirited'], bio: 'A beautiful, traditional northern California college town wrapped in nature. Renowned for its robust construction management and spirited social scene.' },
  { id: 'csu13', name: 'CSU San Marcos', state: 'San Marcos, CA', size: 'Large · 16k', tuition: '$', band: 'low', tags: ['suburban','new','diverse'], bio: 'A rapidly expanding modern campus sitting in the foothills of North San Diego. A massive rising trend resides in their modern nursing and active duty veteran programs.' },
  { id: 'csu14', name: 'Sonoma State', state: 'Rohnert Park, CA', size: 'Mid · 7k', tuition: '$', band: 'low', tags: ['nature','close-knit','arts-forward'], bio: 'Situated right in the heart of Wine Country offering distinct, liberal-arts style classes. Wine business and education are incredibly popular trends.' },
  { id: 'csu15', name: 'CSU Monterey Bay', state: 'Seaside, CA', size: 'Mid · 7k', tuition: '$', band: 'low', tags: ['coastal','nature','close-knit'], bio: 'A wildly unique campus built on a former army base directly near the ocean. Boasts phenomenal marine science and cinematic arts trends.' },
  { id: 'csu16', name: 'CSU East Bay', state: 'Hayward, CA', size: 'Large · 14k', tuition: '$', band: 'low', tags: ['suburban','diverse','tech'], bio: 'Sitting on the hills overlooking the bay with immense diversity and hands-on academics. Known for surging trends in business administration and computer science.' },
  { id: 'csu17', name: 'CSU San Bernardino', state: 'San Bernardino, CA', size: 'Large · 19k', tuition: '$', band: 'low', tags: ['suburban','diverse','industry'], bio: 'Serving the vast Inland Empire with incredible business and supply-chain logistics tracking. National security studies is a remarkably unique and prominent trend here.' },
  { id: 'csu18', name: 'Cal Poly Humboldt', state: 'Arcata, CA', size: 'Mid · 5k', tuition: '$', band: 'low', tags: ['nature','progressive','outdoorsy'], bio: 'Surrounded entirely by sweeping ancient redwood forests and ocean. Forestry, oceanography, and environmental sciences are the undisputed core cultural trends.' },
  { id: 'csu19', name: 'CSU Bakersfield', state: 'Bakersfield, CA', size: 'Mid · 9k', tuition: '$', band: 'low', tags: ['suburban','diverse','industry'], bio: 'A crucial higher-education center for the southern Central Valley. Geological sciences and petroleum engineering are incredibly distinct ongoing campus trends.' },
  { id: 'csu20', name: 'Stanislaus State', state: 'Turlock, CA', size: 'Mid · 10k', tuition: '$', band: 'low', tags: ['suburban','diverse','close-knit'], bio: 'A beautifully landscaped, park-like campus serving the local agricultural region. Currently seeing tremendous growth in nursing and local business integration.' },
  { id: 'csu21', name: 'CSU Dominguez Hills', state: 'Carson, CA', size: 'Large · 17k', tuition: '$', band: 'low', tags: ['urban','diverse','hands-on'], bio: 'Positioned dynamically in the South Bay region of Los Angeles. Phenomenal ongoing trends focus on teacher education, nursing, and sociology.' },
  { id: 'csu22', name: 'CSU Channel Islands', state: 'Camarillo, CA', size: 'Mid · 7k', tuition: '$', band: 'low', tags: ['coastal','new','close-knit'], bio: 'The newest CSU, boasting a gorgeous historic Spanish-architecture campus near the coast. Deeply focused on interdisciplinary learning and mechatronics.' },
  { id: 'csu23', name: 'Cal Maritime Academy', state: 'Vallejo, CA', size: 'Small · 1k', tuition: '$', band: 'low', tags: ['coastal','industry','hands-on'], bio: 'A highly specialized, maritime academy directly on the bay. Students literally learn on a training ship with major trends focused on global logistics and marine engineering.' }
];

async function run() {
  const dbPath = 'app/colleges.json';
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  console.log("Fetching images for 30 new CA colleges...");
  for (let c of newColleges) {
    try {
      console.log("Fetching img for", c.name);
      const res = await google.image(c.name + ' campus exterior beautiful', { safe: false });
      if (res && res.length > 0) {
        c.imageUrl = res[0].url;
      } else {
        c.imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random`;
      }
    } catch (err) {
      console.log("Error on", c.name);
      c.imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random`;
    }
    // Wait to not ratelimit google
    await new Promise(r => setTimeout(r, 700));
    
    // push to top so they show up easily during testing
    data.push(c);
  }

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log("Updated colleges.json with ALL UCs and CSUs!");
}

run();
