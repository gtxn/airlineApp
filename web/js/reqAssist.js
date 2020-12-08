let urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('fullName')
let seatNum = urlParams.get('seatNum')
let ic = urlParams.get('icNum')

function sendReq() {

    let req = document.getElementById('request').value

    fetch(`http://glendatxn.local:3000/sendReq?fullName=${name}&seatNum=${seatNum}&req=${req}`)
        .then(res => {
            window.location.href = `http://glendatxn.local:3000/ack?fullName=${name}&seatNum=${seatNum}&req=${req}`
        })
}

function goBack() {
    fetch(`http://glendatxn.local:3000/chooseMeals?fullName=${name}&seatNum=${seatNum}&req=${req}`)
        .then(res => {
            window.location.href = `http://glendatxn.local:3000/chooseMeals?fullName=${name}&seatNum=${seatNum}&req=${req}`
        })
}