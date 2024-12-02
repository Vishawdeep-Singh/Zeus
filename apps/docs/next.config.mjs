/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['assets.aceternity.com',"lh3.googleusercontent.com","images.unsplash.com","plus.unsplash.com","mir-s3-cdn-cf.behance.net","zeus-media-mono.s3.us-east-1.amazonaws.com"]
    },
    reactStrictMode:false,
    experimental: {serverComponentsExternalPackages: ['@aws-sdk']}
};

export default nextConfig;
