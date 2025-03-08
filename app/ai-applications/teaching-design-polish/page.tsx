"use client"

import { ChevronDown, ArrowLeft, Upload, FileText, RefreshCw } from "lucide-react"
import Link from "next/link"
import '../styles.css'
import './styles.css'
import ResponsiveLayout from '@/components/layout/ResponsiveLayout'
import { useState } from 'react'

// 定义润色要求类型
type PolishRequirement = {
  id: string
  name: string
  prompt: string
}

// 润色要求数据
const polishRequirements: PolishRequirement[] = [
  {
    id: 'teaching_process',
    name: '教学环节优化',
    prompt: '优化教学环节的设计，使其更加合理和高效，确保教学流程的顺畅性和逻辑性。重点关注教学环节的衔接和时间分配。'
  },
  {
    id: 'teaching_activity',
    name: '教学活动丰富',
    prompt: '丰富教学活动的形式，增加更多互动性和参与性的环节。融入小组合作、探究学习、游戏化等多样化的教学方法。'
  },
  {
    id: 'teaching_case',
    name: '教学案例补充',
    prompt: '补充更多贴近学生生活的实际案例，使教学内容更具体化、形象化，帮助学生更好地理解和掌握知识点。'
  },
  {
    id: 'blackboard_design',
    name: '板书设计完善',
    prompt: '完善板书设计，使其更加清晰、有条理，突出重点内容，便于学生理解和记忆。注意板书的层次性和美观性。'
  },
  {
    id: 'teaching_reflection',
    name: '教学反思建议',
    prompt: '提供教学反思的建议，包括可能遇到的教学难点、学生反应预测、教学效果评估等方面的思考。'
  }
]

