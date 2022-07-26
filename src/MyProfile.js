import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { en, sw } from "./Action/Store/Language";
import Header from "./Header";
import Navbar from "./Navbar";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const MyProfile = ({ navigation }) => {
  const mynum = useSelector((state) => state.counter.value);
  i18n.fallbacks = true;
  i18n.translations = { en, sw };
  i18n.locale = mynum;

  useEffect(() => {
    getMultiple();
  });
  const [My_Profile, setMy_Profile] = useState([]);
  const getMultiple = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        "@name",
        "@email",
        "@gender",
        "@mobile",
        "@photo",
        "@usertype",
      ]);
      setMy_Profile(values);
      // console.log(values)
    } catch (e) {
      console.log("errror");
    }
    // setMy_Profile(value)
    // console.log(values)

    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <Header
          Heading={i18n.t("Profile")}
          goBackBtn={() => navigation.goBack()}
          Notification={() => navigation.navigate("Notification")}
        />
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.profilePicMain}>
              <TouchableOpacity style={styles.profilePic}>
                <Image
                  style={styles.profileImg}
                  source={require("../assets/profile_picture.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputMain}>
              <View style={styles.formImgMain}>
                <Image
                  style={styles.formImg}
                  source={require("../assets/formnamelogo.png")}
                />
              </View>
              <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t("Name")}</Text>
                <Text style={styles.input}>{My_Profile[0]}</Text>
              </View>
            </View>

            <View style={styles.inputMain}>
              <View style={styles.formImgMain}>
                <Image
                  style={styles.formImg}
                  source={require("../assets/gender_logo.png")}
                />
              </View>
              <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t("Gender")}</Text>
                <Text style={styles.input}>{My_Profile[1]}</Text>
              </View>
            </View>
            <View style={styles.inputMain}>
              <View style={styles.formImgMain}>
                <Image
                  style={styles.formImg}
                  source={require("../assets/mobile_logo.png")}
                />
              </View>
              <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t("Mobile")}</Text>
                <Text style={styles.input}>{My_Profile[2]}</Text>
              </View>
            </View>
            <View style={styles.inputMain}>
              <View style={styles.formImgMain}>
                <Image
                  style={styles.formImg}
                  source={require("../assets/email_logo.png")}
                />
              </View>
              <View style={styles.inputTxtMain}>
                <Text style={styles.inputHeading}>{i18n.t("Email")}</Text>
                <Text style={styles.input}>{My_Profile[3]}</Text>
              </View>
            </View>
            {/* <TouchableOpacity style={styles.submitBtn} onPress={()=>navigation.navigate('EditProfile')}>
            <Text style={styles.submitTxt} >{i18n.t('Edit_profile')}</Text>
        </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
      <View style={styles.navbarPosition}>
        <Navbar
          Profile={() => navigation.navigate("MyProfile")}
          Quastion={() => navigation.navigate("Agronomist")}
          Home={() => navigation.navigate("Dashboard")}
          Weather={() => navigation.navigate("Weather")}
          Menu={() => navigation.navigate("Settings")}
        />
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  containerMain: {
    height: height - 150,
    width: "100%",
    overflow: "hidden",
  },
  profilePicMain: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  inputMain: {
    width: "90%",
    height: 70,
    backgroundColor: "#fffcf8",
    alignSelf: "center",
    flexDirection: "row",
    borderBottomColor: "rgba(0,0,0,0.056)",
    borderBottomWidth: 1,
    borderRightColor: "rgba(0,0,0,0.046)",
    borderRightWidth: 0.8,
    borderLeftColor: "rgba(0,0,0,0.046)",
    borderLeftWidth: 0.8,
    justifyContent: "space-between",
    alignContent: "space-between",
    borderRadius: 10,
    marginVertical: 3,
  },
  inputTxtMain: {
    width: "80%",
    height: "100%",
    // justifyContent:'center',
    // backgroundColor:'aqua',
    // alignItems:'center'
  },
  inputHeading: {
    fontSize: 14,
    fontWeight: "bold",
    height: "40%",
    marginTop: 10,
  },
  input: {
    width: "80%",
    height: "50%",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    fontSize: 14,
    fontWeight: "400",
    color: "#848484",
  },
  formImg: {
    height: 60,
    width: 60,

    alignItems: "center",
  },
  formImgMain: {
    width: 60,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  navbarPosition: {
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
  submitBtn: {
    width: "90%",
    justifyContent: "center",
    height: 48,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#fca237",
    alignSelf: "center",
    marginVertical: 10,
  },
  submitTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
