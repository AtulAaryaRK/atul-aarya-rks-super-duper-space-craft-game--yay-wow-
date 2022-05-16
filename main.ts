namespace SpriteKind {
    export const Gas = SpriteKind.create()
    export const Stoper = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    darts = [assets.image`Dart1`, assets.image`Dart2`, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
        `]
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite, 0, -150)
    projectile.startEffect(effects.ashes)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value = 100
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Stoper, function (sprite, otherSprite) {
    info.setScore(Sss)
    game.over(false)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    info.setScore(Sss)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 100)
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 10) {
        mySprite.sayText("+1 Heart And Fuel-Up - 10 Points Bonus", 5000, false)
        info.changeLifeBy(1)
        info.changeScoreBy(-10)
        Sss += 10
        statusbar.value = 100
        enemySpeed += 8
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 200)
    scene.cameraShake(4, 500)
    if (info.life() == 0) {
        info.setScore(Sss)
    }
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let darts: Image[] = []
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let Sss = 0
Sss = 0
info.setLife(3)
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
mySprite.setPosition(70, 105)
let mySprite2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `, SpriteKind.Stoper)
mySprite2.setPosition(80, 49)
mySprite2.scale = 11
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
let enemySpeed = 50
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    myEnemy = sprites.createProjectileFromSide(assets.image`Spider`, 0, enemySpeed)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
