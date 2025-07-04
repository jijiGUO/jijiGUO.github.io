# 上海故事地图 - 互动故事展示网站

一个轻量级的互动故事展示网站，使用原生HTML、CSS、JavaScript实现，适用于GitHub Pages部署。

## 🌟 功能特色

- **互动故事体验**：5个精心设计的上海主题故事
- **多页故事系统**：所有故事均为多页结构，提供丰富的阅读体验
- **渐进式解锁**：从第一个故事开始，逐步解锁后续故事
- **锚点解锁系统**：通过选择获得锚点，解锁新故事
- **响应式设计**：适配桌面和移动设备
- **本地存储**：自动保存游戏进度
- **无需构建工具**：纯原生技术栈，可直接部署

## 📁 文件结构

```
jijiGUO.github.io/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 交互逻辑
├── data.js             # 故事数据
├── assets/             # 图片资源文件夹
│   ├── story01_img1.jpg
│   ├── story01_img2.jpg
│   ├── story01_img3.jpg
│   ├── story01_choice1.jpg
│   ├── story01_choice2.jpg
│   ├── story01_choice3.jpg
│   ├── story01_choice4.jpg
│   ├── story02_img1.jpg
│   ├── story02_img2.jpg
│   ├── story02_img3.jpg
│   ├── story02_choice1.jpg
│   ├── story02_choice2.jpg
│   ├── story02_choice3.jpg
│   ├── story02_choice4.jpg
│   ├── story03_img1.jpg
│   ├── story03_img2.jpg
│   ├── story03_img3.jpg
│   ├── story03_choice1.jpg
│   ├── story03_choice2.jpg
│   ├── story03_choice3.jpg
│   ├── story03_choice4.jpg
│   ├── story04_img1.jpg
│   ├── story04_img2.jpg
│   ├── story04_img3.jpg
│   ├── story04_choice1.jpg
│   ├── story04_choice2.jpg
│   ├── story04_choice3.jpg
│   ├── story04_choice4.jpg
│   ├── story05_img1.jpg
│   ├── story05_img2.jpg
│   ├── story05_img3.jpg
│   ├── story05_choice1.jpg
│   ├── story05_choice2.jpg
│   ├── story05_choice3.jpg
│   └── story05_choice4.jpg
└── README.md           # 说明文档
```

## 🎮 游戏玩法

1. **开始探索**：首页只显示第一个故事，其他故事需要解锁
2. **阅读故事**：点击故事卡片进入故事阅读页面
3. **做出选择**：在故事中做出选择，获得不同结果
4. **获得锚点**：每个选择都会获得特定的锚点
5. **解锁新故事**：获得足够锚点后，新故事会自动解锁

## 🔓 解锁路径

```
故事1：外滩的夜晚（默认解锁）
    ↓ 获得外滩相关锚点
故事2：豫园的茶香
    ↓ 获得文化相关锚点
故事3：田子坊的艺术家
    ↓ 获得艺术相关锚点
故事4：南京路的百年变迁
    ↓ 获得商业相关锚点
故事5：陆家嘴的金融传奇
```

**注意**：每个故事都有多个选择分支，不同的选择会获得不同的锚点，但都能解锁下一个故事。

## 📖 故事内容

### 故事1：外滩的夜晚
- **解锁条件**：无（默认可用，游戏起点）
- **可获得锚点**：外滩记忆、历史见证、建筑文化、城市活力
- **故事类型**：多页故事（3页）
- **特色**：探索外滩的历史与建筑文化

### 故事2：豫园的茶香
- **解锁条件**：获得任一外滩相关锚点（外滩记忆、历史见证、建筑文化、城市活力）
- **可获得锚点**：茶道传承、文化传承、园林文化、古典美学
- **故事类型**：多页故事（3页）
- **特色**：体验传统茶文化与园林艺术

### 故事3：田子坊的艺术家
- **解锁条件**：获得任一文化相关锚点（茶道传承、文化传承、园林文化、古典美学）
- **可获得锚点**：艺术灵感、城市更新、创意产业、文化融合
- **故事类型**：多页故事（3页）
- **特色**：发现艺术创意与城市更新

### 故事4：南京路的百年变迁
- **解锁条件**：获得任一艺术相关锚点（艺术灵感、城市更新、创意产业、文化融合）
- **可获得锚点**：传统传承、商业文明、现代科技、文化融合
- **故事类型**：多页故事（3页）
- **特色**：探索百年老店与现代商业的融合

### 故事5：陆家嘴的金融传奇
- **解锁条件**：获得任一商业相关锚点（传统传承、商业文明、现代科技、文化融合）
- **可获得锚点**：城市全景、建筑奇迹、金融中心、未来展望
- **故事类型**：多页故事（3页）
- **特色**：从农田到金融中心的奇迹转变

## 🚀 部署方法

### 方法1：GitHub Pages（推荐）

1. 将所有文件上传到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择部署分支（通常是main或master）
4. 访问生成的网站地址

### 方法2：本地运行

1. 下载所有文件到本地文件夹
2. 直接双击`index.html`文件在浏览器中打开
3. 或使用本地服务器（如Live Server）运行

### 方法3：其他静态托管服务

- Netlify
- Vercel
- 阿里云OSS
- 腾讯云COS

## 🎨 自定义指南

### 添加新故事

在`data.js`文件中添加新的故事对象：

```javascript
{
    id: "story04",
    title: "新故事标题",
    image: "assets/story04_img1.jpg",
    description: "故事描述",
    content: [
        {
            type: "text",
            text: "故事文本内容"
        },
        {
            type: "image",
            src: "assets/story04_img1.jpg"
        }
    ],
    choices: [
        {
            text: "选择1",
            result: "结果描述",
            anchor: "新锚点",
            image: "assets/story04_choice1.jpg"
        }
    ]
}
```

### 修改样式

编辑`style.css`文件来自定义：
- 颜色主题
- 字体样式
- 布局结构
- 动画效果

### 添加图片

1. 将图片文件放入`assets/`文件夹
2. 在`data.js`中更新对应的图片路径
3. 确保图片格式为JPG、PNG或WebP

## 🔧 技术特性

- **纯原生技术**：HTML5 + CSS3 + ES6
- **响应式布局**：CSS Grid + Flexbox
- **本地存储**：localStorage API
- **图片优化**：自动错误处理和占位符
- **无障碍设计**：语义化HTML标签

## 📱 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License - 可自由使用和修改

---

**享受探索上海故事的乐趣！** 🏮 