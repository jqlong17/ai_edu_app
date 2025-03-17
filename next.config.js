/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 改用静态导出
  distDir: 'out',    // 输出到out目录
  images: {
    unoptimized: true, // 静态导出需要此配置
  },
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // 减小构建大小
  webpack: (config, { isServer }) => {
    // 生产环境下禁用源码映射
    if (!isServer) {
      config.devtool = false;
    }
    // 优化包大小
    config.optimization = {
      ...config.optimization,
      minimize: true,
    }
    return config;
  },
}

module.exports = nextConfig 