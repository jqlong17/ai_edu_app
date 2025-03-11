import { parse, CastingContext } from 'csv-parse/sync';

export type TextbookContent = {
  grade: number;
  semester: number;
  subject: string;
  textbook_version: string;
  chapter: string;
  section: string;
}

// 从API获取教材内容数据
const fetchTextbookData = async (): Promise<TextbookContent[]> => {
  try {
    // 使用新的API路由
    const response = await fetch('/api/math-unit-design/textbook-content');
    if (!response.ok) {
      throw new Error('Failed to fetch textbook content');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching textbook content:', error);
    return [];
  }
};

// 获取教材内容数据的函数
export async function getTextbookData(): Promise<TextbookContent[]> {
  return fetchTextbookData();
} 