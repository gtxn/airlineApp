
let urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get('fullName');
let seatNum = urlParams.get('seatNum')

let form = document.getElementById('chooseMeals')

form.action = `${form.action}?fullName=${name}&seatNum=${seatNum}`

function reqAssist() {
    window.location.href = `http://glendatxn.local:3000/reqAssist?fullName=${name}&seatNum=${seatNum}`
}


let h1 = document.getElementById('welcome')
h1.innerHTML = `Hello ${name}, we are pleased to have you onboard`