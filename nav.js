(function() {
    // 建立導覽列的 HTML 結構（首頁為 /，指令為 /commands/，圖示改用 /icon.png）
    const navHTML = `
    <nav class="mc-nav">
        <div class="nav-container">
            <a href="/" class="nav-brand">
                <img src="/icon.png" alt="Lazy Sheep" style="width: 24px; height: 24px; image-rendering: pixelated; vertical-align: middle; margin-right: 8px;">Lazy Sheep
            </a>
            <div class="nav-links">
                <a href="/" class="nav-item" id="nav-home"><i class="fa-solid fa-house"></i> 返回首頁</a>
                <a href="/commands/" class="nav-item" id="nav-cmds"><i class="fa-solid fa-terminal"></i> 指令大全</a>
            </div>
        </div>
    </nav>
    `;
    
    // 動態注入導覽列與高亮檢查機制
    function injectNavbar() {
        // 防止重複注入
        if (document.getElementById('nav-home')) return;
        
        // 將導覽列插入到 <body> 的最開頭
        document.body.insertAdjacentHTML('afterbegin', navHTML);
        
        // 取得當前的網址路徑，用來精準判斷亮起哪個按鈕
        const path = window.location.pathname;
        
        // 如果是根目錄、首頁、或是空白
        if (path === '/' || path.endsWith('/index.html') || path === '') {
            document.getElementById('nav-home').classList.add('active');
        } 
        // 如果路徑中包含 commands 
        else if (path.includes('/commands')) {
            document.getElementById('nav-cmds').classList.add('active');
        }
    }

    // 安全載入防護：確保 body 存在時才執行
    if (document.body) {
        injectNavbar();
    } else {
        document.addEventListener("DOMContentLoaded", injectNavbar);
    }
})();
