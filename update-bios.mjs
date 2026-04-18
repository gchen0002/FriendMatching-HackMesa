import fs from 'fs';

const customBios = {
  'Harvard University': 'Known globally for its rigorous academics and historic legacy. The current trend focuses on expanding interdisciplinary AI and sustainability research.',
  'Stanford University': 'The heart of Silicon Valley, blending top-tier technical education with startup culture. Currently seeing a massive surge in climate-tech incubators.',
  'Yale University': 'Famous for residential colleges and exceptional humanities programs. There is a growing movement around public policy and global affairs initiatives.',
  'MIT': 'A global powerhouse in engineering and physical sciences. The latest campus vibe is intensely focused on robotics, quantum computing, and hackerspaces.',
  'Princeton University': 'Known for its tight-knit undergraduate focus and beautiful gothic campus. Students are heavily leaning into new data science and bioengineering trends.',
  'Columbia University': 'Combines an Ivy League classic education with the vibrant energy of NYC. A strong focus lately on social justice and urban tech innovation.',
  'Brown University': 'Celebrated for its Open Curriculum allowing complete academic freedom. Currently trending with highly experimental media arts and neurotech.',
  'Cornell University': 'The largest Ivy, famous for "any person... any study" in a beautiful gorge setting. Huge growth in agricultural tech and hotel administration.',
  'UC Berkeley': 'A spirited public powerhouse known for student activism and CS. The current trend revolves around massive AI clubs and blockchain research.',
  'UCLA': 'Perfectly blends gorgeous weather, top-tier athletics, and Hollywood proximity. Film and media technology are huge cultural touchstones right now.',
  'University of Michigan': 'Incredible school spirit with a phenomenal college town. Right now, students are highly engaged in automotive tech and sustainable engineering.',
  'UT Austin': 'Deeply spirited with a massive campus in a booming tech hub. The music scene and startup cross-pollination are the defining trends here.',
  'UNC Chapel Hill': 'A beautiful, historic public university with fierce basketball loyalty. Currently seeing major trends in public health and civic engagement.',
  'University of Virginia': 'Known for its historic Jeffersonian campus and strong honor code. A growing push towards data analytics and global commerce programs is trending.',
  'University of Washington': 'Breathtaking nature meets urban tech center. The campus is buzzing with cloud computing research and maritime sustainability projects.',
  'University of Wisconsin': 'Famous for its lakefront student union and incredible game days. There is a huge surge in biotech and environmental conservation movements.',
  'Williams College': 'An elite liberal arts experience nestled in the mountains. Students are currently very focused on environmental studies and close-knit tutorials.',
  'Amherst College': 'Known for its entirely open curriculum and consortium access. A rising trend in interdisciplinary study combining STEM and critical theory.',
  'Swarthmore College': 'Intensely intellectual and famously rigorous in an arboretum setting. Students are leaning heavily into engineering for social good.',
  'Pomona College': 'A sunny, elite liberal arts college in the Claremont Consortium. Trending toward cross-disciplinary neuroscience and creative media projects.',
  'Bowdoin College': 'Famous for its outing club and coastal Maine location. The current student body is highly active in Arctic studies and oceanographic research.',
  'Carleton College': 'Quirky, collaborative, and academically rigorous in the Midwest. There is an ongoing trend of combining computer science with the humanities.',
  'Middlebury College': 'World-renowned for its language schools and international studies. Sustainability and global security are massive themes on campus right now.',
  'Macalester College': 'Urban location with a deeply international, civic-minded student body. Very focused on urban studies, global health, and political activism.',
  'Oberlin College': 'A historic blend of a world-class conservatory and progressivism. The campus is buzzing with experimental music and environmental action.',
  'Kenyon College': 'Celebrated for its literary tradition and stunning rural campus. Creative writing and political science remain the most dominant cultural trends.',
  'Reed College': 'Famously counter-cultural, intellectual, and grade-free. The student body is deeply immersed in thesis projects and niche academic pursuits.',
  'USC': 'A massive network known as the Trojan Family with top film and business programs. The vibe is heavily focused on entertainment tech and startups.',
  'NYU': 'No walls, just the city. Known for Tisch arts and Stern business. The current trend is deeply intertwined with NYC tech hubs and urban art.',
  'Carnegie Mellon': 'Intensely focused on the intersection of computer science and drama. Robotics, AI, and HCI (Human-Computer Interaction) are the major ongoing trends.',
  'Georgetown University': 'Located in the nation’s capital, famous for foreign service. The campus culture is heavily leaning into international policy and ethics in AI.',
  'Duke University': 'A beautiful gothic campus with fierce athletics and top-tier research. Current trends involve global health initiatives and biomedical engineering.',
  'Johns Hopkins': 'The premier destination for pre-med and research. Students are actively driving trends in biotechnology and public health analytics.',
  'Vanderbilt University': 'A happy, spirited campus right in the heart of Nashville. There is a huge trend connecting music, business, and educational tech.',
  'Rice University': 'Known for its residential college system and STEM dominance in Houston. The vibe is cooperative, with huge trends in space science and nanotech.',
  'Tufts University': 'A global-minded university with a strong focus on active citizenship. Current campus trends highlight international relations and veterinary sciences.',
  'Tulane University': 'Famous for its commitment to public service in vibrant New Orleans. The student body is heavily focused on public health and disaster resilience.',
  'Emory University': 'Located next to the CDC, renowned for healthcare and business. The trending campus vibe heavily features biosciences and entrepreneurship.',
  'Northwestern University': 'Sitting right on Lake Michigan, famously splitting focus between journalism, theater, and engineering. Media tech is a defining trend right now.',
  'University of Chicago': 'Famously intense intellectual environment where "fun comes to die" (jokingly). The current trend is a massive expansion into quantum tech and economics.'
};

async function run() {
  const dbPath = 'app/colleges.json';
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  for (let c of data) {
    if (customBios[c.name]) {
      c.bio = customBios[c.name];
    } else {
      c.bio = `Known for its strong ${c.tags[0]} programs and ${c.tags[1]} culture.`;
    }
  }

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log("Updated colleges.json with unique bios!");
}

run();
