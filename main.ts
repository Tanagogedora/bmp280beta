/*
マイクロビットMakeCode　BMP280デジタル気圧・気温センサー搭載モジュール用パッケージ
 makecode BMP280 digital Atmospheric pressurer and Temperature sensor Package.
 MIT 
 気圧と気温を測定します。
 気圧(Atmosphere Pressurer):300～1100hPa 精度(accuracy)±1～1.7hPa 分解能(resolution)±0.16Pa
 気温(Temperature):-40～85℃(Celsius degree)　精度(accuracy)±0.5～1℃(Celsius degree) 分解能(resolution)±0.01℃(Celsius degree)
 気圧・気温の精度はデータシートによるものである。
*/
/*
 MakeCodeブロックの作成
*/
//enumの定義
//I2Cアドレス（I2C address）
enum BMP280_I2C_ADDRESS {
    //選択の表記　0x76
    //% block="0x76" 
    ADDR_0x76 = 0x76,
    //選択の表記　　0x77
    //% block="0x77"
    ADDR_0x77 = 0x77
}
//気温(Temperature)
enum BMP280_T {
    //選択の表記　C　摂氏(Celsius degree)を選択
    //% block="C"
    T_C = 0,
    //選択の表記　F　華氏(Fahrenheit degree)を選択
    //% block="F"
    T_F = 1
}

enum BMP280_P {
    //選択の表記　Paを選択
    //% block="Pa"
    Pa = 0,
    //選択の表記　hPaを選択
    //% block="hPa"
    hPa = 1
}
/**
 * BMP280 block
 */
