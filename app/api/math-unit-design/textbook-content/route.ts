import { NextResponse } from 'next/server';
import textbookContentData from '../data/textbook-content.json';

export async function GET() {
  try {
    return NextResponse.json(textbookContentData);
  } catch (error) {
    console.error('Failed to read textbook content:', error);
    return NextResponse.json({ error: 'Failed to read textbook content' }, { status: 500 });
  }
} 