document.addEventListener('DOMContentLoaded', () => {
    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-brand">
                <img src="/icon.png" alt="Lazy Sheep Logo" class="footer-logo">
                <span class="footer-title">Lazy Sheep Server</span>
            </div>

            <div class="footer-links">
                <a href="/docs/" class="footer-link">📚 文件目錄</a>
                <a href="/docs/rules" class="footer-link">📜 伺服器規範</a>
            </div>

            <p class="footer-copyright">&copy; 2026 Lazy Sheep Server. All rights reserved.</p>
            <p class="footer-disclaimer">Minecraft 為 Mojang Synergies AB 之註冊商標，本伺服器與 Mojang 或 Microsoft 無直接關聯。</p>
        </div>
    </footer>
    `;

    // 優先搜尋頁尾佔位節點，若無則自動追加至 body 底部
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
});