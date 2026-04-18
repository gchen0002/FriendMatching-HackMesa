import { NextResponse } from 'next/server';

import collegesData from '../../colleges.json';

type SeedSchool = {
  id: string;
  name: string;
  size?: string;
  state?: string;
  tags?: string[];
  bio?: string;
  pitch?: string;
};

function buildFallbackPitch(college: SeedSchool) {
  const tags = (college.tags || []).slice(0, 2).join(' and ');
  const location = college.state ? `in ${college.state}` : '';
  const size = college.size ? `${college.size.toLowerCase()} campus` : 'campus';

  return `${college.name} stands out for students looking for a ${size} ${location} with strong energy around ${tags || 'fit and opportunity'}. ${college.bio || 'It remains a strong match based on the answers you gave.'}`;
}

export async function POST(request: Request) {
  try {
    const { id, name } = await request.json();
    const college = (collegesData as SeedSchool[]).find((item) => item.id === id || item.name === name);

    if (!college) {
      return NextResponse.json({ pitch: 'This school is still a strong recommendation based on your profile, but a custom pitch is not available yet.' });
    }

    return NextResponse.json({ pitch: college.pitch || buildFallbackPitch(college) });
  } catch (error: any) {
    console.error('Pitch error:', error);
    return NextResponse.json(
      {
        error: error.message,
        pitch: 'This school remains a strong recommendation based on your profile, but the counselor pitch is temporarily unavailable.',
      },
      { status: 500 },
    );
  }
}
