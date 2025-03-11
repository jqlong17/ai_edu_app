const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// 应用列表
const apps = [
  'math-unit-design',
  'essay-evaluation',
  'teaching-design-polish',
  'ppt-to-plan'
];

// 数据文件映射
const dataFiles = {
  'math-unit-design': [
    { source: 'course-goals.csv', target: 'course-goals.json', parser: parseCourseGoals },
    { source: 'textbook-content.csv', target: 'textbook-content.json', parser: parseTextbookContent }
  ],
  'essay-evaluation': [
    { source: 'evaluation-aspects.csv', target: 'evaluation-aspects.json', parser: parseEvaluationAspects }
  ],
  'teaching-design-polish': [
    { source: 'polish-requirements.csv', target: 'polish-requirements.json', parser: parsePolishRequirements },
    { source: 'example-polish-result.md', target: 'example-polish-result.json', parser: parseMarkdownToJson }
  ]
};

// 解析课程目标CSV
function parseCourseGoals(content) {
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  return records.map(record => ({
    category: record.category,
    goal: record.goal
  }));
}

// 解析教材内容CSV
function parseTextbookContent(content) {
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    cast: (value, context) => {
      if (context.column === 'grade' || context.column === 'semester') {
        return parseInt(value, 10);
      }
      return value;
    }
  });
  
  return records;
}

// 解析评估方面CSV
function parseEvaluationAspects(content) {
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  return records.map(record => ({
    id: String(record.id || ''),
    name: String(record.name || ''),
    description: String(record.description || ''),
    prompt: String(record.prompt || '')
  })).filter(aspect => aspect.id && aspect.name);
}

// 解析教学设计优化需求CSV
function parsePolishRequirements(content) {
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  return records.map(record => ({
    id: String(record.id || ''),
    name: String(record.name || ''),
    description: String(record.description || '')
  })).filter(req => req.id && req.name);
}

// 将Markdown文件转换为JSON
function parseMarkdownToJson(content) {
  // 简单地将Markdown内容包装为JSON对象
  return {
    content: content,
    format: 'markdown'
  };
}

// 确保目录存在
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 创建默认的空JSON文件
function createEmptyJsonFile(filePath, defaultContent = {}) {
  fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2), 'utf-8');
  console.log(`Created empty JSON file: ${filePath}`);
}

// 主处理函数
function processData() {
  const rootDir = path.join(__dirname, '..');
  
  apps.forEach(appName => {
    const appDataFiles = dataFiles[appName] || [];
    
    // 确保目标目录存在
    const targetDir = path.join(rootDir, 'app', 'api', appName, 'data');
    ensureDirectoryExists(targetDir);
    
    // 如果没有定义数据文件，创建一个默认的空JSON文件
    if (appDataFiles.length === 0) {
      const defaultFilePath = path.join(targetDir, 'default.json');
      createEmptyJsonFile(defaultFilePath);
      return;
    }
    
    appDataFiles.forEach(({ source, target, parser }) => {
      try {
        // 源文件路径
        const sourcePath = path.join(rootDir, 'app', 'ai-applications', appName, 'data', source);
        
        // 如果源文件不存在，创建一个空的目标文件
        if (!fs.existsSync(sourcePath)) {
          console.log(`Source file not found: ${sourcePath}`);
          const targetPath = path.join(targetDir, target);
          createEmptyJsonFile(targetPath);
          return;
        }
        
        // 读取源文件
        const content = fs.readFileSync(sourcePath, 'utf-8');
        
        // 解析数据
        const data = parser(content);
        
        // 目标文件路径
        const targetPath = path.join(targetDir, target);
        
        // 写入JSON文件
        fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf-8');
        
        console.log(`Processed ${source} to ${target} for ${appName}`);
      } catch (error) {
        console.error(`Error processing ${source} for ${appName}:`, error);
      }
    });
  });
  
  console.log('Data preprocessing completed!');
}

// 执行处理
processData(); 