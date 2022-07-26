import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, ImageBackground, Dimensions,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import Navbar from './Navbar';
import FilterSwitch from './FilterSwitch';
import ImagePickerExample from './Imagepikker';
import Header from './Header';
import * as ImagePicker from 'expo-image-picker';
import { en, sw } from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English, Swahili } from './Action/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Market = ({ navigation }) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks = true;
    i18n.translations = { en, sw };
    i18n.locale = mynum




    const [photo, setphoto] = useState('test.jpg');
    const [title, setTitle] = useState()
    const [description, setDiscription] = useState()
    const [price, setPrice] = useState()
    const [FormData, setFormData] = useState([])

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
                    setFormData(json.result)
                    console.log(json)
                })
        
     
    } catch (e) {
        console.log('eror')
    }
}
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const TitleChange = (Value) => {
        setTitle(Value)
    }
    const DiscriptionChange = (Value) => {
        setDiscription(Value)
    }
    const PriceChange = (Value) => {
        setPrice(Value)
    }
    // const SubmitData = () => {
    //     setFormData((oldData) => {
    //         return ([...oldData, { submitTitle: Title, submitDiscription: Discription, submitPrice: Price, submitimage: image, }])
    //     })
    //     return (
    //         setTitle(''),
    //         setDiscription(''),
    //         setImage(null),
    //         setPrice('')
    //     )
    // }
    const SubmitData = async () => {
        const userId = await AsyncStorage.getItem("@MyApp_userId")
        let items = { compeany_id:userId, title,description,price, photo }
        const Mytoken = await AsyncStorage.getItem('@MyApp_Token')
    fetch('http://170.187.249.74:8080/farm/market/create',{
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
            if(json.status===true){
                Alert.alert(
                                "HELLO!",
                                "Commodity Market in Product Add Successfully",
                
                                [
                
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                              );
                              setTitle('')
                              setDiscription('')
                              setPrice('')
            }
        })

    }
   
    const getIndex = key => event => {
        let data = (key)

        return (
            navigation.navigate('MarketDetails', { key: `${data}`, MarketData: FormData }))
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerMain}>
                <Header Heading={i18n.t('Commodity_market')} goBackBtn={() => navigation.goBack()} Notification={() => navigation.navigate('Notification')} />
                <FilterSwitch all={i18n.t('All_items')} allu={i18n.t('Recent')} allm={i18n.t('Old')} />
                <ScrollView>
                    <View style={styles.inputMain}>
                        <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/textlogo.png')} /></View>
                        <View style={styles.inputTxtMain}>
                            <Text style={styles.inputHeading}>Title</Text>
                            <TextInput style={styles.input} value={title} onChangeText={TitleChange} placeholder='Title here' />
                        </View>
                    </View>
                    <View style={styles.inputMainTextarea}>
                        <View style={styles.formImgMainTxtArea}><Image style={styles.formImg} source={require('../assets/titlelogo.png')} /></View>
                        <View style={styles.inputTxtMainTextArea}>
                            <Text style={styles.inputHeading}>{i18n.t('Description')}</Text>
                            <TextInput style={styles.input} value={description} onChangeText={DiscriptionChange} placeholder={`${i18n.t('Type_here')}....`} />
                        </View>
                    </View>
                    <View style={styles.inputMain}>
                        <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/Projectlogo.png')} /></View>
                        <View style={styles.inputTxtMain}>
                            <Text style={styles.inputHeading}>{i18n.t('Add_price')}</Text>
                            <TextInput style={styles.input} keyboardType={'numeric'} value={price} onChangeText={PriceChange} placeholder={`${i18n.t('Type_here')}....`} />
                        </View>
                    </View>

                    <View style={styles.imgPickerMain}>
                        <TouchableOpacity style={styles.pickerBtn} onPress={() => navigation.navigate('CameraStart')} >
                            <Image style={styles.pickerLogo} source={require('../assets/imagepicker.png')} />
                            <View style={styles.pickerBtnInner}>
                                <Text style={styles.pickerTxt}>{i18n.t('Upload_image')}</Text>
                                <Text style={styles.pickerTxts}>{i18n.t('Upload_image')}</Text>

                                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.submitbtn} onPress={SubmitData}><Text style={styles.btnTxt}>{i18n.t('Submit')}</Text></TouchableOpacity>
                    <View style={{ marginBottom: 20 }}>
                        {
                            FormData.map((item, ind) => {
                                return (
                                    <View key={ind} style={styles.AnnouncementMain}>
                                        {!item.submitimage && <Image style={styles.AnnouncementImg} source={require('../assets/askimage.png')} />}
                                        {item.submitimage && <Image style={styles.AnnouncementImg} source={{ uri: item.submitimage }} />}
                                        <View style={styles.DetailsTxtMain}><Text style={styles.AnnouncementHeading}>{item.title}</Text>
                                            <Text style={styles.discriptionTxt}>{item.description}</Text></View>
                                        <TouchableOpacity style={styles.TrainigIconMain} onPress={getIndex(ind)} key={ind}>
                                            <Image style={styles.TrainigIcon} source={require('../assets/training_icon.png')} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.priceBtn}>
                                            <Text style={styles.priceTxt}>{`Price $ ${item.price}`}</Text>
                                        </TouchableOpacity>

                                    </View>
                                )
                            })
                        }</View>
                </ScrollView>
            </View>
            <Navbar Profile={() => navigation.navigate('MyProfile')} Quastion={() => navigation.navigate('Agronomist')} Home={() => navigation.navigate('Dashboard')} Weather={() => navigation.navigate('Weather')} Menu={() => navigation.navigate('Settings')} />
        </View>
    )
}

