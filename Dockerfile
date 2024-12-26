# 构建阶段
FROM node:18-alpine AS builder

# 设置 npm 镜像源 
RUN npm config set registry https://registry.npmmirror.com

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install

# 复制源代码
COPY . .

# 构建
RUN yarn build

# 运行阶段
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve

# 修改为 build 目录
COPY --from=builder /app/build ./build

EXPOSE 3000
# 修改为使用 build 目录
CMD ["serve", "-s", "build", "-l", "3000"]