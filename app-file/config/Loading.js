import React from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

class Loading extends React.Component {

    render(){
        return(
            <View>
                <ActivityIndicator animating size="large" color="#f4511e" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Loading;