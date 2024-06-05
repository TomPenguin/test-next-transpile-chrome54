import fs from "fs";
import path from "path";

const nodeModules = fs.readdirSync("node_modules").filter((dir) => {
  return fs.statSync(path.join("node_modules", dir)).isDirectory();
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: nodeModules,
  output: "export",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
        },
      },
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};

export default nextConfig;
