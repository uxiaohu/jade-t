#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
const title = args[0];

if (!title) {
    console.error('请提供文章标题');
    console.log('使用方法: node script/create-post.js "文章标题"');
    process.exit(1);
}

// 生成文章ID（使用标题的拼音或英文）
const id = title.toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// 生成当前日期
const now = new Date();
const date = now.toISOString().split('T')[0];
const time = now.toISOString().split('T')[1].split('.')[0];

// 文章模板
const postTemplate = `---
title: "${title}"
categories: 技术
tags:
  - 标签1
  - 标签2
id: "${id}"
date: "${date} ${time}"
updated: "${date} ${time}"
cover: ""
recommend: false
top: false
hide: false
---

# ${title}

在这里写你的文章内容...

## 小标题

文章正文内容...

## 总结

文章总结...
`;

// 生成文件名
const fileName = `${date}-${id}.md`;
const filePath = path.join(__dirname, '../src/content/blog', fileName);

// 检查目录是否存在
const blogDir = path.dirname(filePath);
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
}

// 写入文件
try {
    fs.writeFileSync(filePath, postTemplate, 'utf8');
    console.log(`✅ 文章创建成功: ${fileName}`);
    console.log(`📁 文件路径: ${filePath}`);
    console.log(`🔗 文章ID: ${id}`);
} catch (error) {
    console.error('❌ 创建文章失败:', error.message);
    process.exit(1);
}
