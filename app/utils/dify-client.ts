// Dify客户端API服务
// 用于在静态导出模式下直接从客户端调用Dify API

// Dify API配置
const DIFY_API_URL = "http://dify-qa.3ren.cn/v1";  // 服务器URL
const DIFY_API_KEY = "app-7FLzUUWylxlHNWks8BwHIeF1"; // API密钥

interface DifyRequestData {
  query: string;
  conversation_id?: string;
  inputs?: any;
  response_mode?: "streaming" | "blocking";
  user?: string;
}

interface DifyResponse {
  id: string;
  answer: string;
  conversation_id: string;
  created_at: number;
  // 可能还有其他字段
}

/**
 * 从客户端直接调用Dify API
 * 用于替代服务器端API路由（静态导出模式下不支持API路由）
 */
export async function callDifyAPI(requestData: DifyRequestData): Promise<DifyResponse> {
  try {
    console.log(`正在请求: ${DIFY_API_URL}/chat-messages`);
    console.log(`请求数据: ${JSON.stringify(requestData)}`);
    
    // 准备请求数据
    const data = {
      query: requestData.query || "",
      conversation_id: requestData.conversation_id || undefined,
      inputs: requestData.inputs || {},
      response_mode: requestData.response_mode || "blocking",
      user: requestData.user || `user-${Math.random().toString(36).substring(2, 12)}`
    };
    
    // 直接从客户端发送请求到Dify API
    const response = await fetch(`${DIFY_API_URL}/chat-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DIFY_API_KEY}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    // 处理错误
    if (!response.ok) {
      let errorDetails = "";
      try {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const errorJson = await response.json();
          errorDetails = JSON.stringify(errorJson);
        } else {
          const errorText = await response.text();
          errorDetails = errorText.length > 200 
            ? errorText.substring(0, 200) + "..."
            : errorText;
        }
      } catch (e) {
        errorDetails = "无法读取错误详情";
      }
      
      throw new Error(`Dify API响应错误: ${response.status} ${response.statusText}. ${errorDetails}`);
    }
    
    // 检查响应类型
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`响应不是JSON格式: ${text.substring(0, 200)}...`);
    }
    
    // 处理Dify API响应
    const responseData = await response.json();
    console.log("Dify API响应:", JSON.stringify(responseData, null, 2));
    
    return responseData;
  } catch (error) {
    console.error("API调用错误:", error);
    throw error;
  }
} 