# LCD stop rainbow

Stop the rainbow. The backlight keeps the color it had when stopped.

```sig
groveLcd.stopRainbow()
```

## Example

```blocks
groveLcd.rainbow(10)
input.onButtonPressed(Button.A, function () {
    groveLcd.stopRainbow()
})
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
