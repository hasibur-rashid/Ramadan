import React from 'react';
import {
    AppRegistry, ActivityIndicator,
    ScrollView,
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableHighlight,
    onPress,
    Alert, AsyncStorage, NetInfo
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import { configs } from '../config/Configs';
import LanguageData from '../asset/language.json';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo';

const langauge = LanguageData.bn[0];

class RamadanDayDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConnection: false,
            data: (<Text style={styles.LoadingStyle}>Loading</Text>)
        };
    }

    componentDidMount() {

        NetInfo.getConnectionInfo().then((connectionInfo) => {

            console.log(connectionInfo.type)

            if (connectionInfo.type != 'none') {
                this.setState({
                    isConnection: true
                });
            }
        });

        AsyncStorage.getItem('user_info')
            .then(async (item) => {
                this.setState({
                    data: this.getDayDetails(item)
                })
            });
    }

    enToBn = (numberInput) => {

        var en_number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        var bn_number = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '০'];

        var new_number = '';
        var index = '';
        var num = 0;
        
        numberInput = String(numberInput);

        for (var i = 0; i < numberInput.length; i++) {

            index = en_number.indexOf(numberInput[i]);

            if (!isNaN(numberInput[i])) new_number += bn_number[index]
            else new_number += numberInput[i]
        }

        return new_number;
    }

    adShow = () => {
        if (this.state.isConnection == true) {
            return (<AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-4344400076217520/2464975804" // Test ID, Replace with your-admob-unit-id
                // testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError} />);
        }
        else {
            return (<View></View>);
        }
    }

    getDayDetails = (changeValue) => {
        const data = this.props.navigation.state;
        const item = data.params;

        const userInfo = JSON.parse(changeValue);
        const iftarTimeChange = userInfo.iftar_time;
        const sehriTimeChange = userInfo.sehri_time;

        return (
            <View style={styles.container}>
                <View style={styles.containerInner}>
                    <View style={{ marginBottom: 40 }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: configs.defaultColor, textAlign: 'center' }}>{item.day} {langauge.ramadan_1439}</Text>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>{this.enToBn(item.engDate)}</Text>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{item.day_name}</Text>
                    </View>
                    <Text style={{ fontSize: 24, textAlign: 'right', textAlign: 'center', paddingBottom: 10, }}>{langauge.ajakr_namaz_ar_somoy}</Text>
                    <View style={{ borderWidth: 1, }}>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.wakto}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.fozor}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.juhor}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.asor}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.magrib}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.esha}</Text></View>
                        </View>
                        <View style={{ width: '100%', height: 1, borderBottomWidth: 1, marginTop: 3, marginBottom: 3 }}></View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.wakto_start}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৩.৫০</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>১১.৫৮</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৪.৩৩</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৬.৪০</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৮.০১</Text></View>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.wakto_end}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৫.১৩</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৪.৩২</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৬.৩৪</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৮.০০</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৩.৩৯</Text></View>
                        </View>
                        <View style={{ width: '100%', height: 1, borderBottomWidth: 1, marginTop: 3, marginBottom: 3 }}></View>
                        <View style={{ flexDirection: "row", }}>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>{langauge.jamat}</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৪.০৫</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>১.৩০</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৫.১৫</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৭.০০</Text></View>
                            <View style={{ width: '16%' }}><Text style={{ textAlign: 'center', fontSize: 16 }}>৮.৩০</Text></View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 80, left: 20 }}>
                        <View style={{ width: '50%', flexDirection: 'column' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>{langauge.sehri_time}</Text></View>
                        <View style={{ width: '50%', flexDirection: 'column' }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>{langauge.ifter_time}</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 30, left: 20 }}>
                        <View style={{ width: '50%', flexDirection: 'column' }}><Text style={{ textAlign: 'center', fontSize: 40 }}>{this.enToBn((item.sehri_time + sehriTimeChange).toFixed(2))} </Text></View>
                        <View style={{ width: '50%', flexDirection: 'column' }}><Text style={{ textAlign: 'center', fontSize: 40 }}>{this.enToBn((item.iftar_time + iftarTimeChange).toFixed(2))} </Text></View>

                    </View>
                </View>

                {this.adShow()}

            </View>

        );
    }

    render() {
        return this.state.data;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: configs.containerBGColor
    },
    containerInner: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 3
    },
    itemStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: configs.defaultColor,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        flex: 1
    },
    itemImageStyle: {
        width: 60,
        padding: 3,
        marginRight: 20,
        color: 'white',
        backgroundColor: configs.defaultColor,
        fontWeight: 'bold',
        fontSize: 36,
    },
    LoadingStyle: {
        color: 'white', textAlign: 'center', backgroundColor: configs.defaultSoftColor
    }
})

export default RamadanDayDetails;