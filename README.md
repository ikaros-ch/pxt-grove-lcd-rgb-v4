# Grove LCD RGB Backlight v4.0 for MakeCode micro:bit

Blocks for the Seeed Grove 16x2 LCD RGB Backlight **v4.0** (LCD at I2C `0x3E`, RGB PCA9632 at `0x62`).
Plug into the I2C port of a Grove shield. Note: the display needs 5V for good contrast.

## Use
In [MakeCode](https://makecode.microbit.org): **Extensions** → paste `https://github.com/ikaros-ch/pxt-grove-lcd-rgb-v4`.

```blocks
groveLcd.setRGB(0, 128, 255)
groveLcd.showString("Hello micro:bit", 0, 0)
groveLcd.showNumber(42, 0, 1)
```

Ported from [Seeed-Studio/Grove_LCD_RGB_Backlight](https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight) (MIT).
v5.0 boards use RGB address `0x30` and different registers — not covered here.

#### Metadata (used for search, rendering)
* for PXT/microbit
