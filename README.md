# Grove LCD RGB Backlight v4.0 for MakeCode micro:bit

Blocks for the Seeed **Grove - LCD RGB Backlight v4.0**: a 16x2 character display with a color backlight.
Show text and numbers, change the backlight color, fade it through a rainbow, and draw your own characters.

* Product page: https://www.seeedstudio.com/Grove-LCD-RGB-Backlight.html
* Wiki and datasheets: https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/

![Grove LCD RGB Backlight](https://files.seeedstudio.com/wiki/Grove_LCD_RGB_Backlight/images/intro.jpg)

## Hardware

* Plug the display into an **I2C** Grove port of a micro:bit Grove shield (for example the Seeed Grove Shield for micro:bit).
* The display needs **5V** power. Works with micro:bit V1 and V2.
* I2C addresses: LCD `0x3E`, backlight `0x62` (v4.0 boards). v5.0 boards use a different backlight chip and are not supported.

## Add the extension

In [MakeCode](https://makecode.microbit.org): **Extensions** → paste `https://github.com/ikaros-ch/pxt-grove-lcd-rgb-v4` → click the result.

## Text

```blocks
// Top line: text starts at column 0. Bottom line: number at column 0
groveLcd.showString("Hello micro:bit", 0, 0)
groveLcd.showNumber(42, 0, 1)

// Button A erases the screen, B hides/shows the text without erasing it
let visible = true
input.onButtonPressed(Button.A, function () {
    groveLcd.clear()
})
input.onButtonPressed(Button.B, function () {
    visible = !visible
    groveLcd.display(visible)
})
```

Columns go from 0 (left) to 15 (right), rows are 0 (top) and 1 (bottom).

## Backlight

```blocks
// Mix a color from red, green and blue (0-255 each)
groveLcd.setRGB(0, 128, 255)
// Or pick one from the color picker
groveLcd.setColor(0xff8000)
// Or choose a hue on the color wheel: 0 red, 120 green, 240 blue
groveLcd.setHue(120)

// Fade through the rainbow in the background; 20 ms per step
groveLcd.rainbow(20)
// Button A stops the fade and keeps the current color
input.onButtonPressed(Button.A, function () {
    groveLcd.stopRainbow()
})
```

Any backlight color block also stops the rainbow.

### Save power

The backlight uses most of the display's power. Turn it off when nobody is looking; the text and the last color are kept.

```blocks
// Light up for 5 seconds after button B, then go dark
groveLcd.showString("Press B", 0, 0)
groveLcd.backlight(false)
input.onButtonPressed(Button.B, function () {
    groveLcd.backlight(true)
    basic.pause(5000)
    groveLcd.backlight(false)
})
```

Any color block or the rainbow turns the backlight back on.

## Ελληνικά

Τα μπλοκ είναι μεταφρασμένα στα ελληνικά. Επιλέξτε **Ελληνικά** από το μενού γλώσσας του MakeCode (γρανάζι → Language).

## Custom characters

Find these in the **Characters** subcategory. Draw up to 8 of your own 5x8 characters, then show them anywhere.

```blocks
// Store a heart in slot 1
groveLcd.makeCharacter(groveLcd.CustomCharacter.C1, groveLcd.characterPixels(`
    . . . . .
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    . . . . .
    . . . . .
    `))
// Show "I <heart> micro:bit"
groveLcd.showString("I", 0, 0)
groveLcd.showCharacter(groveLcd.CustomCharacter.C1, 2, 0)
groveLcd.showString("micro:bit", 4, 0)
```

## Learn more

* [Seeed wiki: Grove LCD RGB Backlight](https://wiki.seeedstudio.com/Grove-LCD_RGB_Backlight/): how the display works
* [MakeCode micro:bit tutorials](https://makecode.microbit.org/tutorials): getting started with blocks
* [Using extensions in MakeCode](https://makecode.microbit.org/extensions)
* [micro:bit I2C pins](https://makecode.microbit.org/reference/pins/i2c-write-number)

## Testing

`test.ts` steps through every block. Flash it with the display attached and compare the screen to each `EXPECT` comment. In the simulator it should run without errors.

## Troubleshooting

* **Only 8 characters show on each line:** the display is likely faulty (seen on a real v4.0 unit; a replacement showed all 16). Check the edge of the glass for damage.
* **Nothing shows but the backlight is on:** check the 5V power and that the cable is in an I2C port.

## License

MIT. Ported from [Seeed-Studio/Grove_LCD_RGB_Backlight](https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight) (MIT). The init sequence follows [calliope-edu/pxt-rgblcd](https://github.com/calliope-edu/pxt-rgblcd).

#### Metadata (used for search, rendering)

* for PXT/microbit
