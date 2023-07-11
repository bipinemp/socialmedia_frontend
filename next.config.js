/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: "secret123",
    POSTS_URL: "https://socialmedia-backend-ccuh.onrender.com/api/posts",
    AUTH_URL: "https://socialmedia-backend-ccuh.onrender.com/api/users",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/bipinbhandari/**",
      },
    ],
  },
};

module.exports = nextConfig;
