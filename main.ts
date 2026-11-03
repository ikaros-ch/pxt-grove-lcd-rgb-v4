/**
 * Grove LCD RGB Backlight v4.0
 * LCD controller (AiP31068/JHD1313) at 0x3E, RGB controller (PCA9632) at 0x62.
 * Based on Seeed-Studio/Grove_LCD_RGB_Backlight (MIT).
 */

const enum LcdChar {
    //% block="1"
    C1 = 0,
    //% block="2"
    C2 = 1,
    //% block="3"
    C3 = 2,
    //% block="4"
    C4 = 3,
    //% block="5"
    C5 = 4,
    //% block="6"
    C6 = 5,
    //% block="7"
    C7 = 6,
    //% block="8"
    C8 = 7
}

//% color="#2a9d8f" weight=90 icon="" block="Grove LCD RGB"
//% groups='["Text", "Backlight"]'
namespace groveLcd {
    const LCD_ADDR = 0x3E
    const RGB_ADDR = 0x62
    // ms after micro:bit boot before the LCD is talked to; raise if text shows only 8 chars after power-on
    const BOOT_MS = 400
    let inited = false
    let rainbowOn = false
    let rainbowMs = 20

    function cmd(v: number) {
        pins.i2cWriteBuffer(LCD_ADDR, pins.createBufferFromArray([0x80, v]))
    }

    function data(v: number) {
        pins.i2cWriteBuffer(LCD_ADDR, pins.createBufferFromArray([0x40, v]))
    }

    function reg(r: number, v: number) {
        pins.i2cWriteBuffer(RGB_ADDR, pins.createBufferFromArray([r, v]))
    }

    function rgb(r: number, g: number, b: number) {
        reg(0x04, r & 0xFF)
        reg(0x03, g & 0xFF)
        reg(0x02, b & 0xFF)
    }

    function init() {
        if (inited) return
        // LCD powers up with the micro:bit; commands sent before its reset finishes are lost (1-line mode)
        const wait = BOOT_MS - control.millis()
        basic.pause(Math.max(50, wait))
        // function set: 8-bit x3 then 2 lines, 5x8 (sequence from calliope-edu/pxt-rgblcd, made for v4.0)
        cmd(0x38); basic.pause(5)
        cmd(0x38); basic.pause(1)
        cmd(0x38)
        cmd(0x28)
        cmd(0x0C) // display on, cursor off, blink off
        cmd(0x01); basic.pause(2) // clear
        cmd(0x06) // entry mode: left to right
        // PCA9632: MODE1=0 (wake), LEDOUT=0xFF (PWM), MODE2=0x20 (blink group)
        reg(0x00, 0)
        reg(0x08, 0xFF)
        reg(0x01, 0x20)
        rgb(255, 255, 255)
        inited = true
    }

    function cursor(col: number, row: number) {
        cmd((row ? 0xC0 : 0x80) | Math.constrain(col, 0, 15))
    }

    /**
     * Show text at a column and row
     * @param text the text to show, eg: "Hello"
     * @param col column 0-15
     * @param row row 0 (top) or 1 (bottom)
     */
    //% block="LCD show text %text|at column %col|row %row"
    //% col.min=0 col.max=15 row.min=0 row.max=1
    //% group="Text" weight=100
    //% help=github:grove-lcd-rgb-v4/docs/show-string
    export function showString(text: string, col: number, row: number) {
        init()
        cursor(col, row)
        for (let i = 0; i < text.length; i++) data(text.charCodeAt(i))
    }

    /**
     * Show a number at a column and row
     * @param n the number to show
     * @param col column 0-15
     * @param row row 0 (top) or 1 (bottom)
     */
    //% block="LCD show number %n|at column %col|row %row"
    //% col.min=0 col.max=15 row.min=0 row.max=1
    //% group="Text" weight=90
    //% help=github:grove-lcd-rgb-v4/docs/show-number
    export function showNumber(n: number, col: number, row: number) {
        showString("" + n, col, row)
    }

    /**
     * Clear the screen
     */
    //% block="LCD clear"
    //% group="Text" weight=80
    //% help=github:grove-lcd-rgb-v4/docs/clear
    export function clear() {
        init()
        cmd(0x01)
        basic.pause(2)
    }

    /**
     * Turn the display on or off (text kept)
     */
    //% block="LCD display %on=toggleOnOff"
    //% group="Text" weight=60
    //% help=github:grove-lcd-rgb-v4/docs/display
    export function display(on: boolean) {
        init()
        cmd(on ? 0x0C : 0x08)
    }

