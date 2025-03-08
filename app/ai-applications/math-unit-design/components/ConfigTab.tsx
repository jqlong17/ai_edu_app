"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Plus, Minus } from "lucide-react"
import { TextbookContent, getTextbookData } from "../utils/textbook-data"
import { getCourseGoalsByCategory, CourseGoal } from '../utils/course-goals';

// 配置页面组件
export default function ConfigTab() {
  // 基本信息状态
  const [grade, setGrade] = useState<number | ''>(7);
  const [semester, setSemester] = useState<number>(2);
  const [textbookVersion, setTextbookVersion] = useState<string>("人教版");
  const [textbookData, setTextbookData] = useState<TextbookContent[]>([]);
  
  // 选中的教材内容
  const [selectedContent, setSelectedContent] = useState<Array<{ chapter: string; section: string }>>([
    { chapter: "第五章 相交线与平行线", section: "5.1 相交线" },
    { chapter: "第五章 相交线与平行线", section: "5.2 平行线的性质" }
  ]);

  // 课时设计状态
  const [lessonDesigns, setLessonDesigns] = useState<Array<{ content: string }>>([]);

  // 教学内容分析状态
  const [contentAnalysis, setContentAnalysis] = useState<string>('');

  // 核心问题状态
  const [coreQuestion, setCoreQuestion] = useState<string>('');

  // 单元检测作业状态
  const [unitTest, setUnitTest] = useState<string>('');

  // 课程目标状态
  const [activeTab, setActiveTab] = useState<'核心素养' | '学段目标' | '课程内容' | '学业质量'>('核心素养');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    '会用数学的眼光观察现实世界',
    '抽象能力'
  ]);
  const [supplementInfo, setSupplementInfo] = useState<string>('');

  // 目标选项数据
  const [goalOptions, setGoalOptions] = useState<{
    '核心素养': string[];
    '学段目标': string[];
    '课程内容': string[];
    '学业质量': string[];
  }>({
    '核心素养': [],
    '学段目标': [],
    '课程内容': [],
    '学业质量': []
  });

  // 组件加载完成后获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取教材内容数据
        const data = await getTextbookData();
        setTextbookData(data);
      } catch (error) {
        console.error('Failed to load textbook data:', error);
      }
    };
    
    fetchData();
  }, []);

  // 当选中的教材内容变化时，更新课时设计
  useEffect(() => {
    // 根据选中的教材内容生成课时设计
    const newLessonDesigns = selectedContent.map(content => ({
      content: ''
    }));
    setLessonDesigns(newLessonDesigns);
  }, [selectedContent]);

  // 获取课程目标数据
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const [coreCompetencies, stageObjectives, courseContent, academicQuality] = await Promise.all([
          getCourseGoalsByCategory('核心素养'),
          getCourseGoalsByCategory('学段目标'),
          getCourseGoalsByCategory('课程内容'),
          getCourseGoalsByCategory('学业质量')
        ]);

        setGoalOptions({
          '核心素养': coreCompetencies.map(g => g.goal),
          '学段目标': stageObjectives.map(g => g.goal),
          '课程内容': courseContent.map(g => g.goal),
          '学业质量': academicQuality.map(g => g.goal)
        });
      } catch (error) {
        console.error('Failed to fetch course goals:', error);
      }
    };

    fetchGoals();
  }, []);

  // 获取可用的年级列表（去重）
  const grades = Array.from(new Set(textbookData.map(item => item.grade))).sort((a, b) => a - b);

  // 获取可用的学期列表（去重）
  const semesters = Array.from(new Set(textbookData.map(item => item.semester))).sort((a, b) => a - b);

  // 获取可用的教材版本列表（去重）
  const textbookVersions = Array.from(new Set(textbookData.map(item => item.textbook_version)));

  // 根据当前选择的年级、学期等筛选可用的教材内容
  const filteredContent = textbookData.filter(item => 
    (grade !== '' && item.grade === grade) &&
    (item.semester === semester) &&
    item.subject === "数学" &&
    (item.textbook_version === textbookVersion)
  );

  // 获取可选的章节列表（去重）
  const chapters = Array.from(new Set(filteredContent.map(item => item.chapter)));

  // 根据选中的章节获取对应的小节列表
  const getSections = (chapter: string) => {
    return filteredContent
      .filter(item => item.chapter === chapter)
      .map(item => item.section);
  };

  // 添加新的教材内容
  const handleAddContent = () => {
    setSelectedContent([...selectedContent, { chapter: "", section: "" }]);
  };

  // 删除教材内容
  const handleRemoveContent = (index: number) => {
    const newContent = selectedContent.filter((_, i) => i !== index);
    setSelectedContent(newContent);
  };

  // 更新教材内容
  const handleContentChange = (index: number, field: 'chapter' | 'section', value: string) => {
    const newContent = [...selectedContent];
    newContent[index] = { ...newContent[index], [field]: value };
    
    // 如果更改了章节，清空对应的小节
    if (field === 'chapter') {
      newContent[index].section = "";
    }
    
    setSelectedContent(newContent);
  };

  // 更新课时设计内容
  const handleLessonDesignChange = (index: number, value: string) => {
    const newLessonDesigns = [...lessonDesigns];
    newLessonDesigns[index] = { ...newLessonDesigns[index], content: value };
    setLessonDesigns(newLessonDesigns);
  };

  // 处理教学内容分析变更
  const handleContentAnalysisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentAnalysis(e.target.value);
  };

  // 处理核心问题变更
  const handleCoreQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCoreQuestion(e.target.value);
  };

  // 处理单元检测作业变更
  const handleUnitTestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUnitTest(e.target.value);
  };

  // 处理目标选择
  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  // 处理目标删除
  const handleGoalRemove = (goal: string) => {
    setSelectedGoals(prev => prev.filter(g => g !== goal));
  };

  // 处理补充信息变更
  const handleSupplementInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setSupplementInfo(value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* 基本信息模块 */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">基本信息</h2>
        </div>
        
        {/* 所教年级 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>所教年级</span>
          </label>
          <div className="relative">
            <select 
              value={grade}
              onChange={(e) => {
                const newGrade = e.target.value ? parseInt(e.target.value) : '';
                setGrade(newGrade);
                setSelectedContent([]);
              }}
              className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-700 appearance-none"
            >
              <option value="">请选择年级</option>
              {grades.map(g => (
                <option key={g} value={g}>
                  {g <= 9 ? `${g}年级` : g === 10 ? '高一' : g === 11 ? '高二' : '高三'}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>
        
        {/* 学期 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>学期</span>
          </label>
          <div className="flex space-x-6">
            {semesters.map(s => (
              <label key={s} className="flex items-center cursor-pointer">
                <div className="relative w-5 h-5 mr-2">
                  <input 
                    type="radio" 
                    name="semester" 
                    checked={semester === s}
                    onChange={() => {
                      setSemester(s);
                      setSelectedContent([]);
                    }}
                    className="opacity-0 absolute w-full h-full cursor-pointer" 
                  />
                  <div className="border border-gray-300 rounded-full w-full h-full flex items-center justify-center">
                    {semester === s && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                  </div>
                </div>
                <span>{s === 1 ? '上学期' : '下学期'}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* 所教学科 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>所教学科</span>
          </label>
          <input
            type="text"
            value="数学"
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700"
            readOnly
          />
        </div>
        
        {/* 教材版本 */}
        <div className="mb-5">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>教材版本</span>
          </label>
          <div className="relative">
            <select 
              value={textbookVersion}
              onChange={(e) => {
                setTextbookVersion(e.target.value);
                setSelectedContent([]);
              }}
              className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-700 appearance-none"
            >
              <option value="">请选择教材版本</option>
              {textbookVersions.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>
        
        {/* 教材内容 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">教材内容</h2>
          <p className="text-gray-600 mb-4">请选择本次教学涉及的教材内容</p>
          <div className="space-y-4">
            {selectedContent.map((content, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-medium">内容 {index + 1}</div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveContent(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-sm">章节</label>
                    <div className="relative">
                      <select 
                        value={content.chapter}
                        onChange={(e) => handleContentChange(index, 'chapter', e.target.value)}
                        className="w-full p-2 bg-white rounded border border-gray-200 text-gray-700 appearance-none text-sm"
                      >
                        <option value="">请选择章节</option>
                        {chapters.map((chapter) => (
                          <option key={chapter} value={chapter}>
                            {chapter}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">小节</label>
                    <div className="relative">
                      <select 
                        value={content.section}
                        onChange={(e) => handleContentChange(index, 'section', e.target.value)}
                        className="w-full p-2 bg-white rounded border border-gray-200 text-gray-700 appearance-none text-sm"
                        disabled={!content.chapter}
                      >
                        <option value="">请选择小节</option>
                        {content.chapter && getSections(content.chapter).map((section) => (
                          <option key={section} value={section}>
                            {section}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleAddContent}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <Plus className="h-5 w-5 mr-1" />
              <span>添加教材内容</span>
            </button>
          </div>
        </div>
      </div>

      {/* 课程目标模块 */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">课程目标</h2>
        </div>

        {/* 目标选择区域 */}
        <div className="mb-4">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>课程目标</span>
          </label>
          
          {/* 标签导航 */}
          <div className="flex border-b mb-4">
            {(Object.keys(goalOptions) as Array<keyof typeof goalOptions>).map(tab => (
              <button
                key={tab}
                className={`px-6 py-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-blue-500 font-medium border-b-2 border-blue-500'
                    : 'text-gray-400'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 选项列表 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {goalOptions[activeTab].map(goal => (
              <div key={goal} className="flex items-center">
                <label className="flex items-center cursor-pointer whitespace-nowrap">
                  <div className="relative w-5 h-5 mr-2">
                    <input
                      type="checkbox"
                      checked={selectedGoals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="opacity-0 absolute w-full h-full cursor-pointer"
                    />
                    <div className="border border-gray-300 rounded w-full h-full flex items-center justify-center">
                      {selectedGoals.includes(goal) && (
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700">{goal}</span>
                </label>
              </div>
            ))}
          </div>

          {/* 已选目标展示 */}
          {selectedGoals.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedGoals.map(goal => (
                <div key={goal} className="flex items-center bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                  {goal}
                  <button className="ml-2" onClick={() => handleGoalRemove(goal)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 补充信息 */}
          <div>
            <textarea
              value={supplementInfo}
              onChange={handleSupplementInfoChange}
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[120px] resize-none"
              placeholder="请输入"
            ></textarea>
            <div className="flex justify-end text-gray-400 text-sm mt-1">
              {supplementInfo.length}/500
            </div>
          </div>
        </div>
      </div>

      {/* 教学内容分析 */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">教学内容分析</h2>
          <div className="ml-2 cursor-help">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>
        <div className="mb-4">
          <textarea
            value={contentAnalysis}
            onChange={handleContentAnalysisChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[120px] resize-none"
            placeholder="从以下内容分析：
1. 内容的本质
2. 内容蕴含的数学思想和方法
3. 知识的上下位关系"
          ></textarea>
        </div>
        <button className="flex items-center text-blue-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
          </svg>
          <span className="ml-1">AI补充</span>
        </button>
      </div>

      {/* 核心问题 */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">核心问题</h2>
        </div>
        <div className="mb-4">
          <textarea
            value={coreQuestion}
            onChange={handleCoreQuestionChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[120px] resize-none"
            placeholder="请输入"
          ></textarea>
        </div>
        <button className="flex items-center text-blue-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
          </svg>
          <span className="ml-1">AI补充</span>
        </button>
      </div>

      {/* 课时设计 */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">课时设计</h2>
        </div>
        
        {/* 动态生成课时设计 */}
        {selectedContent.length > 0 ? (
          selectedContent.map((content, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center mb-3">
                <span className="text-red-500 mr-1">*</span>
                <span className="font-medium">
                  {index + 1}、{content.chapter} &lt;{content.section}&gt;
                </span>
              </div>
              <div className="mb-4">
                <textarea
                  value={lessonDesigns[index]?.content || ''}
                  onChange={(e) => handleLessonDesignChange(index, e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[120px] resize-none"
                  placeholder="请输入"
                ></textarea>
              </div>
              <button className="flex items-center text-blue-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                </svg>
                <span className="ml-1">AI补充</span>
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            请先选择教材内容
          </div>
        )}
      </div>

      {/* 单元检测作业 */}
      <div className="mb-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-blue-500 rounded-sm mr-2"></div>
          <h2 className="text-lg font-bold">单元检测作业</h2>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <span className="text-red-500 mr-1">*</span>
            <span>内容</span>
          </label>
          <textarea
            value={unitTest}
            onChange={handleUnitTestChange}
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[120px] resize-none"
            placeholder="请输入"
          ></textarea>
        </div>
        <button className="flex items-center text-blue-500 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
          </svg>
          <span className="ml-1">AI补充</span>
        </button>
      </div>

      {/* 生成按钮 */}
      <div className="flex justify-center mt-8">
        <button className="px-12 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium shadow-sm">
          生成教学方案
        </button>
      </div>
    </div>
  );
} 