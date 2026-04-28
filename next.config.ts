import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1773597387242-2a542e6d-79be-4a08-bca1-c7b22a0f68c2-airplane.webp"

  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev",
        pathname:"/linkedPosts/**"
      },
    ],
    domains: ["pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev"],

  }
};

export default nextConfig;
