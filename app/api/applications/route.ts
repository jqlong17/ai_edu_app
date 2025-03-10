import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

export type AIApplication = {
  id: string
  name: string
  title: string
  description: string
  categories: string[]
  icon: string
  path?: string
  enabled: boolean
}

export async function GET() {
  try {
    // 读取CSV文件
    const filePath = path.join(process.cwd(), 'app/data/ai-applications.csv')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // 解析CSV数据
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }) as any[]

    // 转换数据格式
    const applications: AIApplication[] = records.map(record => ({
      id: String(record.id),
      name: record.name,
      title: record.title,
      description: record.description,
      categories: record.categories.split(';'),
      icon: record.icon,
      path: record.path,
      enabled: record.enabled.toLowerCase() === 'true'
    }))
    
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error loading applications:', error)
    return NextResponse.json([], { status: 500 })
  }
} 