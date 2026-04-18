# HackMESA Data + API Plan

## Recommended Stack

- Frontend/runtime: Next.js on Vercel
- Auth: Clerk
- Primary database: Postgres, ideally Vercel Postgres or Neon
- File storage: Vercel Blob for school images
- Canonical external stats source: College Scorecard API
- Optional AI generation: server-side only for labeled synthetic vibe cards

## Why This Stack

- The current app is a Next.js app with a local `app/api/match/route.ts` and a static `app/colleges.json` file.
- The school catalog, stats, saved schools, and synthetic school content fit relational storage better than Convex.
- Clerk works well for login without forcing the main data model into a realtime database.
- Vercel Blob is a better fit than Convex for image files because the app can store only URL references in Postgres.

## Main Recommendation

Use `Clerk + Postgres + Vercel Blob` for launch.

Do not use Convex as the main school database.

If realtime social features become core later, such as live chat or live post feeds, then add Convex later for that specific surface instead of making it the source of truth for schools and stats.

## School Data Strategy

Start with a curated catalog, not the full national college universe.

Suggested launch size:

- 100 to 500 schools

For each school, store:

- identity fields: name, slug, state, city, school type
- matching fields: tags, size bucket, tuition bucket, vibe labels
- stats fields: tuition, acceptance rate, graduation rate, median earnings, enrollment
- outbound links: official site, admissions site, US News page
- assets: image URL
- generated content: labeled synthetic vibe cards or summaries

## External APIs To Use

### 1. College Scorecard API

Use this as the main factual stats source.

Best fields to ingest for launch:

- school name and identifiers
- city/state
- control: public/private
- size/enrollment
- net price / average cost
- admission rate
- graduation rate
- median earnings after attendance
- SAT/ACT ranges if available

Use it in a server-side sync job, not directly from the client.

### 2. US News

Use US News only as an outbound link stored per school.

Do not scrape or use it as a structured data source.

### 3. Official School Websites

Use these as manual verification sources for:

- admissions URL
- application deadlines
- program highlights
- image selection if you have usage rights

## Content Rules

- No scraped Reddit content
- No paraphrased Reddit content presented as real student reviews
- If you want community-style content, generate fully synthetic school vibe cards and label them clearly
- Generated content should be based on approved structured school inputs, not copied from public user posts

Recommended label:

- `Simulated student vibe card`

## Database Shape

### `schools`

Core school record.

Suggested columns:

- `id`
- `slug`
- `name`
- `city`
- `state`
- `control`
- `size_bucket`
- `tuition_bucket`
- `image_url`
- `official_url`
- `usnews_url`
- `bio`
- `active`
- `created_at`
- `updated_at`

### `school_stats`

Normalized stat snapshot.

Suggested columns:

- `school_id`
- `source`
- `source_updated_at`
- `acceptance_rate`
- `graduation_rate`
- `median_earnings`
- `avg_net_price`
- `undergrad_enrollment`
- `sat_reading_writing_mid`
- `sat_math_mid`
- `act_composite_mid`
- `raw_payload_json`
- `created_at`

### `school_tags`

Use this if tags start getting more complex than the current array approach.

Suggested columns:

- `school_id`
- `tag`

### `school_vibe_cards`

Stores labeled synthetic social-style content.

Suggested columns:

- `id`
- `school_id`
- `title`
- `body`
- `tone`
- `generated_by`
- `is_synthetic`
- `status`
- `created_at`

### `user_profiles`

Minimal app profile keyed to Clerk.

Suggested columns:

- `clerk_user_id`
- `display_name`
- `graduation_year`
- `home_state`
- `created_at`

### `saved_schools`

Suggested columns:

- `clerk_user_id`
- `school_id`
- `created_at`

### `quiz_results`

Suggested columns:

- `id`
- `clerk_user_id`
- `answers_json`
- `top_matches_json`
- `created_at`

## API Routes To Build

### Public app routes

- `POST /api/match`
  - keep this route
  - move source data from `app/colleges.json` to Postgres
  - keep the deterministic ranking logic

- `GET /api/schools`
  - returns curated school list
  - supports filter params later

- `GET /api/schools/[slug]`
  - returns one school with stats, links, image, and vibe cards

- `POST /api/user/saved-schools`
  - save or unsave a school for the signed-in Clerk user

- `GET /api/user/saved-schools`
  - fetch saved schools for the signed-in Clerk user

### Protected internal/admin routes

- `POST /api/admin/sync/scorecard`
  - pulls fresh data from College Scorecard and upserts it

- `POST /api/admin/generate-vibes`
  - generates synthetic vibe cards for schools that need them

- `POST /api/admin/revalidate-school`
  - optional route to refresh a single school page cache

## Image Plan

- Store image files in Vercel Blob
- Store only the returned URL in Postgres
- Use optimized JPG or WebP files
- Keep the launch catalog small so Hobby usage stays low

If you do not need uploads immediately, keeping trusted external image URLs is also acceptable for the first version.

## Migration Plan From Current App

### Phase 1

- keep current UI and `POST /api/match`
- replace `app/colleges.json` reads with Postgres queries
- preserve the current data shape so the React screens keep working

### Phase 2

- add a school detail route or modal
- show extra stats from `school_stats`
- add US News and official site links
- add labeled synthetic vibe cards

### Phase 3

- add Clerk auth to persist saved schools and quiz history
- wire `saved` state to database instead of only local client state

### Phase 4

- add admin sync script and optional protected admin UI

## Free Tier Notes

- Vercel Hobby is fine for a prototype
- Vercel Blob is free only within Hobby limits
- If Blob limits are exceeded on Hobby, Vercel says Blob access is blocked until the usage window resets or you upgrade
- A small curated image library should be fine on Hobby
- Postgres free tier is usually more important to watch than Blob for this app unless you start storing many large images

## Final Recommendation

Use this launch architecture:

- Clerk for auth
- Vercel Postgres or Neon for primary data
- Vercel Blob for images
- College Scorecard for factual stats sync
- US News as outbound links only
- synthetic labeled vibe cards stored in Postgres

Do not make Convex the main database for launch unless you decide realtime social features are more important than the school catalog.
