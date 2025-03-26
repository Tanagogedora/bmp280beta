# BMP280 Sensor Extension for micro:bit  
# micro:bit 用 BMP280 センサー拡張機能
> ⚠️ **この拡張機能は現在ベータ版です。動作確認中の機能が含まれます。ご使用の際はご注意ください。**

This extension allows the micro:bit to communicate with a BMP280 digital pressure and temperature sensor via I2C.  
You can measure atmospheric pressure and temperature (Note: Humidity is not supported).  
Sensor values are based on the official BMP280 datasheet.

この拡張機能は、BMP280 デジタル気圧・気温センサーを micro:bit の MakeCode 上で利用するためのものです。  
気圧と気温の測定が可能です（※湿度は非対応）。センサー仕様は BMP280 のデータシートに基づいています。

> 🔗 **Demo Page:**デモページを見る: [https://tanagogedora.github.io/bmp280betaVrJP/](https://tanagogedora.github.io/bmp280betaVrJP/)

---
## 📦 How to Use / 使い方
### As a MakeCode Extension
1. Open [https://makecode.microbit.org/](https://makecode.microbit.org/)
1. Create a new project
1. Click the gear icon (⚙) → "Extensions"
1. Paste the following URL to add the extension　　
 `https://github.com/tanagogedora/bmp280betaVrJP`  

	MakeCode 拡張機能としての使用方法
<!-- Reset numbering -->
1. MakeCode [https://makecode.microbit.org/](https://makecode.microbit.org/)を開く
1. 「新しいプロジェクト」をクリック
1. 画面右上のギアボタン（⚙）をクリックし、「拡張機能」を選択 
1. 下記の URL を検索または貼り付けてインポート:  
   `https://github.com/tanagogedora/bmp280betaVrJP`  

### 🖼 Example Blocks / ブロック例

![BMP280 ブロック](https://github.com/Tanagogedora/bmp280betaVrJP/blob/master/BMP280block.png?raw=true)

---

## ✏️ To modify the extension source code in MakeCode:

1. Open [https://makecode.microbit.org/](https://makecode.microbit.org/)
1. Click "Import" → "Import URL"
1. Paste this URL  
`https://github.com/tanagogedora/bmp280betaVrJP`  

	MakeCode 上で編集
<!-- Reset numbering -->
1. MakeCode[https://makecode.microbit.org/](https://makecode.microbit.org/) を開く
1. 「読み込む」→「URLから読み込む…」を選択
1. 以下の URL を貼り付けてインポート   
`https://github.com/tanagogedora/bmp280betaVrJP`  

---

## 🧪 Sensor Specification (Based on Datasheet) / 測定仕様（参考：データシートより）


| Measurement(測定対象) | Range(範囲) | Accuracy(精度) | Resolution(分解能) |
|-----------|------------------|-------------------|--------------------|
| Pressure(気圧) | 300 ～ 1100 hPa | ±1.0 ～ 1.7 hPa | ±0.16 Pa |
| Temperature(気温) | -40 ～ +85 ℃ | ±0.5 ～ 1.0 ℃ | ±0.01 ℃ |

※ 上記の値は BMP280 の公式データシートに基づく参考値です。

## 📝 ライセンス

MIT License 

© 2025 Tanagotti  
Based on BME280 code by the microbit/micropython Chinese community (2018)  
Original: http://www.micropython.org.cn 
© 2025 Tanagotti  
元コード：microbit/micropython Chinese community による BME280 コード（2018年）  
---

## 🔍 メタデータ（MakeCode レンダリング用）

```html
<script src="https://makecode.com/gh-pages-embed.js"></script>
<script>
makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");
</script>

