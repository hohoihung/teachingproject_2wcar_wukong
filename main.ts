function moveReverse () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0 - _speed, _speed)
}
function moveRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(_speed, 0)
}
function moveForward () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(_speed, 0 - _speed)
    _inMotion = 1
}
function avoid_collision () {
    moveReverse()
    basic.pause(randint(400, 800))
    if (Math.randomBoolean()) {
        reverseLeft()
    } else {
        reverseRight()
    }
    basic.pause(randint(300, 1000))
    _collide = 0
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    moveForward()
})
function stopMoving () {
    wuKong.stopAllMotor()
    _inMotion = 0
}
function reverseLeft () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0 - _speed, 0)
}
input.onButtonPressed(Button.AB, function () {
    stopMoving()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "forward") {
        moveForward()
        basic.pause(1000)
    } else if (receivedString == "reverse") {
        moveReverse()
        basic.pause(1000)
    } else if (receivedString == "left") {
        moveLeft()
        basic.pause(1000)
    } else if (receivedString == "right") {
        moveRight()
        basic.pause(1000)
    } else if (receivedString == "reverseRight") {
        reverseRight()
        basic.pause(1000)
    } else if (receivedString == "reverseLeft") {
        reverseLeft()
        basic.pause(1000)
    } else if (receivedString == "stop") {
        stopMoving()
    } else if (receivedString == "avoidCollision") {
        avoid_collision()
    } else {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    wuKong.stopAllMotor()
    _pin12_high = 10
    serial.writeValue("_pin12", _pin12)
    _inMotion = 0
})
function reverseRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0, _speed)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    serial.writeValue("_dist1", _dist1)
    serial.writeValue("_collide", _collide)
    serial.writeValue("_inMotion", _inMotion)
    serial.writeValue("Obstacle distance", _obsDistance)
    serial.writeValue("_speed", _speed)
})
function moveLeft () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0, 0 - _speed)
}
function avoid_fall () {
    avoid_collision()
    _fall = 0
}
let _pin13 = 0
let _dist1 = 0
let _pin12 = 0
let _pin12_high = 0
let _fall = 0
let _collide = 0
let _obsDistance = 0
let _speedThreshold = 0
let _maxSpeed = 0
let _inMotion = 0
let _speed = 0
radio.setGroup(8)
wuKong.stopAllMotor()
_speed = 45
_inMotion = 0
_maxSpeed = 100
_speedThreshold = 45
_obsDistance = 12
_collide = 0
_fall = 0
let _temp = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullDown)
pins.setPull(DigitalPin.P12, PinPullMode.PullDown)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
_pin12_high = 1
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {
    _dist1 = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Centimeters
    )
    if (_dist1 != 0 && _dist1 < _obsDistance) {
        _collide = 1
    }
    _pin13 = pins.digitalReadPin(DigitalPin.P13)
    _pin12 = pins.digitalReadPin(DigitalPin.P12)
    if (_pin12 == _pin12_high) {
        wuKong.stopAllMotor()
        basic.showIcon(IconNames.LeftTriangle)
        avoid_fall()
    }
    if (_inMotion && _collide) {
        wuKong.stopAllMotor()
        basic.showIcon(IconNames.No)
        avoid_collision()
    }
    if (_inMotion) {
        moveForward()
    }
})
