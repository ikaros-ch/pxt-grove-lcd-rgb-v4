# LCD show text

Show text on the LCD starting at a column and row. Text that goes past column 15 is not shown.

```sig
groveLcd.showString("Hello", 0, 0)
```

## Parameters

* **text**: the [string](/types/string) to show.
* **col**: column 0 (left) to 15 (right).
* **row**: 0 for the top line, 1 for the bottom line.

## Example

```blocks
groveLcd.showString("Hello", 0, 0)
groveLcd.showString("micro:bit", 0, 1)
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
