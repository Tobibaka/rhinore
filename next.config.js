const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }]
  },
  transpilePackages: ['@splinetool/runtime', '@splinetool/react-spline'],
  webpack: (config) => {
    return config;
  }
};
export default nextConfig;