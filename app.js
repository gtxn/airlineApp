let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let fs = require('fs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/web`))

app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/web/login.html`)
})

app.get('/chooseMeals', (req, res) => {
    let obj = req.query
    let name = obj.fullName
    let seatNum = obj.seatNum
    let data = fs.readFileSync('loginAuth.txt')
    let val = false

    data = JSON.parse(data)

    console.log(data)

    if (data[name]) {
        if (seatNum == data[name]['seat']) {
            val = true
        } else {
            val = false
        }
    } else {
        val = false
    }

    if (val) {
        res.sendFile(`${__dirname}/web/chooseMeals.html`)
    } else {
        res.sendFile(`${__dirname}/web/failedLogin.html`)
    }
})


app.post('/subMeal', (req, res) => {
    let reqObj = req.body
    let reqQuer = req.query
    let meal1 = reqObj.meal1
    let meal2 = reqObj.meal2

    let name = reqQuer.fullName
    let seatNum = reqQuer.seatNum

    seatNum = seatNum.toUpperCase()

    let choices = JSON.parse(fs.readFileSync('mealChoices.txt'))

    let finObj = {}

    finObj[seatNum] = { "meal1": meal1, "meal2": meal2, "name": name, "ic": ic }

    choices = Object.assign(choices, finObj)

    fs.writeFileSync('mealChoices.txt', JSON.stringify(choices), 'utf8')

    console.log(JSON.parse(fs.readFileSync('mealChoices.txt', 'utf8')))

    res.sendFile(`${__dirname}/web/ack.html`)
})

app.get('/reqAssist', (req, res) => {
    res.sendFile(`${__dirname}/web/reqAssist.html`)
})

app.get('/sendReq', (req, res) => {
    let reqQuer = req.query
    let name = reqQuer.fullName
    let seatNum = reqQuer.seatNum
    let userReq = reqQuer.req

    seatNum = seatNum.toUpperCase()

    fs.appendFileSync('reqAssist.txt', `${seatNum} ${name} : ${userReq} \n`, 'utf8')

    res.send(`${__dirname}/web/ack.html`)

})

app.get('/ack', (req, res) => {
    res.sendFile(`${__dirname}/web/ack.html`)
})

app.get('/getMeal', (req, res) => {
    let obj = fs.readFileSync('mealChoices.txt')
    obj = JSON.parse(obj)
    res.json(obj)
})

app.get('/getRequests', (req, res) => {
    let reqs = fs.readFileSync('reqAssist.txt', 'utf8')
    res.send(reqs)
})

app.post('/delReq', (req, res) => {
    let reqToDel = req.body.req
    let reqs = fs.readFileSync('reqAssist.txt', 'utf8').split('\n')
    let ind = reqs.findIndex((x) => x == reqToDel)
    let text = ''

    console.log(reqToDel, ind)
    reqs.splice(ind, 1)
    console.log(reqs)

    for (let i = 0; i < reqs.length - 1; i++) {
        if (text[i] != '' && text[i] != ' ' && text[i] != '\n') {
            text += reqs[i] + '\n'
        }
    }

    fs.writeFileSync('reqAssist.txt', text, 'utf8')

    res.send('ok')
})

app.post('/newUser', (req, res) => {
    let name = req.body.name
    let seatNum = req.body.seat

    let logins = fs.readFileSync('loginAuth.txt', 'utf8')
    logins = JSON.parse(logins)

    let obj = {}

    if (name && seatNum) {
        obj[name] = { 'seat': seatNum }

        logins = Object.assign(logins, obj)

        fs.writeFileSync('loginAuth.txt', JSON.stringify(logins), 'utf8')
    }

    res.send(logins)
})


app.use((req, res) => {
    res.send("umm... bad request sorry")
})

app.listen(3000)