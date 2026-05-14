import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    localPatterns: [
      { pathname: '/images/**' },
      { pathname: '/products/**' },
      { pathname: '/media/**' },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plastika-ks.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
      { protocol: 'https', hostname: 'fitt-cdn.thron.com', pathname: '/**' },
      { protocol: 'https', hostname: 'nmtester.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.ferplast-ks.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
      { protocol: 'https', hostname: 'polins.co.rs', pathname: '/**' },
      { protocol: 'https', hostname: 'shop-roto.eu', pathname: '/**' },
      { protocol: 'https', hostname: 'perplastkompani.com', pathname: '/**' },
      { protocol: 'https', hostname: 'hidrotekhortum.com.tr', pathname: '/**' },
      { protocol: 'https', hostname: 'confort-al.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.xiervalve.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plastikanv.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
