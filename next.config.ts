import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false, // Отключение Strict Mode
    eslint: {
        ignoreDuringBuilds: true, // Игнорировать ошибки ESLint во время сборки
    },

};

export default nextConfig;