// 配置页面组件
function ConfigTab() {
  // 选中的润色要求
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(['blackboard_design'])

  // 处理润色要求点击
  const handleRequirementClick = (id: string) => {
    setSelectedRequirements(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // 获取选中的提示词
  const getSelectedPrompts = () => {
    return selectedRequirements
      .map(id => polishRequirements.find(req => req.id === id)?.prompt)
      .filter(Boolean)
      .join('\n')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 输入教学设计模块 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">输入教学设计</h2>
        </div>
        
        {/* 上传文件 */}
        <div className="mb-4">
          <div className="border border-blue-300 border-dashed rounded-lg p-4 bg-blue-50 flex items-center justify-center">
            <button className="flex items-center px-4 py-2 text-blue-500 font-medium">
              <Upload className="h-5 w-5 mr-2" />
              <span>上传文件</span>
              <span className="text-gray-400 ml-2">(支持word\TXT格式)</span>
            </button>
          </div>
        </div>
        
        {/* 或直接输入 */}
        <div>
          <textarea
            className="w-full p-3 bg-white rounded-lg border border-gray-200 min-h-[120px] text-sm"
            placeholder="或直接输入教学设计内容..."
          ></textarea>
          <div className="text-right text-gray-400 text-xs mt-1">0/500</div>
        </div>
      </div>
      
      {/* 补充教学信息模块 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">补充教学信息</h2>
        </div>
        
        {/* 学科信息 */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">
            学科信息
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 w-full"
              placeholder="学科"
            />
            <input
              type="text"
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 w-full"
              defaultValue="七年级"
            />
            <input
              type="text"
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 w-full"
              placeholder="单元"
            />
          </div>
        </div>
        
        {/* 课程信息 */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">
            课程信息
          </label>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 w-full"
              placeholder="教材版本"
            />
            <input
              type="text"
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 w-full"
              placeholder="课时"
            />
            <div className="relative">
              <select className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 appearance-none pr-10" defaultValue="">
                <option value="" disabled>选择难度 ▼</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
        
        {/* 教学目标 */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">
            教学目标
          </label>
          <div className="space-y-3">
            <div>
              <div className="p-3 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                <span className="text-gray-700">知识目标</span>
              </div>
              <textarea
                className="w-full p-3 bg-white rounded-b-lg border border-gray-200 min-h-[120px] text-sm"
                placeholder="请输入..."
              ></textarea>
            </div>
            <div>
              <div className="p-3 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                <span className="text-gray-700">能力目标</span>
              </div>
              <textarea
                className="w-full p-3 bg-white rounded-b-lg border border-gray-200 min-h-[120px] text-sm"
                placeholder="请输入..."
              ></textarea>
            </div>
            <div>
              <div className="p-3 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                <span className="text-gray-700">素养目标</span>
              </div>
              <textarea
                className="w-full p-3 bg-white rounded-b-lg border border-gray-200 min-h-[120px] text-sm"
                placeholder="请输入..."
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* 学情分析 */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">
            学情分析
          </label>
          <div className="space-y-3">
            <div>
              <div className="p-3 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                <span className="text-gray-700">班级特点</span>
              </div>
              <textarea
                className="w-full p-3 bg-white rounded-b-lg border border-gray-200 min-h-[120px] text-sm"
                placeholder="请输入..."
              ></textarea>
            </div>
            <div>
              <div className="p-3 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                <span className="text-gray-700">学生基础</span>
              </div>
              <textarea
                className="w-full p-3 bg-white rounded-b-lg border border-gray-200 min-h-[120px] text-sm"
                placeholder="请输入..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* 教学重难点 */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">
            教学重难点
          </label>
          <div className="space-y-3">
            <div>
              <div className="p-3 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                <span className="text-gray-700">重点内容</span>
              </div>
              <textarea
                className="w-full p-3 bg-white rounded-b-lg border border-gray-200 min-h-[120px] text-sm"
                placeholder="请输入..."
              ></textarea>
            </div>
            <div>
              <div className="p-3 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                <span className="text-gray-700">难点内容</span>
              </div>
              <textarea
                className="w-full p-3 bg-white rounded-b-lg border border-gray-200 min-h-[120px] text-sm"
                placeholder="请输入..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* AI润色要求 */}
        <div className="mb-5">
          <div className="flex items-center mb-4">
            <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
            <h2 className="text-lg font-bold">AI润色要求</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {polishRequirements.map(requirement => (
              <button
                key={requirement.id}
                onClick={() => handleRequirementClick(requirement.id)}
                className={`p-2 rounded-lg border ${
                  selectedRequirements.includes(requirement.id)
                    ? 'border-blue-200 bg-blue-50 text-blue-500'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {requirement.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 按钮区域 */}
      <div className="flex justify-center mt-6">
        <button 
          className="w-full max-w-md p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-base font-medium"
          onClick={() => {
            const prompts = getSelectedPrompts()
            console.log('Selected prompts:', prompts) // 这里可以处理提示词
          }}
        >
          开始润色
        </button>
      </div>
    </div>
  )
}

// 预览页面组件
function PreviewTab() {
  // 模拟已配置的数据
  const configData = {
    subject: "数学",
    grade: "七年级",
    originalDesign: "七年级数学《一元一次方程》教学设计.docx",
    polishLevel: "中度润色",
    polishFocus: "增加现代教学方法，融入更多小组活动"
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-6 text-center">
          教学设计润色结果
        </h1>
        
        <div className="border-t border-b py-4 space-y-3">
          <div className="flex">
            <div className="w-24 text-gray-500">学科：</div>
            <div>{configData.subject}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">适用年级：</div>
            <div>{configData.grade}</div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">原始文件：</div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1 text-gray-400" />
              <span>{configData.originalDesign}</span>
            </div>
          </div>
          <div className="flex">
            <div className="w-24 text-gray-500">润色程度：</div>
            <div>{configData.polishLevel}</div>
          </div>
          {configData.polishFocus && (
            <div className="flex">
              <div className="w-24 text-gray-500">润色要点：</div>
              <div>{configData.polishFocus}</div>
            </div>
          )}
        </div>
      </div>
      
      {/* 润色结果对比 */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">润色对比</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 text-gray-700 flex items-center">
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2">原始版本</span>
              教学目标
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>1. 理解一元一次方程的概念</p>
              <p>2. 掌握解一元一次方程的方法</p>
              <p>3. 能够应用一元一次方程解决简单的实际问题</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <h3 className="font-medium mb-3 text-gray-700 flex items-center">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2">润色版本</span>
              教学目标
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>1. <span className="text-blue-500 font-medium">深入</span>理解一元一次方程的概念及其在实际生活中的应用意义</p>
              <p>2. 熟练掌握解一元一次方程的多种方法，<span className="text-blue-500 font-medium">并能灵活选择最优解法</span></p>
              <p>3. 能够应用一元一次方程解决<span className="text-blue-500 font-medium">多样化的</span>实际问题，<span className="text-blue-500 font-medium">培养数学建模能力</span></p>
              <p><span className="text-blue-500 font-medium">4. 通过小组合作学习，培养团队协作和交流表达能力</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">AI助手分析</h2>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p className="mb-2 text-gray-700">本次润色主要改进了以下几个方面：</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>教学目标更加明确具体，增加了高阶思维能力的培养</li>
            <li>教学方法更加现代化，融入了小组合作学习等方式</li>
            <li>增加了与生活实际的联系，提高了学习的实用性</li>
            <li>完善了教学评价体系，使评价更加全面和客观</li>
          </ul>
        </div>
      </div>
      
      {/* 按钮区域 */}
      <div className="flex justify-center mt-8 space-x-4">
        <button className="flex items-center px-6 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">
          <RefreshCw className="h-4 w-4 mr-2" />
          <span>重新润色</span>
        </button>
        <button className="px-8 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          下载润色结果
        </button>
      </div>
    </div>
  )
}

export default function TeachingDesignPolish() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>返回首页</span>
        </Link>
        <h1 className="text-2xl font-bold mt-4">教学设计润色</h1>
      </div>
      
      <ResponsiveLayout
        configPanel={<ConfigTab />}
        previewPanel={<PreviewTab />}
        configTitle="配置"
        previewTitle="预览"
      />
    </div>
  )
} 