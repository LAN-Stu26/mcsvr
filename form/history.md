---
layout: null
---
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>表單歷史紀錄 - Lazy Sheep</title>
    
    <!-- Google 像素字型與導覽列樣式 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/nav.css">
    <script src="/nav.js" defer></script>

    <style>
        /* === 載入全站像素黑黃主題 === */
        body {
            background-color: #141414;
            color: #dcdcdc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        /* 主內容像素外框卡片 */
        .page-container {
            max-width: 960px;
            margin: 0 auto 40px auto;
            padding: 30px;
            background-color: #252525;
            border: 4px solid #000000;
            box-shadow: inset -4px -4px 0px #151515, inset 4px 4px 0px #444444, 0 8px 20px rgba(0,0,0,0.6);
            box-sizing: border-box;
        }

        /* === Markdown 元素像素樣式美化 === */
        .markdown-body h1 {
            font-family: 'Press Start 2P', cursive, sans-serif;
            color: #ffaa00;
            font-size: 1.5rem;
            border-bottom: 3px dashed #ffaa00;
            padding-bottom: 12px;
            margin-top: 0;
            text-shadow: 2px 2px 0px #3f2a00;
            line-height: 1.4;
        }

        .markdown-body h2 {
            color: #ffff55;
            font-size: 1.25rem;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
            margin-top: 28px;
        }

        .markdown-body h3 {
            color: #ffaa00;
            font-size: 1.1rem;
            margin-top: 20px;
        }

        .markdown-body p {
            font-size: 1rem;
            color: #cccccc;
            margin: 14px 0;
        }

        .markdown-body a {
            color: #ffaa00;
            text-decoration: underline;
            font-weight: bold;
        }

        .markdown-body a:hover {
            color: #ffff55;
        }

        /* 像素清單項目 */
        .markdown-body ul, .markdown-body ol {
            padding-left: 24px;
            margin: 14px 0;
        }

        .markdown-body li {
            margin-bottom: 6px;
        }

        /* 程式碼 / 指令方框 */
        .markdown-body code {
            background-color: #101010;
            color: #ffff55;
            padding: 3px 8px;
            border: 2px solid #000000;
            font-family: monospace;
            font-size: 0.9rem;
            box-shadow: inset 1px 1px 0px #000, inset -1px -1px 0px #333;
        }

        .markdown-body pre {
            background-color: #101010;
            border: 3px solid #000;
            padding: 14px;
            overflow-x: auto;
            box-shadow: inset 2px 2px 0px #000, inset -2px -2px 0px #333;
        }

        .markdown-body pre code {
            border: none;
            box-shadow: none;
            padding: 0;
        }

        /* 引用區塊 (Blockquote) */
        .markdown-body blockquote {
            background-color: #1a1a1a;
            border-left: 5px solid #ffaa00;
            border-top: 2px solid #000;
            border-right: 2px solid #000;
            border-bottom: 2px solid #000;
            margin: 16px 0;
            padding: 12px 18px;
            color: #aaaaaa;
        }

        /* 表格像素風 */
        .markdown-body table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #1e1e1e;
            border: 3px solid #000;
        }

        .markdown-body th {
            background-color: #333;
            color: #ffaa00;
            border: 2px solid #000;
            padding: 10px;
            text-align: left;
        }

        .markdown-body td {
            border: 2px solid #000;
            padding: 10px;
        }

        .markdown-body tr:nth-child(even) {
            background-color: #181818;
        }

        /* RWD 手機版適應 */
        @media (max-width: 600px) {
            .page-container {
                padding: 18px;
                margin: 0 10px 20px 10px;
            }

            .markdown-body h1 {
                font-size: 1.1rem;
            }
        }
    </style>
</head>
<body>

    <!-- 主內容區塊：下面的語法會直接被 GitHub Pages 解析成 Markdown 渲染 -->
    <main class="page-container markdown-body">

## Lazy Sheep 伺服器 表單歷史資料與統計

> 表單代碼: 00001 | 日期: 2026/07/29 - 8/1

> 投票議題: 外掛 X-Ray 是否允許

> 連結: https://forms.gle/MRPTpAdAVZGzrj5Y9

> 結束統計日期: 8/1

### 統計解果

| 時間 | 電子郵件 | Minecraft ID | 是否允許外掛"X-Ray" (透視模組) 在本伺服器上合法運用? | 還有什麼外掛你想要? (可選填) |
| --- | --- | --- | --- | --- |
| 2026/7/29 12:11 | yang******@gmail.com | Lazy***p_x | 是 | |
| 2026/7/29 12:26 | ray2******@gmail.com | rayc***805 | 是 | |

    </main>

</body>
</html>