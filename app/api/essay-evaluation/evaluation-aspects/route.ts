import { NextResponse } from 'next/server';
import evaluationAspectsData from '../data/evaluation-aspects.json';

// 移除静态导出配置

export async function GET() {
  try {
    return NextResponse.json(evaluationAspectsData);
  } catch (error) {
    console.error('Error reading evaluation aspects:', error);
    return NextResponse.json([], { status: 500 });
  }
} 