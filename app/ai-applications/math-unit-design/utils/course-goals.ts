// 课程目标工具函数
import courseGoalsData from '../../../api/math-unit-design/data/course-goals.json';

export interface CourseGoal {
  category: string;
  goal: string;
}

// 直接使用JSON数据，不再通过API请求
export const getCourseGoals = async (): Promise<CourseGoal[]> => {
  return courseGoalsData;
};

export const getCourseGoalsByCategory = async (category: string): Promise<CourseGoal[]> => {
  return courseGoalsData.filter(goal => goal.category === category);
}; 