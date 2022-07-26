import i18n from "i18n-js";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { en, sw } from "./Action/Store/Language";
import Header from "./Header";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import * as Location from "expo-location";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const Weather = ({ navigation }) => {
  const mynum = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  i18n.fallbacks = true;
  i18n.translations = { en, sw };
  i18n.locale = mynum;
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [Searchbar, setSearchbar] = useState(false);
  const weatherdata = [
    {
      time: "Now",
      tamp: "40°",
    },
    {
      time: "Now",
      tamp: "40°",
    },
    {
      time: "Now",
      tamp: "40°",
    },
    {
      time: "Now",
      tamp: "40°",
    },
    {
      time: "Now",
      tamp: "40°",
    },
    {
      time: "Now",
      tamp: "40°",
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }

      console.log("location");
      try {
        let location = await Location.getCurrentPositionAsync();
        setLocation(location);
        getWeatherDetails(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    })();
  }, []);

  const getWeatherDetails = async (lat, long) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=9cb9f757b49145cc2d3b3a1d0cdbb4b9
      `
    );
    const data = await response.json();
    setWeather(data);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <Header
          Heading={i18n.t("Weather")}
          goBackBtn={() => navigation.goBack()}
          Notification={() => navigation.navigate("Notification")}
        />
        {weather ? (
          <ScrollView style={{ top: 5 }} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.searchLocationMain}
              onPress={() => setSearchbar(!Searchbar)}
            >
              <View style={styles.searchLocationInner}>
                <Image
                  style={styles.searchLocationLogo}
                  source={require("../assets/location_logo.png")}
                />
                <View style={styles.searchMian}>
                  {!Searchbar && (
                    <View>
                      <Text style={styles.searchLocationTxt}>
                        {i18n.t("Location")}
                      </Text>
                      <Text style={styles.getLocationTxt}>{weather?.name}</Text>
                    </View>
                  )}
                  {Searchbar && <SearchBar />}
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.weathermain}>
              <View style={styles.todayMain}>
                <Text style={styles.todayTxt}>{i18n.t("Today")}</Text>
                <Text style={styles.dateTxt}>Sun, 3 July</Text>
              </View>
              <View style={styles.tampMain}>
                <Image
                  style={styles.sunLogo}
                  source={require("../assets/Sunlogo.png")}
                />
                <View style={styles.tampratureMain}>
                  <Text style={styles.tampTxt}>{Math.floor(weather.main.temp)}°</Text>
                  <Text style={styles.celTxt}>C</Text>
                  <Text style={styles.sunny}>{weather.weather[0].main}</Text>
                </View>
              </View>
              <View style={styles.rainMain}>
                <View style={styles.rain}>
                  <Image
                    style={styles.rainlogo}
                    source={require("../assets/windlogo.png")}
                  />
                  <Text style={styles.rainTxt}>{weather.wind.speed }m/s</Text>
                </View>
                <View style={styles.rain}>
                  <Image
                    style={styles.rainlogo}
                    source={require("../assets/rainlogo.png")}
                  />
                  <Text style={styles.rainTxt}>{weather.main.humidity}%</Text>
                </View>
                <View style={styles.rain}>
                  <Image
                    style={styles.rainlogo}
                    source={require("../assets/ranelogo2.png")}
                  />
                  <Text style={styles.rainTxt}>{weather.clouds.all}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.rightScroll}>
              <Text style={styles.TodayHeading}>{i18n.t("Today")}</Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {weatherdata.map((item, ind) => {
                  return (
                    <View key={ind} style={styles.TodayWeather}>
                      <Text style={styles.timeTxt}>{item.time}</Text>
                      <Image
                        style={styles.TodayWeatherImg}
                        source={require("../assets/weathersunpng.png")}
                      />
                      <Text style={styles.tampdata}>{item.tamp}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
        ) : (
          <View style={[styles.loading_container, styles.loading_horizontal]}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
      <Navbar
        Profile={() => navigation.navigate("MyProfile")}
        Quastion={() => navigation.navigate("Agronomist")}
        Home={() => navigation.navigate("Dashboard")}
        Weather={() => navigation.navigate("Weather")}
        Menu={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  loading_container: {
    flex: 1,
    justifyContent: "center"
  },
  loading_horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  containerMain: {
    height: height - 150,
    width: "100%",
    overflow: "hidden",
  },
  bgImg: {
    height: "100%",
    width: "100%",
  },
  headerMain: {
    width: "100%",
    height: 100,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fca237",
  },
  headerHeadingMain: {
    width: "95%",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 10,
    alignSelf: "flex-end",
  },
  headerHeading: {
    fontSize: 24,
    color: "#fff",
    marginHorizontal: 2,
  },
  searchLocationMain: {
    width: "90%",
    height: 70,
    borderRadius: 15,
    backgroundColor: "#fff8f0",
    borderBottomColor: "rgba(0,0,0,0.056)",
    borderBottomWidth: 1,
    borderRightColor: "rgba(0,0,0,0.046)",
    borderRightWidth: 0.8,
    borderLeftColor: "rgba(0,0,0,0.046)",
    borderLeftWidth: 0.8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  searchLocationInner: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchMian: {
    height: "100%",
    width: "60%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  searchLocationTxt: {
    fontSize: 14,
    color: "#414141",
    fontWeight: "bold",
    marginVertical: 10,
  },
  getLocationTxt: {
    fontSize: 14,
    color: "#848484",
  },
  weathermain: {
    width: "100%",
    height: 321,
    backgroundColor: "#73a2fa",
    alignItems: "center",
    justifyContent: "space-around",
  },
  todayMain: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  todayTxt: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "900",
  },
  dateTxt: {
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  tampMain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tampratureMain: {
    width: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    right: 0,
  },
  tampTxt: {
    fontSize: 43,
    color: "#fff",
    fontWeight: "900",
  },
  celTxt: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
    marginTop: 5,
  },
  sunny: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  rainMain: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  rain: {
    justifyContent: "center",
    alignItems: "center",
  },
  rightScroll: {
    height: 200,
    marginBottom: 0,
    justifyContent: "center",
    // alignItems:'center'
  },
  TodayWeather: {
    height: 116,
    width: 71,
    borderRadius: 20,
    borderColor: "#cbd9fc",
    marginHorizontal: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    backgroundColor: "#f8faff",
    // backgroundColor:'#b4c9ff'
  },
  timeTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#b4c9ff",
  },
  tampdata: {
    fontSize: 24,
    fontWeight: "500",
    color: "#b4c9ff",
  },
  TodayHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    margin: 15,
  },
  rainTxt: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
