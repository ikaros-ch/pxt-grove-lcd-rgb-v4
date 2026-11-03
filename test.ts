groveLcd.setRGB(0, 128, 255)
groveLcd.showString("Hello micro:bit", 0, 0)
groveLcd.showNumber(42, 0, 1)
groveLcd.setColor(0xff0000)
groveLcd.setHue(120)
groveLcd.rainbow(20)
groveLcd.stopRainbow()
groveLcd.makeCharacter(LcdChar.c1, groveLcd.characterPixels(`
    . . . . .
    . # . # .
    # # # # #
    # # # # #
    . # # # .
    . . # . .
    . . . . .
    . . . . .
    `))
groveLcd.showCharacter(LcdChar.c1, 15, 1)
groveLcd.clear()
