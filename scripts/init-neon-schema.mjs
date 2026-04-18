import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const connectionUrl = new URL(databaseUrl);

// The CLI includes channel_binding=require, which can be brittle in some local
// environments. Keep SSL required and let the driver negotiate the rest.
connectionUrl.searchParams.delete('channel_binding');
connectionUrl.searchParams.set('sslmode', 'require');

const sql = neon(connectionUrl.toString());

const schemaSql = `
create extension if not exists pgcrypto;

create table if not exists schools (
  id text primary key,
  slug text not null unique,
  name text not null,
  city text,
  state text,
  control text,
  size text,
  size_bucket text,
  tuition text,
  tuition_bucket text,
  band text,
  image_url text,
  official_url text,
  usnews_url text,
  bio text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists school_stats (
  school_id text primary key references schools(id) on delete cascade,
  source text not null default 'college_scorecard',
  source_updated_at timestamptz,
  acceptance_rate numeric(5,4),
  graduation_rate numeric(5,4),
  median_earnings integer,
  avg_net_price integer,
  undergrad_enrollment integer,
  sat_reading_writing_mid integer,
  sat_math_mid integer,
  act_composite_mid integer,
  raw_payload_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists school_tags (
  school_id text not null references schools(id) on delete cascade,
  tag text not null,
  created_at timestamptz not null default now(),
  primary key (school_id, tag)
);

create table if not exists school_vibe_cards (
  id uuid primary key default gen_random_uuid(),
  school_id text not null references schools(id) on delete cascade,
  title text not null,
  body text not null,
  tone text,
  generated_by text,
  is_synthetic boolean not null default true,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_profiles (
  clerk_user_id text primary key,
  display_name text,
  graduation_year integer,
  home_state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists saved_schools (
  clerk_user_id text not null references user_profiles(clerk_user_id) on delete cascade,
  school_id text not null references schools(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (clerk_user_id, school_id)
);

create table if not exists quiz_results (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text references user_profiles(clerk_user_id) on delete set null,
  answers_json jsonb not null,
  top_matches_json jsonb,
  created_at timestamptz not null default now()
);

create index if not exists schools_active_idx on schools (active);
create index if not exists schools_slug_idx on schools (slug);
create index if not exists school_vibe_cards_school_id_idx on school_vibe_cards (school_id);
create index if not exists saved_schools_school_id_idx on saved_schools (school_id);
create index if not exists quiz_results_clerk_user_id_idx on quiz_results (clerk_user_id);
`;

try {
  const statements = schemaSql
    .split(/;\s*\n/g)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(statement);
  }

  console.log('Neon schema initialized successfully.');
} catch (error) {
  console.error(error);
  process.exit(1);
}
