function moveReverse () {
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0 - _speedThreshold, _speedThreshold)
    basic.showArrow(ArrowNames.South)
    if (_demoMode == 1) {
    	
    } else {
        basic.pause(2000)
        wuKong.stopAllMotor()
    }
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
    if (_demoMode == 1) {
    	
    } else {
        basic.pause(2000)
        wuKong.stopAllMotor()
    }
}
function moveForward () {
    if (_speed <= _speedThreshold) {
        _speed = _speedThreshold
    } else if (_speed >= _maxSpeed) {
        _speed = _maxSpeed
    }
    wuKong.stopAllMotor()
    wuKong.setAllMotor(_speed, 0 - _speed)
    basic.showArrow(ArrowNames.North)
    if (_demoMode == 1) {
    	
    } else {
        basic.pause(2000)
        wuKong.stopAllMotor()
    }
}
function avoid_collision () {
    moveReverse()
    basic.pause(randint(60, 150))
    if (Math.randomBoolean()) {
        reverseLeft()
    } else {
        reverseRight()
    }
    basic.pause(randint(250, 400))
    basic.clearScreen()
    moveForward()
}
input.onButtonPressed(Button.A, function () {
    _demoMode = 1
    moveForward()
})
function stopMoving () {
    wuKong.stopAllMotor()
    _demoMode = 0
    basic.showIcon(IconNames.No)
}
function reverseLeft () {
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0 - _speedThreshold, 0)
    basic.showArrow(ArrowNames.SouthEast)
    if (_demoMode == 1) {
    	
    } else {
        basic.pause(2000)
        wuKong.stopAllMotor()
    }
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "forward") {
        moveForward()
    } else if (receivedString == "reverse") {
        moveReverse()
    } else if (receivedString == "left") {
        moveLeft()
    } else if (receivedString == "right") {
        moveRight()
    } else if (receivedString == "reverseRight") {
        reverseRight()
    } else if (receivedString == "reverseLeft") {
        reverseLeft()
    } else if (receivedString == "stop") {
        stopMoving()
    } else if (receivedString == "moveForward") {
        _demoMode = 1
        moveForward()
    } else {
    	
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.Hash), function () {
    uart_rx = serial.readUntil(serial.delimiters(Delimiters.Hash))
    if (uart_rx == "forward") {
        moveForward()
    } else if (uart_rx == "reverse") {
        moveReverse()
    } else if (uart_rx == "left") {
        moveLeft()
    } else if (uart_rx == "right") {
        moveRight()
    } else if (uart_rx == "reverseLeft") {
        reverseLeft()
    } else if (uart_rx == "reverseRight") {
        reverseRight()
    } else if (uart_rx == "stop") {
        stopMoving()
    } else if (uart_rx == "moveForward") {
        _demoMode = 1
        moveForward()
    }
})
pins.onPulsed(DigitalPin.P8, PulseValue.High, function () {
    wuKong.stopAllMotor()
    basic.showIcon(IconNames.StickFigure)
})
function reverseRight () {
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0, _speedThreshold)
    basic.showArrow(ArrowNames.SouthWest)
    if (_demoMode == 1) {
    	
    } else {
        basic.pause(2000)
        wuKong.stopAllMotor()
    }
}
function moveLeft () {
    wuKong.stopAllMotor()
    wuKong.setAllMotor(0, 0 - _speedThreshold)
    basic.showArrow(ArrowNames.South)
    if (_demoMode == 1) {
    	
    } else {
        basic.pause(2000)
        wuKong.stopAllMotor()
    }
}
function avoid_fall () {
    avoid_collision()
}
let _dist1 = 0
let _pin8 = 0
let _pin13 = 0
let uart_rx = ""
let _speed = 0
let _speedThreshold = 0
let _maxSpeed = 0
let _demoMode = 0
radio.setGroup(8)
wuKong.stopAllMotor()
_demoMode = 0
_maxSpeed = 100
_speedThreshold = 45
let _obsDistance = 18
let _collide = 0
let _fall = 0
let _temp = 0
let _reverseCollide = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullDown)
pins.setPull(DigitalPin.P12, PinPullMode.PullDown)
pins.setPull(DigitalPin.P8, PinPullMode.PullDown)
basic.showIcon(IconNames.SmallHeart)
basic.forever(function () {
    _pin13 = pins.digitalReadPin(DigitalPin.P13)
    _pin8 = pins.digitalReadPin(DigitalPin.P8)
    if (_pin13 == 1) {
        wuKong.stopAllMotor()
        basic.showIcon(IconNames.No)
        if (_demoMode == 1) {
            avoid_collision()
        }
    }
    _dist1 = sonar.ping(
    DigitalPin.P14,
    DigitalPin.P15,
    PingUnit.Centimeters
    )
    if (_dist1 != 0 && _dist1 < _obsDistance) {
        wuKong.stopAllMotor()
        basic.showIcon(IconNames.Sad)
        if (_demoMode == 1) {
            avoid_collision()
        }
    }
})
