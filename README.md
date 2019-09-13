# zweb
一个基于 Koa + Typescript 的web框架。利用typescript的decorator简化路由和中间件的编写

## Introduction



### Usage
```bash

# 启动之前
npm install
pm2 install typescript

# 开发环境启动
npm run dev

# 生产环境启动
npm run start
```

### 框架结构介绍


#### 工程结构树

├── app.json
├── config
├── LICENSE
├── logs
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── src
├── tests
└── tsconfig.json


#### 重要文件（夹）介绍

| 文件          | 描述                  |
| ------------- | --------------------- |
| app.json      | pm2启动配置文件       |
| config/       | 项目环境&业务配置目录 |
| logs/         | pm2日志目录           |
| src/          | 框架代码目录          |
| tests/        | 单元测试目录          |
| tsconfig.json | typescript 配置文件   |



