//% color="#FFBB00" weight=100 icon=""
namespace spriteMaker {
    let screen2: miniMenu.MenuItem[] = []
    let pixels: Image[] = []
    let finished_image: Image = null
    let image2: Image = null
    let color_image: Image = null
    let myMenu: miniMenu.MenuSprite = null
    let color = 0
    let transparent = 0
    let being_used = false
    let animation2 = 0
    //% block
    //% myImage.shadow=screen_image_picker
    export function drawImage(myImage: Image) {
        screen2 = []
        pixels = []
        finished_image = img`
            f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            f f 1 f f 1 f f 1 f f 1 f f 1 1 
            f 1 1 f 1 1 f 1 1 f f 1 f 1 1 1 
            f f 1 f 1 1 f 1 1 f f 1 f 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 f 1 1 1 1 f 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 f f f f 1 1 1 1 1 
            1 1 1 1 1 1 f 1 1 1 1 f 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            `
        image2 = myImage
        for (let index = 0; index <= image2.height - 1; index++) {
            for (let index2 = 0; index2 <= image2.width - 1; index2++) {
                color_image = img`
                    . . 
                    . . 
                    `
                if (image2.getPixel(index2, index) == 0) {
                    color_image = img`
                        b d 
                        d b 
                        `
                } else {
                    color_image.fill(image2.getPixel(index2, index))
                }
                pixels.push(color_image.clone())
            }
        }
        for (let value of pixels) {
            screen2.push(miniMenu.createMenuItem("", value))
        }
        myMenu = miniMenu.createMenuFromArray(screen2)
        myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, image2.width)
        myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, image2.height)
        myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, image2.width * 3)
        myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, image2.height * 3)
        myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Padding, 1)
        color = 2
        myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, color)
        myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 15)
        myMenu.bottom = scene.cameraProperty(CameraProperty.Bottom)
        myMenu.left = scene.cameraProperty(CameraProperty.Left)
        transparent = 0
        being_used = true
        while (being_used) {
            pause(1)
            if (transparent == 1) {
                if (animation2 > 3) {
                    animation2 = 0
                } else {
                    animation2 += 1
                }
                if (animation2 < 3) {
                    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 13)
                } else {
                    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
                }
            }
            myMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
                color = (color + 1) % 16
                myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, color)
                if (color == 15) {
                    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 1)
                } else {
                    if (color == 0) {
                        transparent = 1
                        myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 15)
                    } else {
                        transparent = 0
                        myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 15)
                    }
                }
                pauseUntil(() => !(controller.B.isPressed()))
            })
            myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                if (color == 0) {
                    pixels[selectedIndex].setPixel(0, 0, 11)
                    pixels[selectedIndex].setPixel(1, 0, 13)
                    pixels[selectedIndex].setPixel(1, 1, 11)
                    pixels[selectedIndex].setPixel(0, 1, 13)
                } else {
                    pixels[selectedIndex].fill(color)
                }
                for (let value of pixels) {
                    screen2.push(miniMenu.createMenuItem("", value))
                }
            })
            myMenu.onButtonPressed(controller.menu, function (selection, selectedIndex) {
                finished_image = image.create(image2.width, image2.height)
                for (let index2 = 0; index2 <= image2.width * image2.height - 1; index2++) {
                    if (pixels[index2].equals(img`
                        b d 
                        d b 
                        `)) {
                        finished_image.setPixel(index2 % image2.width, Math.floor(index2 / image2.height), 0)
                    } else {
                        finished_image.setPixel(index2 % image2.width, Math.floor(index2 / image2.height), pixels[index2].getPixel(0, 0))
                    }
                }
                being_used = false
            })
        }
        return finished_image
    }
    controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {

    })
}