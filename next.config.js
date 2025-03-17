/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 移除静态导出配置，允许API路由正常工作
  // output: 'export',
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // 添加webpack配置，确保动态导入正常工作
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig 