import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 解析请求体
    const { url, apiKey, body } = await request.json();
    
    console.log('直接测试Dify API');
    console.log('URL:', url);
    console.log('请求参数:', JSON.stringify(body, null, 2));
    
    // 发送请求到Dify API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
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
    console.error('处理Dify API请求时出错:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : '未知错误' }, { status: 500 });
  }
} 