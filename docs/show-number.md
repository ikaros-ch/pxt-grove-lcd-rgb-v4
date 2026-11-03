# LCD show number

Show a number on the LCD starting at a column and row.

```sig
groveLcd.showNumber(42, 0, 0)
```

## Parameters

* **n**: the [number](/types/number) to show.
* **col**: column 0-15.
* **row**: 0 (top) or 1 (bottom).

## Example

```blocks
basic.forever(function () {
    groveLcd.showString("Temp:", 0, 0)
    groveLcd.showNumber(input.temperature(), 6, 0)
    basic.pause(1000)
})
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
