import fs from 'fs';
import google from 'googlethis';

const starterColleges = [
  // Ivies / Similar
  { id: 'u1', name: 'Harvard University', state: 'Cambridge, MA', size: 'Mid · 7k', tuition: '$$$$', band: 'high', tags: ['intellectual','historic','urban'] },
  { id: 'u2', name: 'Stanford University', state: 'Stanford, CA', size: 'Mid · 7k', tuition: '$$$$', band: 'high', tags: ['building','tech','sunny'] },
  { id: 'u3', name: 'Yale University', state: 'New Haven, CT', size: 'Mid · 6k', tuition: '$$$$', band: 'high', tags: ['writing','historic','intellectual'] },
  { id: 'u4', name: 'MIT', state: 'Cambridge, MA', size: 'Small · 4k', tuition: '$$$$', band: 'high', tags: ['building','tech','intense'] },
  { id: 'u5', name: 'Princeton University', state: 'Princeton, NJ', size: 'Small · 5k', tuition: '$$$$', band: 'high', tags: ['intellectual','suburban','traditional'] },
  { id: 'u6', name: 'Columbia University', state: 'New York, NY', size: 'Mid · 8k', tuition: '$$$$', band: 'high', tags: ['urban','intellectual','diverse'] },
  { id: 'u7', name: 'Brown University', state: 'Providence, RI', size: 'Mid · 7k', tuition: '$$$$', band: 'high', tags: ['progressive','open-curriculum','creative'] },
  { id: 'u8', name: 'Cornell University', state: 'Ithaca, NY', size: 'Large · 15k', tuition: '$$$$', band: 'high', tags: ['rural','intense','nature'] },

  // Large Publics
  { id: 'u9', name: 'UC Berkeley', state: 'Berkeley, CA', size: 'Large · 32k', tuition: '$$', band: 'low', tags: ['spirited','tech','progressive'] },
  { id: 'u10', name: 'UCLA', state: 'Los Angeles, CA', size: 'Large · 32k', tuition: '$$', band: 'low', tags: ['spirited','sunny','urban'] },
  { id: 'u11', name: 'University of Michigan', state: 'Ann Arbor, MI', size: 'Large · 32k', tuition: '$$', band: 'mid', tags: ['spirited','college-town','traditional'] },
  { id: 'u12', name: 'UT Austin', state: 'Austin, TX', size: 'Very Large · 40k+', tuition: '$$', band: 'mid', tags: ['spirited','urban','music'] },
  { id: 'u13', name: 'UNC Chapel Hill', state: 'Chapel Hill, NC', size: 'Large · 19k', tuition: '$$', band: 'low', tags: ['spirited','college-town','traditional'] },
  { id: 'u14', name: 'University of Virginia', state: 'Charlottesville, VA', size: 'Large · 17k', tuition: '$$', band: 'mid', tags: ['historic','traditional','spirited'] },
  { id: 'u15', name: 'University of Washington', state: 'Seattle, WA', size: 'Very Large · 32k+', tuition: '$$', band: 'mid', tags: ['urban','nature','tech'] },
  { id: 'u16', name: 'University of Wisconsin', state: 'Madison, WI', size: 'Large · 33k', tuition: '$$', band: 'mid', tags: ['spirited','lake','college-town'] },

  // Liberal Arts
  { id: 'u17', name: 'Williams College', state: 'Williamstown, MA', size: 'Small · 2k', tuition: '$$$$', band: 'high', tags: ['nature','intellectual','close-knit'] },
  { id: 'u18', name: 'Amherst College', state: 'Amherst, MA', size: 'Small · 1.8k', tuition: '$$$$', band: 'high', tags: ['intellectual','open-curriculum','writing'] },
  { id: 'u19', name: 'Swarthmore College', state: 'Swarthmore, PA', size: 'Small · 1.6k', tuition: '$$$$', band: 'high', tags: ['intense','intellectual','suburban'] },
  { id: 'u20', name: 'Pomona College', state: 'Claremont, CA', size: 'Small · 1.7k', tuition: '$$$$', band: 'high', tags: ['sunny','close-knit','creative'] },
  { id: 'u21', name: 'Bowdoin College', state: 'Brunswick, ME', size: 'Small · 1.9k', tuition: '$$$$', band: 'high', tags: ['nature','coastal','close-knit'] },
  { id: 'u22', name: 'Carleton College', state: 'Northfield, MN', size: 'Small · 2k', tuition: '$$$$', band: 'high', tags: ['quirky','intellectual','rural'] },
  { id: 'u23', name: 'Middlebury College', state: 'Middlebury, VT', size: 'Small · 2.5k', tuition: '$$$$', band: 'high', tags: ['nature','outdoorsy','languages'] },
  { id: 'u24', name: 'Macalester College', state: 'St. Paul, MN', size: 'Small · 2.1k', tuition: '$$$', band: 'mid', tags: ['urban','international','civic'] },
  { id: 'u25', name: 'Oberlin College', state: 'Oberlin, OH', size: 'Small · 2.9k', tuition: '$$$', band: 'mid', tags: ['music','progressive','arts-forward'] },
  { id: 'u26', name: 'Kenyon College', state: 'Gambier, OH', size: 'Small · 1.8k', tuition: '$$$', band: 'mid', tags: ['writing','rural','literary'] },
  { id: 'u27', name: 'Reed College', state: 'Portland, OR', size: 'Small · 1.5k', tuition: '$$$$', band: 'high', tags: ['intellectual','quirky','independent'] },
  
  // Mid-sized Private & Special
  { id: 'u28', name: 'USC', state: 'Los Angeles, CA', size: 'Large · 20k', tuition: '$$$$', band: 'high', tags: ['spirited','urban','film'] },
  { id: 'u29', name: 'NYU', state: 'New York, NY', size: 'Large · 27k', tuition: '$$$$', band: 'high', tags: ['urban','independent','creative'] },
  { id: 'u30', name: 'Carnegie Mellon', state: 'Pittsburgh, PA', size: 'Mid · 7k', tuition: '$$$$', band: 'high', tags: ['tech','arts-forward','intense'] },
  { id: 'u31', name: 'Georgetown University', state: 'Washington, DC', size: 'Mid · 7.5k', tuition: '$$$$', band: 'high', tags: ['urban','civic','traditional'] },
  { id: 'u32', name: 'Duke University', state: 'Durham, NC', size: 'Mid · 6.5k', tuition: '$$$$', band: 'high', tags: ['spirited','traditional','intense'] },
  { id: 'u33', name: 'Johns Hopkins', state: 'Baltimore, MD', size: 'Mid · 6k', tuition: '$$$$', band: 'high', tags: ['intense','science','urban'] },
  { id: 'u34', name: 'Vanderbilt University', state: 'Nashville, TN', size: 'Mid · 7k', tuition: '$$$$', band: 'high', tags: ['spirited','city','traditional'] },
  { id: 'u35', name: 'Rice University', state: 'Houston, TX', size: 'Small · 4k', tuition: '$$$$', band: 'high', tags: ['urban','close-knit','science'] },
  { id: 'u36', name: 'Tufts University', state: 'Medford, MA', size: 'Mid · 6k', tuition: '$$$$', band: 'high', tags: ['civic','suburban','intellectual'] },
  { id: 'u37', name: 'Tulane University', state: 'New Orleans, LA', size: 'Mid · 8k', tuition: '$$$$', band: 'high', tags: ['spirited','urban','civic'] },
  { id: 'u38', name: 'Emory University', state: 'Atlanta, GA', size: 'Mid · 7k', tuition: '$$$$', band: 'high', tags: ['urban','health','suburban'] },
  { id: 'u39', name: 'Northwestern University', state: 'Evanston, IL', size: 'Mid · 8k', tuition: '$$$$', band: 'high', tags: ['lake','arts-forward','spirited'] },
  { id: 'u40', name: 'University of Chicago', state: 'Chicago, IL', size: 'Mid · 7.5k', tuition: '$$$$', band: 'high', tags: ['intense','intellectual','urban'] }
];

async function run() {
  console.log("Generating database of " + starterColleges.length + " colleges...");
  for (let c of starterColleges) {
    if (!c.imageUrl) {
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
    }
  }
  
  fs.writeFileSync('app/colleges.json', JSON.stringify(starterColleges, null, 2));
  console.log("Written to app/colleges.json!");
}

run();
