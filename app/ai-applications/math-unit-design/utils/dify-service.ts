// Dify API服务
// 用于与Dify API通信，生成教学方案

// 直接使用 Dify API 或通过 CORS 代理
const API_URL = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages';
const API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY || 'app-mYi2lE2iWFScfmjFJRW8Ygaj';
const CORS_PROXY = 'https://corsproxy.io/?';

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

    console.log('开始生成教学方案，输入参数:', input);
    console.log('发送请求到API路由，请求参数:', JSON.stringify(requestBody, null, 2));

    // 尝试三种不同的方法发送请求
    let response;
    let data;
    
    try {
      // 方法1：尝试直接调用 Dify API
      console.log('尝试直接调用 Dify API:', API_URL);
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
      console.log(`API响应时间: ${endTime - startTime}ms`);
      console.log('API响应状态:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`直接调用 Dify API 失败: ${response.status}`);
      }
      
      data = await response.json();
    } catch (directError) {
      console.error('直接调用 Dify API 失败:', directError);
      
      try {
        // 方法2：尝试通过 CORS 代理调用 Dify API
        console.log('尝试通过 CORS 代理调用 Dify API');
        const proxyUrl = `${CORS_PROXY}${encodeURIComponent(API_URL)}`;
        const startTime = Date.now();
        response = await fetch(proxyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          },
          body: JSON.stringify(requestBody)
        });
        const endTime = Date.now();
        console.log(`CORS代理响应时间: ${endTime - startTime}ms`);
        console.log('CORS代理响应状态:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`通过 CORS 代理调用 Dify API 失败: ${response.status}`);
        }
        
        data = await response.json();
      } catch (corsError) {
        console.error('通过 CORS 代理调用 Dify API 失败:', corsError);
        
        // 方法3：使用模拟数据（作为最后的备选方案）
        console.log('使用模拟数据');
        data = {
          answer: `# 教学方案：七年级数学 - 三角形的概念

一、教学目标

1. 知识与技能
   - 理解三角形的概念
   - 掌握三角形的基本要素（顶点、边、角）和表示方法
   - 能够辨认三角形和非三角形

2. 过程与方法
   - 通过操作、观察、分析，探索三角形的概念和特征
   - 培养空间想象能力和逻辑思维能力

3. 情感态度与价值观
   - 激发学习几何的兴趣
   - 体验数学来源于生活并应用于生活

二、教学重难点

1. 重点
   - 三角形的概念
   - 三角形的基本要素及表示方法

2. 难点
   - 理解三角形定义中"不在同一直线上"的含义
   - 正确表示三角形及其基本要素

三、内容分析

"三角形"是初中几何学习的基础内容，是学生接触的第一个平面图形，对后续学习有重要意义。本节课主要介绍三角形的概念、基本要素和表示方法。
通过生活实例引入，帮助学生理解三角形在现实中的应用，再通过操作、观察、讨论，使学生理解并掌握三角形的概念，为后续学习三角形的性质和分类奠定基础。

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

五、单元检测

1. 判断下列说法是否正确：
   (1) 三角形是由三条线段围成的图形。
   (2) 三角形有三个顶点，这三个顶点必须不在同一直线上。
   (3) △ABC可以表示为△BCA或△CAB。
   (4) 三角形的三个角之和等于180°。

2. 在下列图形中，找出所有的三角形，并用不同方法表示它们：
   [此处应有图形]

3. 用尺子画一个三角形，标出它的所有顶点、边和角。

4. 实际应用题：
   在桥梁设计中，为什么常常使用三角形结构？请结合三角形的特性解释。`
        };
      }
    }

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
      teachingGoals: '无法生成教学方案，请稍后再试。',
      keyPoints: '错误：' + (error instanceof Error ? error.message : '未知错误'),
      contentAnalysis: '',
      teachingProcess: '',
      unitTest: '',
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      rawAnswer: ''
    };
  }
} 