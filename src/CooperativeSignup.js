import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView,TextInput,ImageBackground,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import {en,sw} from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English,Swahili } from './Action/Action'
import { registration } from './store/actions/registration';
import { REGISTRATION } from './store/actions/actionType';
const CooperativeSignup = ({ navigation}) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks=true;
    i18n.translations={en,sw};
    i18n.locale=mynum


    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [name, setname] = useState('')
    const [Member_number, setMember_number] = useState('')
    const [member_number, setmember_number] = useState('')
    const [gender, setgender] = useState('')
    const [Mobile, setMobile] = useState('')
    const [mobile, setmobile] = useState('')
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [registered_cooperative, setregister_cooperative] = useState(true)
    const [Age, setAge] = useState('')
    const [age, setage] = useState('')
    const [Size_of_farm, setSize_of_farm] = useState('')
    const [size_of_farm, setsize_of_farm] = useState('')
    const [Number_of_trees, setNumber_of_trees] = useState('')
    const [number_of_trees, setnumber_of_trees] = useState('')
    const [Historical_production, setHistorical_production] = useState('')
    const [historical_production, sethistorical_production] = useState('')
    const [photo, setphoto] = useState('test1ff.jpg');
    const [usertype, setusertype] = useState('cooperative')
    const [FormData, setFormData] = useState([{}])
    const [FormValue, setFormValue] = useState({})
    const NameChange =(Value)=>{
        setname(Value)
        
    }
   
    const MemberChange =(Value)=>{
       
        setMember_number(Value)
        let num = parseInt(Member_number)
        setmember_number(num)
        
    }
    const GenderChange =(Value)=>{
        setgender(Value)
       
    }
    
    const MobileChange =(Value)=>{
        
        setMobile(Value)
        let num = parseInt(Mobile)
        setmobile(num)
        
    }
    const EmailChange =(Value)=>{
        setemail(Value)
        
    }
    const PasswordChange =(Value)=>{
        setPassword(Value)
        
    }
    const RegisteredChange =(Value)=>{
        setregister_cooperative(Value)
        
    }
    const AgeChange =(Value)=>{
        setAge(Value)
        let num = parseInt(Age)
        setage(num)
        
    }
    const FirmSizeChange =(Value)=>{
        setSize_of_farm(Value)
        let num = parseInt(Size_of_farm)
        setsize_of_farm(num)
        
    }
    const NumberOfTreeChange =(Value)=>{
        setNumber_of_trees(Value)
        let num = parseInt(Number_of_trees)
        setnumber_of_trees(num)
        
    }
    const HistoricalProductionChange =(Value)=>{
        setHistorical_production(Value)
        let num = parseInt(Historical_production)
        sethistorical_production(num)
        
    }
    const [first, setfirst] = useState([])
   


    const SubmitForm=()=>{
      let items = {name,member_number,gender,mobile,email,password,registered_cooperative,age,size_of_farm,number_of_trees,historical_production,photo,usertype}
    //     fetch('http://170.187.249.74:8080/register', {
    //         method: 'POST',
    //         header:{
    //             'Accept': 'application/json',
    //             'Content-type': 'application/json'
    //         },
    //         body:JSON.stringify(items)
    
    //     })
    //     .then((response) => response.json())
    //         .then((response) =>{
    //             console.log(response);
    //         })
    dispatch(registration(items))
     console.log(items)
     console.log(test_store)
       }
       
    //    console.log(itemorderd)
       const pickImage = async () => {
         // No permissions request is necessary for launching the image library
         let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 4],
           quality: 1,
         });
     
         console.log(result);
     
         if (!result.cancelled) {
           setphoto(result.uri);
         }
       };

       const test_store = useSelector((state) => state.auth[REGISTRATION])
       useEffect(()=>{
        if(test_store.status===true){

            navigation.navigate('Login')
        }
    
    })
    
  return (
    <View style={styles.container}>
        <ImageBackground style={styles.bgImg} source={require('../assets/cooperativesignup_background.png')}>
        <View style={styles.headerMain}>
            <View style={styles.headerHeadingMain}>
                <TouchableOpacity style={styles.headerBackIcon} onPress={() =>navigation.goBack()}>
                    <AntDesign name="left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerHeading}>{i18n.t('Sign_up')}</Text>
            </View>
            <Text style={styles.headerTxt}>{i18n.t('As_a_member_of_cooperative_Small')}</Text>
        </View>
        <ScrollView style={styles.fomrMain}>
            <View style={styles.profilePicMain}>
                <TouchableOpacity style={styles.profilePic} onPress={pickImage}>
                  {!photo && <Image style={styles.profileImg} source={require('../assets/profile_picture.png')}/>}
                    {photo && <Image source={{ uri: photo }} style={{ width: 79, height: 79 , borderRadius:50}} />}
                </TouchableOpacity>
            </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/formnamelogo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={NameChange} placeholder='Enter name here'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/number_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Member Number</Text>
                    <TextInput style={styles.input} numeric keyboardType={'numeric'} value={Member_number} onChangeText={MemberChange} placeholder='Enter Member here'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                    <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/gender_logo.png')}/></View>
                    <View style={styles.inputTxtMainv}>
                        <Text style={styles.inputHeading}>Gender</Text>
                        <View style={{top:0,zIndex:1,height:40}}>
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
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/mobile_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Mobile</Text>
                    <TextInput style={styles.input}  numeric keyboardType={'numeric'} value={Mobile} onChangeText={MobileChange} placeholder='Enter contact details'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/email_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={EmailChange} placeholder='Enter email here'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/password_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Password</Text>
                    <TextInput style={styles.input} value={password} onChangeText={PasswordChange} placeholder='Enter password here'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                    <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/gender_logo.png')}/></View>
                    <View style={styles.inputTxtMainv}>
                        <Text style={styles.inputHeading}>Registered Cooperative</Text>
                        <View style={{top:0,zIndex:1,height:40}}>
                        <Picker
  selectedValue={registered_cooperative}
  onValueChange={(itemValue, itemIndex) =>
    setregister_cooperative(itemValue)
  }>
  <Picker.Item label="Yes" value={true} />
  <Picker.Item label="No" value={false} />
</Picker>
            </View>
                    </View>
                   
                </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/age_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Age(Optional)</Text>
                    <TextInput style={styles.input} numeric keyboardType={'numeric'} value={Age} onChangeText={AgeChange} placeholder='Enter age here'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/size_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Size of Firm(Optional)</Text>
                    <TextInput style={styles.input} numeric keyboardType={'numeric'} value={Size_of_farm} onChangeText={FirmSizeChange} placeholder='123'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/tree_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Number of Trees Coffee only(optional)</Text>
                    <TextInput style={styles.input} numeric keyboardType={'numeric'} value={Number_of_trees} onChangeText={NumberOfTreeChange} placeholder='24'/>
                </View>
            </View>
            <View style={styles.inputMain}>
                <View style={styles.formImgMain}><Image style={styles.formImg} source={require('../assets/historical_logo.png')}/></View>
                <View style={styles.inputTxtMain}>
                    <Text style={styles.inputHeading}>Historical Production (Optional)</Text>
                    <TextInput style={styles.input} numeric keyboardType={'numeric'} value={Historical_production} onChangeText={HistoricalProductionChange} placeholder='24'/>
                </View>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={SubmitForm}>
                <Text style={styles.submitTxt}>{i18n.t('Sign_up')}</Text>
            </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
    </View>
  )
}

export default CooperativeSignup

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'

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
        width:'90%',
        height:60,
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginTop:20

    },
    headerHeading:{
        fontSize:24,
        color:'#fff',marginHorizontal:2

    },
    headerTxt:{
        fontSize:19,
        color:'#fff',
        left:24,
        
        position:'absolute',
        bottom:5
    },
    fomrMain:{
        width:'100%',
        // justifyContent:'center',
        // alignItems:'center'
    },
    profilePicMain:{
        width:'100%',
        height:150,
        justifyContent:'center',
        alignItems:'center'
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
    inputTxtMainv:{
        width:'80%',
        height:'60%',
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
    }

})