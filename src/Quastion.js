import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FilterSwitch from './FilterSwitch'
import Navbar from './Navbar'
import { AntDesign } from '@expo/vector-icons';
import TestQuastion from './TestQuastion';
import Header from './Header';
import RadioGroup from 'react-native-radio-buttons-group';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Quastion = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum

    const [popup, setpopup] = useState(false)
    const [num, setnum] = useState(0)
    const [Test, setTest] = useState(TestQuastion[0])
    const [page, setpage] = useState(Test.slice(num, num + 2))
    const [radioButtons, setRadioButtons] = useState()

    const submitDone = () => {
        if (num < Test.length) {
            setnum(num + 2)
        } else {
            setpopup(!popup)
        }
    }

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray.radioButtons)

    }
    const radioButtonsData = [{
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Option 1',
        value: 'option1'
    }, {
        id: '2',
        label: 'Option 2',
        value: 'option2'
    }]


    const cutPopup = () => {
        setpopup(!popup)
        navigation.navigate('Trainig')
    }
    console.log(radioButtons)
    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>

                <Header Heading={i18n.t('Training')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                <FilterSwitch all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                <ScrollView>
                    <View style={{ marginBottom: 0 }}>
                        <View style={{ backgroundColor: '#fff8f0', width: '95%', alignSelf: 'center', borderRadius: 10, marginTop: 0 }}>
                            <View style={styles.ModuleMain}>
                                <Text style={styles.Module}>Module 1</Text></View>
                            <Text style={styles.QuastionNumHeading}>{`${i18n.t('Question')} ${num + 1} ${i18n.t('to')} ${num + 2}`}</Text>
                            {
                                page.map((item, ind) => {
                                    return (
                                        <View key={ind} style={styles.QuastionSheetMain}>


                                            <Text style={styles.QuastionHeading}>{`${num + 1 + ind}. ${item.quastion}`}</Text>
                                            <View style={styles.AnsMain}>
                                                <RadioGroup
                                                    radioButtons={[{
                                                        id: '1', // acts as primary key, should be unique and non-empty string
                                                        label: item.option_1,
                                                        value: item.option_1
                                                    }, {
                                                        id: '2',
                                                        label: item.option_2,
                                                        value: item.option_2
                                                    },
                                                    {
                                                        id: '3', // acts as primary key, should be unique and non-empty string
                                                        label: item.option_3,
                                                        value: item.option_3
                                                    }, {
                                                        id: '4',
                                                        label: item.option_4,
                                                        value: item.option_4
                                                    },]}

                                                    onPress={onPressRadioButton}
                                                />

                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <TouchableOpacity style={styles.submitAns} onPress={submitDone}><Text style={styles.submitTxt}>{i18n.t('Submit')}</Text></TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
            {popup && <View style={styles.popupMain}>
                <View style={styles.popupbackground}>
                    <View style={styles.popupHeader}>
                        <Text style={styles.popupHeaderTxt}>{i18n.t('Result')}</Text>
                        <TouchableOpacity style={styles.cutBtn} onPress={cutPopup}>
                            <Image style={styles.cutBtnImg} source={require('../assets/popupcutbtn.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.popup}>
                        <Text style={styles.popupheading}>{`${i18n.t('You_have_completed')} 2 ${i18n.t('out_of')} 2 ${i18n.t('QuestionD')}`}</Text>
                        <Text style={styles.scorHeadind}>{i18n.t('You_score')}</Text>
                        <View style={styles.scoreMain}>
                            <Text style={styles.score}>80%</Text>
                        </View>
                        <Text style={styles.passFail}>{i18n.t('Pass')}</Text>
                    </View>
                </View>
            </View>}
        </View>
    )
}

export default Quastion

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
    headerMain: {
        width: '100%',
        height: 100,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fca237'

    },
    headerHeadingMain: {
        width: '95%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'flex-end'

    },
    headerHeading: {
        fontSize: 24,
        color: '#fff', marginHorizontal: 2

    },
    QuastionSheetMain: {
        width: '100%',
        marginTop: 0,
        position: 'relative',
        zIndex: -1
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
        marginHorizontal: 10,
        marginVertical: 10
    },
    Module: {
        fontSize: 12,
        color: '#d98011',
        fontWeight: '400',
        // marginHorizontal:25,
        // marginTop:20
    },
    QuastionNumHeading: {
        fontSize: 18,
        color: '#2e2e2e',
        marginLeft: 25,
        marginVertical: 10
    },
    QuastionHeading: {
        fontSize: 16,
        color: '#2e2e2e',
        marginHorizontal: 25,
        marginVertical: 20,
        fontWeight: 'bold'
    },
    AnsMain: {
        width: '70%',
        marginHorizontal: 25
    },
    submitAns: {
        height: 38,
        width: 118,
        backgroundColor: '#d98011',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 50,
        margin: 25,
        marginBottom: 30
    },
    submitTxt: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        textAlign: 'center',
    },
    popupMain: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(46, 46, 46, 0.658)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'

    },
    popupbackground: {
        height: 284,
        width: 354,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        elevation: 3,
    },
    popupHeader: {
        width: '100%',
        height: 52,
        backgroundColor: '#ffefd9',
        justifyContent: 'center',
        top: 0,
        position: 'absolute',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25
    },
    popupHeaderTxt: {
        color: '#2e2e2e',
        fontSize: 24,
        left: 15,

    },
    cutBtn: {
        height: 20,
        width: 20,
        right: 20,
        position: 'absolute'
    },
    popup: {
        height: 232,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    popupheading: {
        color: '#a0a0a0',
        fontSize: 16,
        marginTop: 30
    },
    scorHeadind: {
        fontSize: 24,
        color: '#2e2e2e'
    },
    scoreMain: {
        height: 84,
        width: 84,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center', backgroundColor: '#fcb45f'
    },
    score: {
        fontSize: 32,
        color: '#2e2e2e'
    },
    passFail: {
        fontSize: 32,
        color: '#fcb45f'
    }
})