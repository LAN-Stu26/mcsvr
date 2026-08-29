document.addEventListener('DOMContentLoaded', function () {
    // 0. 自動去除網址副檔名 (例如 /form/index.html -> /form/ ，或 /about.html -> /about)
    (function cleanURL() {
        const path = window.location.pathname;
        if (path.endsWith('/index.html')) {
            const cleanPath = path.slice(0, -10) || '/';
            window.history.replaceState({}, '', cleanPath + window.location.search + window.location.hash);
        } else if (path.endsWith('.html')) {
            const cleanPath = path.slice(0, -5);
            window.history.replaceState({}, '', cleanPath + window.location.search + window.location.hash);
        }
    })();

    // 1. 自動判斷當前網址以高亮顯示 Active 標籤（路徑正規化）
    const rawPath = window.location.pathname;
    const currentPath = rawPath.endsWith('/index.html') 
        ? (rawPath.slice(0, -10) || '/') 
        : (rawPath.endsWith('.html') ? rawPath.slice(0, -5) : rawPath);

    const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

    // 精確判斷 Active 高亮狀態的輔助函式
    const isActive = (targetPath, exact = false) => {
        const target = targetPath === '/' ? '/' : targetPath.replace(/\/$/, '');
        if (exact || target === '/') {
            return normalizedPath === target;
        }
        return normalizedPath === target || normalizedPath.startsWith(target + '/');
    };

    // 自製像素風格放大鏡 SVG
    const pixelSearchSVG = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated; display: block;">
            <path d="M6 2H10V4H6V2ZM10 4H12V6H10V4ZM12 6H14V10H12V6ZM10 10H12V12H10V10ZM6 12H10V14H6V12ZM4 10H6V12H4V10ZM3 6H4V10H3V6ZM4 4H6V6H4V4ZM11 11H13V13H11V11ZM13 13H15V15H13V13ZM15 15H17V17H15V15Z" fill="#FFAA00"/>
        </svg>
    `;

    // 2. 生成導覽列 HTML 結構（修正高亮誤判與行內樣式遮蔽問題）
    const navHTML = `
        <nav class="mc-nav">
            <!-- 頂部橫幅公告區 -->
            <div class="nav-banner">
                <span>📢 伺服器調整通知 </span>
                <a href="/news/#9" class="banner-btn">了解情況</a>
            </div>

            <div class="nav-container">
                <a href="/" class="nav-brand">
                    Lazy Sheep
                </a>
                
                <!-- 導覽連結 -->
                <div class="nav-links" id="navLinks">
                    <a href="/" class="nav-item ${isActive('/') ? 'active' : ''}">
                        首頁
                    </a>
                    <a href="/news/" class="nav-item ${isActive('/news') ? 'active' : ''}">
                        最新消息
                    </a>
                    <a href="/market/" class="nav-item ${isActive('/market') ? 'active' : ''}">
                        市集
                    </a>
                    <a href="/commands/" class="nav-item ${isActive('/commands') ? 'active' : ''}">
                        >_ 指令大全
                    </a>

                    <!-- 下拉選單 1：更多 -->
                    <div class="nav-dropdown">
                        <button type="button" class="nav-item nav-dropdown-toggle ${isActive('/featured') || isActive('/map') ? 'active' : ''}" aria-label="更多選單">
                            更多 <span class="dropdown-arrow">▼</span>
                        </button>
                        <div class="dropdown-menu">
                            <a href="/featured/" class="dropdown-item ${isActive('/featured') ? 'active' : ''}">
                                社群精選
                            </a>
                            <a href="/map/" class="dropdown-item ${isActive('/map') ? 'active' : ''}">
                                世界地圖
                            </a>
                        </div>
                    </div>

                    <!-- 下拉選單 2：加入伺服器 -->
                    <div class="nav-dropdown">
                        <button type="button" class="nav-item nav-dropdown-toggle ${isActive('/terms') || isActive('/rules') || isActive('/join', true) || isActive('/join/dc') ? 'active' : ''}" aria-label="加入伺服器選單">
                            加入伺服器 <span class="dropdown-arrow">▼</span>
                        </button>
                        <div class="dropdown-menu">
                            <a href="/terms/" class="dropdown-item ${isActive('/terms') ? 'active' : ''}">
                                營運與贊助條款
                            </a>
                            <a href="/rules/" class="dropdown-item ${isActive('/rules') ? 'active' : ''}">
                                規範
                            </a>
                            <a href="/join/" class="dropdown-item ${isActive('/join', true) ? 'active' : ''}">
                                申請加入
                            </a>
                            <a href="/join/dc" class="dropdown-item ${isActive('/join/dc') ? 'active' : ''}">
                                Discord
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nav-right-tools">
                    <!-- 像素風放大鏡按鈕 -->
                    <button class="nav-search-btn" id="navSearchTrigger" aria-label="開啟搜尋">
                        ${pixelSearchSVG}
                    </button>

                    <!-- 手機版漢堡選單按鈕 -->
                    <button class="nav-toggle" id="navToggle" aria-label="切換選單">
                        ☰
                    </button>
                </div>
            </div>
        </nav>

        <!-- 全螢幕搜尋彈窗 -->
        <div class="search-overlay" id="searchOverlay">
            <div class="search-modal" id="searchModal">
                <div class="search-modal-header">
                    <div class="search-input-wrapper">
                        <span class="search-input-icon">${pixelSearchSVG}</span>
                        <input type="text" id="navSearchInput" placeholder="搜尋網頁、文章或指令..." autocomplete="off">
                    </div>
                    <button class="search-close-btn" id="searchCloseBtn" aria-label="關閉搜尋">✕</button>
                </div>
                <div id="navSearchResults" class="search-results-list">
                    <div class="search-no-result">輸入關鍵字開始搜尋...</div>
                </div>
            </div>
        </div>
    `;

    // 3. 渲染導覽列
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // 4. 自動計算並調整 body padding-top
    const navElement = document.querySelector('.mc-nav');
    if (navElement) {
        const updateBodyPadding = () => {
            const navHeight = navElement.offsetHeight;
            document.body.style.paddingTop = (navHeight + 20) + 'px';
        };

        updateBodyPadding();

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
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        const links = navLinks.querySelectorAll('.nav-item, .dropdown-item');
        links.forEach(link => {
            if (link.classList.contains('nav-dropdown-toggle')) return;
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        document.addEventListener('click', function (e) {
            if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // 5.5 通用綁定所有「下拉選單」邏輯（支援多個子選單獨立運作）
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', function (e) {
                e.stopPropagation();
                
                // 關閉其他已開啟的下拉選單
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        const otherToggle = otherDropdown.querySelector('.nav-dropdown-toggle');
                        if (otherMenu) otherMenu.classList.remove('show');
                        if (otherToggle) otherToggle.classList.remove('open');
                    }
                });

                // 切換當前選單狀態
                menu.classList.toggle('show');
                toggle.classList.toggle('open');
            });
        }
    });

    // 點擊頁面任意空白處，關閉所有下拉選單
    document.addEventListener('click', function () {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            if (menu) menu.classList.remove('show');
            if (toggle) toggle.classList.remove('open');
        });
    });

    // 6. 全螢幕搜尋彈窗控制與讀取 /sites.json 搜尋邏輯
    const searchTrigger = document.getElementById('navSearchTrigger');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchModal = document.getElementById('searchModal');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('navSearchInput');
    const searchResults = document.getElementById('navSearchResults');
    let siteData = [];

    function openSearch() {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '<div class="search-no-result">輸入關鍵字開始搜尋...</div>';
    }

    if (searchTrigger && searchOverlay && searchCloseBtn) {
        searchTrigger.addEventListener('click', openSearch);
        searchCloseBtn.addEventListener('click', closeSearch);

        searchOverlay.addEventListener('click', function (e) {
            if (!searchModal.contains(e.target)) {
                closeSearch();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });

        fetch('/sites.json')
            .then(res => res.json())
            .then(data => {
                siteData = data;
            })
            .catch(err => console.error('無法讀取 sites.json:', err));

        searchInput.addEventListener('input', function () {
            const keyword = this.value.trim().toLowerCase();
            if (!keyword) {
                searchResults.innerHTML = '<div class="search-no-result">輸入關鍵字開始搜尋...</div>';
                return;
            }

            const matched = siteData.filter(site => {
                const title = (site.title || site.name || '').toLowerCase();
                const desc = (site.description || site.desc || '').toLowerCase();
                const url = (site.url || site.path || '').toLowerCase();
                return title.includes(keyword) || desc.includes(keyword) || url.includes(keyword);
            });

            if (matched.length > 0) {
                searchResults.innerHTML = matched.map(site => `
                    <a href="${site.url || site.path}" class="search-item">
                        <div class="search-item-title">${site.title || site.name}</div>
                        ${(site.description || site.desc) ? `<div class="search-item-desc">${site.description || site.desc}</div>` : ''}
                    </a>
                `).join('');
            } else {
                searchResults.innerHTML = `<div class="search-no-result">查無相關頁面</div>`;
            }
        });
    }
});