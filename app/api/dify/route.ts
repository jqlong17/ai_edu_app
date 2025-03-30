export const dynamic = 'force-dynamic'; // 强制使用动态模式

import { NextRequest, NextResponse } from 'next/server';

// Dify API配置
const DIFY_API_URL = "http://dify-qa.3ren.cn/v1";  // 改回HTTP协议
const DIFY_API_KEY = "app-7FLzUUWylxlHNWks8BwHIeF1";

export async function POST(request: NextRequest) {
  try {
    // 获取请求体（使用动态模式）
    const body = await request.json();
    console.log("请求体:", JSON.stringify(body));
    
    // 准备请求数据 - 确保符合Dify API期望的格式
    const requestData = {
      query: body.query || "",           // 用户的问题，可能为空
      conversation_id: body.conversation_id || undefined, // 如果是继续对话，则包含对话ID
      inputs: body.inputs || {},         // 变量输入，包含input1, input2, input3
      response_mode: "blocking",         // 默认使用阻塞模式
      user: body.user || `user-${Math.random().toString(36).substring(2, 12)}` // 用户ID
    };
    
    console.log(`正在请求: ${DIFY_API_URL}/chat-messages`);
    console.log(`请求数据: ${JSON.stringify(requestData)}`);
    
    // 发送请求到Dify API
    const response = await fetch(`${DIFY_API_URL}/chat-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DIFY_API_KEY}`,
        // 添加额外的头部
        "Accept": "application/json"
      },
      body: JSON.stringify(requestData)
    });
    
    // 检查响应状态
    if (!response.ok) {
      console.error(`Dify API响应错误: ${response.status} ${response.statusText}`);
      
      // 尝试获取错误详情
      let errorDetails = "";
      try {
        // 先检查Content-Type
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          // 如果是JSON，解析为JSON
          const errorJson = await response.json();
          errorDetails = JSON.stringify(errorJson);
        } else {
          // 否则作为文本处理
          const errorText = await response.text();
          // 截取错误文本的一部分，避免返回整个HTML页面
          errorDetails = errorText.length > 200 
            ? errorText.substring(0, 200) + "..."
            : errorText;
        }
        console.error(`错误详情: ${errorDetails}`);
      } catch (e) {
        console.error("无法读取错误详情:", e);
        errorDetails = "无法读取错误详情";
      }
      
      return NextResponse.json(
        { 
          error: `Dify API响应错误: ${response.status} ${response.statusText}`, 
          details: errorDetails,
          request: requestData,
          url: `${DIFY_API_URL}/chat-messages`
        },
        { status: response.status }
      );
    }
    
    // 检查响应类型
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error("响应不是JSON格式:", text.substring(0, 200));
      return NextResponse.json(
        { 
          error: "响应不是JSON格式", 
          details: text.length > 200 ? text.substring(0, 200) + "..." : text,
          contentType
        },
        { status: 500 }
      );
    }
    
    // 处理Dify API响应
    const data = await response.json();
    console.log("Dify API响应:", JSON.stringify(data, null, 2));
    
    // 返回响应
    return NextResponse.json(data);
  } catch (error) {
    console.error("API代理错误:", error);
    
    // 返回更详细的错误信息
    return NextResponse.json(
      { 
        error: "处理请求时出错", 
        details: error instanceof Error ? error.message : String(error),
        url: `${DIFY_API_URL}/chat-messages`,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 