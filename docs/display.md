# LCD display

Turn the text on or off. The text is kept while off and comes back when turned on. The backlight is not changed.

```sig
groveLcd.display(true)
```

## Parameters

* **on**: `true` to show the text, `false` to hide it.

## Example

```blocks
groveLcd.showString("Blink!", 0, 0)
basic.forever(function () {
    groveLcd.display(false)
    basic.pause(500)
    groveLcd.display(true)
    basic.pause(500)
})
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
