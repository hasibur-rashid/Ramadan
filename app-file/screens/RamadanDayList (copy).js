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
    Picker,
    Alert, AsyncStorage, NetInfo
} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Loading from '../config/Loading';
import { configs } from '../config/Configs';
import RamadanDate from '../asset/date.json';
import LanguageData from '../asset/language.json';
import DistrictData from '../asset/district.json';


import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded
} from 'expo';

const langauge = LanguageData.bn[0];


let isNet = NetInfo.getConnectionInfo().then((connectionInfo) => {
    if (connectionInfo.type != 'none') {
        return true;
    }
});

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
            districtData: '',
            data: (<Text style={styles.LoadingStyle}>Loading</Text>)
        };
    }

    componentDidMount() {

        this.makeRemoteRequest();

    }

    makeRemoteRequest = (item = null) => {
        AsyncStorage.getItem('user_info')
            .then(async (item) => {
                console.log(item)
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
        await AsyncStorage.setItem('user_info', JSON.stringify(item))
        this.setState({
            selected1: item,
            // districtData: item
        });

        this.makeRemoteRequest();
    }

    onListValueChange = async (item) => {
        await AsyncStorage.setItem('user_info', JSON.stringify(item))
        console.log(item)
        this.setState({
            selected2: item,
            // districtData: item
        });
        this.makeRemoteRequest()
    }


    getSetting = () => {
        return (
            <View style={styles.settingContainer}>

                <Text style={styles.text_style}>{langauge.setting_page_text}</Text>

                <Picker
                    iosHeader="Select one"
                    placeholder="Select District"
                    mode="dropdown"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item key="" value="" label={langauge.select_district} />
                    {districtItems}
                </Picker>

            </View>
        );
    }


    getDayList = (changeValue) => {
        const itemsRahmat = RamadanDate.rahmat;
        const itemsMagfirat = RamadanDate.magfirat;
        const itemsNajat = RamadanDate.najat;
        const userInfo = JSON.parse(changeValue);

        const iftarTimeChange = userInfo.iftar_time;
        const sehriTimeChange = userInfo.sehri_time;

        return (
            <View style={styles.container}>
                <Picker
                    iosHeader="Select one"
                    placeholder="Select District"
                    mode="dropdown"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onListValueChange.bind(this)}
                >
                    <Picker.Item key="" value="" label={langauge.select_district} />
                    {listDistrictItems}
                </Picker>
                <Container>
                    <Tabs initialPage={0}>
                        <Tab heading={langauge.rahmat} tabStyle={{ backgroundColor: '#09af00' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#09af00' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold' }} style={styles.tabStyle} >
                            <FlatList
                                data={itemsRahmat}
                                keyExtractor={(item, index) => item.day.toString()}
                                renderItem={({ item }) =>
                                    <TouchableHighlight onPress={() => { this.onGoToDays(item) }}>
                                        <View style={styles.itemStyle}>
                                            <Text style={styles.itemImageStyle}>
                                                {item.day}
                                            </Text>

                                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 6, padding: 10 }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>{item.engDate} ({item.day_name})</Text>
                                                <Text style={{ fontSize: 13, marginBottom: 5 }}>{langauge.ifter_time}: {this.enToBn((item.iftar_time + iftarTimeChange).toFixed(2))}</Text>
                                                <Text style={{ fontSize: 13, }}>{langauge.sehri_time}: {this.enToBn((item.sehri_time + sehriTimeChange).toFixed(2))}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                }
                            />
                        </Tab>
                        <Tab heading={langauge.magfirat} tabStyle={{ backgroundColor: '#09af00' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#09af00' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold' }} style={styles.tabStyle}>
                            <FlatList
                                data={itemsMagfirat}
                                keyExtractor={(item, index) => item.day.toString()}
                                renderItem={({ item }) =>
                                    <TouchableHighlight onPress={() => { this.onGoToDays(item) }}>
                                        <View style={styles.itemStyle}>
                                            <Text style={styles.itemImageStyle}>
                                                {item.day}
                                            </Text>

                                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 6, padding: 10 }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>{item.engDate} ({item.day_name})</Text>
                                                <Text style={{ fontSize: 13, marginBottom: 5 }}>{langauge.ifter_time}: {this.enToBn((item.iftar_time + iftarTimeChange).toFixed(2))}</Text>
                                                <Text style={{ fontSize: 13, }}>{langauge.sehri_time}: {this.enToBn((item.sehri_time + sehriTimeChange).toFixed(2))}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                }
                            />
                        </Tab>
                        <Tab heading={langauge.nazat} tabStyle={{ backgroundColor: '#09af00' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#09af00' }} activeTextStyle={{ color: '#fff', fontWeight: 'bold' }} style={styles.tabStyle}>
                            <FlatList
                                data={itemsNajat}
                                keyExtractor={(item, index) => item.day.toString()}
                                renderItem={({ item }) =>
                                    <TouchableHighlight onPress={() => { this.onGoToDays(item) }}>
                                        <View style={styles.itemStyle}>
                                            <Text style={styles.itemImageStyle}>
                                                {item.day}
                                            </Text>

                                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 6, padding: 10 }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 5, }}>{item.engDate} ({item.day_name})</Text>
                                                <Text style={{ fontSize: 13, marginBottom: 5 }}>{langauge.ifter_time}: {this.enToBn((item.iftar_time + iftarTimeChange).toFixed(2))}</Text>
                                                <Text style={{ fontSize: 13, }}>{langauge.sehri_time}: {this.enToBn((item.sehri_time + sehriTimeChange).toFixed(2))}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                }
                            />
                        </Tab>
                    </Tabs>
                    <AdMobBanner
                        bannerSize="smartBannerPortrait"
                        adUnitID="ca-app-pub-4344400076217520/2464975804" // Test ID, Replace with your-admob-unit-id
                        // testDeviceID="EMULATOR"
                        onDidFailToReceiveAdWithError={this.bannerError} />
                </Container>
            </View>
        );
    }

    

    render() {
        return this.state.data;
    }
}

const styles = StyleSheet.create({
    settingContainer : {
        padding: 10, flex: 1, justifyContent: 'center',
        backgroundColor: '#ddd'
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
