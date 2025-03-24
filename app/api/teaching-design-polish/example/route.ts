import { NextResponse } from 'next/server';
import exampleData from '../data/example-polish-result.json';

// 移除静态导出配置

export async function GET() {
  try {
    // 如果是Markdown格式，返回纯文本内容
    if (exampleData && exampleData.format === 'markdown') {
      return new NextResponse(exampleData.content, {
        headers: {
          'Content-Type': 'text/markdown'
        }
      });
    }
    
    // 否则返回JSON
    return NextResponse.json(exampleData);
  } catch (error) {
    console.error('Failed to read example data:', error);
    return NextResponse.json({ error: 'Failed to read example data' }, { status: 500 });
  }
} 