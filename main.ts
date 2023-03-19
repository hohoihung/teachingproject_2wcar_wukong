function moveReverse () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(_speed, 0 - _speed)
    _inMotion = 1
}
function moveRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(0, _speed)
    _inMotion = 1
}
function moveForward () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(0 - _speed, _speed)
    _inMotion = 1
}
function avoid_collision () {
    moveReverse()
    basic.pause(randint(1000, 2000))
    if (Math.randomBoolean()) {
        reverseLeft()
    } else {
        reverseRight()
    }
    basic.pause(randint(500, 900))
    if (!(_inMotion)) {
        stopMoving()
    } else {
        moveForward()
    }
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    serial.writeValue("Obstacle In Front", _dist1)
    serial.writeValue("collision flag", _collide)
    serial.writeValue("fall flag", _fall)
    serial.writeValue("current move speed", _speed)
    serial.writeValue("obstacle threshold distance", _obsDistance)
    serial.writeValue("fall threshold distance", 0)
    serial.writeValue("speed threshold ", _speedThreshold)
    serial.writeValue("max speed", _maxSpeed)
    serial.writeValue("in motion flag", _inMotion)
    serial.writeValue("current fall distance", 0)
    serial.writeValue("current obstacle in front", _dist1)
    serial.writeValue("Hit Line Left Edge", _lineLeftEdge)
    serial.writeValue("Hit Line Right Edge", _lineRightEdge)
    serial.writeValue("Line Tracking Mode", _lineTrackingMode)
})
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
    wuKong.setAllMotor(0, _speed)
    _inMotion = 1
}
input.onButtonPressed(Button.AB, function () {
    serial.writeValue("Obstacle In Front", _dist1)
    _lineTrackingMode = 1
})
input.onButtonPressed(Button.B, function () {
    serial.redirectToUSB()
    if (_temp == 0) {
        stopMoving()
        serial.writeString("Stop")
        basic.pause(1000)
    } else if (_temp == 1) {
        moveReverse()
        serial.writeString("move reverse")
        basic.pause(1000)
    } else if (_temp == 2) {
        reverseLeft()
        serial.writeString("reverse left")
        basic.pause(1000)
    } else if (_temp == 3) {
        reverseRight()
        serial.writeString("reverse right")
        basic.pause(1000)
    } else if (_temp == 4) {
        moveLeft()
        serial.writeString("move left")
        basic.pause(1000)
    } else if (_temp == 5) {
        moveRight()
        serial.writeString("move right")
        basic.pause(1000)
    }
    _temp += 1
    if (_temp >= 6) {
        _temp = 0
    }
    serial.writeValue("    ---->  _temp", _temp)
    serial.writeValue("Hit Line Right Edge", _lineRightEdge)
    serial.writeValue("Hit Line Left Edge", _lineLeftEdge)
    basic.pause(1000)
})
function reverseRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(0 - _speed, 0)
    _inMotion = 1
}
function moveLeft () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(_speed, 0)
    _inMotion = 1
}
function keep_inline () {
    if (_lineTrackingMode == 1) {
        if (_lineLeftEdge == 0) {
            moveRight()
        } else if (_lineRightEdge == 0) {
            moveLeft()
        }
    }
}
let _dist1 = 0
let _lineTrackingMode = 0
let _lineRightEdge = 0
let _lineLeftEdge = 0
let _temp = 0
let _fall = 0
let _collide = 0
let _obsDistance = 0
let _speedThreshold = 0
let _maxSpeed = 0
let _inMotion = 0
let _speed = 0
radio.setGroup(8)
wuKong.setAllMotor(0, 0)
_speed = 10
_inMotion = 0
_maxSpeed = 100
_speedThreshold = 30
_obsDistance = 20
_collide = 0
_fall = 0
_temp = 0
_lineLeftEdge = 1
_lineRightEdge = 1
_lineTrackingMode = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {
    _dist1 = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Centimeters
    )
    if (_inMotion && _dist1 < _obsDistance) {
        _collide = 1
    } else {
        _collide = 0
    }
    _lineLeftEdge = pins.digitalReadPin(DigitalPin.P12)
    _lineRightEdge = pins.digitalReadPin(DigitalPin.P13)
    if (_inMotion && _collide) {
        avoid_collision()
        basic.showIcon(IconNames.No)
    } else if (_inMotion && !(_lineRightEdge)) {
        keep_inline()
        basic.showArrow(ArrowNames.West)
    } else if (_inMotion && !(_lineLeftEdge)) {
        keep_inline()
        basic.showArrow(ArrowNames.East)
    } else {
        if (_inMotion) {
            moveForward()
            basic.clearScreen()
        }
    }
})
