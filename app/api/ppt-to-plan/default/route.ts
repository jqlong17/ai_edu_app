import { NextResponse } from 'next/server';
import defaultData from '../data/default.json';

// 移除静态导出配置

export async function GET() {
  try {
    return NextResponse.json(defaultData);
  } catch (error) {
    console.error('Failed to read default data:', error);
    return NextResponse.json({ error: 'Failed to read default data' }, { status: 500 });
  }
} 