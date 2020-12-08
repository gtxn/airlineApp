let seatArr = [[1, 1], [11, 14], [15, 23], [31, 34], [41, 48], [49, 62]]

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
        return "cant tell"
    }
}

let letterArr = (section) => {
    section = parseInt(section)
    let letterArr

    if (section == 1) {
        letterArr = ['A', ' ', 'C', 'D', ' ', 'F']
    }
    else if (section >= 2 && section <= 3) {
        letterArr = ['A', ' ', 'D', 'F', ' ', 'K']
    }
    else if (section == 4) {
        letterArr = ['A', 'C', ' ', 'D', 'E', 'F', 'G', ' ', 'H', 'K']
    }
    else {
        letterArr = ['A', 'B', 'C', ' ', 'D', 'E', 'G', ' ', 'H', 'J', 'K']
    }

    return letterArr
}

module.exports = {
    checkClass: checkClass,
    letterArr: letterArr,
    seatArr: seatArr,
}