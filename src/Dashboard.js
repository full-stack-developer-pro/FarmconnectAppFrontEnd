import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView, Dimensions, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Slider from './Slider'
import Navbar from './Navbar'
import { Ionicons } from '@expo/vector-icons';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_PROFILE_DETAILS } from './store/actions/actionType'
import { GetUserProfileDetailsById } from './store/actions/Profile'

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Dashboard = ({ navigation }) => {
  // useEffect( ()=>{
  //     getMultiple()

const Dashboard = ({ navigation }) => {

    // useEffect( ()=>{
    //     getMultiple()


    // },[])
    // const getData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('@storage_Key')
    //       if(value !== null) {
    //         console.log(value)
    //       }
    //       else{
    //         console.log('first')
    //       }
    //     } catch(e) {
    //      console.log('eror')
    //     }
    //   }


    // const getMultiple = async () => {

    //     let values
    //     try {
    //       values = await AsyncStorage.multiGet(["@name", "@email",'@gender','@mobile','@photo','@usertype'])
    //     } catch(e) {
    //       console.log('errror')
    //     }
    //     console.log(values)

    //     // example console.log output:
    //     // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
    //   }



    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum
    const data = [
        {
            Index: 1,
            functionA: 'Announcement',
            img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/ANNOUNCEME1NT.png',
            heading: i18n.t('Announcement'),
            BorderColor: '#fdedd8',
            BgColor: '#fff7ed'
        },
        {
            Index: 2,
            functionA: 'Trainig',
            img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/training.png',
            heading: i18n.t('Training'),
            BorderColor: '#ffe5e5',
            BgColor: '#ffeded'
        },
        {
            Index: 3,
            functionA: 'Agronomist',
            img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/ask_me.png',
            heading: i18n.t('Ask_and_agronomist'),
            BorderColor: '#f7fabf',
            BgColor: '#feffed'
        },
        {
            Index: 4,
            functionA: 'Weather',
            img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/weather.png',
            heading: i18n.t('Weather_update'),
            BorderColor: '#d6fdd2',
            BgColor: '#efffed'
        },
        {
            Index: 5,
            functionA: 'Market',
            img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/market.png',
            heading: i18n.t('Commodity_market'),
            BorderColor: '#e0deff',
            BgColor: '#eeedff'
        },
        {
            Index: 6,
            functionA: 'FarmRecord',
            img: 'https://test.3sixtyhealth.co.za/wp-content/uploads/2022/06/icon.png',
            heading: i18n.t('Farm_Records'),
            BorderColor: '#efd1ff',
            BgColor: '#f9edff'
        },



    ]

    return (

        <View style={styles.container}>
            <View style={styles.containerMain}>
                <View style={styles.headerMain}>
                    <View style={styles.headerHeadingMain}>
                        <TouchableOpacity style={styles.headerBackIcon} >
                            <ImageBackground style={styles.profilePicture} imageStyle={{ borderRadius: 50 }} source={{ uri: 'https://static.remove.bg/remove-bg-web/ae6b8283273faa78bde35427479e843110cb3144/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png' }}>

                            </ImageBackground>
                        </TouchableOpacity>
                        <Text style={styles.headerHeading}>{i18n.t('Welcome')}</Text>
                    </View>
                    <Text style={styles.headerTxt}>JOHN</Text>
                    <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('Notification')}>
                        <Ionicons name="notifications-outline" size={27} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Slider />
                </View>



                <ScrollView style={{ top: 20 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.contentMain}>
                        {
                            data.map((item, ind) => {
                                return (
                                    <TouchableOpacity key={ind} style={[styles.rectangle, { borderColor: item.BorderColor, backgroundColor: item.BgColor }]} onPress={() => navigation.navigate(item.functionA)}>
                                        <Image style={styles.contentImg} source={{ uri: item.img }} />
                                        <View style={styles.headingMain}><Text style={styles.Heading}>{item.heading}</Text></View>
                                    </TouchableOpacity>
                                )
                            })
                        }</View>
                    <View style={{ height: 30 }}></View>
                </ScrollView>




            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />

        </View>

    )
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        // flex:2,
        alignItems: 'center',
        backgroundColor: '#fff'

    },
    containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
    },
    headerMain: {
        width: '100%',
        height: 86,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fca237'

    },
    headerHeadingMain: {
        width: '90%',
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 20

    },
    headerHeading: {
        fontSize: 18,
        color: '#fff', marginHorizontal: 10,
        marginVertical: 5,
        fontWeight: 'bold'

    },
    Heading: {
        textAlign: 'center',
        fontSize: height / 57,
        fontWeight: '700',
    },

    profilePicture: {
        height: 50,
        width: 50,
        borderRadius: 50,
        left: 5
    },
    headerTxt: {
        fontSize: 16,
        color: '#fff',
        left: 70,
        marginTop: 10,

        position: 'absolute',
        bottom: 15
    },
    contentMain: {
        width: '100%',
        // height:'100%',
        // alignSelf:'center',
        // top:70,
        // position:'absolute',
        justifyContent: 'space-evenly',
        alignContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
        // marginBottom:50
        // backgroundColor:'aqua'
    },
    rectangle: {
        height: 140,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor:'#fca237',
        borderWidth: 1,
        borderRadius: 10,
        // marginHorizontal:10,
        marginVertical: 10,
        // marginHorizontal:10
        // marginVertical:15

    },
    contentImg: {
        height: 80,
        width: 80,
    },
    notificationIcon: {
        position: 'absolute',
        right: 30
    },


})
