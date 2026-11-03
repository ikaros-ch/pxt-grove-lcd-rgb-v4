// Test suite for grove-lcd-rgb-v4.
// How to test: plug a Grove LCD RGB Backlight v4.0 into the I2C port (5V power),
// flash this program, and check each step against the EXPECT line.
// PASS = every EXPECT matches. In the simulator there is no LCD: PASS = it runs with no errors.

// Text
groveLcd.showString("0123456789ABCDEF", 0, 0)
groveLcd.showNumber(-42, 0, 1)
groveLcd.showString("num", 13, 1)
// EXPECT: white backlight, top line "0123456789ABCDEF" (all 16), bottom "-42" at left and "num" at right
basic.pause(2000)

// Display on/off keeps text
groveLcd.display(false)
// EXPECT: text hidden, backlight still on
basic.pause(1000)
groveLcd.display(true)
// EXPECT: same text back
basic.pause(1000)

// Backlight colors
groveLcd.setRGB(255, 0, 0)
// EXPECT: red
basic.pause(1000)
groveLcd.setColor(0x00ff00)
// EXPECT: green
basic.pause(1000)
groveLcd.setHue(240)
// EXPECT: blue
basic.pause(1000)

// Rainbow runs in background, any color block stops it
groveLcd.rainbow(5)
groveLcd.rainbow(10) // second call only changes speed, must not start a second loop
// EXPECT: backlight fades through all colors for 4 s
basic.pause(4000)
groveLcd.stopRainbow()
// EXPECT: fading stops, color stays
basic.pause(1000)
groveLcd.rainbow(10)
basic.pause(1000)
groveLcd.setColor(0xffffff)
// EXPECT: rainbow stops, backlight white
basic.pause(1000)

// Backlight off/on keeps text and color
groveLcd.setRGB(255, 0, 255)
groveLcd.backlight(false)
// EXPECT: backlight dark (text may be hard to see)
basic.pause(1500)
groveLcd.backlight(true)
// EXPECT: backlight magenta again
basic.pause(1000)
groveLcd.rainbow(10)
groveLcd.backlight(false)
// EXPECT: dark, rainbow stopped (stays dark)
basic.pause(1500)
groveLcd.setColor(0x00ffff)
// EXPECT: color block turns it back on: cyan
basic.pause(1000)
groveLcd.setColor(0xffffff)

// Custom characters
groveLcd.clear()
// EXPECT: screen empty
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
groveLcd.makeCharacter(groveLcd.CustomCharacter.C8, groveLcd.characterPixels(`
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # . . . #
    # . . . #
    # . . . #
    # # # # #
    `))
groveLcd.showCharacter(groveLcd.CustomCharacter.C1, 0, 0)
groveLcd.showCharacter(groveLcd.CustomCharacter.C8, 15, 1)
groveLcd.showString("custom", 2, 0)
// EXPECT: heart top-left, "custom" after it, box in bottom-right corner
