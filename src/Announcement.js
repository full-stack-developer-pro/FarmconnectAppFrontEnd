import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
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
const Announcement = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const [cdata, setCdata] = useState([])
    useEffect(() => {
        getUserType()

    }, [])
    console.log(cdata)

    const getUserType = async () => {
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
        try {
            const value = await AsyncStorage.getItem('@usertype')
            if (value === 'farmer') {
                fetch('http://170.187.249.74:8080/farmer/annoucement/all',{
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        setCdata(json.result)
                        console.log(json)
                    })
            }
            else if (value === 'cooperative') {
                fetch('http://170.187.249.74:8080/member/annoucement/all',{
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": Mytoken,
                    }
                })
                    .then(res => res.json())
                    .then(json => {
                        setCdata(json.result)
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

    const AnnouncementData = [
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
        {
            heading: ' Farmer training on 14 May 2022',
            date: '29 june 2022'
        },
    ]
    const date = new Date()
    console.log(date)
    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={i18n.t('Announcement')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                <FilterSwitch all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                <ScrollView>
                    <View style={{ marginBottom: 30 }}>
                        {
                            cdata?.map((item, ind) => {
                                return (
                                    <TouchableOpacity key={ind} style={styles.AnnouncementMain}>

                                        <Text style={styles.AnnouncementHeading}>{item.title}</Text>


                                        {/* <Text style={styles.Datea}>{date - item.updatedAt}</Text> */}

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
        </View>
    )
}

export default Announcement

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
        width: '95%',
        height: 65,
        backgroundColor: '#fff8f0',
        marginVertical: 4,
        alignSelf: 'center',
        borderRadius: 10,
        // margin:5
        // justifyContent:'center',
        // alignItems:'center'
    },

    AnnouncementHeading: {
        fontSize: 16,
        margin: 10,
        fontWeight: '500',
        color: '#505050'

    },
    Datea: {
        fontSize: 12,
        marginHorizontal: 20,
        color: '#a2a2a2'
    }
})