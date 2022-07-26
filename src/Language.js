import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = ({ navigation }) => {
    // useEffect(()=>{
    //     getData()
    // })

    // const getData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('@storage_Key')
    //       if(value !== null) {
    //         navigation.navigate('Dashboard')
    //       }
    //       else{
    //         console.log('first')
    //       }
    //     } catch(e) {
    //      console.log('eror')
    //     }
    //   }
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const SwitchToEnglish = () => {
        dispatch(English())
        navigation.navigate('GetStarted')
    }
    const SwitchToSwahili = () => {
        dispatch(Swahili())
        navigation.navigate('GetStarted')

    }
    return (
        <View style={styles.container}>
            <View style={styles.logoMain}><Image style={styles.logo} source={require('../assets/logo.png')} /></View>
            <View style={styles.languageBtnMain}>
                <TouchableOpacity style={styles.languageBtn} onPress={SwitchToEnglish}><Text style={styles.languageBtnTxt}>ENGLISH</Text></TouchableOpacity>
                <TouchableOpacity style={styles.languageBtn} onPress={SwitchToSwahili}><Text style={styles.languageBtnTxt}>SWAHILI</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Language

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fca237'
    },
    logoMain: {
        height: 214,
        width: 400
    },
    logo: {
        height: '100%',
        width: '100%',

    },
    languageBtnMain: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    languageBtn: {
        width: '45%',
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#fff'
    },
    languageBtnTxt: {
        color: '#fca237',
        fontWeight: '700',
        fontSize: 15
    }

})