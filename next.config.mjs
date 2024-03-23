/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'localhost',
            'd-origin.kr',
        ],
    },
    output: 'standalone'

};

export default nextConfig;
