
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';

import FilterSwitch from './FilterSwitch';
import Navbar from './Navbar';
import Header from './Header';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Accordion = ({ route, navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

   
    const myIndex = route.params.key;
    const [datamodule, setdatamodule] = useState({})
    console.log(myIndex)
    const [cdata, setCdata] = useState([])
    useEffect(() => {
        getUserType()
       
    },[0])
    // useEffect(()=>{
       
    //         if(TriainingId !== null){
    //             storeData()
    //         }
       
    // })
    console.log(cdata._id)
const [TriainingId, setTriainingId] = useState(null)
    const getUserType = async () => {
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        try {
            const value = await AsyncStorage.getItem('@usertype')
            if (value === 'farmer') {
                fetch('http://170.187.249.74:8080/farmer/training/all',{
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        setCdata(json.result[myIndex])
                       setTriainingId(cdata._id)
                        console.log(value)
                    })
            }
            else if (value === 'cooperative') {
                fetch('http://170.187.249.74:8080/member/training/all',{
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        setCdata(json.result[myIndex])
                        setTriainingId(cdata._id)
                        console.log('cooprative')

                    })
            }
            else {
                console.log('first')
            }
        } catch (e) {
            console.log('eror')
        }
    }

    console.log(TriainingId)
    const storeData = async () => {
        let token = TriainingId
        let userId = TriainingId
        const UserId = userId

        const jsonValue = JSON.stringify(TriainingId)
        // setAppToken(token)
        // setId(UserId)
        const firstPair = ["@MyApp_Token", jsonValue]
        const secondPair = ["@MyApp_userId", UserId]

        try {


            await AsyncStorage.multiSet([firstPair, secondPair])
              console.log('done')
        } catch (e) {
            console.log('not stor')
        }
    }
    //    setdatamodule(cdata[myIndex])
    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View style={{ height: height - height / 15, }}>
                    <Header Heading={i18n.t('Training')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                    <FilterSwitch all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                    <View style={{ backgroundColor: '#fff8f0', width: '95%', alignSelf: 'center', borderRadius: 10 }}>
                        <View style={{ height: height / 1.7 }}>


                            <View>
                                <View key={myIndex} style={styles.AnnouncementMain}>
                                    <View style={styles.ModuleMain}>
                                        <Text style={styles.Datea}>{`Modules ${myIndex + 1}`}</Text></View>
                                    <Text style={styles.AnnouncementHeading}>{cdata.title}</Text>
                                    <ScrollView showsVerticalScrollIndicator={false}><Text style={styles.tariningDetails}>{cdata.description}</Text></ScrollView>


                                </View>
                            </View>

                        </View>


                    </View>
                </View>
            </View>
            <View style={styles.btnMain}>
                <TouchableOpacity style={styles.TestBtn} onPress={() => navigation.navigate('Quastion')}><Text style={styles.TestTxt}>{i18n.t('Take_test')}</Text></TouchableOpacity></View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />

        </View>

    )
}

export default Accordion

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    containerMain: {
        height: height - 180,
        width: '100%',
        overflow: 'hidden'
    },
    bgImg: {
        height: '100%',
        width: '100%',
    },

    AnnouncementMain: {
        width: '90%',
        // height:height/1.8,
        backgroundColor: '#fff8f0',
        alignSelf: 'center',
        marginBottom: 20,
        alignSelf: 'center'
        // margin:10,
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        fontSize: 16,
        marginBottom: 10,
        // marginHorizontal:20,
        // marginVertical:10,
        fontWeight: '600'

    },
    ModuleMain: {
        height: 21,
        width: 77,
        borderRadius: 50,
        backgroundColor: '#fff7ed',
        borderColor: '#f8e5cc',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        marginVertical: 10
    },
    Datea: {
        fontSize: 12,
        // marginHorizontal:30,
        // marginTop:10,
        color: '#d98011'
    },
    TrainigIconMain: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 20
    },
    TrainigIcon: {
        width: '100%',
        height: '100%'
    },
    tariningDetails: {
        marginHorizontal: 10,
        color: '#505050',
        fontSize: 14,
        marginBottom: 200
    },
    btnMain: {
        backgroundColor: '#fff8f0',
        width: '95%',
        height: 60,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 130, justifyContent: 'center',
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10

    },
    TestBtn: {
        height: 38,
        width: 118,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7931e',
        borderRadius: 50,
        // position:'absolute',
        // bottom:130,
        left: 20
        //    marginBottom:20,
        //     marginLeft:20,
        // padding:10
        // margin:10
    },
    TestTxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700'
    },
    hideDetailBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }

})