import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView,TextInput,Dimensions,FlatList } from 'react-native'
import React,{useState} from 'react'
import Navbar from './Navbar'
import { AntDesign } from '@expo/vector-icons';
import ImagePickerExample from './Imagepikker';
import AskFilter from './AskFilter';
import Header from './Header';
import {en,sw} from './Action/Store/Language'
import i18n from 'i18n-js'
import { useSelector, useDispatch } from 'react-redux'
import { English,Swahili } from './Action/Action'
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Agronomist = ({ navigation}) => {
    const mynum = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    i18n.fallbacks=true;
    i18n.translations={en,sw};
    i18n.locale=mynum



    const [num, setnum] = useState(0)
   
    const AnnouncementData=[
        {
            heading:' Farmer training on 14 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 15 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 16 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 17 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 18 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 19 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 14 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 14 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 14 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 14 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 14 May 2022',
            date:'29 june 2022'
        },
        {
            heading:' Farmer training on 14 May 2022',
            date:'29 june 2022'
        },
    ]
    const [FilteredData, setFilteredData] = useState(AnnouncementData.slice(0,num+3))
    const getIndex= key => event => {
        let data=(key)
        
        return(
        navigation.navigate('Myquastion',{key:`${data}`}))
      }
     
      const endrech = ()=>{
        setnum(num+1)
        setFilteredData(AnnouncementData.slice(0,num+3))
        console.log(num)
      }
      console.log(num)
  return (
    <View style={styles.container}>
        <View style={styles.containerMain}>
        <View style={{height:height-height/12}}>
       
       <Header Heading={i18n.t('Ask_and_agronomist')} goBackBtn={()=>navigation.goBack()} Notification={()=>navigation.navigate('Notification')}/>
  
   
    <View style={styles.textAriaMain}>
    <Image style={styles.textAreaImg} source={require('../assets/Agronomist_page_logo.png')}/>
        <View style={styles.textArea}>
           
        <Text style={styles.textAriaHeadind}>{i18n.t('Ask_your_question')}</Text>
        <TextInput style={styles.input} placeholder={`${i18n.t('Type_here')}....`}/>
        </View>
    </View>
    <ImagePickerExample StartCamera={()=>navigation.navigate('CameraStart')}/>
    <TouchableOpacity style={styles.submitbtn}>
        <Text style={styles.submitbtnTxt}>{i18n.t('Submit')}</Text>
    </TouchableOpacity>
    <View style={styles.MyquestionMainContainer}>
    <AskFilter my={i18n.t('My_questions')} other={i18n.t('Other_questions')}/>
    {/* <FlatList data={FilteredData} onEndReachedThreshold={0.01}
    onEndReached={endrech} renderItem={({item})=>{
        return(
            <TouchableOpacity  style={styles.AnnouncementMain} >
                        <Image style={styles.AnnouncementImg} source={require('../assets/askimage.png')}/>
                        <View style={styles.Announcement}>
                        
                            <Text style={styles.AnnouncementHeading}>{item.heading}</Text>
                       
                       
                            <Text style={styles.Datea}>{item.date}</Text>
                            </View>
                        <Image style={styles.commentIcone} source={require('../assets/comment_icon.png')}/>
                    </TouchableOpacity>
        )
    }}
    
    /> */}
    
    <ScrollView >
    {
            AnnouncementData.map((item,ind)=>{
                return(
                    <TouchableOpacity key={ind} style={styles.AnnouncementMain}  onPress={getIndex(ind)}>
                        <Image style={styles.AnnouncementImg} source={require('../assets/askimage.png')}/>
                        <View style={styles.Announcement}>
                        
                            <Text style={styles.AnnouncementHeading}>{item.heading}</Text>
                       
                       
                            <Text style={styles.Datea}>{item.date}</Text>
                            </View>
                        <Image style={styles.commentIcone} source={require('../assets/comment_icon.png')}/>
                    </TouchableOpacity>
                )
            })
        }
        </ScrollView>
        </View>
        
  
        </View>
        </View>
<Navbar Profile={()=>navigation.navigate('MyProfile')} Quastion={()=>navigation.navigate('Agronomist')} Home={()=>navigation.navigate('Dashboard')} Weather={()=>navigation.navigate('Weather')} Menu={()=>navigation.navigate('Settings')} />
    
  </View>
  )
}

export default Agronomist

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'

    },
    containerMain:{
        height:height-100,
        width:'100%',
        overflow:'hidden'
    },
    bgImg:{
        height:'100%',
        width:'100%',
    },
   
    textAriaMain:{
        height:height/7,
        width:'90%',
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'#fffcf8',
        borderBottomColor:'rgba(0,0,0,0.056)',
        borderBottomWidth:1,
        borderRightColor:'rgba(0,0,0,0.046)',
        borderRightWidth:0.8,
        borderLeftColor:'rgba(0,0,0,0.046)',
        borderLeftWidth:0.8,
        marginTop:20,
        borderRadius:10,
        flexDirection:'row'
        
    },
    textAriaHeadind:{
        fontSize:14,
        color:'#414141',
        fontWeight:'700',
        marginVertical:10,
        marginHorizontal:65
    },
    input:{
       marginHorizontal:65
    },
    textAreaImg:{
        left:0,
        position:'absolute',
        top:0,
        margin:12
       
    },
    textArea:{
        height:'100%',
        width:'100%'
    },
    submitbtn:{
        height:48,
        width:'90%',
        borderRadius:50,
        backgroundColor:'#fca237',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginVertical:0
        // marginHorizontal:10
    },
    submitbtnTxt:{
        fontSize:16,
        fontWeight:'500',
        color:'#fff'
    },
    MyquestionMainContainer:{
        height:height/3,
        width:'95%',
        alignSelf:'center',
        backgroundColor:'#fff8f0',
        marginTop:10,
        borderRadius:10
    },
    AnnouncementMain:{
        width:'90%',
        height:height/10,
        backgroundColor:'#ffff',
        borderRadius:10,
        
        marginVertical:5,
        alignSelf:'center',
        flexDirection:'row'
        // justifyContent:'center',
        // alignItems:'center'
    },
   
    AnnouncementHeading:{
        fontSize:14,
        margin:0,
        color:'#505050',
        fontWeight:'600',
        

    },
    Datea:{
        fontSize:12,
        marginHorizontal:3,
        marginVertical:10,
        color:'#a2a2a2'
    },
    commentIcone:{
        height:20,
        width:20,
        position:'absolute',
        right:10,
        bottom:10
    },
    Announcement:{
        height:'100%',
        width:'80%',
        
    },
    AnnouncementImg:{
        width:height/11,
        height:height/11,
        marginHorizontal:5
    }

})