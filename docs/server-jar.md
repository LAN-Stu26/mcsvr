> 這是一篇針對 **PaperMC 26.2 (Build 100)** 與 **Purpur 26.2 (Build 2618)** 的 Markdown 技術比較文章，旨在深入解析這兩款主流 Minecraft 伺服器核心在底層架構、效能優化、可客製化程度及適用場景上的技術差異。 

---

# Minecraft 伺服器核心技術解析：PaperMC 26.2 (100) vs. Purpur 26.2 (2618)

在 Minecraft 伺服器架設的領域中，選擇合適的核心（Server Software）是決定伺服器效能、穩定度與玩家體驗的關鍵。本文將深度對比目前廣受好評的兩款核心：**PaperMC 26.2 (Build 100)** 與其下游衍生版 **Purpur 26.2 (Build 2618)**。

---

## 1. 繼承關係與血統架構 (Architecture & Lineage)

要理解兩者的技術差異，首先必須了解它們的衍生關係：

```text
Vanilla (Mojang)
 └── CraftBukkit
      └── Spigot
           └── PaperMC 26.2 (Build 100)
                └── [Pufferfish]
                     └── Purpur 26.2 (Build 2618)
```

*   **PaperMC** 是以 Spigot 為基礎進行大幅度重構的核心，致力於提升效能、修復 Vanilla（原生）漏洞並提供更豐富的 API。
*   **Purpur** 則是 **PaperMC 的下游分支（Fork）**（中間整合了 Pufferfish 的效能補丁）。這意味著 **Purpur 26.2 (2618) 包含了 PaperMC 26.2 (100) 的所有功能、修復與 API**，並在此基礎上擴充了極高自由度的配置檔與額外功能。

---

## 2. 核心技術差異對比

### A. 效能與底層優化 (Performance & Optimization)

*   **PaperMC 26.2 (Build 100):**
    *   **異步處理 (Asynchronous Processing):** 將區塊加載/生成、光照計算、實體追蹤等重度工作移出主執行緒（Main Thread）。
    *   **紅石演算法優化:** 導入 `Eigenspace` 或 `Alternate` 紅石引擎，大幅降低大型紅石工程造成的 Tick 延遲 (TPS 下降)。
    *   **記憶體管理:** 修正了大量原生 Minecraft 的記憶體洩漏 (Memory Leak) 問題。

*   **Purpur 26.2 (Build 2618):**
    *   **繼承 Pufferfish 效能補丁:** 包含 **DAB (Dynamic Activation of Brains)** 技術。當生物距離玩家較遠時，會動態降低其 AI 運算頻率，極大地釋放 CPU 資源。
    *   **SIMD 效能優化:** 支援使用 SIMD (Single Instruction, Multiple Data) 指令集來加速矩陣與向量計算（需硬體與 Java 支援）。
    *   **更激進的異步尋路:** 將生物的尋路演算法（Pathfinding）更徹底地異步化處理。

### B. 遊戲機制與漏洞修復 (Exploits & Mechanics)

*   **PaperMC 26.2 (Build 100):**
    *   **立場嚴肅的漏洞修復:** 預設修復了大部分 Vanilla 的複製漏洞 (Duplication Glitches)、0-Tick 農場、基岩破壞等機制。
    *   **嚴格的安全性:** 著重於防範封包攻擊、Crash 漏洞與非法數據包注入。
    *   **客製化較保守:** 配置檔 (`paper-global.yml`, `paper-world-defaults.yml`) 主要集中在效能調整與安全限制。

*   **Purpur 26.2 (Build 2618):**
    *   **極致的「機制開關」自由:** Purpur 認為「重現原生 Bug 也是一種玩法」。透過 `purpur.yml`，管理員可以獨立選擇**重新開啟**被 Paper 修復的機制，例如：
        *   允許 TNT / 鐵軌 / 毯子複製（Sand/TNT Duping）
        *   允許利用基岩破壞機制
        *   允許 0-Tick 植物生長
    *   **高度自由的娛樂功能:**
        *   允許玩家騎乘任何實體（如 Riding Enderdragon / Wither）。
        *   自訂生物血量、傷害、掉落物以及 AFK（離開）系統。

### C. 配置檔結構 (Configuration)