//ブロックアイコンの種類と色を指定
//% weight=100 color=#70c0f0 icon="\uf042" block="BMP280"
namespace BMP280 {
    // ★ グローバル変数：補正後の温度と気圧（単位：T=℃、P=Pa）
    let T = 0;
    let P = 0;
    //I2Cアドレスのデフォルト0X77
    let BMP280_I2C_ADDR = BMP280_I2C_ADDRESS.ADDR_0x77;
    /**
     *BMP280 のレジスタに1バイトのデータを書き込む関数
     *レジストリアドレス：reg
     *データ：dat
     *ともに浮動小数点（整数値）
     *2byteの空バッファを作成しレジストリアドレス（buf[0]）とデータ(buf[1])をbufにいれて2byteにする。
     *I2Cで送信する
     */
    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(BMP280_I2C_ADDR, buf);
    }
    /**
     *BMP280の任意のレジスタから1バイトの値を読み取る関数
     *レジストリアドレス：reg 　浮動小数点（整数値）
     *戻り値　浮動小数点（整数値）
     *送信先のBMP280の I2C アドレスに対し、レジストリアドレスを8ビットの符号なし整数をビッグエンディアン形式で送信して書き込む。
   *その後BMP280 の I2C アドレスに対して 1バイトの読み取りを行い、
   *それを 8ビット符号なし整数として受け取り、
   *関数の返り値として返す
     */

    function getreg(reg: number): number {
        pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt8BE);
    }
    //8ビットの符号付き整数として読む関数
    //BMP280には8ビット符号付整数はないが念のため残している
    function getInt8LE(reg: number): number {
        pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.Int8LE);
    }
    //16ビットの符号なし整数として読む関数
    //dig_T1, dig_P1 などの16bit符号なしの補正パラメータ用として利用
    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt16LE);
    }

    //16bit符号付整数として読む関数
    //dig_T2, dig_T3, dig_P2 など補正パラメータ用として利用
    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.Int16LE);
    }
    // BMP280の補正パラメータ（温度・気圧補正用）
    // データシートの0x88〜0x9Fに格納された工場出荷時キャリブレーション値
    // ※BMP280とも共通（湿度関連レジスタは除く）
    let dig_T1 = getUInt16LE(0x88);
    let dig_T2 = getInt16LE(0x8A);
    let dig_T3 = getInt16LE(0x8C);
    let dig_P1 = getUInt16LE(0x8E);
    let dig_P2 = getInt16LE(0x90);
    let dig_P3 = getInt16LE(0x92);
    let dig_P4 = getInt16LE(0x94);
    let dig_P5 = getInt16LE(0x96);
    let dig_P6 = getInt16LE(0x98);
    let dig_P7 = getInt16LE(0x9A);
    let dig_P8 = getInt16LE(0x9C);
    let dig_P9 = getInt16LE(0x9E);
    // 気温・気圧の測定設定
    setreg(0xF4, 0x2F); // 温度×1、気圧×4、Normal mode
    //IIRフィルタの設定
    setreg(0xF5, 0x0C); // IIRフィルタ係数=4、スタンバイ時間=0.5ms	
    //気温・気圧取得の関数
    function get(): void {
        // 温度の生データ（20ビット）読み取り
        let adc_T = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4);

        // 温度補正（小数点付き）
        let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11;
        let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14;
        //t_fine を宣言・代入
        let t_fine = var1 + var2;
        let temp = t_fine as number;
        T = ((temp * 5 + 128) / 256.0) / 100.0;  // 小数点付きの気温（℃）

        // 気圧の生データ（20ビット）読み取り
        let adc_P = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4);

        // 気圧補正（整数版）
        var1 = (t_fine >> 1) - 64000;
        var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6;
        var2 = var2 + ((var1 * dig_P5) << 1);
        var2 = (var2 >> 2) + (dig_P4 << 16);
        var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + ((dig_P2 * var1) >> 1)) >> 18;
        var1 = ((32768 + var1) * dig_P1) >> 15;

        if (var1 == 0) return; // 0除算防止

        let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125;
        _p = Math.idiv(_p, var1) * 2;
        var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12;
        var2 = (((_p >> 2)) * dig_P8) >> 13;
        P = _p + ((var1 + var2 + dig_P7) >> 4); // 単位：Pa
    }
    /**
     * 気圧の取得
     */
    //% blockId="BMP280_GET_PRESSURE" block="気圧 %u"
    //% weight=80 blockGap=8
    export function pressure(u: BMP280_P): number {
        get();
        if (u == BMP280_P.Pa) return P;
        else return Math.idiv(P, 100)
    }

    /**
     * 気温の取得
     */
    //% blockId="BMP280_GET_TEMPERATURE" block="気温 %u"
    //% weight=80 blockGap=8
    export function temperature(u: BMP280_T): number {
        get();
        if (u == BMP280_T.T_C) return T;
        else return 32 + Math.idiv(T * 9, 5)
    }
    //センサーの電源制御（起動とスリープ）
    /**
     *起動
     */
    //% blockId="BME280_POWER_ON" block="センサー起動"
    //% weight=22 blockGap=8
    export function PowerOn() {
        setreg(0xF4, 0x2F)
    }

    /**
     * 停止（スリープ）
     */
    //% blockId="BME280_POWER_OFF" block="センサー停止"
    //% weight=21 blockGap=8
    export function PowerOff() {
        setreg(0xF4, 0)
    }

    //気温・気圧が指定値以上以下のブロック
    //気圧
    /**
     * 指定値より気圧が低い場合のイベントブロック
     */
    //% block="気圧が　%dat　より低い時" dat.defl=100000
    export function PressureBelowThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (P < dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * 指定値より気圧が高い場合のイベントブロック
     */
    //% block="気圧が %dat　より高い時" dat.defl=100000
    export function PressureHigherThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (P > dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    //気温
    /**
    * 気温が指定値よりも低い時のイベント
    */
    //% block="気温が %dat　より低い時" dat.defl=10
    export function TemperatureBelowThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (T < dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * 気温が指定値よりも高い時のイベント
     */
    //% block="気温が %dat　よりも高い時" dat.defl=30
    export function TemperatureHigherThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (T > dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    //I2Cアドレスセット
    /**
     * I2Cアドレスのセット
     */
    //% blockId="BME280_SET_ADDRESS" block="I2Cアドレス %addr"
    //% weight=20 blockGap=8
    export function Address(addr: BMP280_I2C_ADDRESS) {
        BMP280_I2C_ADDR = addr
    }
}


