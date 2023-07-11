/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: "secret123",
    POSTS_URL: "https://socialmedia-backend-ccuh.onrender.com/api/posts",
    AUTH_URL: "https://socialmedia-backend-ccuh.onrender.com/api/users",
    BASE_POSTS_URL: "https://socialmedia-backend-ccuh.onrender.com",
    BASE_AUTH_URL: "https://socialmedia-backend-ccuh.onrender.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/bipinbhandari/**",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    ],
  },
};

module.exports = nextConfig;
