# LCD make character

Draw your own 5x8 character and store it in one of 8 slots. Then show it with **show character**. Changing a slot also changes it everywhere it is already on the screen.

```sig
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
```

## Parameters

* **character**: custom character slot 1-8.
* **im**: the drawing. Click the pixels to turn them on.

## Example

```blocks
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
groveLcd.showString("I", 0, 0)
groveLcd.showCharacter(groveLcd.CustomCharacter.C1, 2, 0)
groveLcd.showString("micro:bit", 4, 0)
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
