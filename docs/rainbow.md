# LCD rainbow backlight

Fade the backlight through all the colors of the rainbow. It runs in the background so your program keeps going. Any other backlight block stops it. Running it again only changes the speed.

```sig
groveLcd.rainbow(20)
```

## Parameters

* **ms**: pause between color steps in milliseconds, 5-500. Smaller is faster; 20 takes about 3.6 seconds for a full cycle.

## Example

```blocks
groveLcd.showString("Party mode", 0, 0)
groveLcd.rainbow(20)
```

```package
grove-lcd-rgb-v4=github:ikaros-ch/pxt-grove-lcd-rgb-v4
```
