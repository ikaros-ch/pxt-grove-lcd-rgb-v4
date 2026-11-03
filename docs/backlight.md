# LCD backlight

Turn the backlight off to save power, or back on. The text stays on the screen (it is hard to read without light). Turning it back on restores the last color. Any backlight color block, or the rainbow, also turns it back on. Turning it off stops the rainbow.

```sig
groveLcd.backlight(false)
```

## Parameters

* **on**: `true` to turn the backlight on, `false` to turn it off.

## Example

```blocks
// Light only while button A is held
groveLcd.showString("Hold A", 0, 0)
groveLcd.backlight(false)
basic.forever(function () {
    groveLcd.backlight(input.buttonIsPressed(Button.A))
    basic.pause(100)
})
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
