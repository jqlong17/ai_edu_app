import { NextRequest, NextResponse } from 'next/server';

// 移除dynamic配置，使其适用于静态导出环境
// export const dynamic = 'force-dynamic';

const DIFY_API_URL = 'https://api.dify.ai/v1/chat-messages';
const DIFY_API_KEY = 'app-mYi2lE2iWFScfmjFJRW8Ygaj';

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const requestData = await request.json();
    
    console.log('服务器端代理请求到Dify API');
    console.log('请求参数:', JSON.stringify(requestData, null, 2));
    
    console.log('准备发送请求到Dify API:', DIFY_API_URL);
    console.log('使用的API密钥:', DIFY_API_KEY);
    
    // 确保请求体包含必要的字段
    if (!requestData.query) {
      console.error('请求缺少query字段');
      return NextResponse.json({ error: '请求缺少query字段' }, { status: 400 });
    }
    
    // 发送请求到Dify API
    const response = await fetch(DIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIFY_API_KEY}`
      },
      body: JSON.stringify(requestData)
    });
    
    // 检查响应状态
    if (!response.ok) {
      console.error('Dify API请求失败:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('错误详情:', errorText);
      return NextResponse.json({ error: `Dify API请求失败: ${response.status} ${response.statusText}` }, { status: response.status });
    }
    
    // 解析响应
    const data = await response.json();
    console.log('Dify API响应:', JSON.stringify(data, null, 2));
    
    // 返回响应
    return NextResponse.json(data);
  } catch (error) {
    console.error('发送请求到Dify API失败:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : '未知错误' }, { status: 500 });
  }
} 