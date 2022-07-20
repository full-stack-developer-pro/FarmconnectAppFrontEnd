import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, TextInput, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import { PROFILE_UPDATE } from './store/actions/actionType'
import { UpdateProfile } from './store/actions/ProfileUpdate'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const EditProfile = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const test_store = useSelector((state) => state.update[PROFILE_UPDATE])
    const [user_id, setuser_id] = useState('')
    const [name, setname] = useState('')
    const [gender, setgender] = useState('')
    const [Mobile, setMobile] = useState('')
    const [mobile, setmobile] = useState('')
    const [Age, setAge] = useState('')
    const [age, setage] = useState('')
    const [email, setemail] = useState('')


    const NameChange = (Value) => {
        setname(Value)

    }
    const MobileChange = (Value) => {

        setMobile(Value)
        let num = parseInt(Mobile)
        setmobile(num)

    }
    const EmailChange = (Value) => {
        setemail(Value)

    }
    const AgeChange = (Value) => {
        setAge(Value)
        let num = parseInt(Age)
        setage(num)

    }

    const editProfile = async() => {
        let items = { user_id, name, gender, mobile, age, email }
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
    fetch('http://170.187.249.74:8080/user/profile/update',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": Mytoken,
        },
        body:JSON.stringify(items)
    })
        .then(res => res.json())
        .then(json => {
           
            console.log(json)
        })
    }
    const logResult = useCallback(() => {
        return 2 + 2;
    }, []);

    useEffect(() => {
        getUser()

    }, [logResult])


    async function getUser() {
        const userId = await AsyncStorage.getItem("@MyApp_userId")
        setuser_id(userId)

    }

    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={i18n.t('Profile')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                <ScrollView>
                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.profilePicMain}>
                            <TouchableOpacity style={styles.profilePic}>
                                <Image style={styles.profileImg} source={require('../assets/profile_picture.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/formnamelogo.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Name</Text>
                                <TextInput style={styles.input} value={name} onChangeText={NameChange} placeholder='Enter name here' />
                            </View>
                        </View>

                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/gender_logo.png')} /></View>
                            <View style={styles.inputTxtMainv}>
                                <Text style={styles.inputHeading}>Gender</Text>
                                <View style={{ top: 0, zIndex: 1, height: 40 }}>
                                    <Picker
                                        selectedValue={gender}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setgender(itemValue)
                                        }>
                                        <Picker.Item label="Male" value="male" />
                                        <Picker.Item label="Female" value="female" />
                                    </Picker>
                                </View>
                            </View>

                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobile_logo.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Mobile</Text>
                                <TextInput style={styles.input} numeric keyboardType={'numeric'} value={Mobile} onChangeText={MobileChange} placeholder='Enter contact details' />
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/age_logo.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Age(Optional)</Text>
                                <TextInput style={styles.input} numeric keyboardType={'numeric'} value={Age} onChangeText={AgeChange} placeholder='Enter age here' />
                            </View>
                        </View>
                        <View style={styles.inputMain}>
                            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/email_logo.png')} /></View>
                            <View style={styles.inputTxtMain}>
                                <Text style={styles.inputHeading}>Email</Text>
                                <TextInput style={styles.input} value={email} onChangeText={EmailChange} placeholder='Enter email here' />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={editProfile}>
                            <Text style={styles.submitTxt} >{i18n.t('Change')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.navbarPosition}>
                <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            </View>

        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    }, containerMain: {
        height: height - 150,
        width: '100%',
        overflow: 'hidden'
    },
    profilePicMain: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fffcf8',
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderRadius: 10,
        marginVertical: 3

    },
    inputTxtMainv: {
        width: '80%',
        height: '60%',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMain: {
        width: '80%',
        height: '100%',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputHeading: {
        fontSize: 14,
        fontWeight: 'bold',
        height: '40%',
        marginTop: 10
    },
    input: {
        width: '80%',
        height: '50%',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        fontSize: 14,
        fontWeight: '400',
        color: '#848484'

    },
    formImg: {
        height: 60,
        width: 60,

        alignItems: 'center'
    },
    formImgMain: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navbarPosition: {
        width: '100%',
        bottom: 0,
        position: 'absolute'
    }, submitBtn: {
        width: '90%',
        justifyContent: 'center',
        height: 48,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#fca237',
        alignSelf: 'center',
        marginVertical: 10

    },
    submitTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
})