// 通用API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// AI应用基础配置类型
export interface AIApplicationConfig {
  id: string;
  name: string;
  version: string;
  description: string;
  modelConfig: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
}

// AI应用数据文件类型
export interface AIApplicationData {
  type: 'markdown' | 'json' | 'csv';
  path: string;
  description: string;
}

// AI应用类型
export interface AIApplication {
  id: string;
  name: string;
  title: string;
  description: string;
  categories: string[];
  icon: string;
  path?: string;
  enabled: boolean;
}

// 课程目标类型
export interface CourseGoal {
  category: string;
  goal: string;
}

// 评估方面类型
export interface EvaluationAspect {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

// 教材内容类型
export interface TextbookContent {
  grade: number;
  semester: number;
  subject: string;
  textbook_version: string;
  chapter: string;
  section: string;
} 