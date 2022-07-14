import { StyleSheet, Text, View,Image,TouchableOpacity,Dimensions } from 'react-native'
import React from 'react'
import KeyBoardListner from './KeyBoardListner'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Navbar = (props) => {
    const isKeyboardOpen = KeyBoardListner();
  return (
   !isKeyboardOpen && <View style={styles.endBarMain}><View style={styles.endBar}>
        <TouchableOpacity style={styles.quastionMain} onPress={props.Quastion}>
            <Image style={styles.quastionImg}source={require('../assets/quastion_icon.png')}/>
        </TouchableOpacity>
        <View style={styles.navbarMain}>
        <TouchableOpacity style={styles.homeMain} onPress={props.Home}>
            <Image style={styles.homeImg} source={require('../assets/home_icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeMain} onPress={props.Weather}>
            <Image style={styles.homeImg} source={require('../assets/weather_icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={{width:30}}>
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeMain} onPress={props.Menu}>
            <Image style={styles.homeImg} source={require('../assets/bar_icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeMain} onPress={props.Profile}>
            <Image style={styles.homeImg} source={require('../assets/user_icon.png')} />
        </TouchableOpacity>
        </View>
       
    </View></View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    endBarMain:{
        width:'95%',
        height:60,
        bottom:0,
        position:'absolute',
        // backgroundColor:'#fff',
        alignSelf:'center',
        borderRadius:50,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    endBar:{
        height:50,
        width:'100%',
        borderRadius:50,
        backgroundColor:'#2b478b',
        bottom:10,
        position:'relative',
        justifyContent:'space-evenly',
        alignSelf:'center'
    },
    quastionMain:{
        height:55,
        width:55,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        backgroundColor:'#f7931e',
        position:'absolute',
        top:"-50%",
        alignSelf:'center'
    },
    navbarMain:{
        height:'100%',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row'

    }
})