import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

interface CourseGoal {
  category: string;
  goal: string;
}

export async function GET() {
  try {
    const csvFilePath = path.join(process.cwd(), 'app/ai-applications/math-unit-design/data/course-goals.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }) as CourseGoal[];
    
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read course goals' }, { status: 500 });
  }
} 