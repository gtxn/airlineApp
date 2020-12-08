let isLetter = (char) => {
    return (char.toUpperCase() != char.toLowerCase())
}

//work in progress
let checkNRIC = (nric) => {
    let sum = 0
    let weight = [2, 7, 6, 5, 4, 3, 2]
    let alphaArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'z', 'j']

    for (let i = 1; i < 8; i++) {
        sum += nric[i] * weight[i - 1]
    }

    let rem = sum % 11
    let dig = 11 - rem

    let alpha = alphaArr[dig - 1]

    if (nric[8].toLowerCase() == alpha) {
        return true
    }
    return false
}

console.log(checkNRIC('s1234567d'))

let validateForm = (name, ic, seat) => {

    if (ic.length != 9 || seat.length < 2 || seat.length > 3) {
        return false
    }

    if (isLetter(ic[0]) && isLetter(ic[8])) {
        for (let i = 1; i < 8; i++) {
            if (Number.isNaN(parseInt(ic[i]))) {
                return false
            }
        }
    } else {
        return false
    }

    if (!isLetter(seat[0])) {
        return false
    } else {
        if (isLetter(seat[1]) || isLetter(seat[seat.length - 1])) {
            return false
        }
    }

    // if (!checkNRIC(ic)) {
    //     return false
    // }

    return true

}

let checkClass = (row) => {
    if (row == 1) {
        return 'first'
    }
    else if (row >= 11 && row <= 23) {
        return 'business'
    }
    else if (row >= 24 && row <= 34) {
        return 'premium'
    }
    else if (row >= 41 && row <= 62) {
        return 'economy'
    }
    else {
        return undefined
    }

}

console.log(validateForm('mee', 't0390094g', 'f6'))

module.exports = {
    validateForm: validateForm,
    checkClass: checkClass,
}