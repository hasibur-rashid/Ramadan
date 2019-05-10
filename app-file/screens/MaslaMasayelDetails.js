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
    Alert,
    Dimensions, NetInfo
} from 'react-native';
import { configs } from '../config/Configs';
import LanguageData from '../asset/language.json';
import HTML from 'react-native-render-html';
import {AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded} from 'expo';

class MaslaMasayelDetails extends React.Component {

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

    adShowRectanguler = () => {
        if (this.state.isConnection == true) {
            return (<AdMobBanner
                bannerSize="mediumRectangle"
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
        const items = data.params.maslaMasayelList;

        const langauge = LanguageData.bn[0];
        const htmlContent = data.params.details;
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 10, backgroundColor: '#ffffff' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: configs.defaultColor, textAlign: 'center' }}>{data.params.title}</Text>
                    < ScrollView style={{ padding: 10 }}>
                        {this.adShow()}
                    <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
                        {this.adShowRectanguler()}
                    </ScrollView>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemStyle: {
        padding: 5,
        flexDirection: 'row',
        flex: 1
    },
    itemImageStyle: {
        width: 30,
        padding: 3,
        marginRight: 20,
        fontSize: 32, textAlign: 'center'
    }
})

export default MaslaMasayelDetails;