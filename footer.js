/* ==========================================
   Lazy Sheep - Transparent & Split Pixel Footer JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderFooter();
});

function renderFooter() {
    // 建立透明雙列 layout 的 HTML 內容
    const footerHTML = `
        <footer class="site-footer">
            <div class="site-footer-inner">
                <!-- 上半部：左側 Brand / 右側 按鈕區域 -->
                <div class="footer-top-row">
                    <!-- 左側：伺服器 Icon 與名稱 -->
                    <div class="footer-brand">
                        <span class="footer-title">Lazy Sheep Server</span>
                    </div>

                    <!-- 右側：網站按鈕連結 -->
                    <nav class="footer-links">
                        <a href="/docs/" class="footer-link">文件與目錄</a>
                        <a href="/rules/" class="footer-link">伺服器規範</a>
                    </nav>
                </div>

                <!-- 下半部：靠左對齊版權宣告與免責聲明 -->
                <div class="footer-bottom-row">
                    <div class="footer-copyright-box">
                        <p class="footer-copyright">&copy; 2026 Lazy Sheep Server. All rights reserved.</p>
                        <p class="footer-disclaimer">Minecraft 為 Mojang Synergies AB 之註冊商標，本伺服器與 Mojang 或 Microsoft 無直接關聯。</p>
                    </div>
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