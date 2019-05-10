import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { configs } from '../config/Configs';


export const SplashPage = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../asset/ramadan_splash_5.png')} style={{ width: '100%', height: '100%', flexDirection: 'row', }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_style: {
        flexDirection: 'row',
        flex: 1,
        color: 'white',
        fontSize: 24,
    }
})

export default SplashPage;