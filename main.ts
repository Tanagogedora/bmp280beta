/**
 * MakeCode BMP280 Digital Pressure and Temperature Sensor Package
 *
 * Based on original BME280 work by the MicroPython Chinese community:
 * http://www.micropython.org.cn
 *
 * Original License: MIT  
 * Copyright (c) 2018, microbit/micropython Chinese community
 *
 * Ported and modified for BMP280 and MakeCode by Tanagotti, 2025
 *
 * (Note: The original BMP280 code from the same community was reviewed,
 * but not used directly due to functional issues.)
 */

/*
 * This package supports the BMP280 digital pressure and temperature sensor module for micro:bit MakeCode.
 * It allows you to measure atmospheric pressure and temperature.
 *
 * ▼ Measurement specifications (reference values based on the datasheet):
 * - Atmospheric pressure: 300–1100 hPa
 *   - Accuracy: ±1.0 to 1.7 hPa
 *   - Resolution: ±0.16 Pa
 *
 * - Temperature: -40 to 85 ℃
 *   - Accuracy: ±0.5 to 1.0 ℃
 *   - Resolution: ±0.01 ℃
 *
 * *Accuracy and resolution are based on the official BMP280 datasheet.
 *
 * マイクロビット MakeCode 用 BMP280 デジタル気圧・気温センサーモジュール対応パッケージです。
 * 気圧および気温を測定できます。
 *
 * ▼ 測定仕様（データシートに基づく参考値）:
 * - 気圧 : 300～1100 hPa  
 *   - 精度 : ±1.0～1.7 hPa  
 *   - 分解能 : ±0.16 Pa
 *
 * - 気温 : -40～85 ℃  
 *   - 精度 : ±0.5～1.0 ℃  
 *   - 分解能 : ±0.01 ℃
 *
 * ※ 精度・分解能は BMP280 の公式データシートに基づいています。
 */

/*
 * Creating MakeCode Blocks / MakeCode ブロックの作成
 */

// Enum Definitions / 列挙型の定義

// I2C Address / I2C アドレス
enum BMP280_I2C_ADDRESS {
    // Address selection: 0x76 or 0x77 / アドレスの選択：0x76 または 0x77
    //% block="0x76"
    ADDR_0x76 = 0x76,
    //% block="0x77"
    ADDR_0x77 = 0x77
}

// Temperature Unit / 気温の単位
enum BMP280_T {
    // Temperature units: C (Celsius) or F (Fahrenheit) / 温度単位：C（摂氏）または F（華氏）
    //% block="C"
    T_C = 0,
    //% block="F"
    T_F = 1
}

// Pressure Unit / 気圧の単位
enum BMP280_P {
    // Pressure units: Pa or hPa / 単位：Pa（パスカル）または hPa（ヘクトパスカル）
    //% block="Pa"
    Pa = 0,
    //% block="hPa"
    hPa = 1
}

/**
 * BMP280 block
 */

// Specify the type and color of the block icon / ブロックアイコンの種類と色を指定
//% weight=100 color=#70c0f0 icon="\uf042" block="BMP280"
namespace BMP280 {
    // ★ Global variables: Corrected temperature and pressure  (units: T=℃, P=Pa)
    // グローバル変数：補正後の気温と気圧（単位：T=℃、P=Pa）
    let T = 0;
    let P = 0;

