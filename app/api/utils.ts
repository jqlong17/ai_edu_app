import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { ApiResponse } from './types';

// 读取CSV文件并解析
export async function readCsvFile<T>(filePath: string, options: any = {}): Promise<T[]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const defaultOptions = {
      columns: true,
      skip_empty_lines: true,
      trim: true
    };
    
    return parse(fileContent, { ...defaultOptions, ...options }) as T[];
  } catch (error) {
    console.error(`Error reading CSV file ${filePath}:`, error);
    throw error;
  }
}

// 读取任意文件内容
export async function readFileContent(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

// 写入文件内容
export async function writeFileContent(
  filePath: string, 
  content: string | object
): Promise<void> {
  try {
    const fileContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    await fs.writeFile(filePath, fileContent, 'utf8');
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    throw error;
  }
}

// 获取Content-Type
export function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const contentTypes: Record<string, string> = {
    '.md': 'text/markdown',
    '.json': 'application/json',
    '.csv': 'text/csv',
    '.txt': 'text/plain'
  };
  return contentTypes[ext] || 'text/plain';
}

// 验证文件类型
export function validateFileType(fileName: string, allowedTypes: string[]): boolean {
  const ext = path.extname(fileName).toLowerCase();
  return allowedTypes.includes(ext);
}

// 读取应用数据文件
export async function readAppData(appId: string, fileName: string): Promise<ApiResponse> {
  try {
    const filePath = path.join(process.cwd(), `app/ai-applications/${appId}/data/${fileName}`);
    const content = await readFileContent(filePath);
    
    const fileExt = path.extname(fileName).toLowerCase();
    let data: any = content;
    
    // 根据文件类型解析数据
    if (fileExt === '.json') {
      data = JSON.parse(content);
    } else if (fileExt === '.csv') {
      data = await readCsvFile(filePath);
    }
    
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error(`Error reading data for ${appId}:`, error);
    return {
      success: false,
      error: `Failed to read data for ${appId}`
    };
  }
}

// 写入应用数据文件
export async function writeAppData(
  appId: string, 
  fileName: string, 
  content: string | object
): Promise<ApiResponse> {
  try {
    const filePath = path.join(process.cwd(), `app/ai-applications/${appId}/data/${fileName}`);
    await writeFileContent(filePath, content);
    
    return {
      success: true,
      message: 'Data written successfully'
    };
  } catch (error) {
    console.error(`Error writing data for ${appId}:`, error);
    return {
      success: false,
      error: `Failed to write data for ${appId}`
    };
  }
}

// 获取应用配置
export async function getAppConfig(appId: string): Promise<ApiResponse> {
  try {
    const configPath = path.join(process.cwd(), `app/ai-applications/${appId}/data/config.json`);
    const content = await readFileContent(configPath);
    const config = JSON.parse(content);
    
    return {
      success: true,
      data: config
    };
  } catch (error) {
    console.error(`Error reading config for ${appId}:`, error);
    return {
      success: false,
      error: `Failed to read config for ${appId}`
    };
  }
} 