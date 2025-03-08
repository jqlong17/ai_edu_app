import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

type EvaluationAspect = {
  id: string
  name: string
  description: string
  prompt: string
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app/ai-applications/essay-evaluation/data/evaluation-aspects.csv')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // 使用更详细的解析配置
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      cast: true
    }) as any[]

    // 验证和转换数据
    const aspects: EvaluationAspect[] = records.map(record => ({
      id: String(record.id || ''),
      name: String(record.name || ''),
      description: String(record.description || ''),
      prompt: String(record.prompt || '')
    })).filter(aspect => aspect.id && aspect.name)
    
    console.log('Loaded aspects:', aspects) // 调试日志
    
    return NextResponse.json(aspects)
  } catch (error) {
    console.error('Error reading CSV file:', error)
    return NextResponse.json([], { status: 500 })
  }
} 