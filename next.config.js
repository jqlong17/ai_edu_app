/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  experimental: {
    // 禁用一些可能导致问题的实验性功能
    optimizeCss: false,
    optimizePackageImports: ['@radix-ui/react-slot', '@radix-ui/react-tabs'],
  },
  webpack: (config, { isServer }) => {
    // 生产环境下禁用源码映射
    if (!isServer) {
      config.devtool = false;
    }
    
    // 优化包大小
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 50000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    }

    return config;
  },
  // 压缩输出
  compress: true,
  // 禁用不必要的功能
  poweredByHeader: false,
  generateEtags: false,
  // 禁用构建时检查
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 静态页面优化
  staticPageGenerationTimeout: 120,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
}

module.exports = nextConfig 