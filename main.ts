function moveReverse () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(0 - _speed, _speed)
    _inMotion = 1
}
function moveRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(_speed, 0)
    _inMotion = 1
}
function moveForward () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(_speed, 0 - _speed)
    _inMotion = 1
}
function avoid_collision () {
    if (Math.randomBoolean()) {
    	
    } else {
    	
    }
    basic.pause(randint(300, 700))
    if (!(_inMotion)) {
        stopMoving()
    } else {
        moveForward()
    }
}
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    let _dist2 = 0
    serial.writeValue("Obstacle In Front", _dist1)
    serial.writeValue("collision flag", _collide)
    serial.writeValue("fall flag", _fall)
    serial.writeValue("current move speed", _speed)
    serial.writeValue("obstacle threshold distance", _obsDistance)
    serial.writeValue("fall threshold distance", _fallDistance)
    serial.writeValue("speed threshold ", _speedThreshold)
    serial.writeValue("max speed", _maxSpeed)
    serial.writeValue("in motion flag", _inMotion)
    serial.writeValue("current fall distance", _dist2)
    serial.writeValue("current obstacle in front", _dist1)
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
    wuKong.setAllMotor(0 - _speed, 0)
    _inMotion = 1
}
input.onButtonPressed(Button.AB, function () {
    serial.writeValue("Obstacle In Front", _dist1)
})
input.onButtonPressed(Button.B, function () {
    if (_temp == 0) {
        stopMoving()
        serial.writeString("stop moving")
    } else if (_temp == 1) {
        serial.writeString("move reverse")
        moveReverse()
        basic.pause(2000)
    } else if (_temp == 2) {
        serial.writeString("reverse left")
        reverseLeft()
        basic.pause(2000)
    } else if (_temp == 3) {
        serial.writeString("reverse right")
        reverseRight()
        basic.pause(2000)
    } else if (_temp == 4) {
        serial.writeString("move left")
        moveLeft()
        basic.pause(2000)
    } else if (_temp == 5) {
        serial.writeString("move right")
        moveRight()
        basic.pause(2000)
    }
    _temp += 1
    if (_temp > 6) {
        _temp = 0
    }
})
function reverseRight () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(0, 0 - _speed)
    _inMotion = 1
}
function moveLeft () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _speedThreshold) {
        _speed = _maxSpeed
    }
    wuKong.setAllMotor(0, _speed)
    _inMotion = 1
}
let _dist1 = 0
let _temp = 0
let _fall = 0
let _collide = 0
let _fallDistance = 0
let _obsDistance = 0
let _speedThreshold = 0
let _maxSpeed = 0
let _inMotion = 0
let _speed = 0
radio.setGroup(8)
wuKong.setAllMotor(0, 0)
_speed = 40
_inMotion = 0
_maxSpeed = 100
_speedThreshold = 35
_obsDistance = 40
_fallDistance = 3
_collide = 0
_fall = 0
_temp = 0
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {
    _dist1 = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Centimeters
    )
    if (_dist1 > 0 && _dist1 < _obsDistance) {
        _collide = 1
    } else {
        _collide = 0
    }
    if (_inMotion && _collide) {
        avoid_collision()
        basic.showIcon(IconNames.No)
    } else if (_inMotion && _fall) {
        avoid_collision()
        basic.showIcon(IconNames.Surprised)
    }
})
