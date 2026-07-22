document.addEventListener('DOMContentLoaded', function () {
    // 1. 自動判斷當前網址以高亮顯示 Active 標籤
    const currentPath = window.location.pathname;

    // 3. 生成導覽列 HTML 結構
    const navHTML = `
        <nav class="mc-nav">
            <div class="nav-container">
                <a href="/" class="nav-brand">
                    <img src="/logo.png" alt="Logo" style="width:24px; height:24px; vertical-align:middle; margin-right:8px; image-rendering:pixelated;" onerror="this.style.display='none'">
                    Lazy Sheep
                </a>
                
                <!-- 手機版漢堡選單按鈕 -->
                <button class="nav-toggle" id="navToggle" aria-label="切換選單" style="display: none;">
                    ☰
                </button>

                <!-- 導覽連結 -->
                <div class="nav-links" id="navLinks">
                    <a href="/" class="nav-item ${currentPath === '/' || currentPath.endsWith('/index.html') ? 'active' : ''}">
                        🏠 返回首頁
                    </a>
                    <a href="/news/" class="nav-item ${currentPath.includes('/news') ? 'active' : ''}">
                        📰 最新消息
                    </a>
                    <a href="/commands/" class="nav-item ${currentPath.includes('/commands') ? 'active' : ''}">
                        >_ 指令大全
                    </a>
                    <a href="/rules/" class="nav-item ${currentPath.includes('/rules') ? 'active' : ''}">
                        📖 伺服器規範
                    </a>
                </div>
            </div>
        </nav>
    `;

    // 4. 渲染導覽列 (優先填入 #nav-placeholder，沒有的話則插入在 <body> 最前方)
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // 5. 綁定漢堡選單點擊與自動關閉邏輯
    const toggleBtn = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (toggleBtn && navLinks) {
        // 點擊漢堡按鈕切換開關
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // 點擊選單內的項目後自動收起選單
        const links = navLinks.querySelectorAll('.nav-item');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // 點擊頁面其他空白區域自動收起選單
        document.addEventListener('click', function (e) {
            if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
});
