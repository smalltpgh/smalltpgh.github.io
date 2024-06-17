const fs = require('fs');
const path = require('path');

// 获取当前Unix时间戳
const timestamp = Math.floor(Date.now() / 1000);

// 将Unix时间戳转换为字符串
const timestampString = `Current Unix Timestamp: ${timestamp}`;

// 写入到txt文件
fs.writeFileSync(path.join(__dirname, 'timestamp.txt'), timestampString, 'utf8');
