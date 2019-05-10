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
import MaslaMasayelData from '../asset/masla-masayel-data.json';
import LanguageData from '../asset/language.json';
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded} from 'expo';

class MaslaMasayelList extends React.Component {

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


    onGoToMasla = (item) => {
        this.props.navigation.navigate('MaslaMasayelDetails', item);
    }

    render() {
        const items = MaslaMasayelData.maslaMasayelList;

        const langauge = LanguageData.bn[0];
        
        return (
            <View style={styles.container}>
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) =>
                        <TouchableHighlight onPress={() => { this.onGoToMasla(item) }}>
                            <View style={styles.itemStyle}>
                            <Image source={require('../asset/masla_1.png')} style={{ width: 64, height: 64, flexDirection: 'row',backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} />
                                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', padding: 18 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
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
        flex: 1,
        backgroundColor: 'white'
    },
    itemStyle: {
        padding: 4,
        flexDirection: 'row',
        borderBottomWidth: 5,
        borderBottomColor: '#F7F7F7',
        flex: 1
    }
})

export default MaslaMasayelList;
