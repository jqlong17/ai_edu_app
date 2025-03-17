import { NextResponse } from 'next/server';
import polishRequirementsData from '../data/polish-requirements.json';

// 移除静态导出配置
// export const dynamic = 'force-static';

export async function GET() {
  try {
    return NextResponse.json(polishRequirementsData);
  } catch (error) {
    console.error('Failed to read polish requirements:', error);
    return NextResponse.json({ error: 'Failed to read polish requirements' }, { status: 500 });
  }
} 