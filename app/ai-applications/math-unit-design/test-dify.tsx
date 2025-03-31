"use client"

import { useState } from "react"
import { generateTeachingPlan } from './utils/dify-service'
import { callDifyAPI } from "@/app/utils/dify-client" // 导入新的客户端API服务

// Dify API测试页面
export default function TestDify() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // 添加日志
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  // 测试API路由
  const testApiRoute = async () => {
    setLoading(true);
    setError(null);
    addLog("开始测试API路由...");

    try {
      // 构建测试输入
      const testInput = {
        grade: 7,
        semester: 2,
        subject: "数学",
        textbookVersion: "人教版",
        selectedContent: [{ chapter: "第六章 三角形", section: "6.1 三角形的概念" }],
        selectedGoals: [],
        supplementInfo: "",
        contentAnalysis: "",
        coreQuestion: "",
        lessonDesigns: [{ content: "" }],
        unitTest: ""
      };

      addLog(`发送请求，输入参数: ${JSON.stringify(testInput, null, 2)}`);
      
      // 调用API
      const response = await generateTeachingPlan(testInput);
      
      addLog(`收到响应: ${JSON.stringify(response, null, 2)}`);
      setResult(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      addLog(`测试失败: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 直接测试Dify API
  const testDifyDirectly = async () => {
    setLoading(true);
    setError(null);
    addLog("开始直接测试Dify API...");

    try {
      // 使用环境变量或默认值
      const API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages';
      const API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY || 'app-mYi2lE2iWFScfmjFJRW8Ygaj';
      
      // 构建请求参数
      const requestBody = {
        inputs: {
          grade: "7年级",
          semester: "下学期",
          subject: "数学",
          textbookVersion: "人教版",
          teachingContent: "第六章 三角形 - 6.1 三角形的概念"
        },
        query: "请根据以上教学内容，生成一个完整的教学方案，包括教学目标、重难点、内容分析、教学过程和单元检测。",
        response_mode: "blocking",
        conversation_id: "",
        user: "test-user"
      };
      
      addLog(`直接发送请求到Dify API`);
      addLog(`请求参数: ${JSON.stringify(requestBody, null, 2)}`);
      
      // 使用客户端API服务而不是通过服务器端API路由
      const data = await callDifyAPI({
        query: requestBody.query,
        inputs: requestBody.inputs,
        conversation_id: requestBody.conversation_id,
        response_mode: "blocking",  // 明确指定为"blocking"类型
        user: requestBody.user
      });
      
      addLog(`收到Dify API响应: ${JSON.stringify(data, null, 2)}`);
      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      addLog(`直接测试Dify API失败: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 测试CORS代理
  const testCorsProxy = async () => {
    setLoading(true);
    setError(null);
    addLog("开始测试通过CORS代理访问Dify API...");

    try {
      const CORS_PROXY = 'https://corsproxy.io/?';
      // 使用环境变量或默认值
      const API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages';
      const API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY || 'app-mYi2lE2iWFScfmjFJRW8Ygaj';
      
      // 构建请求参数
      const requestBody = {
        inputs: {
          grade: "7年级",
          semester: "下学期",
          subject: "数学",
          textbookVersion: "人教版",
          teachingContent: "第六章 三角形 - 6.1 三角形的概念"
        },
        query: "请根据以上教学内容，生成一个完整的教学方案，包括教学目标、重难点、内容分析、教学过程和单元检测。",
        response_mode: "blocking",
        conversation_id: "",
        user: "test-user"
      };
      
      const proxyUrl = `${CORS_PROXY}${encodeURIComponent(API_URL)}`;
      addLog(`通过CORS代理发送请求: ${proxyUrl}`);
      addLog(`请求参数: ${JSON.stringify(requestBody, null, 2)}`);
      
      // 发送请求
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`CORS代理请求失败: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      addLog(`收到CORS代理响应: ${JSON.stringify(data, null, 2)}`);
      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      addLog(`CORS代理测试失败: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 测试模拟数据
  const testMockData = async () => {
    setLoading(true);
    setError(null);
    addLog("使用模拟数据...");

    try {
      // 返回模拟数据
      const mockData = {
        teachingGoals: `1. 理解三角形的概念及其基本性质
2. 掌握三角形的分类方法
3. 能够运用三角形的性质解决简单的几何问题
4. 培养学生的空间想象能力和逻辑思维能力`,
        keyPoints: `重点：
1. 三角形的概念及其基本性质
2. 三角形的分类方法
3. 三角形内角和定理

难点：
1. 理解三角形的性质
2. 运用三角形的性质解决问题
3. 正确使用数学语言表达几何关系`,
        contentAnalysis: `本单元内容分析：
1. 内容的本质：
   - 三角形是初中几何的基础图形，是研究平面几何的基本工具
   - 通过对三角形的学习，建立平面几何中图形性质的基本概念

2. 内容蕴含的数学思想和方法：
   - 分类讨论思想：根据三角形的不同特征进行分类
   - 转化思想：将复杂问题转化为已知的三角形性质
   - 公理化方法：从公理出发，通过逻辑推理得出定理

3. 知识的上下位关系：
   - 上位知识：平面几何基本图形
   - 同位知识：角的概念与性质
   - 下位知识：特殊三角形的性质、四边形的性质`,
        teachingProcess: `第一课时：三角形的概念
一、导入新课
1. 复习点、线、角的概念
2. 提出问题：日常生活中，我们经常看到三角形的图形，如交通标志、建筑结构等，这些三角形有什么特点？

二、新课讲解
1. 三角形的概念
   - 由不在同一直线上的三点所确定的三条线段围成的图形叫做三角形
   - 三角形的三个顶点、三条边、三个角

2. 三角形的分类
   - 按照边的关系：等边三角形、等腰三角形、不等边三角形
   - 按照角的关系：锐角三角形、直角三角形、钝角三角形

三、例题讲解
例1：判断下列三角形的类型：
(1) 三边长分别为3cm、4cm、5cm的三角形
(2) 三边长分别为5cm、5cm、6cm的三角形
(3) 三边长分别为6cm、6cm、6cm的三角形

四、巩固练习
练习1：画出一个等腰直角三角形，并标出它的特征
练习2：生活中哪些物体具有三角形的形状？它们各是什么类型的三角形？

五、小结
1. 三角形的概念：由不在同一直线上的三点所确定的三条线段围成的图形
2. 三角形的分类方法：按边分类和按角分类`,
        unitTest: `一、选择题
1. 下列说法正确的是（ ）
   A. 三角形有且只有一个钝角
   B. 等边三角形一定是锐角三角形
   C. 等腰三角形的两个底角不相等
   D. 直角三角形可能是等腰三角形

2. 如图，在三角形ABC中，∠A=40°，∠B=60°，则∠C的度数是（ ）
   A. 80°    B. 100°    C. 120°    D. 不确定

3. 三角形的内角和为（ ）
   A. 90°    B. 180°    C. 270°    D. 360°`,
        success: true,
        error: '使用模拟数据'
      };
      
      addLog(`模拟数据: ${JSON.stringify(mockData, null, 2)}`);
      setResult(mockData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      addLog(`模拟数据测试失败: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dify API 测试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={testApiRoute}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "测试中..." : "测试API路由"}
        </button>
        
        <button
          onClick={testDifyDirectly}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          直接测试Dify API
        </button>
        
        <button
          onClick={testCorsProxy}
          disabled={loading}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-400"
        >
          测试CORS代理
        </button>
        
        <button
          onClick={testMockData}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
        >
          测试模拟数据
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold">错误:</h2>
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">日志</h2>
          <div className="bg-gray-100 p-4 rounded h-96 overflow-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">暂无日志...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1 text-sm font-mono">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">结果</h2>
          <div className="bg-gray-100 p-4 rounded h-96 overflow-auto">
            {result ? (
              <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
            ) : (
              <p className="text-gray-500">暂无结果...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 