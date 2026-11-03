# LCD clear

Erase all text on the LCD. The backlight color is not changed.

```sig
groveLcd.clear()
```

## Example

```blocks
input.onButtonPressed(Button.A, function () {
    groveLcd.clear()
})
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
