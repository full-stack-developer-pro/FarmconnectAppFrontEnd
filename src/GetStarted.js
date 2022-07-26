import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import GetStartedA from './GetStartedA';
import GetStartedB from './GetStardetB';
const GetStarted = ({ navigation }) => {
    // const [getstartedA, setgetstartedA] = useState(true)
    return (<View style={styles.container}>
        <GetStartedA GetStarted={() => navigation.navigate('SignupLogin')} />

    </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

})