    // Default I2C address: 0x77 / デフォルトの I2C アドレス：0x77
    let BMP280_I2C_ADDR = BMP280_I2C_ADDRESS.ADDR_0x77;

// Defining Functions / 関数の定義

/**
 * makecode BMP280 digital pressure and temperature sensor package.
 * 
 * Based on original BME280 work from the MicroPython Chinese community:
 * http://www.micropython.org.cn
 * 
 * Original License: MIT  
 * Copyright (c) 2018, microbit/micropython Chinese community
 * 
 * Ported and modified for BMP280 and MakeCode by Tanagotti, 2025
 * 
 * (Note: The original BMP280 code from the same community was reviewed,
 * but not used directly due to functional issues.)
 */

/*
マイクロビット MakeCode 用 BMP280 デジタル気圧・気温センサーモジュール対応パッケージです。
気圧 (Atmospheric Pressure) および気温 (Temperature) を測定できます。

▼ 測定仕様（データシートに基づく参考値）:
・気圧 (Atmospheric Pressure): 300～1100 hPa  
　- 精度 (Accuracy): ±1.0～1.7 hPa  
　- 分解能 (Resolution): ±0.16 Pa

・気温 (Temperature): -40～85 ℃  
　- 精度 (Accuracy): ±0.5～1.0 ℃  
　- 分解能 (Resolution): ±0.01 ℃

※ 精度・分解能は BMP280 の公式データシートに基づいています。
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
// Defining Functions / 関数の定義

/**
 * Writes 1 byte of data to a BMP280 register.
 * BMP280 のレジスタに 1 バイトのデータを書き込みます。
 * 
 * @param reg Register address (integer) / レジストリアドレス（整数値）
 * @param dat Data to write (integer) / 書き込むデータ（整数値）
 * 
 * Creates a 2-byte buffer and writes [reg, dat] via I2C.
 * 2バイトのバッファに reg と dat を格納し、I2C で送信します。
 */
function setreg(reg: number, dat: number): void {
    let buf = pins.createBuffer(2);
    buf[0] = reg;
    buf[1] = dat;
    pins.i2cWriteBuffer(BMP280_I2C_ADDR, buf);
}

/**
 * Reads 1 byte from a register of the BMP280.
 * BMP280 の任意のレジスタから 1 バイトの値を読み取ります。
 * 
 * @param reg Register address (integer) / レジストリアドレス（整数値）
 * @returns Value read (integer) / 読み取った値（整数値）
 * 
 * Sends the register address via I2C using UInt8BE format,
 * then reads 1 byte from the device.
 * レジストリアドレスを UInt8BE 形式で送信し、1 バイトを読み取って返します。
 */
function getreg(reg: number): number {
    pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt8BE);
}

/**
 * Reads an 8-bit signed integer.
 * 8 ビットの符号付き整数を読み取ります。
 * 
 * @note BMP280 には 8 ビット符号付きの値はありませんが、念のために残しています。
 * 
 * @param reg Register address / レジストリアドレス
 * @returns Signed 8-bit integer / 符号付き 8 ビット整数
 */
function getInt8LE(reg: number): number {
    pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.Int8LE);
}

/**
 * Reads a 16-bit unsigned integer.
 * 16 ビットの符号なし整数を読み取ります。
 * 
 * Used for calibration parameters such as dig_T1, dig_P1, etc.
 * dig_T1、dig_P1 などの補正パラメータ用に使用します。
 * 
 * @param reg Register address / レジストリアドレス
 * @returns Unsigned 16-bit integer / 符号なし 16 ビット整数
 */
function getUInt16LE(reg: number): number {
    pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.UInt16LE);
}

/**
 * Reads a 16-bit signed integer.
 * 16 ビットの符号付き整数を読み取ります。
 * 
 * Used for calibration parameters such as dig_T2, dig_T3, dig_P2.
 * dig_T2、dig_T3、dig_P2 などの補正パラメータ用に使用します。
 * 
 * @param reg Register address / レジストリアドレス
 * @returns Signed 16-bit integer / 符号付き 16 ビット整数
 */
function getInt16LE(reg: number): number {
    pins.i2cWriteNumber(BMP280_I2C_ADDR, reg, NumberFormat.UInt8BE);
    return pins.i2cReadNumber(BMP280_I2C_ADDR, NumberFormat.Int16LE);
}

/**
 * BMP280 calibration parameters for temperature and pressure.
 * BMP280 の温度・気圧補正用キャリブレーションパラメータです。
 * 
 * Address range: 0x88 to 0x9F (factory-programmed values)
 * アドレス範囲：0x88〜0x9F（工場出荷時に書き込まれた補正値）
 * 
 * Common to BMP280 sensors (excluding humidity-related registers)
 * BMP280 センサーで共通（湿度関連のレジスタは除く）
 */
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

// Temperature and pressure measurement settings
// Temperature x 1, pressure x 4, Normal mode
// 気温・気圧の測定設定
// 温度×1、気圧×4、Normal mode
setreg(0xF4, 0x2F);

// IIR filter settings
// IIR filter coefficient = 4, standby time = 0.5 ms
// IIR フィルターの設定
// IIR フィルタ係数 = 4、スタンバイ時間 = 0.5ms
setreg(0xF5, 0x0C);

/**
 * Reads raw data from the sensor and calculates corrected temperature and pressure.
 * センサーから生データを読み取り、補正済みの気温と気圧を算出します。
 */
