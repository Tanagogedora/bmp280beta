# micro:bit 用 BMP280 センサー拡張機能

この拡張機能は、BMP280 デジタル気圧・気温センサーを micro:bit の MakeCode 上で利用するためのものです。  
気圧と気温の測定が可能です（※湿度は非対応）。センサー仕様は BMP280 のデータシートに基づいています。

> 🔗 デモページを見る: [https://tanagogedora.github.io/bmp280beta/](https://tanagogedora.github.io/bmp280beta/)

---

## 📦 拡張機能としての使い方

このリポジトリは MakeCode 上で **拡張機能** としてインポートして使用できます。

1. [https://makecode.microbit.org/](https://makecode.microbit.org/) を開く  
2. 「新しいプロジェクト」をクリック  
3. 画面右上のギアボタン（⚙）をクリックし、「拡張機能」を選択  
4. 下記の URL を検索または貼り付けてインポート  
https://github.com/tanagogedora/bmp280beta

---

## ✏️ プロジェクトとして編集する

この拡張機能を MakeCode 上で編集するには：

1. [https://makecode.microbit.org/](https://makecode.microbit.org/) を開く  
2. 「読み込む」→「URLから読み込む…」を選択  
3. 以下の URL を貼り付けてインポート  

https://github.com/tanagogedora/bmp280beta

---

## 🧪 測定仕様（参考：データシートより）

| 測定対象 | 範囲 | 精度 | 分解能 |
|-----------|------------------|-------------------|--------------------|
| 気圧 | 300 ～ 1100 hPa | ±1.0 ～ 1.7 hPa | ±0.16 Pa |
| 気温 | -40 ～ +85 ℃ | ±0.5 ～ 1.0 ℃ | ±0.01 ℃ |

※ 上記の値は BMP280 の公式データシートに基づく参考値です。

---

## 📝 ライセンス

MIT License  
© 2025 Tanagotti  
元コード：microbit/micropython Chinese community による BME280 コード（2018年）  
URL: http://www.micropython.org.cn

---

## 🔍 メタデータ（MakeCode レンダリング用）

```html
<script src="https://makecode.com/gh-pages-embed.js"></script>
<script>
makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");
</script>

