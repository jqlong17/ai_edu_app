export interface CourseGoal {
  category: string;
  goal: string;
}

const fetchCourseGoals = async (): Promise<CourseGoal[]> => {
  const response = await fetch('/api/course-goals');
  if (!response.ok) {
    throw new Error('Failed to fetch course goals');
  }
  return response.json();
};

export const getCourseGoals = async (): Promise<CourseGoal[]> => {
  return fetchCourseGoals();
};

export const getCourseGoalsByCategory = async (category: string): Promise<CourseGoal[]> => {
  const goals = await fetchCourseGoals();
  return goals.filter(goal => goal.category === category);
}; 