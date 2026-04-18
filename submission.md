# HACKMESA Project Submission

## 1. Project Name

**Mesa**

College and people, matched.

## 2. Reason for Making the Project (Inspiration/Problem Statement)

Choosing a college can feel overwhelming, isolating, and overly academic. Most tools focus on rankings, acceptance rates, or generic search filters, but they do not help students answer a more personal question: "Will I actually belong there, and will I find my people there?"

We built Mesa to make college discovery feel calmer, more human, and more personal. Our goal was to help students move beyond spreadsheets and rankings by matching them to schools based on vibe, size, location, and affordability, then extending that experience into community by showing the kinds of people they might connect with next.

Mesa is especially helpful for high school students, first-generation applicants, and anyone who wants a more intuitive way to explore where they might thrive both academically and socially.

## 3. Project Description

Mesa is a college and social matching prototype built as a guided student journey.

Users start on a landing page, create an account or continue in demo mode, and take a short quiz about what they want in a college experience. Based on their answers, Mesa runs a deterministic matching flow and returns personalized college recommendations. Users can browse matches, search and filter them, save favorites, and view a short "counselor pitch" for why a school fits them.

After that, users select up to three schools they are most serious about. Those selections shape the next part of the experience: a friend-network prototype that surfaces potential peers, shared interests, and lightweight social posts.

Standout features include:

- A personality-driven college matching flow instead of a rankings-first search experience.
- Deterministic school recommendations backed by a Neon Postgres database.
- Sign-in with Clerk plus a demo mode so judges can explore the full product quickly.
- Saved schools and selected-school state for signed-in users.
- A social discovery layer that connects college choice with community-building.
- A polished, interactive UI designed to feel more like a modern student product than a traditional admissions tool.

## 4. Tech Stack

- Frontend: Next.js 16, React 19, JavaScript, TypeScript, CSS
- Backend: Next.js API routes, Node.js runtime
- Database: Neon Postgres
- Authentication: Clerk
- Deployment: Vercel
- Other Tools: GitHub, Next.js App Router, `next/font`

## 5. Source Code / Devpost Link

- Source code: https://github.com/Rio-Astro/FriendMatching-HackMesa
- Live demo: https://friend-matching-hack-mesa.vercel.app
- Devpost: Add submission link here once published

## 6. Challenges & Future Plans

### Challenges

One of the biggest challenges was combining two different ideas into one coherent product: college matching and friend/community matching. We wanted the transition between those experiences to feel natural instead of feeling like two unrelated apps stitched together.

Another challenge was building a matching system that felt personalized while still staying transparent and deterministic. We also had to balance polished frontend work with backend integration, authentication, and persistent user state on a hackathon timeline.

### Future Plans

If we had more time, we would:

- Turn the friend-matching prototype into a fully real network powered by live user profiles instead of static demo data.
- Add mutual matching, direct messaging, and stronger trust-and-safety features like hide, block, and report.
- Expand profile personalization and improve how shared interests are surfaced.
- Improve school data quality, image reliability, and recommendation depth.
- Build tools for counselors or student communities to guide and support users through the process.
