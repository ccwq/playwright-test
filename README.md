# 项目说明

## 项目简介
本项目是一个基于Node.js和Playwright的Web爬虫，用于从指定的URL获取网页内容。它使用Koa框架创建一个简单的HTTP服务器，并提供了API接口来获取网页内容。

## 功能特点
- **动态网页内容抓取**：支持从动态加载内容的网页中提取文本内容。
- **参数化URL**：可以通过URL参数指定要抓取的网页地址。
- **响应时间统计**：提供响应时间统计，以评估网页加载速度。
- **简单模式**：通过URL参数可以控制返回内容的格式，支持简单文本返回。

## 使用方法
1. **安装依赖**：
   在项目根目录下运行以下命令安装项目依赖：
   ```bash
   pnpm install
   ```

2. **启动服务器**：
   运行以下命令启动HTTP服务器：
   ```bash
   pnpm dev
   ```

3. **访问API**：
   使用浏览器或HTTP客户端访问以下URL：
   ```
   http://localhost:3100/content?url=<目标URL>&simple=<是否简单模式>
   ```
   - `<目标URL>`：要抓取的网页地址。
   - `<是否简单模式>`：可选参数，默认为`false`。如果设置为`true`，则返回简单文本内容，否则返回包含详细信息的JSON对象。

## 示例
假设你想要抓取`https://tophub.today/c/news`的内容，并希望返回简单文本内容，你可以访问以下URL：
```
http://localhost:3100/content?url=https://tophub.today/c/news&simple=true
```

# 输入结构

## URL参数
- `url`：必选参数，指定要抓取的网页地址。
- `simple`：可选参数，默认为`false`。如果设置为`true`，则返回简单文本内容，否则返回包含详细信息的JSON对象。

## 示例
```plaintext
http://localhost:3100/content?url=https://example.com&simple=true
```

# 字段作用

## 响应内容
- `content`：网页内容的文本表示。
- `responseTime`：网页加载的响应时间（以毫秒为单位）。
- `url`：请求的原始URL。
- `simple`：是否使用简单模式返回内容。

## 示例
```json
{
  "content": "网页内容的文本表示",
  "responseTime": 1234,
  "url": "https://example.com",
  "simple": true
}
```

## 简单模式
当`simple`参数设置为`true`时，响应内容将只包含`content`字段，即网页内容的文本表示。

## 详细模式
当`simple`参数未设置或设置为`false`时，响应内容将包含所有字段，包括`content`、`responseTime`、`url`和`simple`。

请注意，以上内容仅为示例，实际返回内容可能会根据网页内容和服务器配置有所不同。


## 注意事项
- 请确保目标网页允许爬取，避免违反网站的使用条款。
- 本项目仅供学习和研究使用，请勿用于非法用途。

## 贡献
如果你有任何改进意见或想要贡献代码，请随时提交Pull Request或创建Issue。

## 许可证
本项目采用MIT许可证。请查看LICENSE文件了解更多信息。