    /**
     * Set backlight color (0-255 each). Stops the rainbow.
     * @param r red 0-255
     * @param g green 0-255
     * @param b blue 0-255
     */
    //% block="LCD backlight red %r|green %g|blue %b"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% r.defl=255 g.defl=255 b.defl=255
    //% group="Backlight" weight=70
    //% help=github:grove-lcd-rgb-v4/docs/set-rgb
    export function setRGB(r: number, g: number, b: number) {
        init()
        rainbowOn = false
        rgb(r, g, b)
    }

    /**
     * Set backlight to a color. Stops the rainbow.
     */
    //% block="LCD backlight color %color=colorNumberPicker"
    //% group="Backlight" weight=65
    //% help=github:grove-lcd-rgb-v4/docs/set-color
    export function setColor(color: number) {
        setRGB((color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF)
    }

    function hue(h: number) {
        h = ((h % 360) + 360) % 360
        const x = Math.idiv((h % 60) * 255, 60)
        switch (Math.idiv(h, 60)) {
            case 0: rgb(255, x, 0); break
            case 1: rgb(255 - x, 255, 0); break
            case 2: rgb(0, 255, x); break
            case 3: rgb(0, 255 - x, 255); break
            case 4: rgb(x, 0, 255); break
            default: rgb(255, 0, 255 - x)
        }
    }

    /**
     * Set backlight by hue on the color wheel (0=red, 120=green, 240=blue). Stops the rainbow.
     */
    //% block="LCD backlight hue %h"
    //% h.min=0 h.max=359
    //% group="Backlight" weight=64
    //% help=github:grove-lcd-rgb-v4/docs/set-hue
    export function setHue(h: number) {
        init()
        rainbowOn = false
        hue(h)
    }

    /**
     * Cycle the backlight through the rainbow in the background.
     * Any other backlight block stops it.
     * @param ms pause between color steps, smaller is faster, eg: 20
     */
    //% block="LCD rainbow backlight|speed %ms ms per step"
    //% ms.min=5 ms.max=500 ms.defl=20
    //% group="Backlight" weight=63
    //% help=github:grove-lcd-rgb-v4/docs/rainbow
    export function rainbow(ms: number) {
        init()
        rainbowMs = Math.max(5, ms)
        if (rainbowOn) return
        rainbowOn = true
        control.inBackground(() => {
            let h = 0
            while (rainbowOn) {
                hue(h)
                h = (h + 2) % 360
                basic.pause(rainbowMs)
            }
        })
    }

    /**
     * Stop the rainbow (keeps the current color)
     */
    //% block="LCD stop rainbow"
    //% group="Backlight" weight=62
    //% help=github:grove-lcd-rgb-v4/docs/stop-rainbow
    export function stopRainbow() {
        rainbowOn = false
    }

    /**
     * Store a custom 5x8 character in slot 1-8
     * @param char slot to store it in
     * @param im the 5x8 drawing
     */
    //% subcategory="Characters"
    //% block="LCD make character %char|%im=groveLcd_charPixels"
    //% weight=60
    //% help=github:grove-lcd-rgb-v4/docs/make-character
    export function makeCharacter(char: LcdChar, im: Image) {
        init()
        cmd(0x40 | (char << 3)) // CGRAM address of this slot
        for (let y = 0; y < 8; y++) {
            let row = 0
            for (let x = 0; x < 5; x++) if (im.pixel(x, y)) row |= 1 << (4 - x)
            data(row)
        }
        cmd(0x80) // back to DDRAM so text writes go to the screen
    }

    /**
     * A 5x8 pixel drawing for a custom character
     */
    //% subcategory="Characters"
    //% blockId=groveLcd_charPixels block="character"
    //% imageLiteral=1 imageLiteralColumns=5 imageLiteralRows=8 imageLiteralScale=0.6
    //% shim=images::createImage
    //% weight=59
    //% help=github:grove-lcd-rgb-v4/docs/character-pixels
    export function characterPixels(i: string): Image {
        return <Image><any>i
    }

    /**
     * Show a stored custom character at a column and row
     * @param char slot made with "make character"
     * @param col column 0-15
     * @param row row 0 (top) or 1 (bottom)
     */
    //% subcategory="Characters"
    //% block="LCD show character %char|at column %col|row %row"
    //% col.min=0 col.max=15 row.min=0 row.max=1
    //% weight=58
    //% help=github:grove-lcd-rgb-v4/docs/show-character
    export function showCharacter(char: LcdChar, col: number, row: number) {
        init()
        cursor(col, row)
        data(char)
    }
}
