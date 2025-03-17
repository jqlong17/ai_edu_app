import { NextResponse } from 'next/server';
import courseGoalsData from '../data/course-goals.json';

// 移除静态导出配置

export async function GET() {
  try {
    return NextResponse.json(courseGoalsData);
  } catch (error) {
    console.error('Failed to read course goals:', error);
    return NextResponse.json({ error: 'Failed to read course goals' }, { status: 500 });
  }
} 