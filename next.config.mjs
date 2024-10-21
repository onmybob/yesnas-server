import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://192.168.168.101:8081/:path*",
  //     },
  //   ];
  // },
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "djeqr6to3dedg.cloudfront.net",
        port: "",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_SERVER_URL: process.env.API_SERVER_URL,
  },
};

export default withNextIntl(nextConfig);
