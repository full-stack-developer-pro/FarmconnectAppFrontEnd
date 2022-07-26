import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
const Header = (props) => {
    return (
        <View style={styles.headerMain}>
            <View style={styles.headerHeadingMain}>
                <TouchableOpacity style={styles.headerBackIcon} onPress={props.goBackBtn}>
                    <AntDesign name="left" size={21} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerHeading}>{props.Heading}</Text>
                <TouchableOpacity style={styles.notificationIcon} onPress={props.Notification}>
                    <Ionicons name="notifications-outline" size={27} color="#fff" />
                </TouchableOpacity>

            </View>


        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerMain: {
        width: '100%',
        height: height / 9,
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
        fontSize: 18,
        color: '#fff', marginHorizontal: 2,
        fontWeight: '500'

    },
    notificationIcon: {
        position: 'absolute',
        right: 30
    }
})