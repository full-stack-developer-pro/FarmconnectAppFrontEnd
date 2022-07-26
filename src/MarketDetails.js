
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState,useEffect } from 'react'
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
const MarketDetails = ({ route, navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    useEffect(()=>{
        AllProduct()
    },[])

const AllProduct = async()=>{
    const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
    try {
        const value = await AsyncStorage.getItem('@usertype')
        
            fetch('http://170.187.249.74:8080/farmer/market/all',{
                method:'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": Mytoken,
                }
            })
                .then(res => res.json())
                .then(json => {
                    setProduct(json.result[myIndex])
                    console.log(Product)
                })
        
     
    } catch (e) {
        console.log('eror')
    }
}
const [Product, setProduct] = useState([])

   
    const myIndex = route.params.key;
    const myData = route.params.MarketData;

    console.log(myIndex)

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={i18n.t('Commodity_market')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                <FilterSwitch all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                <ScrollView>
                    <View>
                        <View key={myIndex} style={styles.AnnouncementMain}>
                            {/* <View style={styles.ModuleMain}>
                    <Text style={styles.Datea}>{`${myData[myIndex].submitTitle}`}</Text></View> */}
                            <Text style={styles.AnnouncementHeading}>{myData[myIndex].title}</Text>
                            <Text style={styles.tariningDetails}>{myData[myIndex].description}</Text>
                            {myData[myIndex].submitimage && <Image style={styles.MarketImg} source={{ uri: myData[myIndex].submitimage }} />}
                            <View style={styles.PriceMain}>
                                <TouchableOpacity style={styles.TestBtn}><Text style={styles.TestTxt}>{`Price $${myData[myIndex].price}`}</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
        </View>

    )
}

export default MarketDetails

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
    },
    bgImg: {
        height: '100%',
        width: '100%',
    },

    AnnouncementMain: {
        width: '90%',
        // height:100,
        backgroundColor: '#fff8f0',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 80,
        alignSelf: 'center'
        // margin:10,
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        fontSize: 16,
        marginBottom: 10,
        marginHorizontal: 10,
        // marginVertical:10,
        fontWeight: '600'

    },
    ModuleMain: {
        height: 21,
        width: 77,
        borderRadius: 50,
        backgroundColor: 'rgba(217, 127, 17, 0.01)',
        borderColor: 'rgba(217, 127, 17, 0.3)',
        borderWidth: 0.2,
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
        marginBottom: 20
    },
    PriceMain: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    TestBtn: {
        height: 38,
        width: 118,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b478b',
        borderRadius: 50,
        // position:'absolute',
        // right:0,
        // bottom:0,
        // marginTop:50
        margin: 10
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
    },
    MarketImg: {
        height: 60,
        width: 60,
        borderRadius: 50
    }

})