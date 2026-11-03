# LCD backlight hue

Set the backlight by position on the color wheel: 0 red, 60 yellow, 120 green, 180 cyan, 240 blue, 300 magenta. Stops the rainbow if it is running.

```sig
groveLcd.setHue(0)
```

## Parameters

* **h**: hue 0-359.

## Example

```blocks
let hue = 0
basic.forever(function () {
    groveLcd.setHue(hue)
    hue = (hue + 30) % 360
    basic.pause(500)
})
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