function get(): void {
    // Read raw temperature data (20 bits)
    // 温度の生データ（20ビット）読み取り
    let adc_T = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4);

    // Temperature compensation calculation
    // 温度補正の計算
    let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11;
    let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14;
    let t_fine = var1 + var2;
    let temp = t_fine as number;

    // Calculate corrected temperature, rounded to 2 decimal places
    // 補正後の気温を計算（小数第2位で四捨五入）
    T = Math.round(((temp * 5 + 128) / 256.0) / 100.0 * 100) / 100;

    // Read raw pressure data (20 bits)
    // 気圧の生データ（20ビット）読み取り
    let adc_P = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4);

    // Pressure compensation calculation
    // 気圧補正の計算
    var1 = (t_fine >> 1) - 64000;
    var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6;
    var2 = var2 + ((var1 * dig_P5) << 1);
    var2 = (var2 >> 2) + (dig_P4 << 16);
    var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + ((dig_P2 * var1) >> 1)) >> 18;
    var1 = ((32768 + var1) * dig_P1) >> 15;

    if (var1 == 0) return; // Prevent division by zero / 0除算防止

    let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125;
    _p = Math.round((_p / var1) * 2 * 100) / 100; // Round to 0.01 Pa
    var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12;
    var2 = (((_p >> 2)) * dig_P8) >> 13;
    P = _p + ((var1 + var2 + dig_P7) >> 4);
}

/**
 * Get pressure value from BMP280 sensor
 * BMP280 センサーから気圧を取得します
 *
 * @param u Pressure unit (Pa or hPa) / 気圧の単位（Pa または hPa）
 * @returns Pressure value / 気圧の値（単位に応じた小数第1位）
 */
//% blockId="BMP280_GET_PRESSURE" block="気圧 pressure %u"
//% weight=80 blockGap=8
export function pressure(u: BMP280_P): number {
    get();
    if (u == BMP280_P.Pa) return Math.round(P * 10) / 10; // Pa 小数第1位で四捨五入
    else return Math.round((P / 100) * 10) / 10; // hPa 小数第1位で四捨五入
}

/**
 * Get temperature value from BMP280 sensor
 * BMP280 センサーから気温を取得します
 *
 * @param u Temperature unit (C or F) / 温度の単位（C または F）
 * @returns Temperature value / 気温の値（単位に応じた小数第1位）
 */
//% blockId="BMP280_GET_TEMPERATURE" block="気温 temperature %u"
//% weight=80 blockGap=8
/**
 * Power on the BMP280 sensor.
 * BMP280 センサーを起動（電源オン）します。
 */
//% blockId="BME280_POWER_ON" block="Power on / センサー起動"
//% weight=22 blockGap=8
export function PowerOn() {
    setreg(0xF4, 0x2F);
}

/**
 * Power off the BMP280 sensor.
 * BMP280 センサーを停止（スリープ状態）にします。
 */
//% blockId="BME280_POWER_OFF" block="Power off / センサー停止"
//% weight=21 blockGap=8
export function PowerOff() {
    setreg(0xF4, 0);
}
                basic.pause(1000);
            }
        });
    }

    /**
     * Triggered when pressure is higher than a specified value.
     * 気圧が指定値より高い場合のイベントブロック
     *
     * @param dat Threshold value / しきい値（Pa）
     * @param body Action to perform / 実行する処理
     */
    //% block="when pressure >  %dat / 気圧が %datより高い" dat.defl=100000
    export function PressureHigherThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get();
                if (P > dat) {
                    body();
                }
                basic.pause(1000);
            }
        });
    }

    /**
     * Triggered when temperature is below a specified value.
     * 気温が指定値より低い場合のイベントブロック
     *
     * @param dat Threshold value / しきい値（℃）
     * @param body Action to perform / 実行する処理
     */
    //% block="when temperature <  %dat / 気温が  %dat より低い" dat.defl=10
    export function TemperatureBelowThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get();
                if (T < dat) {
                    body();
                }
                basic.pause(1000);
            }
        });
    }

    /**
     * Triggered when temperature is higher than a specified value.
     * 気温が指定値より高い場合のイベントブロック
     *
     * @param dat Threshold value / しきい値（℃）
     * @param body Action to perform / 実行する処理
     */
    //% block="when temperature >  %dat / 気温が %dat より高い" dat.defl=30
    export function TemperatureHigherThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get();
                if (T > dat) {
                    body();
                }
                basic.pause(1000);
            }
        });
    }

    /**
     * Set the I2C address of the BMP280 sensor.
     * BMP280 の I2C アドレスを設定します。
     *
     * @param addr I2C address to set / 設定する I2C アドレス
     */
    //% blockId="BME280_SET_ADDRESS" block="I2C address / I2Cアドレス %addr"
    //% weight=20 blockGap=8
    export function Address(addr: BMP280_I2C_ADDRESS) {
        BMP280_I2C_ADDR = addr;
    }
}



