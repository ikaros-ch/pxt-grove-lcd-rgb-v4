# character

A 5 pixel wide, 8 pixel tall drawing used by **make character**.

```sig
groveLcd.characterPixels(`
    . . . . .
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    . . . . .
    . . . . .
    `)
```

## Example

```blocks
groveLcd.makeCharacter(LcdChar.C2, groveLcd.characterPixels(`
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

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
