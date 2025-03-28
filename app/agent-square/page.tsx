"use client"

import { AppLayout } from "@/components/layout"
import { Bot, Search, Star, Users, Zap, School, Building } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// 智能体类型
type AgentType = {
  id: string
  name: string
  description: string
  icon: any
  status: "active" | "beta"
  type: "agent" | "school" | "institution"
}

// 智能体数据
const agents: AgentType[] = [
  // 智能体
  {
    id: "1",
    name: "家庭养育师",
    description: "智慧养育师，解决育儿难题",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "2", 
    name: "心理疗愈师",
    description: "妈妈的智能伙伴，擅长倾听和疗愈，做高能量妈妈",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "3",
    name: "朱洪秋德育专家",
    description: "推动育人方式变革，AI赋能教师专业发展",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "4",
    name: "校长助手",
    description: "校长的智能助手，为管理减负、为发展赋能！",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "5",
    name: "班主任助手",
    description: "班主任的智慧伙伴，带班育人的贴心助手",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "6",
    name: "教师助手",
    description: "助力教师教学创新，AI提升课堂效率",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "7",
    name: "提示词优化专家",
    description: "我是提示词优化专家，协助同学们完善提示词书写",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "8",
    name: "北京市通州区教师研修中心",
    description: "Hi！我是北京市通州区教师研修中心的代言人研研",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  {
    id: "9",
    name: "高考服务区(DeepSeek体验版)",
    description: "学业指导与心理支持全能助手",
    icon: Bot,
    status: "active",
    type: "agent"
  },
  // 学校
  {
    id: "10",
    name: "北京市宣武回民幼儿园德育伙伴",
    description: "多元文化，和谐成长",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "11",
    name: "棉花胡同幼儿园德育助手",
    description: "育爱养性 明理开慧",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "12",
    name: "北京第二实验小学智能管家",
    description: "以爱育爱，以慧启慧，爱慧交融",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "13",
    name: "北京市第十三中学（高中部）智能管家",
    description: "以学生发展为本，为学生成长服务",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "14",
    name: "北京市第十三中学（初中部）智能管家",
    description: "以学生发展为本，为学生成长服务",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "15",
    name: "首都师范大学附属幼儿园智能管家",
    description: "共情、共育、共成长",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "16",
    name: "北京市西城区师范学校附属小学智能管家",
    description: "健康第一、基础扎实、学有所长、国际视野、全面发展",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "17",
    name: "重庆市永川区特殊教育学校小智博士",
    description: "开启智慧之门，点亮希望之光 —— 小智博士，与您同行在特殊教育的旅程中。",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "18",
    name: "虎坊路幼儿园",
    description: "与学校智能体对话，了解幼儿园、学习育儿经验",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "19",
    name: "清华大学附属小学",
    description: "了解学校情况，做智慧父母",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "20",
    name: "北京市陈经纶中学嘉铭分校",
    description: "了解教学理念，助力孩子教育",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "21",
    name: "北京史家胡同小学",
    description: "培养和谐全面发展的未来之星",
    icon: School,
    status: "active",
    type: "school"
  },
  {
    id: "22",
    name: "北京市密云区第四小学",
    description: "亲爱的家人您好，欢迎来到北京市密云区第四小学。",
    icon: School,
    status: "active",
    type: "school"
  },
  // 添加更多学校...
  
  // 机构
  {
    id: "30",
    name: "中国民航科学技术研究院",
    description: "近距离感受飞行的奥秘，激发学生对航空科学的兴趣和探索精神",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "31",
    name: "人民日报印刷厂",
    description: "深入感受中国印刷技术的发展",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "32",
    name: "北京市自动化工程学校",
    description: "感受职业魅力，提升实践能力",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "33",
    name: "中国林业科学研究院木材工业研究所",
    description: "锐意创新 引领行业 感恩集体 服务社会",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "34",
    name: "中国农业科学院园艺创新中心",
    description: "专业师资支持，助力学生探秘农业！",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "35",
    name: "北京市科学技术研究院分析测试研究所（万寿寺院区）",
    description: "启蒙学生创新思维，培养学生动手能力",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "36",
    name: "北京市科学技术研究院分析测试研究所（永丰院区）",
    description: "启蒙学生创新思维，培养学生动手能力",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "37",
    name: "首农翠湖工场",
    description: "现代农业的奇妙之旅",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "38",
    name: "中国航天博物馆",
    description: "展示航天成就、弘扬航天精神、传播航天文化、普及航天知识、推广航天体验",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "39",
    name: "北京体育大学二七国家冰雪运动训练科研基地",
    description: "探索冰雪奥秘，激发运动潜能",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "40",
    name: "中国林业科学研究院华北林业实验中心",
    description: "脚踏实地 勇攀高峰 科学树木 厚德树人",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "41",
    name: "北京首钢生物质能源科技有限公司",
    description: "传播环保理念，献礼美丽中国！",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "42",
    name: "北京中关村精雕智造科技创新中心有限公司",
    description: "驱动创新，塑造未来，让制造更高效",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "43",
    name: "中国原子能科学研究院中国核工业科技馆",
    description: "全面系统介绍核工业发展和成就",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "44",
    name: "神舟绿鹏农业科技有限公司",
    description: "让航天育种走进百姓生活",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "45",
    name: "数字之光智慧科技集团有限公司",
    description: "数字之光，未来之光",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "46",
    name: "中国科学院国家天文台沙河科普基地",
    description: "追溯天文往昔，探索宇宙奥秘",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "47",
    name: "中车科技园（北京）有限公司",
    description: "现代机车车辆科普教育基地",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "48",
    name: "北京建筑大学(大兴校区）",
    description: "实事求是、精益求精",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "49",
    name: "北京建筑大学(西城校区）",
    description: "实事求是、精益求精",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "50",
    name: "北京市园林绿化科学研究院（朝阳院区）",
    description: "为园林盛景添彩，助学生梦想腾飞",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "51",
    name: "北京市园林绿化科学研究院（大兴院区）",
    description: "为园林盛景添彩，助学生梦想腾飞",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "52",
    name: "北京市气象探测中心（北京市观象台）",
    description: "科普气象知识",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "53",
    name: "天普新能源科技有限公司",
    description: "将太阳能知识带进千家万户",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "54",
    name: "中国科学院大气物理研究所~地球系统数值模拟装置",
    description: "让世界看懂地球",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "55",
    name: "中国航空工业历史博物馆",
    description: "系统展示中国航空事业110多年发展历史",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "56",
    name: "华电（北京）新能源发展有限公司",
    description: "打造绿色能源典范！",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "57",
    name: "北京龙庆首创水务有限责任公司",
    description: "寓教于乐，携手共创绿色未来",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "58",
    name: "北京电子科技职业学院",
    description: "求实、创新、厚德、重艺",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "59",
    name: "小米汽车科技有限公司",
    description: "科技跨越，人车合一",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "60",
    name: "艺云数字艺术中心（王府井）",
    description: "沉浸式和参与式的多感官数字艺术新体验",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "61",
    name: "东方艺云(北京)数字科技有限公司",
    description: "体验场景化教育的魅力",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "62",
    name: "京东方技术创新中心",
    description: "京东方新型显示国家工程研究中心",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "63",
    name: "京东方历史展览馆",
    description: "自主创新，产业报国",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "64",
    name: "蓝箭航天空间科技股份有限公司",
    description: "助力航天梦想的绽放",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "65",
    name: "悦康药业集团股份有限公司",
    description: "营造全球喜悦，关爱人类健康",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "66",
    name: "中国人民抗日战争纪念馆",
    description: "牢记历史、珍爱和平，勿忘国耻、圆梦中华",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "67",
    name: "中国地质博物馆",
    description: "探索地球奥秘，解码自然奇迹",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "68",
    name: "首都博物馆",
    description: "让博物馆成为大家日常生活的一部分",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "69",
    name: "国家自然博物馆",
    description: "探索自然奇迹，了解地球演变",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "70",
    name: "中国妇女儿童博物馆",
    description: "传承关爱与希望",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "71",
    name: "新首钢高端产业综合服务区",
    description: "工业遗产新生，创新未来引领",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "72",
    name: "北京郭守敬纪念馆",
    description: "铭刻先贤智慧，启迪科技未来",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "73",
    name: "北京考古遗址博物馆",
    description: "探索汉代辉煌，解读古代文化",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "74",
    name: "北京李大钊故居",
    description: "传承革命精神，铭记历史伟业",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "75",
    name: "北京鲁迅博物馆",
    description: "传承文化经典，铭刻历史瞬间",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "76",
    name: "北京市少年宫",
    description: "培养未来的栋梁，点燃童年的梦想",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "77",
    name: "民航博物馆",
    description: "翱翔历史，传承民航记忆",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "78",
    name: "中国海关博物馆",
    description: "见证海关历史，传承国门文化",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "79",
    name: "数字北京科学中心",
    description: "探索科技，点亮未来",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "80",
    name: "中梦足球博物馆",
    description: "传承足球精神，点燃球迷热情",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "81",
    name: "中国美术馆",
    description: "见证艺术巅峰，传承文化经典",
    icon: Building,
    status: "active",
    type: "institution"
  },
  {
    id: "82",
    name: "中国园林博物馆",
    description: "感受园林之美，传承传统文化",
    icon: Building,
    status: "active",
    type: "institution"
  }
]

export default function AgentSquare() {
  const [selectedType, setSelectedType] = useState<"all" | "agent" | "school" | "institution">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // 过滤智能体
  const filteredAgents = agents.filter(agent => {
    const matchesType = selectedType === "all" || agent.type === selectedType
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <AppLayout>
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 pb-6">
        <div className="flex items-center mb-2">
          <Bot className="h-6 w-6 mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold md:text-3xl">智能体广场</h1>
        </div>
        <p className="text-sm text-gray-600 md:text-base">
          探索和发现专业的教学智能体，提升教学效率
        </p>
        
        {/* 搜索框 */}
        <div className="relative mt-4">
          <input
            type="text"
            className="w-full bg-white rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none shadow-sm"
            placeholder="搜索智能体..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* 分类标签 */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedType === "all"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setSelectedType("agent")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedType === "agent"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              智能体
            </button>
            <button
              onClick={() => setSelectedType("school")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedType === "school"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              学校
            </button>
            <button
              onClick={() => setSelectedType("institution")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedType === "institution"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              机构
            </button>
          </div>
        </div>
      </div>

      {/* 智能体列表 */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agent-square/${agent.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                    <agent.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{agent.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{agent.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 