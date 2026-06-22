# 单位换算器 (Unit Converter)

一个纯前端的多功能单位换算工具，支持长度、重量、温度、货币等多类别单位的实时双向换算。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

启动后访问 http://localhost:5173 即可使用。

## 功能特性

- **长度换算**：支持米、千米、厘米、毫米、英寸、英尺、码、英里共 8 种单位，实时双向转换
- **温度换算**：摄氏度 °C、华氏度 °F、开尔文 K 三种单位互转，使用专用公式计算（不走基准单位换算）
- **重量换算**：千克、克、毫克、吨、斤、磅、盎司共 7 种单位
- **货币换算**：人民币、美元、欧元、日元、英镑、港币共 6 种币种，内置静态汇率表
- **历史记录**：预留历史记录展示区域（后续开发）

所有换算均支持：
- 任意输入框输入，另一框实时显示结果
- 一键交换「从」「到」单位
- 一键清空输入

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Composition API** (`<script setup>`) - Vue 3 组合式 API
- **Vitest** - 单元测试框架

纯前端应用，无需后端服务。

## 目录结构

```
src/
├── components/          # Vue 组件
│   ├── AppLayout.vue    # 全局布局（Header / Main / Footer）
│   ├── CategoryCard.vue # 分类卡片（首页入口）
│   ├── ConverterInput.vue # 输入框 + 单位下拉组件
│   ├── ConverterPage.vue  # 换算页面容器
│   └── HomePage.vue     # 首页（分类选择）
├── composables/         # 组合式函数
│   └── useConverter.js  # 换算逻辑（含纯函数导出）
├── constants/           # 常量定义
│   └── units.js         # 单位列表与换算率
├── styles/              # 样式文件
│   └── global.css       # 全局样式 + CSS 变量
├── utils/               # 工具函数
│   └── format.js        # 数字格式化
├── App.vue              # 根组件（条件渲染切换视图）
└── main.js              # 应用入口
```

## 测试

核心纯逻辑已覆盖单元测试：

```bash
npm test
```

测试覆盖范围：
- `formatNumber` / `roundTo` — 正数、负数、零、精度边界、-0 规范化等
- 换算率定义完整性 — 每个类别下的单位 id 唯一、每个 id 对换算率都存在且有效
- `convertTemperature` — 常用值验证（0°C → 32°F、-40°C = -40°F、0°C → 273.15K 等）、往返精度稳定性
- `convertByBase` — 通用基准单位换算正确性
- `isValidNumber` — 非法输入（空串、NaN、字母等）的保护机制

当前测试：**68 passed** ✅

## 开发说明

- 视图切换使用条件渲染（`v-if` / `v-else-if`），未引入路由
- 换算逻辑通过 composable 封装，纯函数可独立测试
- CSS 变量支持亮/暗色主题自动切换
- 不依赖任何 UI 组件库，样式原生手写
