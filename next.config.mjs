/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'www.d-origin.kr',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            }
        ],
    },
    output: 'standalone'

};

export default nextConfig;
