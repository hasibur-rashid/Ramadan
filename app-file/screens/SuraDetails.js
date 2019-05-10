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
import { configs } from '../config/Configs';
import LanguageData from '../asset/language.json';
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded} from 'expo';

class SuraDetails extends React.Component {

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

    render() {
        const data = this.props.navigation.state;
        const items = data.params.lines;
        const langauge = LanguageData.bn[0];

        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 10, backgroundColor: '#ffffff', paddingBottom: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: configs.defaultColor, textAlign: 'center' }}>{data.params.name[0].bangla}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: configs.defaultColor, textAlign: 'center' }}>{langauge.ayat}: {data.params.no_of_ayath}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: configs.defaultColor, textAlign: 'center' }}>{langauge.arrival_location}: {data.params.arrival_location}</Text>
                </View>
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => item.bangla.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.itemStyle}>
                            {/* <Text style={styles.itemImageStyle}>{item.index}</Text> */}
                            <View style={styles.itemStyle}>
                                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 6, padding: 10 }}>
                                    <Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'right' }}>{item.arabic}</Text>
									<Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'right' }}>{item.bangla}</Text>
                                    <Text style={{ fontSize: 16, textAlign: 'right' }}>{item.english}</Text>
                                </View>
                            </View>

                        </View>
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
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white', borderRadius: 6, padding: 10
    },
    itemImageStyle: {
        width: 30,
        padding: 3,
        marginRight: 20,
        fontSize: 32, textAlign: 'center'
    }
})

export default SuraDetails;