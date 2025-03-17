// Dify API服务
// 用于与Dify API通信，生成教学方案

// 使用我们的API路由
const API_ROUTE = '/api/dify';

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
  rawAnswer: string;
}

/**
 * 调用Dify API生成教学方案
 * @param input 教学方案输入参数
 * @returns 生成的教学方案结果
 */
export async function generateTeachingPlan(input: TeachingPlanInput): Promise<TeachingPlanResult> {
  try {
    console.log('开始生成教学方案，输入参数:', JSON.stringify(input, null, 2));
    
    // 构建请求参数
    const requestBody = {
      inputs: {
        grade: input.grade === '' ? '' : `${input.grade}年级`,
        semester: input.semester === 1 ? '上学期' : '下学期',
        subject: input.subject,
        textbookVersion: input.textbookVersion,
        teachingContent: input.selectedContent.map(content => 
          `${content.chapter} - ${content.section}`
        ).join('\n'),
        teachingGoals: input.selectedGoals.join('\n'),
        supplementInfo: input.supplementInfo,
        contentAnalysis: input.contentAnalysis,
        coreQuestion: input.coreQuestion,
        lessonDesigns: input.lessonDesigns.map(design => design.content).join('\n\n'),
        unitTest: input.unitTest
      },
      query: `请根据以下信息，生成一个完整的教学方案，包括教学目标、重难点、内容分析、教学过程和单元检测：
年级：${input.grade === '' ? '未指定' : `${input.grade}年级`}
学期：${input.semester === 1 ? '上学期' : '下学期'}
学科：${input.subject}
教材版本：${input.textbookVersion}
教学内容：${input.selectedContent.map(content => `${content.chapter} - ${content.section}`).join('，')}
${input.selectedGoals.length > 0 ? `教学目标：${input.selectedGoals.join('，')}` : ''}
${input.supplementInfo ? `补充信息：${input.supplementInfo}` : ''}
${input.contentAnalysis ? `内容分析：${input.contentAnalysis}` : ''}
${input.coreQuestion ? `核心问题：${input.coreQuestion}` : ''}
${input.lessonDesigns.some(d => d.content) ? `课时设计：${input.lessonDesigns.map(design => design.content).filter(Boolean).join('\n\n')}` : ''}
${input.unitTest ? `单元检测：${input.unitTest}` : ''}

注意：在教学过程部分，请使用以下格式（不要改变格式，保持一致）：

四、教学过程

第1课时：${input.selectedContent[0]?.section || ''}（45分钟）

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

请按照这个格式生成教学方案，保持内容的详细程度。每个环节的活动要具体、可操作，并且符合教学目标和重难点的要求。不要回复我好的等回应，直接输出结果。`,
      response_mode: "blocking",
      conversation_id: "",
      user: "math-unit-design-user"
    };

    console.log('发送请求到API路由，请求参数:', JSON.stringify(requestBody, null, 2));

    // 使用API路由
    const startTime = Date.now();
    const response = await fetch(API_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const endTime = Date.now();
    console.log(`API响应时间: ${endTime - startTime}ms`);
    console.log('API响应状态:', response.status, response.statusText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('API请求失败:', errorData);
      } catch (error) {
        console.error('解析错误响应失败:', error);
        errorData = { error: `状态码: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.error || '调用API失败');
    }

    const data = await response.json();
    console.log('API响应数据:', JSON.stringify(data, null, 2));
    
    // 解析返回的结果 - 直接使用Dify返回的完整内容
    const result = {
      teachingGoals: data.answer || '',  // 使用answer字段作为完整内容
      keyPoints: '',  // 不再需要单独的字段
      contentAnalysis: '',
      teachingProcess: '',
      unitTest: '',
      success: true,
      rawAnswer: data.answer || ''  // 保存原始回答
    };
    
    console.log('教学方案生成成功:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('生成教学方案失败:', error);
    
    // 如果API调用失败，返回错误
    return {
      teachingGoals: '无法连接到Dify API，请检查网络连接或稍后再试。',
      keyPoints: '连接错误：' + (error instanceof Error ? error.message : '未知错误'),
      contentAnalysis: '',
      teachingProcess: '',
      unitTest: '',
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      rawAnswer: ''
    };
  }
} 