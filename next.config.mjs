/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doctor-booking.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "stubby.s3.amazonaws.com",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/home",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
