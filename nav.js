document.addEventListener('DOMContentLoaded', function () {
    // 1. 自動判斷當前網址以高亮顯示 Active 標籤
    const currentPath = window.location.pathname;

    // 2. 生成導覽列 HTML 結構（含頂部橫幅公告）
    const navHTML = `
        <nav class="mc-nav">
            <!-- 頂部橫幅公告區 -->
            <div class="nav-banner">
                <span>📢 本伺服器為白名單伺服器，詳細請看</span>
                <a href="/news/#4" class="banner-btn">公告</a>
            </div>

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
                        首頁
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
                    <a href="/join/" class="nav-item ${currentPath.includes('/join') ? 'active' : ''}">
                        申請白名單
                    </a>
                </div>
            </div>
        </nav>
    `;

    // 3. 渲染導覽列 (優先填入 #nav-placeholder，沒有的話則插入在 <body> 最前方)
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // 4. 自動計算並調整 body padding-top 以防止導覽列遮擋內容
    const navElement = document.querySelector('.mc-nav');
    if (navElement) {
        const updateBodyPadding = () => {
            // 取得導覽列實際高度，並額外保留 20px 緩衝空間
            const navHeight = navElement.offsetHeight;
            document.body.style.paddingTop = (navHeight + 20) + 'px';
        };

        // 初始化執行一次
        updateBodyPadding();

        // 使用 ResizeObserver 動態監聽導覽列高度變化 (包含手機版選單開啟/關閉、視窗縮放等)
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(updateBodyPadding);
            resizeObserver.observe(navElement);
        } else {
            window.addEventListener('resize', updateBodyPadding);
        }
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
