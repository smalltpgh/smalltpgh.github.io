const axios = require('axios');
const fs = require('fs');

axios.get('https://api.github.com/repos/tolinkshare/freenode/contents/README.md')
    .then(response => {
        const data = response.data;
        const markdownContent = Buffer.from(data.content, 'base64').toString(); // 解码Base64
        const extractedText = extractTextBetweenThirdAndFourthBackticks(markdownContent); // 正则匹配节点信息
        const encodedText = Buffer.from(extractedText).toString('base64'); // 编码为base64
        fs.writeFileSync('free.txt', encodedText, 'utf8'); // 输出文本内容
    })
    .catch(error => console.error('Error fetching README.md:', error));

function extractTextBetweenThirdAndFourthBackticks(markdownContent) {
    // 使用正则表达式匹配第三个和第四个连续的反引号之间的字符串
    const regex = /```[^`]*```[^`]*```([^`]*)```/;
    const match = regex.exec(markdownContent);

    // 如果匹配成功，则返回第三个和第四个反引号之间的字符串
    if (match && match.length > 1) {
        const text = match[1].replace(/^\s*[\r\n]/gm, ''); // 去除多余空行
        const lines = text.split('\n'); // 将文本按行分割
        const remainingLines = lines.slice(9); // 删除前x行
        return remainingLines.join('\n'); // 将剩余的行重新组合成文本
    } else {
        return "No match found";
    }
}
