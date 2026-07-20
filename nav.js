document.addEventListener('DOMContentLoaded', function () {
    // 1. 自動注入手機版漢堡選單專屬的 RWD 樣式 (全站通用)
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        /* 漢堡選單按鈕 (預設在電腦版隱藏) */
        .nav-toggle {
            display: none;
            background-color: #151515;
            color: #ffaa00;
            border: 2px solid #000;
            padding: 6px 12px;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: inset -2px -2px 0px #000, inset 2px 2px 0px #5c5c5c;
            user-select: none;
            transition: all 0.1s ease;
        }

        .nav-toggle:active {
            box-shadow: inset 2px 2px 0px #000, inset -2px -2px 0px #5c5c5c;
            transform: translateY(1px);
        }

        /* 手機版 (寬度 <= 768px) 響應式調整 */
        @media (max-width: 768px) {
            .nav-toggle {
                display: block; /* 顯示漢堡選單按鈕 */
            }

            .nav-links {
                display: none !important; /* 預設隱藏選單清單 */
                flex-direction: column;
                width: 100%;
                background-color: #252525;
                border: 3px solid #000;
                padding: 10px;
                margin-top: 10px;
                box-shadow: inset -2px -2px 0px #151515, inset 2px 2px 0px #444;
                gap: 8px !important;
            }

            /* 點擊漢堡按鈕後展開選單 */
            .nav-links.active {
                display: flex !important;
            }

            .nav-item {
                width: 100%;
                text-align: center;
                padding: 10px;
                display: block;
            }
        }
    `;
    document.head.appendChild(navStyle);

    // 2. 自動判斷當前網址以高亮顯示 Active 標籤
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
                <button class="nav-toggle" id="navToggle" aria-label="切換選單">
                    ☰
                </button>

                <!-- 導覽連結 -->
                <div class="nav-links" id="navLinks">
                    <a href="/" class="nav-item ${currentPath === '/' || currentPath.endsWith('/index.html') ? 'active' : ''}">
                        🏠 返回首頁
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
