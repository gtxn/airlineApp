import React, { useState } from 'react'
import { Modal, Button, View, ScrollView, Text } from 'react-native'

let info = require('../ownModules/airlineInfo')

let letterArr = info.letterArr
let checkClass = info.checkClass
let seatArr = info.seatArr

let SeatList = (props) => {

    let seeSection = props.seeSection
    let sectionDisp = props.sectionDisp
    let setSeeSeatList = props.setSeeSeatList
    let setSeeSection = props.setSeeSection
    let [allMeals, setAllMeals] = useState({})

    let getMeal = () => {
        fetch(`http://glendatxn.local:3000/getMeal`)
            .then(res => {
                return res.json()
            })
            .then(json => {
                let obj = json
                setAllMeals(obj)
            })
            .catch(err => err)
    }

    getMeal()

    let renderSeat = (row, letter) => {
        let seatClass = checkClass(row)

        let seatNum = `${letter}${row}`

        let meal1, meal2

        if (allMeals[seatNum] != undefined) {
            meal1 = allMeals[seatNum]['meal1']
            meal2 = allMeals[seatNum]['meal2']
        } else {
            meal1 = 'pending'
            meal2 = 'pending'
        }

        return (
            <View key={`view${seatNum}`}>
                <Button title={`${seatNum} \n ${meal1} \n ${meal2}`} row={row} letter={letter} seatClass={seatClass} key={seatNum} />
            </View>
        )
    }

    let renderSection = (section) => {
        section = parseInt(section)

        let rowSect = []
        let sect = []

        let letArr = letterArr(section)

        for (let i = seatArr[section - 1][0] - 1; i < seatArr[section - 1][1]; i++) {
            for (let j = 0; j < letArr.length; j++) {
                if (letArr[j] != ' ') {
                    rowSect.push(renderSeat(i + 1, letArr[j]))
                } else {
                    rowSect.push(<Text key={`text${i}${j}`}>  | walkway |  </Text>)
                }
            }
            sect.push(<Text key={`text${i}`}>{'\n'}</Text>)
            sect.push(<View key={`view${i}`} style={{ flexDirection: 'row' }}>{rowSect}</View>)

            rowSect = []
        }

        return (
            <View key='view'>
                {sect}
            </View>
        )
    }

    return (
        <Modal visible={seeSection}>
            <ScrollView style={{ marginTop: 100, }} horizontal>
                <ScrollView>
                    {renderSection(sectionDisp)}
                    <Button
                        onPress={() => {
                            setSeeSeatList(true)
                            setSeeSection(false)
                        }}
                        title='cancel'
                        color='grey'
                    />
                </ScrollView>
            </ScrollView>
        </Modal>
    )

}

export default SeatList