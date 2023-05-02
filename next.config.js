const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development"
})({
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_PASSPORT_URL: process.env.NEXT_PUBLIC_PASSPORT_URL,
    NEXT_PUBLIC_ZUZALU_SEMAPHORE_GROUP_URL: process.env.NEXT_PUBLIC_ZUZALU_SEMAPHORE_GROUP_URL,
    NEXT_PUBLIC_ZUZALU_SEMAPHORE_GROUP_ROOT_URL: process.env.NEXT_PUBLIC_ZUZALU_SEMAPHORE_GROUP_ROOT_URL,
    NEXT_PUBLIC_ZUZALU_FEEDBACK_APP_ORIGIN: process.env.NEXT_PUBLIC_ZUZALU_FEEDBACK_APP_ORIGIN,
    NEXT_PUBLIC_ZUZALU_API: process.env.NEXT_PUBLIC_ZUZALU_API
  }
});

module.exports = nextConfig;
