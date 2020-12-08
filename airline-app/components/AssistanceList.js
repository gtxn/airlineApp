import React, { useState } from 'react'
import { Modal, Button, StyleSheet, View, ScrollView } from 'react-native'

let AssistanceList = (props) => {

    let [reqArr, setReqArr] = useState([])
    let seeAssist = props.seeAssist
    let setSeeAssist = props.setSeeAssist
    let setSeeSeatList = props.setSeeSeatList
    let numReq = props.numReq
    let setNumReq = props.setNumReq

    let cancelBtnHandler = () => {
        setSeeAssist(false)
        setSeeSeatList(true)
    }

    let getReqs = () => {
        fetch('http://glendatxn.local:3000/getRequests')
            .then(res => res.text())
            .then(text => {
                let arr = text.split('\n')
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == '' || arr[i] == " ") {
                        arr.splice(i, 1)
                    }
                }
                setReqArr(arr)
                setNumReq(arr.length)
            })
            .catch(err => { console.log(err) })
    }

    let delReq = (req) => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ req: req })

        }
        fetch('http://glendatxn.local:3000/delReq', options)
    }

    getReqs()

    let renderReqs = () => {
        let randArr = reqArr
        let elemArr = []
        for (let i = 0; i < reqArr.length; i++) {
            elemArr.push(<Button title={`${reqArr[i]}`} key={i} onPress={() => {
                console.log(randArr[i])
                delReq(randArr[i])
            }} />)
        }

        return (
            <View>
                {elemArr}
            </View>
        )
    }

    return (
        <View>
            <Modal visible={seeAssist}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 250, }}>
                    <ScrollView >
                        {renderReqs()}
                    </ScrollView>

                    <Button title='cancel' color='gray' onPress={cancelBtnHandler} />
                </View>
            </Modal>
        </View>
    )
}


export default AssistanceList