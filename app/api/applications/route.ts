import { NextResponse } from 'next/server'
import * as path from 'path'
import { readCsvFile } from '../utils'
import { AIApplication } from '../types'

export async function GET() {
  try {
    // 读取CSV文件
    const filePath = path.join(process.cwd(), 'app/data/ai-applications.csv')
    const records = await readCsvFile<any>(filePath)
    
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