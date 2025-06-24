# 随机选号应用

## 简介
这是一个随机选号应用，支持机选彩票数字，并提供八卦分析功能。用户可以查看双色球、排列三的随机数字，还能生成六十四卦并查看卦象、爻辞和分析结果。

## 项目结构
```
├── README.md
├── index.html
├── package.json
├── src/
│   ├── App.vue
│   ├── hexagram_analysis.json
│   └── main.js
├── vite.config.js
└── yarn.lock
```

## 功能特性
- 机选彩票数字：支持双色球（红球、蓝球）、排列三（前区、后区）的随机数字生成。
- 八卦分析：生成六十四卦，显示卦象、爻辞和详细分析结果。
- 艺术字效果：彩票数字的文字说明采用艺术字样式，提升视觉效果。
- 过渡动画：页面元素切换时使用淡入淡出动画，增强用户体验。

## 安装与运行
1. 确保你已经安装了 Node.js 和 npm（或 yarn）。
2. 克隆项目到本地：
   ```bash
   git clone https://github.com/your-repo/random_chooise_number.git
   cd random_chooise_number
   ```
3. 安装依赖：
   ```bash
   npm install
   # 或者使用 yarn
   yarn install
   ```
4. 启动开发服务器：
   ```bash
   npm run dev
   # 或者使用 yarn
   yarn dev
   ```

## 页面展示
- 分析结果和爻辞会在页面上显示，爻辞使用 `<div>` 标签展示，并添加了样式提升可读性。鼠标悬停在爻辞上会有背景颜色变化效果。

## 贡献
如果你想为这个项目做出贡献，请提交 Pull Request 或创建 Issue。

## Vercel 部署指南
### 前提条件
- 拥有 Vercel 账号，如果没有可以在 [Vercel 官网](https://vercel.com/) 注册。
- 项目已上传到 GitHub、GitLab 或 Bitbucket 等代码托管平台。

### 部署步骤
1. 登录 Vercel 账号。
2. 点击 Vercel 控制台的 "New Project" 按钮。
3. 选择你的代码托管平台，然后选择要部署的项目仓库。
4. Vercel 会自动检测项目配置，使用默认配置即可，点击 "Deploy" 开始部署。
5. 等待部署完成，部署成功后会生成一个访问链接。

## 许可证
本项目采用 [MIT 许可证](LICENSE)。