| 核心名稱 | 主要配置檔案 | 特點 |
| :--- | :--- | :--- |
| **Paper 26.2 (100)** | `config/paper-global.yml`<br>`config/paper-world-defaults.yml` | 結構化清晰，以伺服器穩定度、保護與標準 API 為導向。 |
| **Purpur 26.2 (2618)** | 包含 Paper 所有配置檔<br>＋ **`purpur.yml`** | 新增數百個自訂選項，允許微調幾乎每一個生物行為與遊戲規則。 |

---

## 3. 詳細技術規格對照表

| 技術項目 | PaperMC 26.2 (Build 100) | Purpur 26.2 (Build 2618) |
| :--- | :--- | :--- |
| **上游依賴 (Upstream)** | Spigot / CraftBukkit | PaperMC 26.2 + Pufferfish |
| **外掛相容性 (Plugins)** | Bukkit / Spigot / Paper API | 100% 相容 Paper，並支援 Purpur API |
| **生物 AI 優化 (DAB)** | 無 (僅基本限制) | **有** (Dynamic Activation of Brains) |
| **複製漏洞控制** | 預設強制修復 (強制規範) | **可開關** (可自訂是否允許複製) |
| **自訂載具/騎乘系統** | 需透過外部 Plugin 實作 | **原生支援** (可設定騎乘蜂群、飛龍等) |
| **紅石優化** | 高 (Paper 專有演算法) | 高 (繼承 Paper 並可進一步關閉微小碰撞) |
| **適用伺服器類型** | 標準生存、商業小遊戲、嚴謹經濟服 | 特色生存 (SMP)、無政府服 (Anarchy)、大型 RPG |

---

## 4. 實體與 AI 效能測試情境分析

在 26.2 版本、高負載（例如：200 名玩家、大量自動化農場）的環境下：

1.  **密集實體場景（如萬頭豬/牛農場）：**
    *   **Paper 26.2 (100):** 會根據 `tick-rates` 與 `mob-spawn-limits` 進行硬性限制，若未調整配置，TPS 可能因大量算路而下降。
    *   **Purpur 26.2 (2618):** 觸發 DAB 機制，距離玩家 16 格外的實體 AI 思考頻率降至原本的 1/20，**TPS 表現明顯優於 Paper**。

2.  **技術向紅石/生電場景：**
    *   **Paper 26.2 (100):** 提供了極度穩定的紅石計算，但會破壞部分依賴 Vanilla 缺陷的複雜生電機器（如自動珍珠砲、TNT 複製挖礦機）。
    *   **Purpur 26.2 (2618):** 可以透過調整 `purpur.yml` 完美還原生電伺服器所需的修復開關，同時享有高效能底層。

---

## 5. 選擇指南：你應該使用哪一個？

### 選用 **PaperMC 26.2 (Build 100)** 的情況：
1.  **追求極致穩定與標準化：** 你經營的是嚴肅的經濟伺服器或小遊戲伺服器，不希望任何原生的 Exploits (漏洞) 破壞遊戲平衡。
2.  **生態系相容性考量：** 希望將伺服器保持在最純粹的 Paper 環境，降低因為下游 Fork 修改底層邏輯而導致特定 Plugin 出錯的風險。
3.  **維護成本低：** 不需要花費大量時間去研究 `purpur.yml` 中數百個繁雜的設定檔。

### 選用 **Purpur 26.2 (Build 2618)** 的情況：
1.  **需要極限效能優化：** 伺服器有嚴重的生物 TPS 瓶頸（如大型生存服 SMP），需要 DAB 等高階優化技術。
2.  **生電 / 技術服需求：** 既想要 Paper 的順暢度，又想保留原生 TNT 複製、沙子複製等生電玩法。
3.  **打造高度客製化的特色玩法：** 想實現「玩家可以騎乘飛龍」、「自訂 AFK 狀態頭飾」、「修改特定 Mob 的血量與攻擊模式」等免 Plugin 的原生功能。

---

## 結論

**PaperMC 26.2 (100)** 是現代 Minecraft 伺服器的**基石與工業標準**，提供了強大的安全防護與優異的基礎效能。

而 **Purpur 26.2 (2618)** 則是在此基石上打造的 **「瑞士軍刀」**。它不僅繼承了 Paper 的所有優點，更透過整合 Pufferfish 的效能補丁與極致開放的配置選項，賦予伺服器主（Owner）前所未有的控制權。如果你的伺服器需要更高的實體處理能力，或是希望在機制上有更大的彈性，Purpur 26.2 (2618) 無疑是更具技術優勢的選擇。

---

### [回到關聯公告](/news#7) 

[[網站首頁]](/) [[文件]](/docs/)  