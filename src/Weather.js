import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView,TextInput,Dimensions } from 'react-native'
import React,{useState} from 'react'
import Navbar from './Navbar'
import { AntDesign } from '@expo/vector-icons';
import Header from './Header';
import SearchBar from './SearchBar';
import {en,sw} from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English,Swahili } from './Action/Action'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Weather = ({ navigation}) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks=true;
    i18n.translations={en,sw};
    i18n.locale=mynum
    const [Searchbar, setSearchbar] = useState(false)
    const weatherdata = [
        {
            time:"Now",
            tamp:'40°'
        },
        {
            time:"Now",
            tamp:'40°'
        },
        {
            time:"Now",
            tamp:'40°'
        },
        {
            time:"Now",
            tamp:'40°'
        },
        {
            time:"Now",
            tamp:'40°'
        },
        {
            time:"Now",
            tamp:'40°'
        },
    ]
  return (
    <View style={styles.container}>
       <View style={styles.containerMain}>
       <Header Heading={i18n.t('Weather')} goBackBtn={()=>navigation.goBack()} Notification={()=>navigation.navigate('Notification')}/>
       <ScrollView style={{top:5}} showsVerticalScrollIndicator={false}>
  <TouchableOpacity style={styles.searchLocationMain} onPress={()=>setSearchbar(!Searchbar)}>
    <View style={styles.searchLocationInner}>
        <Image style={styles.searchLocationLogo} source={require('../assets/location_logo.png')}/>
        <View style={styles.searchMian}>
            {!Searchbar && <View><Text style={styles.searchLocationTxt}>{i18n.t('Location')}</Text>
            <Text style={styles.getLocationTxt}>Chandigarh</Text></View>}
            {Searchbar &&  <SearchBar/>}
        </View>
    </View>
  
  </TouchableOpacity>
  
  <View style={styles.weathermain}>
    <View style={styles.todayMain}>
        <Text style={styles.todayTxt}>{i18n.t('Today')}</Text>
        <Text style={styles.dateTxt}>Sun, 3 July</Text>
    </View>
    <View style={styles.tampMain}>
        <Image style={styles.sunLogo} source={require('../assets/Sunlogo.png')}/>
        <View style={styles.tampratureMain}>
        <Text style={styles.tampTxt}>40°</Text>
        <Text style={styles.celTxt}>C</Text>
        <Text style={styles.sunny}>Sunny</Text>
        </View>
    </View>
    <View style={styles.rainMain}>
        <View style={styles.rain}>
            <Image style={styles.rainlogo} source={require('../assets/windlogo.png')}/>
            <Text style={styles.rainTxt}>16Km/h</Text>
        </View>
        <View style={styles.rain}>
            <Image style={styles.rainlogo} source={require('../assets/rainlogo.png')}/>
            <Text style={styles.rainTxt}>40%</Text>
        </View>
        <View style={styles.rain}>
            <Image style={styles.rainlogo} source={require('../assets/ranelogo2.png')}/>
            <Text style={styles.rainTxt}>10%</Text>
        </View>
    </View>
  </View>
  <View style={styles.rightScroll}>
    <Text style={styles.TodayHeading}>{i18n.t('Today')}</Text>
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    {
        weatherdata.map((item,ind)=>{
            return(
                <View key={ind} style={styles.TodayWeather}>
                    <Text style={styles.timeTxt}>{item.time}</Text>
                    <Image style={styles.TodayWeatherImg} source={require('../assets/weathersunpng.png')}/>
                    <Text style={styles.tampdata}>{item.tamp}</Text>
                </View>
            )
        })
    }
  </ScrollView>
  </View>
  </ScrollView>
  </View>
  <Navbar Profile={()=>navigation.navigate('MyProfile')} Quastion={()=>navigation.navigate('Agronomist')} Home={()=>navigation.navigate('Dashboard')} Weather={()=>navigation.navigate('Weather')} Menu={()=>navigation.navigate('Settings')} />
  </View>
  )
}

export default Weather

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'

    },
    containerMain:{
        height:height-150,
        width:'100%',
        overflow:'hidden'
    },
    bgImg:{
        height:'100%',
        width:'100%',
    },
    headerMain:{
        width:'100%',
        height:100,
        borderBottomEndRadius:20,
        borderBottomStartRadius:20,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#fca237'

    },
    headerHeadingMain:{
        width:'95%',
        height:60,
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginTop:10,
        alignSelf:'flex-end'

    },
    headerHeading:{
        fontSize:24,
        color:'#fff',marginHorizontal:2

    },
    searchLocationMain:{
        width:'90%',
        height:70,
        borderRadius:15,
        backgroundColor:'#fff8f0',
        borderBottomColor:'rgba(0,0,0,0.056)',
        borderBottomWidth:1,
        borderRightColor:'rgba(0,0,0,0.046)',
        borderRightWidth:0.8,
        borderLeftColor:'rgba(0,0,0,0.046)',
        borderLeftWidth:0.8,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginVertical:20
    },
    searchLocationInner:{
        height:'100%',
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'

    },
    searchMian:{
        height:'100%',
        width:'60%',
        justifyContent:'center',
        marginHorizontal:20
    },
    searchLocationTxt:{
        fontSize:14,
        color:'#414141',
        fontWeight:'bold',
        marginVertical:10
    },
    getLocationTxt:{
        fontSize:14,
        color:'#848484'
    },
    weathermain:{
        width:'100%',
        height:321,
        backgroundColor:'#73a2fa',
        alignItems:'center',
        justifyContent:'space-around'
    },
    todayMain:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    todayTxt:{
        fontSize:27,
        color:'#fff',
        fontWeight:'900'
    },
    dateTxt:{
        fontSize:12,
        fontWeight:'500',
        color:'#fff'
    },
    tampMain:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    tampratureMain:{
        width:100,
        flexDirection:'row',
        flexWrap:'wrap',
        marginHorizontal:10,
        right:0,
      
    },
    tampTxt:{
        fontSize:43,
        color:'#fff',
        fontWeight:'900'
    },
    celTxt:{
        color:'#fff',
        fontSize:30,
        fontWeight:'500',
        marginTop:5
    },
    sunny:{
        fontSize:18,
        fontWeight:'600',
        color:'#fff'
    },
    rainMain:{
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row'
    },
    rain:{
        justifyContent:'center',
        alignItems:'center'
    },
    rightScroll:{
        height:200,
        marginBottom:0,
        justifyContent:'center',
        // alignItems:'center'
    },
    TodayWeather:{
        height:116,
        width:71,
        borderRadius:20,
        borderColor:'#cbd9fc',
        marginHorizontal:8,
        marginVertical:5,
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:1,
        backgroundColor:'#f8faff'
        // backgroundColor:'#b4c9ff'

    },
    timeTxt:{
        fontSize:16,
        fontWeight:'500',
        color:'#b4c9ff'
    },
    tampdata:{
        fontSize:24,
        fontWeight:'500',
        color:'#b4c9ff'
    },
    TodayHeading:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'left',
        margin:15
    },
    rainTxt:{
        color:'#fff',
        fontSize:16,
        fontWeight:'500'
    }


})