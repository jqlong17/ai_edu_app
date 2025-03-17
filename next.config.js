/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
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