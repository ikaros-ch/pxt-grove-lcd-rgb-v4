/**
 * Grove LCD RGB Backlight v4.0
 * LCD controller (AiP31068/JHD1313) at 0x3E, RGB controller (PCA9632) at 0x62.
 * Based on Seeed-Studio/Grove_LCD_RGB_Backlight (MIT).
 */
//% color="#2a9d8f" weight=90 icon="" block="Grove LCD RGB"
namespace groveLcd {
    const LCD_ADDR = 0x3E
    const RGB_ADDR = 0x62
    let inited = false

    function cmd(v: number) {
        pins.i2cWriteBuffer(LCD_ADDR, pins.createBufferFromArray([0x80, v]))
    }

    function data(v: number) {
        pins.i2cWriteBuffer(LCD_ADDR, pins.createBufferFromArray([0x40, v]))
    }

    function reg(r: number, v: number) {
        pins.i2cWriteBuffer(RGB_ADDR, pins.createBufferFromArray([r, v]))
    }

    function init() {
        if (inited) return
        inited = true
        basic.pause(50)
        // function set: 8-bit, 2 lines, 5x8
        cmd(0x28); basic.pause(5)
        cmd(0x28); control.waitMicros(150)
        cmd(0x28)
        cmd(0x28)
        cmd(0x0C) // display on, cursor off, blink off
        cmd(0x01); basic.pause(2) // clear
        cmd(0x06) // entry mode: left to right
        // PCA9632: MODE1=0 (wake), LEDOUT=0xFF (PWM), MODE2=0x20 (blink group)
        reg(0x00, 0)
        reg(0x08, 0xFF)
        reg(0x01, 0x20)
        setRGB(255, 255, 255)
    }

    /**
     * Show text at a column and row
     */
    //% block="LCD show text %text|at column %col|row %row"
    //% col.min=0 col.max=15 row.min=0 row.max=1
    //% weight=100
    export function showString(text: string, col: number, row: number) {
        init()
        cmd((row ? 0xC0 : 0x80) | Math.constrain(col, 0, 15))
        for (let i = 0; i < text.length; i++) data(text.charCodeAt(i))
    }

    /**
     * Show a number at a column and row
     */
    //% block="LCD show number %n|at column %col|row %row"
    //% col.min=0 col.max=15 row.min=0 row.max=1
    //% weight=90
    export function showNumber(n: number, col: number, row: number) {
        showString("" + n, col, row)
    }

    /**
     * Clear the screen
     */
    //% block="LCD clear"
    //% weight=80
    export function clear() {
        init()
        cmd(0x01)
        basic.pause(2)
    }

    /**
     * Set backlight color (0-255 each)
     */
    //% block="LCD backlight red %r|green %g|blue %b"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% r.defl=255 g.defl=255 b.defl=255
    //% weight=70
    export function setRGB(r: number, g: number, b: number) {
        init()
        reg(0x04, r & 0xFF)
        reg(0x03, g & 0xFF)
        reg(0x02, b & 0xFF)
    }

    /**
     * Set backlight to a color
     */
    //% block="LCD backlight color %color=colorNumberPicker"
    //% weight=65
    export function setColor(color: number) {
        setRGB((color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF)
    }

    /**
     * Turn the display on or off (text kept)
     */
    //% block="LCD display %on=toggleOnOff"
    //% weight=60
    export function display(on: boolean) {
        init()
        cmd(on ? 0x0C : 0x08)
    }
}
