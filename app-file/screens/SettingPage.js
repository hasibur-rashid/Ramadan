import React from 'react';
import { FlatList, StyleSheet, View, Picker, TouchableHighlight, onPress, Text, AsyncStorage, Form } from 'react-native';
import { configs } from '../config/Configs';
import { Container, Header, Left, Body, Right, Button, Title, ListItem } from 'native-base';
import DistrictData from '../asset/district.json';
import LanguageData from '../asset/language.json';
import UserInfo from '../asset/user-info.json';
import RamadanDayList from './RamadanDayList';
import { Tabs } from '../config/Router';
import {
    createStackNavigator,
} from 'react-navigation';


const langauge = LanguageData.bn[0];
const districts = DistrictData.districts;

let districtItems = districts.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s.name} />
});

const App = createStackNavigator({
    Home: { screen: RamadanDayList },
});

export default class SettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: ""
        };
    }

    static navigationOptions = {
        title: 'Welcome',
    };
    
    onValueChange = async (item) => {
        console.log(item)
        // AsyncStorage.clear();
        await AsyncStorage.setItem('user_info', JSON.stringify(item))

        let value = await AsyncStorage.getItem('user_info');

        console.log(value)

        this.setState({
            selected1: item
        });

        if (value.name != '') {
            this.props.navigation.navigate('Home');
        }        
    }

    
    onSubmit = () => {
        console.log('dd')
         this.props.navigation.navigate('Home');
        // return (<RamadanDayList />);
        
    }

    
    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.text_style}>{langauge.setting_page_text}</Text>

                <Picker
                    iosHeader="Select one"
                    placeholder="Select District"
                    mode="dropdown"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    <Picker.Item key="" value="" label={langauge.select_district}  />
                    {districtItems}
                </Picker>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10, flex: 1, justifyContent: 'center',
        backgroundColor: '#ddd'
    },
    text_style: {
        color: configs.defaultColor,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

