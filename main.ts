function moveReverse () {
	
}
function moveRight () {
	
}
function moveForward () {
	
}
input.onButtonPressed(Button.A, function () {
    moveForward()
})
function stopMoving () {
	
}
function reverseLeft () {
	
}
input.onButtonPressed(Button.AB, function () {
    stopMoving()
})
input.onButtonPressed(Button.B, function () {
    moveReverse()
    basic.pause(5000)
    stopMoving()
})
function reverseRight () {
	
}
function moveLeft () {
	
}
radio.setGroup(8)
wuKong.setAllMotor(0, 0)
let _inMotion = 0
let _maxSpeed = 100
let _speedThreshold = 35
let _obsDistance = 40
let _fallDistance = 3
let _collide = 0
let _fall = 0
basic.forever(function () {
	
})
