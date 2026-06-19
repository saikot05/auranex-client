/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'i.ibb.co',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', // ← Google profile photos
            },
        ],
    },
};

export default nextConfig;