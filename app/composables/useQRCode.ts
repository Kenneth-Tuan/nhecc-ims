import type { Asset } from "~/models/asset";

export function useQRCode() {
  /**
   * 下載 QR Code 為 SVG 格式
   */
  function downloadQRCode(
    qrCodeContainer: HTMLElement | null,
    asset: Asset | null
  ) {
    if (!qrCodeContainer) {
      console.error("QR Code 容器不存在");
      return;
    }

    if (!asset) {
      console.error("資產資料不存在");
      return;
    }

    // 等待下一個 tick 確保 QR Code 已經渲染
    nextTick(() => {
      const svg = qrCodeContainer.querySelector("svg");
      if (svg) {
        try {
          console.log("找到 SVG 元素，開始處理下載...");
          console.log("原始 SVG 屬性:", {
            viewBox: svg.getAttribute("viewBox"),
            width: svg.getAttribute("width"),
            height: svg.getAttribute("height"),
            xmlns: svg.getAttribute("xmlns"),
          });

          // 複製 SVG 元素以避免修改原始元素
          const svgClone = svg.cloneNode(true) as SVGElement;

          // 確保 SVG 有正確的命名空間和樣式
          if (!svgClone.getAttribute("xmlns")) {
            svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          }

          // 獲取原始 SVG 的 viewBox，保持原始座標系統
          const originalViewBox = svg.getAttribute("viewBox") || "0 0 256 256";
          const originalWidth = svg.getAttribute("width") || "256";
          const originalHeight = svg.getAttribute("height") || "256";

          console.log("原始 SVG 資訊:", {
            viewBox: originalViewBox,
            width: originalWidth,
            height: originalHeight,
          });

          // 設定合適的輸出尺寸但保持原始 viewBox
          svgClone.setAttribute("width", "512");
          svgClone.setAttribute("height", "512");
          svgClone.setAttribute("viewBox", originalViewBox);

          // 修復所有 rect 元素的樣式
          const rects = svgClone.querySelectorAll("rect");
          rects.forEach((rect) => {
            rect.setAttribute("fill", "#ffffff");
            rect.removeAttribute("style");
            // 保持原始的寬高，不要強制改變
          });

          // 修復所有 path 元素的樣式
          const paths = svgClone.querySelectorAll("path");
          paths.forEach((path) => {
            path.setAttribute("fill", "#000000");
            path.removeAttribute("style");
          });

          // 確保 SVG 有正確的樣式
          const style = document.createElement("style");
          style.textContent = `
            svg { 
              background-color: white !important; 
              display: block;
              width: 512px !important;
              height: 512px !important;
            }
            rect {
              fill: #ffffff !important;
            }
            path {
              fill: #000000 !important;
            }
          `;
          svgClone.appendChild(style);

          // 序列化 SVG
          const svgString = new XMLSerializer().serializeToString(svgClone);
          console.log("SVG 序列化完成，長度:", svgString.length);
          console.log("處理後的 SVG 屬性:", {
            viewBox: svgClone.getAttribute("viewBox"),
            width: svgClone.getAttribute("width"),
            height: svgClone.getAttribute("height"),
            xmlns: svgClone.getAttribute("xmlns"),
          });
          console.log("找到的 rect 元素數量:", rects.length);
          console.log("找到的 path 元素數量:", paths.length);
          console.log("SVG 內容預覽:", svgString.substring(0, 500) + "...");

          // 創建 Blob 並下載
          const blob = new Blob([svgString], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `qrcode-${asset.name || asset.id || "asset"}.svg`;
          a.target = "_blank";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // 清理 URL
          setTimeout(() => URL.revokeObjectURL(url), 100);

          console.log("QR Code 下載完成");
        } catch (error) {
          console.error("下載 QR Code 失敗:", error);
        }
      } else {
        console.warn("找不到 QR Code SVG 元素");
        console.log("容器內容:", qrCodeContainer.innerHTML);
      }
    });
  }

  /**
   * 列印 QR Code
   */
  function printQRCode(
    qrCodeContainer: HTMLElement | null,
    asset: Asset | null
  ) {
    if (!qrCodeContainer) {
      console.error("QR Code 容器不存在");
      return;
    }

    if (!asset) {
      console.error("資產資料不存在");
      return;
    }

    // 等待下一個 tick 確保 QR Code 已經渲染
    nextTick(() => {
      const svg = qrCodeContainer.querySelector("svg");
      if (svg) {
        try {
          console.log("開始處理列印 QR Code...");

          // 複製 SVG 元素並修復樣式（與下載功能相同）
          const svgClone = svg.cloneNode(true) as SVGElement;

          // 確保 SVG 有正確的命名空間和樣式
          if (!svgClone.getAttribute("xmlns")) {
            svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          }

          // 獲取原始 SVG 的 viewBox，保持原始座標系統
          const originalViewBox = svg.getAttribute("viewBox") || "0 0 256 256";

          // 設定合適的輸出尺寸但保持原始 viewBox
          svgClone.setAttribute("width", "512");
          svgClone.setAttribute("height", "512");
          svgClone.setAttribute("viewBox", originalViewBox);

          // 修復所有 rect 元素的樣式
          const rects = svgClone.querySelectorAll("rect");
          rects.forEach((rect) => {
            rect.setAttribute("fill", "#ffffff");
            rect.removeAttribute("style");
          });

          // 修復所有 path 元素的樣式
          const paths = svgClone.querySelectorAll("path");
          paths.forEach((path) => {
            path.setAttribute("fill", "#000000");
            path.removeAttribute("style");
          });

          // 確保 SVG 有正確的樣式
          const style = document.createElement("style");
          style.textContent = `
            svg { 
              background-color: white !important; 
              display: block;
              width: 512px !important;
              height: 512px !important;
            }
            rect {
              fill: #ffffff !important;
            }
            path {
              fill: #000000 !important;
            }
          `;
          svgClone.appendChild(style);

          // 將修復後的 SVG 轉換為 PNG data URL
          const svgData = new XMLSerializer().serializeToString(svgClone);
          console.log("列印用 SVG 處理完成，長度:", svgData.length);

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            console.error("無法獲取 canvas context");
            return;
          }

          // 設定 canvas 尺寸 - 使用更高解析度
          const size = 512; // 使用與 SVG 相同的尺寸
          canvas.width = size;
          canvas.height = size;

          // 創建圖片元素
          const img = new Image();
          img.onload = function () {
            // 先填充白色背景
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, size, size);

            // 繪製圖片到 canvas
            ctx.drawImage(img, 0, 0, size, size);

            // 轉換為 PNG data URL 並列印
            const pngDataUrl = canvas.toDataURL("image/png");

            // 創建一個新的列印視窗
            const printWindow = window.open("", "_blank");
            if (printWindow) {
              const assetName = asset?.name || asset?.id || "asset";
              const assetSerial = asset?.serialNumber || "";

              printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>QR Code - ${assetName}</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 20px;
                      font-family: Arial, sans-serif;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      min-height: 100vh;
                    }
                    .qr-container {
                      text-align: center;
                      background: white;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .qr-code {
                    }
                    .asset-info {
                      margin-top: 15px;
                      font-size: 14px;
                      color: #666;
                    }
                    .asset-name {
                      font-weight: bold;
                      font-size: 16px;
                      margin-bottom: 5px;
                    }
                    .asset-serial {
                      font-size: 12px;
                      color: #888;
                    }
                    @media print {
                      body {
                        padding: 0;
                      }
                      .qr-container {
                        box-shadow: none;
                        border: 1px solid #ddd;
                      }
                    }
                  </style>
                </head>
                <body>
                  <div class="qr-container">
                    <div class="qr-code">
                      <img src="${pngDataUrl}" alt="QR Code" style="width: 300px; height: 300px;">
                    </div>
                  </div>
                </body>
                </html>
              `);

              printWindow.document.close();
              printWindow.focus();

              // 等待圖片載入完成後列印
              printWindow.onload = function () {
                printWindow.print();
                printWindow.close();
              };
            }
          };

          // 將 SVG 轉換為 data URL，確保 SVG 有正確的命名空間
          const svgWithNamespace = svgData.includes("xmlns")
            ? svgData
            : svgData.replace(
                "<svg",
                '<svg xmlns="http://www.w3.org/2000/svg"'
              );

          const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgWithNamespace)}`;
          img.src = svgDataUrl;
        } catch (error) {
          console.error("列印 QR Code 失敗:", error);
        }
      } else {
        console.warn("找不到 QR Code SVG 元素");
      }
    });
  }

  /**
   * 生成 QR Code URL
   */
  function generateQRCodeUrl(asset: Asset | null): string {
    if (!asset) return "";
    // 使用完整的 URL，包含域名
    const baseUrl = window.location.origin;
    return `${baseUrl}/warehouse/item?id=${asset.id}`;
  }

  return {
    downloadQRCode,
    printQRCode,
    generateQRCodeUrl,
  };
}
