import React, { useState } from 'react'
import { View, TouchableOpacity, Button, Modal, StyleSheet } from 'react-native';

let Menu = (props) => {
    let seatArr = props.seatArr
    let numReq = props.numReq

    let btnHandler = (section) => {
        props.setSeeSeatList(false)
        props.setSeeSection(true)
        props.setSectionDisp(section)
    }

    let renderBtn = (section) => {
        return (
            <Button title={`${seatArr[section - 1][0]} - ${seatArr[section - 1][1]}`} onPress={() => { btnHandler(section) }} key={section} />
        )
    }

    let renderSeatList = () => {
        let view = []
        for (let i = 0; i < seatArr.length; i++) {
            view.push(renderBtn(i + 1))
        }
        return (
            <View>
                <Modal visible={props.seeSeatList}>
                    <View style={styles.buttons}>
                        {view}
                        <Button title={`assistance ${numReq}`} onPress={props.assistanceBtnHandler} />
                    </View>
                </Modal>
            </View>
        )
    }

    return (
        renderSeatList()
    )
}

let styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 250,
    }
})

export default Menu
