import { StyleSheet, Text, View,Image,ImageBackground,TouchableOpacity,TextInput,Alert } from 'react-native'
import React,{useState} from 'react'
import {en,sw} from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English,Swahili } from './Action/Action'

const ForgotPassword = ({navigation}) => {
    const [sendOtpEmail, setsendOtpEmail] = useState()
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks=true;
    i18n.translations={en,sw};
    i18n.locale=mynum


    const sendOtpEmailChange=(value)=>{
        setsendOtpEmail(value)
    }
  return (
    <View style={styles.container}>
    <ImageBackground style={styles.bgImg} source={require('../assets/login_background.png')}>
<View style={styles.headerMain}>
   <View style={styles.headerHeadingMain}>
      
       <Text style={styles.headerHeading}>{i18n.t('Login')}</Text>
   </View>
   
</View>
<View style={styles.fomrMain}>
<View style={styles.textMain}>
            <Text style={styles.textHeading}>Welcome Back</Text>
          <Text style={styles.textTxt}>Please Enter Mobile Number</Text>
         
         
        </View>
<View style={styles.inputMain}>
            <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobile_logo.png')}/></View>
            <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t('Mobile')}</Text>
                <TextInput style={styles.input}  numeric keyboardType={'numeric'} value={sendOtpEmail} onChangeText={sendOtpEmailChange} placeholder='Enter contact details'/>
            </View>
        </View>
        
        <TouchableOpacity style={styles.submitBtn} onPress={()=>navigation.navigate('RecoverPassword')}>
            <Text style={styles.submitTxt} >SEND OTP</Text>
        </TouchableOpacity>
    </View>
    </ImageBackground>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',

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
    fomrMain:{
        width:'100%',
        height:'80%',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'aqua'
    },
    textMain:{
        // height:100,
        width:'100%',
        justifyContent:'center',
        position:'absolute',
        top:15,
        // left:15
    },
    textHeading:{
        fontSize:20,
        color:'#fff',
        marginHorizontal:15,

    },
    textTxt:{
        fontSize:14,
        color:'#fff',
        marginHorizontal:15
    },
    inputMain:{
        width:'90%',
        height:70,
        backgroundColor:'#fffcf8',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'space-between',
        borderRadius:10,
        marginVertical:10

    },
    inputTxtMain:{
        width:'80%',
        height:'100%',
        // justifyContent:'center',
        // backgroundColor:'aqua',
        // alignItems:'center'
    },
    inputHeading:{
        fontSize:14,
        fontWeight:'bold',
        height:'40%',
        marginTop:10
    },
    input:{
        width:'80%',
        height:'50%',
        justifyContent:'flex-end',
        alignContent:'flex-end',
       
    },
    formImg:{
        height:60,
        width:60,
       
        alignItems:'center'
    },
    formImgMain:{
        width:60,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    submitBtn:{
        width:'90%',
        justifyContent:'center',
        height:48,
        alignItems:'center',
        borderRadius:50,
        backgroundColor:'#fca237',
        alignSelf:'center',
        marginVertical:10
    
    },
    submitTxt:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    },
    signintxtMain:{

        flexDirection:'row',
        height:40,
        width:'100%',
        alignItems:'center',
        // position:'absolute',
        // bottom:0,
        alignItems:'flex-end',
        justifyContent:'center'
  
     },
     alreadyTxt:{

    //    fontWeight:'500',
       textAlign:'center',
       color:'#fff'
     },
     signinTxt:{

        color:'#fff',
        fontWeight:'bold',
        fontSize:15,
     },
     forgotbtn:{
        width:'85%',
        justifyContent:'flex-end',
        alignItems:'flex-end'
     },
     forgottxt:{
        color:'#fff',
        fontSize:14,
        fontWeight:'500'
     }
})