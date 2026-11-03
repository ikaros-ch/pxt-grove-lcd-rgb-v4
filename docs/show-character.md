# LCD show character

Show a custom character made with **make character**.

```sig
groveLcd.showCharacter(groveLcd.CustomCharacter.C1, 0, 0)
```

## Parameters

* **character**: custom character slot 1-8.
* **col**: column 0-15.
* **row**: 0 (top) or 1 (bottom).

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
for (let i = 0; i <= 15; i++) {
    groveLcd.showCharacter(groveLcd.CustomCharacter.C1, i, 1)
}
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
