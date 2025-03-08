import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface TextbookContent {
  grade: number;
  semester: number;
  subject: string;
  textbook_version: string;
  chapter: string;
  section: string;
}

// 类型转换函数
const castValue = (value: string, context: any): any => {
  if (context.column === 'grade' || context.column === 'semester') {
    return parseInt(value, 10);
  }
  return value;
};

export async function GET() {
  try {
    const csvFilePath = path.join(process.cwd(), 'app/ai-applications/math-unit-design/data/textbook-content.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      cast: castValue
    }) as TextbookContent[];
    
    return NextResponse.json(records);
  } catch (error) {
    console.error('Failed to read textbook content:', error);
    return NextResponse.json({ error: 'Failed to read textbook content' }, { status: 500 });
  }
} 