export default Market

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
    inputMain: {
        width: '90%',
        height: 70,
        backgroundColor: '#fffcf8',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        borderRadius: 10,
        marginVertical: 3

    },
    inputMainTextarea: {
        width: '90%',
        height: height / 7,
        backgroundColor: '#fffcf8',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignSelf: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        borderRadius: 10,
        marginVertical: 3

    },
    inputTxtMain: {
        width: '80%',
        height: '70%',
        justifyContent: 'space-between',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputTxtMainTextArea: {
        width: '80%',
        height: '50%',
        justifyContent: 'space-between',
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
    formImgMainTxtArea: {
        width: 60,
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitbtn: {
        height: 48,
        width: '90%',
        backgroundColor: '#fca237',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center', marginBottom: 20
    },
    btnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500'
    },
    AnnouncementMain: {
        width: '90%',
        height: 110,
        backgroundColor: '#fff8f0',
        borderRadius: 10,

        marginVertical: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        overflow: 'hidden'
        // justifyContent:'center',
        // alignItems:'center'
    },
    DetailsTxtMain: {
        width: '70%',
        height: 65,
        overflow: 'hidden'
    },

    AnnouncementHeading: {
        fontSize: 14,
        margin: 5,
        color: '#505050',
        fontWeight: '600'

    },
    discriptionTxt: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#505050'
    },
    Datea: {
        fontSize: 12,
        marginHorizontal: 10,
        marginVertical: 10,
        color: '#a2a2a2'
    },
    TrainigIconMain: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        top: 40,
    },
    TrainigIcon: {
        width: '100%',
        height: '100%',
        // marginVertical:20
    },
    commentIcone: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    Announcement: {
        height: '100%',
        width: '80%',

    },
    AnnouncementImg: {
        width: 70,
        height: 70,
        margin: 5,
        borderRadius: 50
    },
    priceBtn: {
        position: 'absolute',
        bottom: 5,
        left: 80,
        height: 28,
        width: 94,
        borderRadius: 50,
        backgroundColor: '#2b478b',
        justifyContent: 'center',
        alignItems: 'center'
    },
    priceTxt: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600'
    },
    imgPickerMain: {
        height: 70,
        width: '90%',
        justifyContent: 'center',
        borderBottomColor: 'rgba(0,0,0,0.056)',
        borderBottomWidth: 1,
        borderRightColor: 'rgba(0,0,0,0.046)',
        borderRightWidth: 0.8,
        borderLeftColor: 'rgba(0,0,0,0.046)',
        borderLeftWidth: 0.8,
        alignItems: 'center',
        position: 'relative',
        marginVertical: 3,
        backgroundColor: '#fffcf8',

        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    pickerBtn: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'

    },
    pickerTxt: {
        fontSize: 14,
        color: '#414141',
        fontWeight: '900',
        margin: 10
    },
    pickerTxts: {
        fontSize: 12,
        color: '#414141',
        fontWeight: '300',
        marginHorizontal: 10
        // margin:10
    },
    pickerBtnInner: {
        height: '100%',
        width: '60%',
        right: 0,


    },
    pickerLogo: {
        marginHorizontal: 5,
        height: 50,
        width: 50
    }

})