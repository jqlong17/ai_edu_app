import { AIAppCard } from "@/components/ai-app-card"
import { Search } from "lucide-react"

// 生成更多模拟AI应用数据
function generateApps(count: number) {
  const baseApps = [
    {
      id: "1",
      name: "数学单元教学设计",
      title: "智能生成完整的数学单元教学设计方案",
      description: "智能生成完整的数学单元教学设计方案",
      categories: ["教学设计"],
      icon: "/images/app-icon1.png",
      path: "/ai-applications/math-unit-design",
    },
    {
      id: "2",
      name: "教学设计润色",
      title: "智能优化和完善现有教学计划方案",
      description: "智能优化和完善现有教学计划方案",
      categories: ["教学设计"],
      icon: "/images/app-icon2.png",
      path: "/ai-applications/teaching-design-polish",
    },
    {
      id: "3",
      name: "数学项目式学习",
      title: "基于项目式学习理念的数学教学设计助手",
      description: "基于项目式学习理念的数学教学设计助手",
      categories: ["教学设计"],
      icon: "/images/app-icon3.png",
    },
    {
      id: "4",
      name: "数学跨学科教学",
      title: "融合多学科知识的数学教学设计方案",
      description: "融合多学科知识的数学教学设计方案",
      categories: ["教学设计"],
      icon: "/images/app-icon4.png",
    },
  ];

  const categoryPairs = [
    ["教学设计"],
    ["教学工具"],
    ["数学教学"],
    ["语文教学"],
    ["英语教学"],
    ["试题解析"],
    ["教学评估"],
    ["学情分析"],
  ];

  const mathAppNames = [
    "数学概念教学", "函数图像分析", "几何证明助手", "代数问题解析", 
    "数学思维训练", "数学试题生成", "错题归纳本", "学习进度诊断",
    "数学竞赛题库", "高考数学备考", "数学课堂互动", "数学游戏设计",
  ];

  const appDescriptions = [
    "智能化数学教学助手，提高教学效率",
    "个性化数学学习工具，适应不同学生需求",
    "数学教学资源生成器，丰富教学内容",
    "数学学情分析平台，精准把握学生状态",
    "数学能力评估系统，科学评价学习成果",
    "数学教学课件制作，生动呈现教学内容",
    "数学思维可视化工具，培养逻辑思维能力",
    "数学试题解析平台，深入理解解题思路",
  ];

  const result = [...baseApps];
  
  for (let i = baseApps.length; i < count; i++) {
    const iconIndex = (i % 4) + 1;
    const catIndex = i % categoryPairs.length;
    const nameIndex = i % mathAppNames.length;
    const descIndex = i % appDescriptions.length;
    
    result.push({
      id: (i + 1).toString(),
      name: mathAppNames[nameIndex],
      title: appDescriptions[descIndex],
      description: appDescriptions[descIndex],
      categories: categoryPairs[catIndex],
      icon: `/images/app-icon${iconIndex}.png`,
    });
  }
  
  return result;
}

// 生成12个应用
const aiApps = generateApps(12);

// 分类标签
const categories = ["全部", "教学设计", "教学工具", "数学教学", "语文教学", "英语教学"];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 顶部蓝色渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 pb-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold mb-2">云小睿</h1>
        <p className="text-sm text-gray-600 mb-4">
          远择专业的教学人助手，开启智能教学之旅
        </p>
        
        {/* 搜索框 */}
        <div className="relative rounded-full bg-white flex items-center px-4 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="请输入搜索关键字" 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>
      
      {/* 分类标签 */}
      <div className="flex overflow-x-auto px-3 py-4 gap-2 no-scrollbar">
        {categories.map((category, index) => (
          <div 
            key={category} 
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
              index === 0 
                ? "bg-blue-500 text-white" 
                : "bg-white text-gray-700 border border-gray-100"
            }`}
          >
            {category}
          </div>
        ))}
      </div>
      
      {/* 应用列表 */}
      <div className="grid grid-cols-2 gap-3 px-3 pb-20">
        {aiApps.map((app) => (
          <AIAppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}
