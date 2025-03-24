import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { TeachingPlanInput, TeachingPlanResult } from './dify-service';

// 状态接口
interface TeachingPlanState {
  // 输入参数
  input: TeachingPlanInput;
  // 生成结果
  result: TeachingPlanResult | null;
  // 加载状态
  isLoading: boolean;
  // 是否已生成
  isGenerated: boolean;
  // 更新输入参数
  updateInput: (input: Partial<TeachingPlanInput>) => void;
  // 设置结果
  setResult: (result: TeachingPlanResult | null) => void;
  // 设置加载状态
  setIsLoading: (isLoading: boolean) => void;
  // 设置是否已生成
  setIsGenerated: (isGenerated: boolean) => void;
  // 重置状态
  reset: () => void;
}

// 默认输入参数 - 使用空数据
const defaultInput: TeachingPlanInput = {
  grade: 7,
  semester: 2,
  subject: '数学',
  textbookVersion: '人教版',
  selectedContent: [
    {
      chapter: '第六章 三角形',
      section: '6.1 三角形的概念'
    }
  ],
  selectedGoals: [],
  supplementInfo: '',
  contentAnalysis: '',
  coreQuestion: '',
  lessonDesigns: [
    {
      content: ''
    }
  ],
  unitTest: ''
};

// 创建Context
const TeachingPlanContext = createContext<TeachingPlanState | undefined>(undefined);

// Provider组件
export function TeachingPlanProvider({ children }: { children: ReactNode }) {
  console.log("TeachingPlanProvider 渲染");
  
  const [input, setInput] = useState<TeachingPlanInput>(defaultInput);
  const [result, setResult] = useState<TeachingPlanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // 更新输入参数 - 使用useCallback优化
  const updateInput = useCallback((newInput: Partial<TeachingPlanInput>) => {
    console.log('更新输入参数:', Object.keys(newInput));
    setInput(prev => {
      // 进行深度比较，只有当值真正变化时才更新
      const updated = { ...prev };
      let hasChanged = false;
      
      Object.entries(newInput).forEach(([key, value]) => {
        const k = key as keyof TeachingPlanInput;
        // 简单比较，对于复杂对象可能需要更深入的比较
        if (JSON.stringify(prev[k]) !== JSON.stringify(value)) {
          (updated as any)[k] = value;
          hasChanged = true;
        }
      });
      
      if (!hasChanged) {
        console.log('输入参数未变化，跳过更新');
        return prev;
      }
      
      console.log('输入参数已更新');
      return updated;
    });
  }, []);

  // 重置状态 - 使用useCallback优化
  const reset = useCallback(() => {
    console.log('重置所有状态');
    setInput(defaultInput);
    setResult(null);
    setIsLoading(false);
    setIsGenerated(false);
  }, []);

  // 记录状态变化
  useEffect(() => {
    console.log('教学方案状态变化:', {
      isLoading,
      isGenerated,
      hasResult: result !== null
    });
  }, [isLoading, isGenerated, result]);

  // 使用useMemo优化context值，避免不必要的重新渲染
  const contextValue = {
    input,
    result,
    isLoading,
    isGenerated,
    updateInput,
    setResult,
    setIsLoading,
    setIsGenerated,
    reset
  };

  return (
    <TeachingPlanContext.Provider value={contextValue}>
      {children}
    </TeachingPlanContext.Provider>
  );
}

// 自定义Hook
export function useTeachingPlan() {
  const context = useContext(TeachingPlanContext);
  if (context === undefined) {
    throw new Error('useTeachingPlan must be used within a TeachingPlanProvider');
  }
  return context;
} 