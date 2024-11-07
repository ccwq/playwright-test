# 使用 Node.js 官方镜像作为基础镜像
# FROM node:20
FROM mcr.microsoft.com/playwright:v1.48.1-noble

# 设置工作目录
WORKDIR /app

# 复制项目文件（会自动排除 .dockerignore 中指定的文件和目录）
COPY . .


RUN pwd

# 安装 pnpm
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/
RUN npm install -g pnpm
# RUN nrm use tencent


# 安装项目依赖
# RUN pnpm i

# run npx playwright install

# 构建项目（如果有构建步骤）
# RUN pnpm dev

# 暴露应用的端口
EXPOSE 3100

# 安装node依赖
RUN pnpm install

# 安装playwright相关的linux依赖
# 由于from了playwright官方镜像,无需执行以下命令
# 使用其他镜像执行此部,不一定能成功, 所以建议使用官方镜像
# RUN pnpm exec playwright install-deps chromium

# 安装playwright浏览器
# RUN npx playwright install chromium

# 启动应用
# CMD ["pnpm", "dev"]
CMD ["sh", "-c", "pnpm i; npx playwright install chromium; pnpm dev"]
