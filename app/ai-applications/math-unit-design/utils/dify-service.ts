// Dify API服务
// 用于与Dify API通信，生成教学方案

// 直接使用 Dify API
const API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages';
const API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY || 'app-mYi2lE2iWFScfmjFJRW8Ygaj';

export interface TeachingPlanInput {
  grade: number | '';
  semester: number;
  subject: string;
  textbookVersion: string;
  selectedContent: Array<{ chapter: string; section: string }>;
  selectedGoals: string[];
  supplementInfo: string;
  contentAnalysis: string;
  coreQuestion: string;
  lessonDesigns: Array<{ content: string }>;
  unitTest: string;
}

export interface TeachingPlanResult {
  teachingGoals: string;
  keyPoints: string;
  contentAnalysis: string;
  teachingProcess: string;
  unitTest: string;
  success: boolean;
  error?: string;
  rawAnswer?: string;
  method?: 'direct' | 'none';
}

// 生成教学方案
export async function generateTeachingPlan(input: TeachingPlanInput): Promise<TeachingPlanResult> {
  try {
    // 创建查询字符串
    const queryTemplateContent = 
      `请根据以下信息，生成一个完整的教学方案，包括教学目标、重难点、内容分析、教学过程和单元检测：
年级：${input.grade}年级
学期：${input.semester === 1 ? '上' : '下'}学期
学科：${input.subject}
教材版本：${input.textbookVersion}
教学内容：${input.selectedContent.map(c => `${c.chapter} - ${c.section}`).join('\n')}
${input.supplementInfo ? `补充信息：${input.supplementInfo}` : ''}
${input.contentAnalysis ? `内容分析：${input.contentAnalysis}` : ''}
${input.coreQuestion ? `核心问题：${input.coreQuestion}` : ''}
${input.lessonDesigns && input.lessonDesigns.length > 0 && input.lessonDesigns[0].content ? `教学设计：${input.lessonDesigns.map(d => d.content).join('\n')}` : ''}
${input.unitTest ? `单元检测：${input.unitTest}` : ''}


注意：在教学过程部分，请使用以下格式（不要改变格式，保持一致）：

四、教学过程

第1课时：6.1 三角形的概念（45分钟）

一、导入新课（5分钟）
教学活动：
1. 展示生活中包含三角形的图片（如：金字塔、桥梁、屋顶等）
2. 提问：这些物体有什么共同的形状？

教师活动：
1. 展示PPT，播放图片
2. 引导学生观察，并提出问题

学生活动：
1. 观察图片
2. 回答问题：都有三角形

设计意图：
1. 通过生活实例引入，激发学生的学习兴趣
2. 让学生感受到数学来源于生活，并应用于生活

二、概念形成（15分钟）
教学活动：
1. 动手操作：让学生用小木棒或纸条拼搭三角形
2. 展示学生作品，引导学生描述三角形的特征
3. 给出三角形的定义，强调"不在同一直线上"、"首尾顺次相接"
4. 辨析：判断哪些图形是三角形，哪些不是，并说明理由

教师活动：
1. 指导学生操作，巡视指导
2. 引导学生观察、概括
3. 强调定义中的关键词
4. 组织学生讨论、辨析

学生活动：
1. 动手操作，积极参与
2. 观察、描述三角形的特征
3. 理解三角形的定义
4. 辨析图形，加深理解

设计意图：
通过操作、观察、讨论，帮助学生理解三角形的定义，突破难点

三、巩固练习（15分钟）
教学活动：
1. 引导学生认识三角形的顶点、边、角
2. 讲解三角形的表示方法，强调字母顺序的任意性
3. 练习：指出图中的三角形，并用不同的方法表示

教师活动：
1. 引导学生观察、识别
2. 强调表示方法的规范性
3. 布置练习，及时反馈

学生活动：
1. 认识三角形的要素
2. 掌握三角形的表示方法
3. 独立完成练习

设计意图：
帮助学生掌握三角形的基本要素和表示方法，培养学生的符号意识

四、小结（10分钟）
教学活动：
1. 复习本节课的主要内容
2. 布置课后作业

教师活动：
1. 引导学生总结
2. 布置作业，说明要求

学生活动：
1. 参与总结
2. 记录作业

设计意图：
巩固本节课的学习内容，为下节课做准备

请按照这个格式生成教学方案，保持内容的详细程度。每个环节的活动要具体、可操作，并且符合教学目标和重难点的要求。不要回复我好的等回应，直接输出结果。`;

    // 创建请求体
    const requestBody = {
      inputs: {
        grade: `${input.grade}年级`,
        semester: `${input.semester === 1 ? '上' : '下'}学期`,
        subject: input.subject,
        textbookVersion: input.textbookVersion,
        teachingContent: input.selectedContent.map(c => `${c.chapter} - ${c.section}`).join('\n'),
        teachingGoals: input.selectedGoals.join('\n'),
        supplementInfo: input.supplementInfo,
        contentAnalysis: input.contentAnalysis,
        coreQuestion: input.coreQuestion,
        lessonDesigns: input.lessonDesigns && input.lessonDesigns.length > 0 ? input.lessonDesigns.map(d => d.content).join('\n') : '',
        unitTest: input.unitTest
      },
      query: queryTemplateContent,
      response_mode: "blocking",
      conversation_id: "",
      user: "math-unit-design-user"
    };

    console.log('===== 教学方案生成 - 启动 =====');
    console.log('输入参数:', input);
    console.log('请求参数构建完成, API请求体大小:', JSON.stringify(requestBody).length, '字节');

    // 直接调用 Dify API
    let response;
    let data;
    let method: 'direct' | 'none' = 'none';
    
    // 直接调用 Dify API
    console.log('===== 直接调用 Dify API =====');
    console.log('API URL:', API_URL);
    console.log('API KEY 前5位:', API_KEY.substring(0, 5) + '...');
    
    const startTime = Date.now();
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    console.log(`响应时间: ${responseTime}ms`);
    console.log('响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      // 记录详细错误信息
      const errorText = await response.text();
      console.error('调用失败 - 错误详情:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText.substring(0, 500) + (errorText.length > 500 ? '...(截断)' : '')
      });
      throw new Error(`调用 Dify API 失败: ${response.status} - ${errorText.substring(0, 100)}`);
    }
    
    data = await response.json();
    method = 'direct';
    console.log('调用成功!');
    
    // 打印Dify API的原始返回结果
    console.log('===== Dify API 原始返回结果 =====');
    console.log(JSON.stringify(data, null, 2));
    console.log('===== Dify API 原始返回结果结束 =====');

    console.log('数据获取成功, 响应数据大小:', JSON.stringify(data).length, '字节');
    
    // 解析返回的结果 - 直接使用Dify返回的完整内容
    const result = {
      teachingGoals: data.answer || '',  // 使用answer字段作为完整内容
      keyPoints: '',  // 不再需要单独的字段
      contentAnalysis: '',
      teachingProcess: '',
      unitTest: '',
      success: true,
      rawAnswer: data.answer || '',  // 保存原始回答
      method: method  // 添加方法标识
    };
    
    console.log('教学方案生成成功! 使用方法:', method);
    console.log('===== 教学方案生成 - 完成 =====');
    return result;
  } catch (error) {
    console.error('===== 教学方案生成 - 失败 =====');
    console.error('生成教学方案过程中发生了未捕获的错误:', error instanceof Error ? error.message : '未知错误');
    if (error instanceof Error && error.stack) {
      console.error('错误堆栈:', error.stack);
    }
    console.error('===== 错误详情 =====');
    
    // 如果API调用失败，返回错误
    return {
      teachingGoals: '无法生成教学方案，请稍后再试。',
      keyPoints: '错误：' + (error instanceof Error ? error.message : '未知错误'),
      contentAnalysis: '',
      teachingProcess: '',
      unitTest: '',
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      rawAnswer: '',
      method: 'none' // 表示所有方法都失败
    };
  }
} 