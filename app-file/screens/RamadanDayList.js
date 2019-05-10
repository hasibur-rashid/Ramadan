import React, { Component } from 'react';
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
    Picker, Button,
    Alert, AsyncStorage, NetInfo
} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Loading from '../config/Loading';
import { configs } from '../config/Configs';
import RamadanDate from '../asset/date.json';
import LanguageData from '../asset/language.json';
import DistrictData from '../asset/district.json';
import Ionicons from 'react-native-vector-icons/Ionicons';


import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo';

const langauge = LanguageData.bn[0];
const districts = DistrictData.districts;


let districtItems = districts.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s.name} />
});

let listDistrictItems = districts.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s.name} />
});

class RamadanDayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected1: '',
            selected2: '',
            initialPage: 0,
            tabSelected: 0,
            districtData: '',
            dateColor: '',
            isConnection: false,
            data: (<Text style={styles.LoadingStyle}>Loading</Text>)
        };
    }

    componentDidMount() {

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type != 'none') {
                this.setState({
                    isConnection: true
                });
            }
        });

        var day = new Date();
        var today = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        var MagfiratStart = new Date(2019, 5, 17);
        var NajatStart = new Date(2019, 5, 27);

        if (MagfiratStart <= today) {
            this.setState({ tabSelected: 1 }); 
        } else if (NajatStart <= today) {
            this.setState({ tabSelected: 2 });
        }

        this.makeRemoteRequest();
        

    }

   

    makeRemoteRequest = (item = null) => {
        AsyncStorage.getItem('user_info')
            .then(async (item) => {
                if (item == null) {
                    this.setState({
                        data: this.getSetting()
                    })
                } else {
                    this.setState({
                        data: this.getDayList(item)
                    })
                }
            });
    }

    onGoToDays = (item) => {
        this.props.navigation.navigate('RamadanDayDetails', item);
    }

    enToBn = (numberInput) => {
        var en_number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        var bn_number = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '০'];

        var new_number = '';
        var index = '';
        var num = 0;

        for (var i = 0; i < numberInput.length; i++) {

            index = en_number.indexOf(numberInput[i]);

            if (!isNaN(numberInput[i])) new_number += bn_number[index]
            else new_number += numberInput[i]
        }

        return new_number;
    }

    onValueChange = async (item) => {
        AsyncStorage.clear();
        await AsyncStorage.setItem('user_info', JSON.stringify(item))
        this.setState({
            selected1: item,
            // districtData: item
        });

        this.makeRemoteRequest();
    }

    onListValueChange = async (item) => {
        AsyncStorage.clear();
        await AsyncStorage.setItem('user_info', JSON.stringify(item))

        this.setState({
            selected2: item,
            // districtData: item
        });
        this.makeRemoteRequest()
    }

    getSetting = () => {
        return (
            <View style={styles.settingContainer}>
                <Image source={require('../asset/setting-page-img.png')} style={{ width: 320, height: 150, marginBottom: 30 }} />
                <View style={{ paddingLeft: 40, paddingRight: 40 }}>
                    <Text style={styles.text_style}>{langauge.setting_page_text}</Text>
                    <Picker style={{ color: configs.defaultColor, marginLeft: 12 }}
                        iosHeader="Select one"
                        placeholder={langauge.select_district}
                        mode="dropdown"
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item key="" value="" label={langauge.select_district} />
                        {districtItems}
                    </Picker>
                </View>
            </View>
        );
    }

    adShow = () => {
        if (this.state.isConnection == true) {
            return (<AdMobBanner
                bannerSize="smartBannerLandscape"
                adUnitID="ca-app-pub-4344400076217520/2464975804" // Test ID, Replace with your-admob-unit-id
                // testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError} />);
        }
        else {
            return (<View></View>);
        }
    }

    dateSelected = (engDate) => {
        var day = new Date();
        var today = new Date(day.getFullYear(), day.getMonth(), day.getDate());

        var num = engDate.split("-");
        var requiredDate = new Date(num[2], num[1]-1, num[0]);

        if (today.getTime() > requiredDate.getTime())  return 1;
        else if (today.getTime() != requiredDate.getTime()) return 0;
        else return 2;

    }

    GoTo_top_function = () => {
        this.refs.ListView_Reference.scrollToEnd({ animated: true }, 100);
    } 

    getTextStyle(param) {
        if (param == 1) {
            return '#91ff8c'
        } else if (param == 2) {
            return '#91ff8c'
        } else {
            return '#ffffff'
        }
    }

    tabList = (items, changeValue) => {
        const userInfo = JSON.parse(changeValue);
        const iftarTimeChange = userInfo.iftar_time;
        const sehriTimeChange = userInfo.sehri_time;

        return (
            <FlatList
                data={items}
                ref={this.ListView_Reference}
                keyExtractor={(item, index) => item.day.toString()}
                renderItem={({ item }) =>
                    <TouchableHighlight onPress={() => { this.onGoToDays(item) }}>
                        <View style={styles.itemStyle} >
                            <View>
                                <Text style={styles.itemImageStyle}>
                                    {item.day}</Text>
                                <Text style={{ fontSize: 14, color: '#808080', paddingLeft: 7 }}>{langauge.ramadan}</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: this.getTextStyle(this.dateSelected(item.engDate) == 1), borderRadius: 6, padding: 10 }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 5, }}>{this.enToBn(item.engDate)} ({item.day_name})</Text>
                                <Text style={{ fontSize: 14, }}><Ionicons name={'ios-time-outline'} size={14} />  {langauge.sehri_time}: {this.enToBn((item.sehri_time + sehriTimeChange).toFixed(2))}</Text>
                                <Text style={{ fontSize: 14, marginBottom: 5 }}><Ionicons name={'ios-time-outline'} size={14} />  {langauge.ifter_time}: {this.enToBn((item.iftar_time + iftarTimeChange).toFixed(2))}</Text>
                                <Text style={{ position: 'absolute', right: 10, top: 10 }}>{(this.dateSelected(item.engDate) == 1) ? <Ionicons name={'ios-checkmark-circle-outline'} size={24} /> : ''}</Text>
                                <Text style={{ position: 'absolute', right: 10, top: 10 }}>{(this.dateSelected(item.engDate) == 2) ? <Ionicons name={'ios-star-outline'} size={24} /> : ''}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                }
            />
        );
    }

    getDayList = (changeValue) => {
        var itemsRahmat = RamadanDate.rahmat;
        var itemsMagfirat = RamadanDate.magfirat;
        var itemsNajat = RamadanDate.najat;      
        
        console.log(this.state.tabSelected)

        return (
            <View style={styles.container}>
                <Container>
                    <Tabs initialPage={0}>
                        <Tab tabLabel='Tab #0' heading={langauge.rahmat} tabStyle={{ backgroundColor: '#09af00' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#09af00' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold' }} style={styles.tabStyle} >
                            {this.tabList(itemsRahmat, changeValue)}
                        </Tab>
                        <Tab tabLabel='Tab #1' heading={langauge.magfirat} tabStyle={{ backgroundColor: '#09af00' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#09af00' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold' }} style={styles.tabStyle}>
                            {this.tabList(itemsMagfirat, changeValue)}
                        </Tab>
                        <Tab tabLabel='Tab #2' heading={langauge.nazat} tabStyle={{ backgroundColor: '#09af00' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#09af00' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold' }} style={styles.tabStyle}>
                            {this.tabList(itemsNajat, changeValue)}
                        </Tab>
                    </Tabs>

                    {this.adShow()}

                </Container>
            </View>
        );

    }


    render() {
        return this.state.data;
    }
}


const styles = StyleSheet.create({
    settingContainer: {
        paddingTop: 80, alignItems: 'center', backgroundColor: '#ffffff', height: '100%'
    },
    container: {
        flex: 1
    },
    itemStyle: {
        padding: 5,
        flexDirection: 'row',
        flex: 1,
    },
    itemImageStyle: {
        width: 60,
        padding: 3,
        marginRight: 20,
        fontSize: 36, textAlign: 'center',
        color: configs.backgroundColor
    },
    tabStyle: {
        backgroundColor: configs.containerBGColor
    },
    LoadingStyle: {
        color: 'white', textAlign: 'center', backgroundColor: configs.defaultSoftColor
    },
    text_style: {
        color: configs.defaultColor,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default RamadanDayList;
