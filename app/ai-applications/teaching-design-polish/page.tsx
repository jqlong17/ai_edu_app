"use client"

import { ChevronDown, ArrowLeft, Upload, FileText, RefreshCw } from "lucide-react"
import Link from "next/link"
import '../styles.css'
import './styles.css'
import ResponsiveLayout from '@/components/layout/ResponsiveLayout'

// 配置页面组件
function ConfigTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 基本信息模块 */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">基本信息</h2>
        </div>
        
        {/* 学科 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>学科</span>
          </label>
          <div className="relative">
            <select className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 appearance-none pr-10">
              <option value="" disabled>请选择学科</option>
              <option value="math" selected>数学</option>
              <option value="chinese">语文</option>
              <option value="english">英语</option>
              <option value="physics">物理</option>
              <option value="chemistry">化学</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        
        {/* 年级 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>适用年级</span>
          </label>
          <div className="relative">
            <select className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 appearance-none pr-10">
              <option value="" disabled>请选择年级</option>
              <option value="7" selected>七年级</option>
              <option value="8">八年级</option>
              <option value="9">九年级</option>
              <option value="10">高一</option>
              <option value="11">高二</option>
              <option value="12">高三</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        
        {/* 教学设计文件 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>教学设计文件</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Upload className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-sm font-medium mb-1">点击或拖拽上传文件</p>
            <p className="text-xs text-gray-500 mb-3">支持Word, PDF或文本文件</p>
            <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
              选择文件
            </button>
          </div>
        </div>
        
        {/* 润色要点 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span>润色要点</span>
            <span className="text-xs text-gray-500 ml-1">(选填)</span>
          </label>
          <textarea
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[120px] text-sm"
            placeholder="请输入您希望重点润色的地方，如：教学方法更现代化、增加更多的小组活动、与信息技术融合等"
          ></textarea>
        </div>
        
        {/* 润色程度 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span>润色程度</span>
          </label>
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <div className="relative w-5 h-5 mr-2">
                <input type="radio" name="polish_level" className="opacity-0 absolute w-full h-full" />
                <div className="border border-gray-300 rounded-full w-full h-full flex items-center justify-center">
                </div>
              </div>
              <span>轻度润色</span>
            </label>
            <label className="flex items-center">
              <div className="relative w-5 h-5 mr-2">
                <input type="radio" name="polish_level" className="opacity-0 absolute w-full h-full" defaultChecked />
                <div className="border border-gray-300 rounded-full w-full h-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <span>中度润色</span>
            </label>
            <label className="flex items-center">
              <div className="relative w-5 h-5 mr-2">
                <input type="radio" name="polish_level" className="opacity-0 absolute w-full h-full" />
                <div className="border border-gray-300 rounded-full w-full h-full flex items-center justify-center">
                </div>
              </div>
              <span>深度润色</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* 按钮区域 */}
      <div className="flex justify-center mt-6">
        <button className="px-8 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
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