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

export async function GET(request: Request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || '全部'
    
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

    // 根据分类筛选
    const filteredApps = category === '全部'
      ? applications
      : applications.filter(app => app.categories.includes(category))
    
    return NextResponse.json(filteredApps)
  } catch (error) {
    console.error('Error loading applications:', error)
    return NextResponse.json([], { status: 500 })
  }
} 