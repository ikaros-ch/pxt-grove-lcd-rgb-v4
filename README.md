# Grove LCD RGB Backlight v4.0 for MakeCode micro:bit

Blocks for the Seeed Grove 16x2 LCD RGB Backlight **v4.0** (LCD at I2C `0x3E`, RGB PCA9632 at `0x62`).
Plug into the I2C port of a Grove shield. Note: the display needs 5V for good contrast.

## Use
In [MakeCode](https://makecode.microbit.org): **Extensions** → paste `https://github.com/ikaros-ch/pxt-grove-lcd-rgb-v4`.

```blocks
groveLcd.setRGB(0, 128, 255)
groveLcd.showString("Hello micro:bit", 0, 0)
groveLcd.showNumber(42, 0, 1)
groveLcd.rainbow(20)
```

### Backlight
`backlight red/green/blue`, `backlight color`, `backlight hue` (0-359), `rainbow backlight` (runs in background, any other backlight block stops it), `stop rainbow`.

### Characters (subcategory)
Draw up to 8 custom 5x8 characters and place them anywhere:

```blocks
groveLcd.makeCharacter(LcdChar.c1, groveLcd.characterPixels(`
    . . . . .
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    . . . . .
    . . . . .
    `))
groveLcd.showCharacter(LcdChar.c1, 0, 0)
```

### Only 8 characters show?
If text stops at column 8 on every line, the display itself is likely faulty (seen on a real v4.0 unit; a replacement showed all 16). Check the ribbon/edge of the glass.

Ported from [Seeed-Studio/Grove_LCD_RGB_Backlight](https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight) (MIT).
v5.0 boards use RGB address `0x30` and different registers — not covered here.

#### Metadata (used for search, rendering)
* for PXT/microbit
