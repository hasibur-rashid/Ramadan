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
    Alert, NetInfo
} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Loading from '../config/Loading';
import { configs } from '../config/Configs';
import SuraData from '../asset/sura-data.json';
import LanguageData from '../asset/language.json';
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded} from 'expo';




class SuraList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isConnection: false
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


    onGoToSura = (item) => {
        this.props.navigation.navigate('SuraDetails', item);
    }

    

    render() {
        const items = SuraData.suraList;
        const langauge = LanguageData.bn[0];
        
        return (
            <View style={styles.container}>
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) =>
                        <TouchableHighlight onPress={() => { this.onGoToSura(item) }}>
                            <View style={styles.itemStyle}>
                            <Image source={require('../asset/quran_image.png')} style={{ width: 100, height: 100, flexDirection: 'row', }} />
                                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', padding: 10 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name[0].bangla}</Text>
									<Text style={{ fontSize: 14 }}>{langauge.surah_no}: {item.surah_no}</Text>
                                    <Text style={{ fontSize: 14 }}>{langauge.ayat}: {item.no_of_ayath}</Text>
                                    <Text style={{ fontSize: 14 }}>{langauge.arrival_location}: {item.arrival_location}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    }
                />

                {this.adShow()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemStyle: {
        padding: 3,
        flexDirection: 'row',
        flex: 1
    }
})

export default SuraList;
