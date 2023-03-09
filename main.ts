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
input.onButtonPressed(Button.A, function () {
    moveForward()
})
function stopMoving () {
    wuKong.stopAllMotor()
    _inMotion = 0
}
function reverseLeft () {
	
}
input.onButtonPressed(Button.AB, function () {
    stopMoving()
})
input.onButtonPressed(Button.B, function () {
    if (_temp == 0) {
        stopMoving()
        basic.pause(5000)
    } else if (_temp == 1) {
    	
    } else if (_temp == 2) {
        basic.pause(2000)
    } else if (_temp == 3) {
        basic.pause(2000)
    } else if (_temp == 4) {
        basic.pause(2000)
    } else if (_temp == 5) {
        basic.pause(2000)
    }
    _temp += 1
    if (_temp > 6) {
        _temp = 0
    }
})
function reverseRight () {
	
}
function moveLeft () {
	
}
let _temp = 0
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
let _obsDistance = 40
let _fallDistance = 3
let _collide = 0
let _fall = 0
_temp = 0
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {
	
})
