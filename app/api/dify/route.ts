import { NextRequest, NextResponse } from 'next/server';

// 静态导出模式下不能使用 dynamic = 'force-dynamic'
// export const dynamic = 'force-dynamic';

// 使用环境变量
const DIFY_API_URL = process.env.DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages';
const DIFY_API_KEY = process.env.DIFY_API_KEY || 'app-mYi2lE2iWFScfmjFJRW8Ygaj';

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const requestData = await request.json();
    
    // 检查请求参数
    if (!requestData.query || !requestData.inputs) {
      return NextResponse.json({ error: '缺少必要的参数' }, { status: 400 });
    }

    console.log('准备发送请求到Dify API:', DIFY_API_URL);
    console.log('使用的API密钥:', DIFY_API_KEY);
    console.log('请求参数:', requestData);

    // 构造请求体
    const requestBody = {
      query: requestData.query,
      inputs: requestData.inputs,
      response_mode: requestData.response_mode || 'blocking',
      user: requestData.user || 'default-user',
    };

    // 发送请求到 Dify API
    const response = await fetch(DIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DIFY_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    // 检查响应状态
    if (!response.ok) {
      console.error('Dify API 响应错误:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('错误详情:', errorText);
      return NextResponse.json({ error: '调用 Dify API 失败', status: response.status, details: errorText }, { status: response.status });
    }

    // 解析 Dify API 的响应
    const data = await response.json();
    console.log('Dify API 响应:', data);

    // 返回 Dify API 的响应
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('处理请求时出错:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json({ error: '服务器内部错误', details: errorMessage }, { status: 500 });
  }
} 