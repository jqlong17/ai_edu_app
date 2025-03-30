"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import '../styles.css'
import './styles.css'

// Dify API 配置
const DIFY_IFRAME_URL = "https://udify.app/chatbot/P6nkfIJzZZ7hHbqY"; // 使用udify.app上的聊天机器人

// 自定义样式
const customStyles = `
.iframe-container {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 800px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.dify-iframe {
  width: 100%;
  height: 100%;
  min-height: 700px;
  border: none;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.page-header {
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #4b5563;
  font-size: 14px;
  transition: color 0.2s;
}

.back-link:hover {
  color: #111827;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-top: 16px;
}

.page-description {
  color: #6b7280;
  margin-top: 4px;
  font-size: 16px;
}
`;

export default function ProjectLearning() {
  return (
    <div className="page-container">
      {/* 注入自定义样式 */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* 头部导航 */}
      <div className="page-header">
        <Link href="/ai-applications" className="back-link">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>返回AI应用</span>
        </Link>
        <h1 className="page-title">项目式学习设计</h1>
        <p className="page-description">快速生成适合学生的项目式学习方案</p>
      </div>

      {/* Dify iframe 容器 */}
      <div className="iframe-container">
        <iframe
          src={DIFY_IFRAME_URL}
          className="dify-iframe"
          frameBorder="0"
          allow="microphone"
          title="项目式学习设计助手"
        ></iframe>
      </div>
    </div>
  );
} 