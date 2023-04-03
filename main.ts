function moveReverse () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0 - _speed, _speed)
    basic.showArrow(ArrowNames.South)
    basic.pause(1000)
}
function moveRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(_speed, 0)
    basic.showArrow(ArrowNames.East)
    basic.pause(1000)
}
function moveForward () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(_speed, 0 - _speed)
    basic.showArrow(ArrowNames.North)
    basic.pause(1000)
}
function avoid_collision () {
    moveReverse()
    basic.pause(randint(200, 500))
    if (Math.randomBoolean()) {
        reverseLeft()
    } else {
        reverseRight()
    }
    basic.pause(randint(300, 900))
    _collide = 0
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    moveForward()
})
function stopMoving () {
    wuKong.stopAllMotor()
    _inMotion = 0
    basic.showIcon(IconNames.No)
}
function reverseLeft () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0 - _speed, 0)
    basic.showArrow(ArrowNames.SouthEast)
    basic.pause(1000)
}
function avoidRC () {
    wuKong.stopAllMotor()
    _reverseCollide = 0
    _inMotion = 0
}
input.onButtonPressed(Button.AB, function () {
    wuKong.stopAllMotor()
    _pin12_high = 10
    serial.redirectToUSB()
    serial.writeValue("_pin12", _pin12)
    _inMotion = 0
    serial.redirect(
    SerialPin.P2,
    SerialPin.P1,
    BaudRate.BaudRate115200
    )
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
    stopMoving()
    serial.writeString("Hello")
    basic.pause(2000)
    serial.writeString("World")
})
function reverseRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0, _speed)
    basic.showArrow(ArrowNames.SouthWest)
    basic.pause(1000)
}
function moveLeft () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0, 0 - _speed)
    basic.showArrow(ArrowNames.South)
    basic.pause(1000)
}
function avoid_fall () {
    avoid_collision()
    _fall = 0
}
let uart_rx = ""
let _pin8 = 0
let _pin13 = 0
let _dist1 = 0
let _pin12 = 0
let _pin12_high = 0
let _reverseCollide = 0
let _fall = 0
let _collide = 0
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
let _obsDistance = 12
_collide = 0
_fall = 0
let _temp = 0
_reverseCollide = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullDown)
pins.setPull(DigitalPin.P12, PinPullMode.PullDown)
_pin12_high = 1
pins.setPull(DigitalPin.P8, PinPullMode.PullDown)
serial.redirect(
SerialPin.P2,
SerialPin.P1,
BaudRate.BaudRate115200
)
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
    _pin8 = pins.digitalReadPin(DigitalPin.P8)
    if (_pin8 == 1) {
        _reverseCollide = 1
    }
    if (_reverseCollide == 1) {
        avoidRC()
    }
    if (_inMotion && _pin12 == _pin12_high) {
        wuKong.stopAllMotor()
        basic.showIcon(IconNames.LeftTriangle)
        avoid_fall()
    }
    if (_inMotion && _collide) {
        wuKong.stopAllMotor()
        basic.showIcon(IconNames.No)
        avoid_collision()
    }
    uart_rx = serial.readString()
    basic.showString(uart_rx)
    if (uart_rx == "forward") {
        basic.showArrow(ArrowNames.North)
    } else if (uart_rx == "reverse") {
        basic.showArrow(ArrowNames.South)
    } else if (uart_rx == "left") {
        basic.showArrow(ArrowNames.West)
    } else if (uart_rx == "right") {
        basic.showArrow(ArrowNames.East)
    } else if (uart_rx == "reverseLeft") {
        basic.showArrow(ArrowNames.SouthWest)
    } else if (uart_rx == "reverseRight") {
        basic.showArrow(ArrowNames.SouthEast)
    } else if (uart_rx == "stop") {
        basic.showIcon(IconNames.No)
    } else if (uart_rx == "moveForward") {
        moveForward()
        basic.showIcon(IconNames.EigthNote)
    }
    if (_inMotion) {
        moveForward()
    } else {
        stopMoving()
    }
})
