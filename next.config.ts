import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/hylys9za/**",
      },
    ],
  },
  allowedDevOrigins: ["192.168.0.101"],
  reactCompiler: true,
};

export default nextConfig;
