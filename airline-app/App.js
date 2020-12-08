import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Modal, ScrollView, Touchable } from 'react-native';

import Menu from './components/Menu'
import SeatList from './components/SeatList'
import AssistanceList from './components/AssistanceList'

let info = require('./ownModules/airlineInfo')

let seatArr = info.seatArr

export default function App() {

  let [seeSeatList, setSeeSeatList] = useState(true)
  let [seeSection, setSeeSection] = useState(false)
  let [seeAssist, setSeeAssist] = useState(false)
  let [sectionDisp, setSectionDisp] = useState(1)
  let [numReq, setNumReq] = useState(0)

  let assistanceBtnHandler = () => {
    setSeeAssist(true)
    setSeeSeatList(false)
  }

  return (
    <View style={styles.container}>

      {/* MENU OF LISTS*/}
      <Menu
        seatArr={seatArr}
        seeSeatList={seeSeatList} setSeeSeatList={(x) => { setSeeSeatList(x) }}
        setSeeSection={(x) => { setSeeSection(x) }}
        setSectionDisp={(x) => { setSectionDisp(x) }}
        assistanceBtnHandler={assistanceBtnHandler}
        numReq={numReq}
      />

      {/* SEAT LISTS FOR SECTIONS */}
      <SeatList seeSection={seeSection} sectionDisp={sectionDisp} setSeeSeatList={(x) => { setSeeSeatList(x) }} setSeeSection={(x) => { setSeeSection(x) }} />

      <AssistanceList
        seeAssist={seeAssist} setSeeAssist={(x) => { setSeeAssist(x) }}
        setSeeSeatList={(x) => { setSeeSeatList(x) }}
        numReq={numReq}
        setNumReq={(x) => { setNumReq(x) }}
        setReqNotif={(x) => { setReqNotif(x) }}
      />


    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


