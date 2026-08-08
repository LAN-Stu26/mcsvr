/* ==========================================
   Lazy Sheep - Standardized Pixel Footer JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderFooter();
});

function renderFooter() {
    // 建立頁尾的 HTML 內容
    const footerHTML = `
        <footer class="site-footer">
            <div class="site-footer-inner">
                <!-- 伺服器 Icon 與品牌名稱 -->
                <div class="footer-brand">
                    <img src="/icon.png" alt="Lazy Sheep Logo" class="footer-logo" onerror="this.style.display='none';">
                    <span class="footer-title">Lazy Sheep Server</span>
                </div>

                <!-- 網站連結區域 -->
                <nav class="footer-links">
                    <a href="/docs/" class="footer-link">文件與目錄</a>
                    <a href="/rules/" class="footer-link">伺服器規範</a>
                </nav>

                <!-- 版權與官方免責聲明 -->
                <div class="footer-copyright-box">
                    <p class="footer-copyright">&copy; 2026 Lazy Sheep Server. All rights reserved.</p>
                    <p class="footer-disclaimer">Minecraft 為 Mojang Synergies AB 之註冊商標，本伺服器與 Mojang 或 Microsoft 無直接關聯。</p>
                </div>
            </div>
        </footer>
    `;

    // 優先尋找專屬占位點，若無則自動 append 到 body 底部
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
}