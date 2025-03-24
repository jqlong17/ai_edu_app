"use client"

import { AppLayout } from "@/components/layout"
import { Layers, ArrowLeft, Plus, Settings, Save, Play, Share2, Grid, Box, MessageSquare, Database, RefreshCw, Brain, ActivitySquare, ArrowRightLeft, Code, Upload, Download, FileType, CircleCheck, CheckSquare, AlignLeft, FileText, Minus, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import React from "react"

// Dify集成相关类型定义
interface DifyConfig {
  apiEndpoint: string
  apiKey: string
  workflowId: string
}

// 定义UI组件类型
interface UIComponent {
  id: string
  type: string
  name: string
  icon: React.ElementType
  description: string
  x: number
  y: number
  config?: any
  // UI组件不需要连接
}

// 定义连接类型（仅用于兼容现有代码）
interface Connection {
  sourceId: string
  targetId: string
  sourceSide: 'top' | 'right' | 'bottom' | 'left'
  targetSide: 'top' | 'right' | 'bottom' | 'left'
}

// 定义应用类型
interface AppItem {
  id: string
  name: string
  description: string
  components: number
  status: "draft" | "published"
  lastModified: string
  difyConfig?: DifyConfig
  // 存储布局信息
  layout?: {
    header?: UIComponent,
    inputs?: UIComponent[],
    outputs?: UIComponent[],
    footer?: UIComponent
  }
}

// 可用UI组件数据
const availableComponents = [
  {
    id: "header",
    type: "header",
    name: "页面标题",
    icon: Layers,
    description: "应用标题和描述区域"
  },
  {
    id: "text-input",
    type: "input",
    name: "文本输入",
    icon: MessageSquare,
    description: "单行或多行文本输入框"
  },
  {
    id: "file-upload",
    type: "input",
    name: "文件上传",
    icon: Upload,
    description: "文件上传组件，支持拖放"
  },
  {
    id: "radio-group",
    type: "input",
    name: "单选组",
    icon: CircleCheck,
    description: "单选按钮组"
  },
  {
    id: "checkbox-group",
    type: "input",
    name: "复选组",
    icon: CheckSquare,
    description: "复选框组"
  },
  {
    id: "text-output",
    type: "output",
    name: "文本输出",
    icon: AlignLeft,
    description: "展示文本结果"
  },
  {
    id: "markdown-output",
    type: "output",
    name: "富文本输出",
    icon: FileText,
    description: "支持Markdown格式的富文本输出"
  },
  {
    id: "submit-button",
    type: "action",
    name: "提交按钮",
    icon: Play,
    description: "提交表单并调用AI服务"
  },
  {
    id: "divider",
    type: "layout",
    name: "分隔线",
    icon: Minus,
    description: "用于分隔不同区域的线条"
  },
  {
    id: "dify-config",
    type: "config",
    name: "Dify配置",
    icon: Settings,
    description: "配置与Dify的连接参数"
  }
]

// 示例应用
const sampleApps: AppItem[] = [
  {
    id: "1",
    name: "智能文档分析",
    description: "上传文档，自动提取关键信息并生成摘要",
    components: 4,
    status: "published",
    lastModified: "2024-03-15"
  },
  {
    id: "2",
    name: "客服问答机器人",
    description: "基于知识库的智能客服，可自动回答常见问题",
    components: 5,
    status: "draft",
    lastModified: "2024-03-16"
  },
  {
    id: "3",
    name: "PPT转教案",
    description: "上传PPT文件，自动生成完整的教学教案文档",
    components: 4,
    status: "published",
    lastModified: "2024-03-18",
    layout: {
      header: {
        id: "header-1",
        type: "header",
        name: "页面标题",
        icon: Layers,
        description: "PPT转教案工具",
        x: 50,
        y: 50,
        config: {
          title: "PPT转教案工具",
          subtitle: "上传PPT文件，填写需求，自动生成教学教案"
        }
      },
      inputs: [
        {
          id: "file-upload-1",
          type: "input",
          name: "文件上传",
          icon: Upload,
          description: "上传PPT文件",
          x: 50,
          y: 150,
          config: {
            label: "上传PPT文件",
            acceptTypes: ".ppt,.pptx",
            maxSize: 10
          }
        },
        {
          id: "text-input-1",
          type: "input",
          name: "文本输入",
          icon: MessageSquare,
          description: "教案需求",
          x: 50,
          y: 250,
          config: {
            label: "教案需求说明",
            placeholder: "请输入对教案的具体要求，如教学目标、重点难点分析等",
            multiline: true,
            rows: 4
          }
        }
      ],
      outputs: [
        {
          id: "markdown-output-1",
          type: "output",
          name: "富文本输出",
          icon: FileText,
          description: "教案输出",
          x: 50,
          y: 400,
          config: {
            label: "生成的教案",
            format: "markdown"
          }
        }
      ],
      footer: {
        id: "submit-button-1",
        type: "action",
        name: "提交按钮",
        icon: Play,
        description: "生成教案",
        x: 50,
        y: 350,
        config: {
          text: "生成教案",
          difyConfig: {
            apiEndpoint: "https://api.dify.ai/v1",
            apiKey: "dify_api_key",
            workflowId: "ppt-to-plan-workflow",
            inputMappings: {
              "file": "file-upload-1",
              "requirements": "text-input-1"
            },
            outputMapping: "markdown-output-1"
          }
        }
      }
    }
  }
]

// PPT转教案的预设模块配置
const pptToPlanModules: UIComponent[] = [
  {
    id: "input-module-file",
    type: "file-upload",
    name: "文件上传模块",
    icon: Upload,
    description: "接收用户上传的PPT文件",
    x: 50,
    y: 100,
    config: {
      fieldName: "pptFile",
      promptText: "上传PPT文件",
      inputType: "file",
      acceptTypes: ".ppt,.pptx"
    }
  },
  {
    id: "input-module-requirements",
    type: "text-input",
    name: "教案要求输入",
    icon: MessageSquare,
    description: "接收用户输入的教案要求",
    x: 50,
    y: 250,
    config: {
      fieldName: "requirements",
      promptText: "请输入教案的具体要求",
      inputType: "textarea"
    }
  },
  {
    id: "dify-workflow-ppt",
    type: "dify-config",
    name: "PPT处理工作流",
    icon: ActivitySquare,
    description: "处理PPT并生成教案内容",
    x: 400,
    y: 175,
    config: {
      workflowId: "ppt-to-plan-workflow",
      inputMapping: [
        { source: "pptFile", target: "file" },
        { source: "requirements", target: "requirements" }
      ],
      outputMapping: [
        { source: "lesson_plan", target: "lessonPlan" }
      ]
    }
  },
  {
    id: "output-module-plan",
    type: "markdown-output",
    name: "教案输出",
    icon: Grid,
    description: "展示生成的教案内容",
    x: 750,
    y: 175,
    config: {
      fieldName: "lessonPlan",
      displayMode: "markdown"
    }
  }
];

// PPT转教案的连接配置
const pptToPlanConnections: Connection[] = [
  {
    sourceId: "input-module-file",
    targetId: "dify-workflow-ppt",
    sourceSide: 'right',
    targetSide: 'left'
  },
  {
    sourceId: "input-module-requirements",
    targetId: "dify-workflow-ppt",
    sourceSide: 'right',
    targetSide: 'left'
  },
  {
    sourceId: "dify-workflow-ppt",
    targetId: "output-module-plan",
    sourceSide: 'right',
    targetSide: 'left'
  }
];

// 定义统一的组件高度常量
const FIXED_COMPONENT_HEIGHT = 200; // 增大组件高度到200px
const COMPONENT_SPACING = 40; // 增加组件间距到40px

// 根据组件类型获取组件固定高度 - 始终返回统一高度
const getComponentHeight = () => {
  return FIXED_COMPONENT_HEIGHT;
};

export default function AppStudio() {
  const [apps, setApps] = useState<AppItem[]>(sampleApps)
  const [activeApp, setActiveApp] = useState<string>("")
  const [mode, setMode] = useState<"view" | "edit" | "preview">("view")
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  
  // 已放置的UI组件
  const [placedComponents, setPlacedComponents] = useState<UIComponent[]>([])
  
  // Dify配置
  const [difyConfig, setDifyConfig] = useState<DifyConfig>({
    apiEndpoint: "",
    apiKey: "",
    workflowId: ""
  })
  
  // 预览状态
  const [previewInput, setPreviewInput] = useState<string>("")
  const [previewOutput, setPreviewOutput] = useState<string>("")
  
  // 活动选项卡
  const [activeTab, setActiveTab] = useState<"components" | "config">("components")
  
  // 应用名称和描述（兼容旧代码）
  const [appName, setAppName] = useState<string>("新应用")
  const [appDescription, setAppDescription] = useState<string>("")
  
  // 保存状态
  const [saving, setSaving] = useState<boolean>(false)
  
  // 处理状态
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  
  // 画布引用
  const canvasRef = useRef<HTMLDivElement>(null)
  
  // 添加调试日志功能
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  
  const logDebug = (message: string) => {
    console.log(message);
    setDebugLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };
  
  // 在AppStudio组件中添加布局控制选项
  const [showConnectionPoints, setShowConnectionPoints] = useState<boolean>(false)
  const [useAutoLayout, setUseAutoLayout] = useState<boolean>(true)
  // 添加调试模式开关
  const [showDebugInfo, setShowDebugInfo] = useState<boolean>(false)
  
  // 创建新应用
  const handleCreateApp = () => {
    const newApp: AppItem = {
      id: String(apps.length + 1),
      name: "新应用",
      description: "应用描述",
      components: 0,
      status: "draft",
      lastModified: new Date().toISOString().split("T")[0]
    }
    
    setApps([...apps, newApp])
    setActiveApp(newApp.id)
    setMode("edit")
    setPlacedComponents([])
  }
  
  // 编辑应用
  const handleEditApp = (id: string) => {
    setActiveApp(id)
    setMode("edit")
    
    // 找到选中的应用
    const app = apps.find(app => app.id === id)
    
    if (app?.layout) {
      // 加载已有的布局
      const componentsArray: UIComponent[] = []
      
      if (app.layout.header) componentsArray.push(app.layout.header)
      if (app.layout.inputs) componentsArray.push(...app.layout.inputs)
      if (app.layout.outputs) componentsArray.push(...app.layout.outputs)
      if (app.layout.footer) componentsArray.push(app.layout.footer)
      
      setPlacedComponents(componentsArray)
      
      // 加载Dify配置
      if (app.layout.footer?.config?.difyConfig) {
        setDifyConfig(app.layout.footer.config.difyConfig)
      }
    } else {
      // 新建应用，重置组件
      setPlacedComponents([])
    }
  }
  
  // 计算画布高度的函数
  const calculateCanvasHeight = () => {
    if (placedComponents.length === 0) {
      return 600; // 默认高度
    }
    
    // 计算所有组件的底部位置
    const componentBottoms = placedComponents.map(comp => {
      return comp.y + FIXED_COMPONENT_HEIGHT;
    });
    
    // 找出最底部组件的位置并添加底部内边距
    const maxY = Math.max(...componentBottoms) + 150; // 添加150px的底部内边距
    return Math.max(600, maxY); // 至少600px高度
  };
  
  // 监听自动布局开关变化，重新计算所有组件位置
  useEffect(() => {
    if (useAutoLayout && placedComponents.length > 0) {
      logDebug("自动布局模式变更，重新排列组件");
      const arranged = arrangeComponentsVertically();
      setPlacedComponents(arranged);
    }
  }, [useAutoLayout]);
  
  // 当组件数量或配置变更时触发重新布局
  useEffect(() => {
    if (useAutoLayout && placedComponents.length > 0) {
      // 组件的配置可能会影响高度，因此需要重新计算
      logDebug("组件数量或配置变更，重新排列");
      // 使用setTimeout避免过于频繁的重算导致性能问题
      const timer = setTimeout(() => {
        const arranged = arrangeComponentsVertically();
        setPlacedComponents(arranged);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [placedComponents.length, placedComponents.map(c => JSON.stringify(c.config)).join(',')]);
  
  // 添加组件到画布（重构）
  const handleAddComponent = (componentType: string) => {
    // 找到组件模板
    const template = availableComponents.find(c => c.id === componentType);
    
    if (!template) return;
    
    logDebug(`添加新组件: ${template.name}`);
    
    // 计算初始位置 - 总是添加到最底部
    const fixedX = 50;
    let initialY = 50;
    
    if (placedComponents.length > 0 && useAutoLayout) {
      // 找到最底部组件的位置
      const lastComponent = [...placedComponents].sort((a, b) => (a.y + FIXED_COMPONENT_HEIGHT) - (b.y + FIXED_COMPONENT_HEIGHT)).pop();
      if (lastComponent) {
        initialY = lastComponent.y + FIXED_COMPONENT_HEIGHT + COMPONENT_SPACING; // 确保新组件不会与最后一个组件重叠
      }
    }
    
    // 创建新组件实例
    const newComponent: UIComponent = {
      ...template,
      id: `${template.id}-${new Date().getTime()}`,
      x: fixedX,
      y: initialY,
      config: {}
    };
    
    // 根据类型设置默认配置
    switch (template.type) {
      case "header":
        newComponent.config = {
          title: "应用标题",
          subtitle: "应用描述"
        };
        break;
      case "input":
        newComponent.config = {
          label: "输入标签",
          placeholder: "请输入...",
          required: false
        };
        if (template.id === "file-upload") {
          newComponent.config.acceptTypes = "*";
          newComponent.config.maxSize = 5;
        }
        if (template.id === "text-input") {
          newComponent.config.multiline = false;
          newComponent.config.rows = 1;
        }
        break;
      case "output":
        newComponent.config = {
          label: "输出结果"
        };
        if (template.id === "markdown-output") {
          newComponent.config.format = "markdown";
        }
        break;
      case "action":
        newComponent.config = {
          text: "提交"
        };
        break;
    }
    
    // 更新状态
    setPlacedComponents(prev => {
      const updated = [...prev, newComponent];
      return useAutoLayout ? arrangeComponentsVertically(updated) : updated;
    });
    
    setSelectedComponent(newComponent.id);
    setActiveTab("config");
  };
  
  // 改进拖拽逻辑，支持通过拖拽改变卡片顺序
  const handleComponentDrag = (id: string, x: number, y: number) => {
    // 确保不会拖动到负坐标
    const safeX = Math.max(0, x);
    const safeY = Math.max(0, y);
    
    logDebug(`拖动组件 ${id} 到位置: x=${safeX}, y=${safeY}`);
    
    // 更新被拖动组件的位置
    const updatedComponents = placedComponents.map(comp => 
      comp.id === id ? { ...comp, x: safeX, y: safeY } : comp
    );
    
    // 获取拖动的组件
    const draggedComponent = updatedComponents.find(c => c.id === id);
    if (!draggedComponent) return;
    
    if (useAutoLayout) {
      // 根据Y位置确定新的顺序
      // 首先对除了被拖动组件以外的组件按Y轴排序
      const othersInOrder = updatedComponents
        .filter(c => c.id !== id)
        .sort((a, b) => a.y - b.y);
      
      // 确定被拖动组件应该插入的位置
      let insertIndex = 0;
      for (let i = 0; i < othersInOrder.length; i++) {
        if (safeY > othersInOrder[i].y) {
          insertIndex = i + 1;
        }
      }
      
      // 将被拖动的组件插入到正确的位置
      othersInOrder.splice(insertIndex, 0, draggedComponent);
      
      logDebug(`组件 ${id} 新的排序位置: ${insertIndex}`);
      
      // 重新排列所有组件
      const rearranged = arrangeComponentsVertically(othersInOrder);
      setPlacedComponents(rearranged);
    } else {
      // 在自由布局模式下，直接更新位置
      setPlacedComponents(updatedComponents);
    }
  };
  
  // 监听组件配置变化
  const handleComponentConfig = (id: string, config: any) => {
    logDebug(`更新组件 ${id} 配置: ${JSON.stringify(config)}`);
    
    // 更新组件配置
    const updatedComponents = placedComponents.map(comp => 
      comp.id === id ? { ...comp, config: { ...comp.config, ...config } } : comp
    );
    
    setPlacedComponents(updatedComponents);
  };
  
  // 当组件被删除时
  const handleDeleteComponent = (id: string) => {
    logDebug(`删除组件 ${id}`);
    
    const updatedComponents = placedComponents.filter(comp => comp.id !== id);
    
    if (selectedComponent === id) {
      setSelectedComponent(null);
      setActiveTab("components");
    }
    
    // 如果启用了自动布局，重新布局剩余组件
    setPlacedComponents(
      useAutoLayout && updatedComponents.length > 0 
        ? arrangeComponentsVertically(updatedComponents)
        : updatedComponents
    );
  };
  
  // 保存应用
  const handleSaveApp = () => {
    if (!activeApp) return
    
    // 对组件进行分类
    const header = placedComponents.find(comp => comp.type === "header")
    const inputs = placedComponents.filter(comp => comp.type === "input")
    const outputs = placedComponents.filter(comp => comp.type === "output")
    const footer = placedComponents.find(comp => comp.type === "action")
    
    // 如果footer是提交按钮，添加Dify配置
    if (footer && footer.id.includes("submit-button")) {
      footer.config = {
        ...footer.config,
        difyConfig: difyConfig
      }
    }
    
    // 更新应用
    const updatedApps = apps.map(app => {
      if (app.id === activeApp) {
        return {
          ...app,
          components: placedComponents.length,
          lastModified: new Date().toISOString().split("T")[0],
          layout: {
            header,
            inputs,
            outputs,
            footer
          }
        }
      }
      return app
    })
    
    setApps(updatedApps)
    setMode("view")
  }
  
  // 进入预览模式
  const enterPreviewMode = () => {
    setMode("preview")
    setPreviewInput("")
    setPreviewOutput("")
    
    // 如果是PPT转教案应用，预设一些输入示例
    if (activeApp === "3") {
      setPreviewInput(
        "教学目标：\n1. 掌握人工智能的基本概念\n2. 了解机器学习的工作原理\n\n" +
        "重点难点分析：\n- 重点：AI的应用场景\n- 难点：深度学习算法原理\n\n" +
        "小组协作环节：\n分组讨论AI在不同行业的应用\n\n" +
        "课后练习：\n设计一个简单的AI应用场景"
      )
    }
  }
  
  // 处理预览提交
  const handlePreviewSubmit = () => {
    if (!previewInput) {
      alert("请先输入内容")
      return
    }
    
    // 获取当前应用的布局
    const currentApp = apps.find(app => app.id === activeApp)
    
    if (!currentApp || !currentApp.layout) {
      setPreviewOutput("应用布局未定义")
      return
    }
    
    // 构建提交到Dify的输入
    let difyInput: any = {}
    
    // 如果是PPT转教案应用
    if (activeApp === "3") {
      difyInput = {
        requirements: previewInput,
        file: "[模拟文件上传: PPT文件.pptx]"
      }
      
      // 模拟API响应
      setTimeout(() => {
        setPreviewOutput(
          "# 人工智能基础教案\n\n" +
          "## 1. 教学目标\n\n" +
          "1. 掌握人工智能的基本概念\n" +
          "2. 了解机器学习的工作原理\n\n" +
          "## 2. 重点难点分析\n\n" +
          "### 重点：\n" +
          "- AI的应用场景\n" +
          "- 机器学习的分类\n\n" +
          "### 难点：\n" +
          "- 深度学习算法原理\n" +
          "- 神经网络结构\n\n" +
          "## 3. 教学过程\n\n" +
          "### 导入 (10分钟)\n" +
          "- 播放AI应用视频，引发学生兴趣\n" +
          "- 提问：日常生活中有哪些AI应用？\n\n" +
          "### 新课讲解 (25分钟)\n" +
          "- 人工智能概念解析\n" +
          "- 机器学习工作原理\n" +
          "- 深度学习案例分析\n\n" +
          "### 小组协作 (15分钟)\n" +
          "- 分组讨论AI在不同行业的应用\n" +
          "- 各组代表分享讨论结果\n\n" +
          "## 4. 课后练习\n" +
          "- 设计一个简单的AI应用场景\n" +
          "- 阅读相关拓展材料\n\n" +
          "## 5. 教学反思\n" +
          "关注学生对深度学习原理的理解情况，适当调整讲解难度。"
        )
      }, 1000)
    } else {
      // 其他类型应用的输入处理
      currentApp.layout.inputs?.forEach(input => {
        difyInput[input.id] = previewInput
      })
      
      // 模拟API响应
      setTimeout(() => {
        setPreviewOutput("这是AI处理后的结果。根据您的输入：\n\n" + previewInput + "\n\n我们生成了以下内容...(此处为模拟输出)")
      }, 1000)
    }
  }
  
  // 处理模块选择
  const handleSelectModule = (moduleId: string) => {
    setSelectedComponent(moduleId)
    setActiveTab("config")
  }
  
  // 测试Dify连接
  const testDifyConnection = async () => {
    if (!difyConfig.apiKey || !difyConfig.workflowId) {
      alert("请先配置Dify API密钥和工作流ID")
      return
    }
    
    setIsProcessing(true)
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert("连接测试成功")
    } catch (error) {
      console.error("连接测试失败:", error)
      alert("连接测试失败，请检查配置")
    } finally {
      setIsProcessing(false)
    }
  }
  
  // 处理拖放
  const handleDrop = (e: React.DragEvent) => {
    // 在新的设计中，我们通过点击添加组件而不是拖放
    e.preventDefault()
  }
  
  // 拖动过程中
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  
  // 发布应用
  const handlePublishApp = () => {
    if (!activeApp) return
    
    const updatedApps = apps.map(app => {
      if (app.id === activeApp) {
        return {
          ...app,
          status: "published" as const,
          lastModified: new Date().toISOString().split("T")[0]
        }
      }
      return app
    })
    
    setApps(updatedApps)
    setMode("view")
  }
  
  // 渲染连接（兼容旧代码，现在不需要显示连接线）
  const renderConnections = () => {
    return null
  }

  // renderCanvas 函数 - 改进渲染逻辑
  const renderCanvas = () => {
    const canvasHeight = calculateCanvasHeight();
    
    if (placedComponents.length === 0) {
      return (
        <div className="h-[600px] flex flex-col items-center justify-center text-gray-400">
          <Layers className="h-12 w-12 mb-3 opacity-20" />
          <p>从左侧添加组件到此区域</p>
        </div>
      );
    }
    
    // 按Y坐标排序组件以确保重叠时下方组件不会覆盖上方组件
    const sortedComponents = [...placedComponents].sort((a, b) => a.y - b.y);
    
    return (
      <div className="relative p-4" style={{ height: `${canvasHeight}px` }}>
        {/* 渲染模块 */}
        {sortedComponents.map((component, index) => {
          // 计算卡片顶部位置，确保严格按照排序后的位置
          const cardTop = component.y;

          return (
            <div
              key={component.id}
              className={`absolute bg-white border rounded-lg p-2.5 shadow-sm transition-all duration-150 ${
                selectedComponent === component.id 
                  ? 'border-blue-500 ring-2 ring-blue-200 z-30' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              style={{ 
                left: `${component.x}px`, 
                top: `${cardTop}px`,
                width: 'calc(100% - 120px)',
                maxWidth: '600px',
                minWidth: '350px',
                height: `${FIXED_COMPONENT_HEIGHT}px`, 
                maxHeight: `${FIXED_COMPONENT_HEIGHT}px`,
                overflow: 'hidden',
                zIndex: selectedComponent === component.id ? 10 : 1
              }}
              onClick={() => {
                setSelectedComponent(component.id)
                setActiveTab("config")
              }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("componentId", component.id)
                const rect = e.currentTarget.getBoundingClientRect()
                const offsetX = e.clientX - rect.left
                const offsetY = e.clientY - rect.top
                e.dataTransfer.setData("offsetX", offsetX.toString())
                e.dataTransfer.setData("offsetY", offsetY.toString())
              }}
            >
              {/* 组件索引标记 */}
              {useAutoLayout && (
                <div className="absolute -left-9 top-1/2 transform -translate-y-1/2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                    {index + 1}
                  </div>
                </div>
              )}
              
              <div className="flex items-center mb-1">
                <div className={`w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center mr-2`}>
                  {React.createElement(component.icon, { className: "h-4 w-4 text-blue-600" })}
                </div>
                <h4 className="font-medium text-sm">{component.name}</h4>
              </div>
              
              {/* 增大内容区域的高度 */}
              {component.type === "header" && (
                <div style={{ height: `${FIXED_COMPONENT_HEIGHT - 40}px`, overflow: 'hidden' }} className="flex flex-col">
                  <h3 className="text-lg font-bold">{component.config?.title || "应用标题"}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{component.config?.subtitle || "应用描述"}</p>
                </div>
              )}
              
              {component.type === "input" && (
                <div>
                  <label className="block text-sm font-medium mb-0.5">{component.config?.label || "输入标签"}</label>
                  {component.id.includes("text-input") ? (
                    component.config?.multiline ? (
                      <div 
                        className="border border-gray-200 rounded-md p-2 bg-gray-50 text-sm text-gray-400 overflow-auto"
                        style={{ height: `${FIXED_COMPONENT_HEIGHT - 50}px`, maxHeight: `${FIXED_COMPONENT_HEIGHT - 50}px` }}
                      >
                        多行文本输入区域
                      </div>
                    ) : (
                      <div 
                        className="border border-gray-200 rounded-md p-2 bg-gray-50 text-sm text-gray-400"
                        style={{ height: `${FIXED_COMPONENT_HEIGHT - 50}px`, maxHeight: `${FIXED_COMPONENT_HEIGHT - 50}px` }}
                      >
                        文本输入区域
                      </div>
                    )
                  ) : component.id.includes("file-upload") ? (
                    <div 
                      className="border border-dashed border-gray-200 rounded-md p-2 text-center flex flex-col items-center justify-center"
                      style={{ height: `${FIXED_COMPONENT_HEIGHT - 50}px`, maxHeight: `${FIXED_COMPONENT_HEIGHT - 50}px` }}
                    >
                      <Upload className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                      <p className="text-sm text-gray-400">上传文件</p>
                      <p className="text-xs text-gray-400 mt-0.5">支持 .ppt, .pptx, .pdf 等格式</p>
                    </div>
                  ) : (
                    <div 
                      className="border border-gray-200 rounded-md p-2 bg-gray-50 text-sm text-gray-400"
                      style={{ height: `${FIXED_COMPONENT_HEIGHT - 50}px`, maxHeight: `${FIXED_COMPONENT_HEIGHT - 50}px` }}
                    >
                      输入区域
                    </div>
                  )}
                </div>
              )}
              
              {component.type === "output" && (
                <div>
                  <label className="block text-sm font-medium mb-0.5">{component.config?.label || "输出结果"}</label>
                  <div 
                    className="border border-gray-200 rounded-md p-2 bg-gray-50 text-sm text-gray-400 overflow-auto"
                    style={{ height: `${FIXED_COMPONENT_HEIGHT - 50}px`, maxHeight: `${FIXED_COMPONENT_HEIGHT - 50}px` }}
                  >
                    {component.id.includes("markdown-output") ? "Markdown富文本输出区域" : "文本输出区域"}
                  </div>
                </div>
              )}
              
              {component.type === "action" && (
                <div style={{ height: `${FIXED_COMPONENT_HEIGHT - 40}px`, maxHeight: `${FIXED_COMPONENT_HEIGHT - 40}px` }} className="flex items-center">
                  <button
                    className="w-full px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm"
                    disabled
                  >
                    {component.config?.text || "提交"}
                  </button>
                </div>
              )}
              
              {/* 仅在需要时显示连接点 */}
              {showConnectionPoints && (
                <>
                  {component.type !== "output" && (
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-20"></div>
                  )}
                  {component.type !== "input" && (
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
                  )}
                </>
              )}
            </div>
          );
        })}

        {/* 调试信息显示 */}
        {showDebugInfo && (
          <div className="absolute bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 p-2 text-xs font-mono overflow-y-auto" style={{ maxHeight: '200px', zIndex: 100 }}>
            <h4 className="font-bold mb-1">调试日志:</h4>
            {debugLogs.slice(-10).map((log, index) => (
              <div key={index} className="whitespace-nowrap">{log}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // 修改handleAddComponent函数，当组件添加后重新计算画布高度
  useEffect(() => {
    if (canvasRef.current && placedComponents.length > 0) {
      const canvasHeight = calculateCanvasHeight();
      canvasRef.current.style.height = `${canvasHeight}px`;
    }
  }, [placedComponents]);

  // 完全重构垂直布局逻辑
  const arrangeComponentsVertically = (components = placedComponents) => {
    if (components.length === 0) return [];
    
    // 首先按Y轴排序组件
    const sortedComponents = [...components].sort((a, b) => a.y - b.y);
    logDebug(`重新排序组件: ${sortedComponents.map(c => c.id).join(', ')}`);
    
    // 固定的左侧位置
    const fixedX = 50;
    // 起始的Y位置
    let currentY = 50;
    
    // 生成新的组件位置
    const arrangedComponents = sortedComponents.map((component, index) => {
      // 创建组件的新位置 - 确保Y值是上一个组件底部 + 间距
      const newComponent = {
        ...component,
        x: fixedX,
        y: currentY
      };
      
      // 记录日志
      logDebug(`组件 ${component.id} (${component.name}) 位置: x=${fixedX}, y=${currentY}, 固定高度=${FIXED_COMPONENT_HEIGHT}px`);
      
      // 更新下一个组件的Y位置，确保足够的间距
      currentY += FIXED_COMPONENT_HEIGHT + COMPONENT_SPACING;
      
      return newComponent;
    });
    
    return arrangedComponents;
  };

  return (
    <AppLayout>
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Link href="/ai-lab" className="mr-2 text-blue-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <Layers className="h-6 w-6 mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold md:text-3xl">AI应用工作室</h1>
          <span className="ml-3 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">Beta</span>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          通过拖拽式方式创建自定义AI应用，无需编程技能
        </p>
      </div>
      
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        {mode === "view" ? (
          <div className="max-w-6xl mx-auto">
            {/* 应用列表视图 */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">我的AI应用</h2>
              <Button onClick={handleCreateApp} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                创建新应用
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {apps.map(app => (
                <div key={app.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{app.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        app.status === "published" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-amber-100 text-amber-600"
                      }`}>
                        {app.status === "published" ? "已发布" : "草稿"}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      {app.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{app.components} 个模块</span>
                      <span>最后修改: {app.lastModified}</span>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-600" 
                        onClick={() => handleEditApp(app.id)}
                      >
                        <Settings className="h-3.5 w-3.5 mr-1" />
                        编辑
                      </Button>
                      
                      {app.status === "published" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Play className="h-3.5 w-3.5 mr-1" />
                          运行
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 创建新应用卡片 */}
              <div 
                className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 flex items-center justify-center p-10 cursor-pointer hover:border-blue-300 transition-colors"
                onClick={handleCreateApp}
              >
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="font-medium text-gray-800">创建新应用</p>
                  <p className="text-sm text-gray-500 mt-1">从零开始设计你的AI应用</p>
                </div>
              </div>
            </div>
            
            {/* 介绍区域 */}
            <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-medium mb-4">什么是AI应用工作室？</h2>
              <p className="text-gray-600 mb-6">
                AI应用工作室是一个无代码平台，让你可以通过简单的拖拽操作创建功能强大的AI应用。无需编程知识，即可构建、测试和发布自己的AI解决方案。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Box className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium">拖拽式设计</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    通过拖拽模块和连接组件，直观地设计你的应用流程
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Share2 className="h-4 w-4 text-green-600" />
                    </div>
                    <h3 className="font-medium">一键发布</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    完成设计后，一键发布到AI应用列表，与同事共享
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <h3 className="font-medium">自定义配置</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    根据需求自定义各个模块的参数和行为
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : mode === "preview" ? (
          <div className="h-full flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">应用预览</h2>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setMode("edit")}
              >
                返回编辑
              </button>
            </div>
            
            <div className="flex-1 overflow-auto border rounded p-4 bg-white">
              {/* 找到当前应用 */}
              {(() => {
                const currentApp = apps.find(app => app.id === activeApp)
                if (!currentApp || !currentApp.layout) {
                  return <div className="text-red-500">应用布局未定义</div>
                }
                
                return (
                  <div className="max-w-2xl mx-auto">
                    {/* 标题区 */}
                    {currentApp.layout.header && (
                      <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold">
                          {currentApp.layout.header.config?.title || "应用标题"}
                        </h1>
                        <p className="text-gray-500">
                          {currentApp.layout.header.config?.subtitle || "应用描述"}
                        </p>
                      </div>
                    )}
                    
                    {/* 输入区 */}
                    <div className="mb-6 space-y-4">
                      {/* PPT转教案应用的特殊预览 */}
                      {activeApp === "3" ? (
                        <>
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">上传PPT文件</label>
                            <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded relative">
                              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                              <p className="text-gray-500">点击或拖拽PPT文件至此区域上传</p>
                              <p className="text-xs text-gray-400">支持 .ppt, .pptx (最大 10MB)</p>
                              
                              {/* 模拟已上传文件 */}
                              <div className="mt-3 bg-blue-50 p-2 rounded flex items-center justify-between">
                                <div className="flex items-center">
                                  <FileType className="w-4 h-4 mr-2 text-blue-500" />
                                  <span className="text-sm">PPT示例文件.pptx</span>
                                </div>
                                <X className="w-4 h-4 text-gray-500 cursor-pointer" />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">教案需求说明</label>
                            <textarea
                              className="w-full p-3 border rounded"
                              rows={6}
                              placeholder="请输入对教案的具体要求，如教学目标、重点难点分析等"
                              value={previewInput}
                              onChange={(e) => setPreviewInput(e.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        currentApp.layout.inputs?.map((input) => (
                          <div key={input.id}>
                            <label className="block text-sm font-medium mb-2">
                              {input.config?.label || "输入"}
                            </label>
                            {input.id.includes("text-input") && input.config?.multiline ? (
                              <textarea
                                className="w-full p-3 border rounded"
                                rows={input.config?.rows || 3}
                                placeholder={input.config?.placeholder || "请输入..."}
                                value={previewInput}
                                onChange={(e) => setPreviewInput(e.target.value)}
                              />
                            ) : (
                              <input
                                type="text"
                                className="w-full p-3 border rounded"
                                placeholder={input.config?.placeholder || "请输入..."}
                                value={previewInput}
                                onChange={(e) => setPreviewInput(e.target.value)}
                              />
                            )}
                          </div>
                        ))
                      )}
                      
                      {/* 提交按钮 */}
                      <div className="mt-4">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                          onClick={handlePreviewSubmit}
                        >
                          {currentApp.layout.footer?.config?.text || "提交"}
                        </button>
                      </div>
                    </div>
                    
                    {/* 输出区 */}
                    {previewOutput && (
                      <div className="border rounded p-4 mt-6">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">
                            {currentApp.layout.outputs?.[0]?.config?.label || "输出结果"}
                          </h3>
                          <button className="text-blue-500 flex items-center text-sm">
                            <Download className="w-4 h-4 mr-1" /> 导出
                          </button>
                        </div>
                        
                        {activeApp === "3" ? (
                          <div className="prose max-w-full">
                            <div dangerouslySetInnerHTML={{ 
                              __html: previewOutput.replace(/\n/g, "<br/>").replace(/^# (.*)/gm, "<h1>$1</h1>")
                                .replace(/^## (.*)/gm, "<h2>$1</h2>")
                                .replace(/^### (.*)/gm, "<h3>$1</h3>")
                                .replace(/^\- (.*)/gm, "<li>$1</li>")
                            }} />
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">{previewOutput}</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* 应用编辑器视图 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                    placeholder="应用名称"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setMode("view")}
                  >
                    取消
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={enterPreviewMode}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    预览
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handlePublishApp}
                    className="text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    发布
                  </Button>
                  
                  <Button 
                    onClick={handleSaveApp}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        保存中...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        保存
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="p-5">
                <textarea
                  value={appDescription}
                  onChange={(e) => setAppDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="应用描述（可选）"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-6">
              {/* 左侧面板：带Tab切换的模块列表和配置 */}
              <div className="col-span-3">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Tab 切换头部 */}
                  <div className="border-b border-gray-100">
                    <div className="flex">
                      <button
                        className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === "components" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => {
                          setActiveTab("components")
                          setSelectedComponent(null)
                        }}
                      >
                        可用组件
                      </button>
                      <button
                        className={`px-4 py-3 text-sm font-medium flex-1 text-center ${activeTab === "config" ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => {
                          if (placedComponents.length > 0 && !selectedComponent) {
                            // 如果没有选中组件但有已放置的组件，选择第一个
                            setSelectedComponent(placedComponents[0].id)
                          }
                          setActiveTab("config")
                        }}
                        disabled={placedComponents.length === 0}
                      >
                        组件配置
                      </button>
                    </div>
                  </div>
                  
                  {/* 内容区域 */}
                  <div className="p-4">
                    {activeTab === "components" && (
                      <div className="space-y-2 overflow-y-auto">
                        <h3 className="font-medium mb-2">点击添加组件到画布</h3>
                        {availableComponents.map((component) => (
                          <div
                            key={component.id}
                            className="p-2 border rounded cursor-pointer hover:bg-gray-100 flex items-center"
                            onClick={() => handleAddComponent(component.id)}
                          >
                            {React.createElement(component.icon, { className: "w-4 h-4 mr-2" })}
                            <span>{component.name}</span>
                          </div>
                        ))}
                        
                        {/* 添加布局控制选项 */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h3 className="font-medium mb-2">布局选项</h3>
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id="autoLayout"
                              checked={useAutoLayout}
                              onChange={(e) => setUseAutoLayout(e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor="autoLayout" className="text-sm">自动垂直布局</label>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id="showConnections"
                              checked={showConnectionPoints}
                              onChange={(e) => setShowConnectionPoints(e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor="showConnections" className="text-sm">显示连接点</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="showDebug"
                              checked={showDebugInfo}
                              onChange={(e) => setShowDebugInfo(e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor="showDebug" className="text-sm">显示调试信息</label>
                          </div>
                          
                          {showDebugInfo && (
                            <div className="mt-2">
                              <button
                                onClick={() => {
                                  logDebug("手动触发重排");
                                  const arranged = arrangeComponentsVertically();
                                  setPlacedComponents(arranged);
                                }}
                                className="w-full px-2 py-1 bg-gray-200 text-xs rounded hover:bg-gray-300"
                              >
                                强制重新排列组件
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "config" && selectedComponent && (
                      <div className="space-y-3">
                        {(() => {
                          const component = placedComponents.find(c => c.id === selectedComponent)
                          if (!component) return <p>请选择一个组件进行配置</p>
                          
                          return (
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium">配置: {component.name}</h3>
                                <button
                                  className="text-gray-400 hover:text-gray-600"
                                  onClick={() => {
                                    setSelectedComponent(null)
                                    setActiveTab("components")
                                  }}
                                >
                                  ×
                                </button>
                              </div>

                              {/* 根据组件类型显示不同配置 */}
                              {component.type === "header" && (
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm mb-1">标题</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border rounded"
                                      value={component.config?.title || ""}
                                      onChange={(e) => handleComponentConfig(component.id, { title: e.target.value })}
                                      placeholder="应用标题"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm mb-1">副标题</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border rounded"
                                      value={component.config?.subtitle || ""}
                                      onChange={(e) => handleComponentConfig(component.id, { subtitle: e.target.value })}
                                      placeholder="应用描述"
                                    />
                                  </div>
                                </div>
                              )}

                              {component.type === "input" && (
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm mb-1">标签</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border rounded"
                                      value={component.config?.label || ""}
                                      onChange={(e) => handleComponentConfig(component.id, { label: e.target.value })}
                                      placeholder="输入标签"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm mb-1">占位文本</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border rounded"
                                      value={component.config?.placeholder || ""}
                                      onChange={(e) => handleComponentConfig(component.id, { placeholder: e.target.value })}
                                      placeholder="请输入..."
                                    />
                                  </div>
                                </div>
                              )}

                              {component.type === "output" && (
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm mb-1">标签</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border rounded"
                                      value={component.config?.label || ""}
                                      onChange={(e) => handleComponentConfig(component.id, { label: e.target.value })}
                                      placeholder="输出结果"
                                    />
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      id="markdown"
                                      className="mr-2"
                                      checked={component.config?.format === "markdown"}
                                      onChange={(e) => handleComponentConfig(component.id, { format: e.target.checked ? "markdown" : "text" })}
                                    />
                                    <label htmlFor="markdown">使用Markdown格式</label>
                                  </div>
                                </div>
                              )}

                              {component.type === "action" && (
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-sm mb-1">按钮文本</label>
                                    <input
                                      type="text"
                                      className="w-full p-2 border rounded"
                                      value={component.config?.text || ""}
                                      onChange={(e) => handleComponentConfig(component.id, { text: e.target.value })}
                                      placeholder="提交"
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="mt-4">
                                <button
                                  className="p-2 bg-red-500 text-white rounded w-full"
                                  onClick={() => handleDeleteComponent(component.id)}
                                >
                                  删除组件
                                </button>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )}
                    
                    {activeTab === "config" && !selectedComponent && (
                      <div className="flex items-center justify-center h-64 text-gray-500">
                        请先选择一个组件进行配置
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 右侧画布 */}
              <div className="col-span-9">
                <div 
                  className="bg-white border rounded-lg shadow-sm relative p-0 overflow-x-auto"
                  style={{ minWidth: '800px', minHeight: '700px' }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    // 添加视觉反馈
                    e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.5)";
                  }}
                  onDragLeave={(e) => {
                    // 移除视觉反馈
                    e.currentTarget.style.boxShadow = "";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    // 移除视觉反馈
                    e.currentTarget.style.boxShadow = "";
                    
                    const componentId = e.dataTransfer.getData("componentId");
                    const offsetX = parseInt(e.dataTransfer.getData("offsetX") || "0");
                    const offsetY = parseInt(e.dataTransfer.getData("offsetY") || "0");
                    
                    if (componentId) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      // 确保有足够的左侧和顶部内边距
                      const x = Math.max(50, e.clientX - rect.left - offsetX);
                      const y = Math.max(50, e.clientY - rect.top - offsetY);
                      
                      logDebug(`组件${componentId}被拖放到: x=${x}, y=${y}`);
                      handleComponentDrag(componentId, x, y);
                    }
                  }}
                  ref={canvasRef}
                >
                  {renderCanvas()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
} 