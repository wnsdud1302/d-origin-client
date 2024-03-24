/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'http',
                hostname: 'd-origin.kr',
                port: 80,
            },
        
        ],
    },
    output: 'standalone'

};

export default nextConfig;
