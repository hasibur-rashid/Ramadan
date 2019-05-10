import React from 'react';
import { createStackNavigator, createBottomTabNavigator, DrawerNavigator } from 'react-navigation';
import { configs } from '../config/Configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RamadanDayList from '../screens/RamadanDayList';
import RamadanDayDetails from '../screens/RamadanDayDetails';
import SuraList from '../screens/SuraList';
import SuraDetails from '../screens/SuraDetails';
import MaslaMasayelList from '../screens/MaslaMasayelList';
import MaslaMasayelDetails from '../screens/MaslaMasayelDetails';
import ZakatInfoList from '../screens/ZakatInfoList';
import ZakatInfoDetails from '../screens/ZakatInfoDetails';
// import SettingPage from '../screens/SettingPage';
import LanguageData from '../asset/language.json';

const langauge = LanguageData.bn[0];


export const RamadanDayListNav = createStackNavigator({
    RamadanDayList: {
        screen: RamadanDayList,
        navigationOptions: {

            title: langauge.ramadan,

            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    RamadanDayDetails: {
        screen: RamadanDayDetails,
        navigationOptions: {

            title: langauge.ramadan,

            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },

    // SettingPage: {
    //     screen: SettingPage,
    //     navigationOptions: {
    //
    //         title: langauge.ramadan,
    //
    //         headerStyle: {
    //             backgroundColor: configs.defaultColor,
    //         },
    //         headerTintColor: '#fff',
    //         headerTitleStyle: {
    //             fontWeight: 'bold',
    //         },
    //     }
    // }
});

export const SuraListNav = createStackNavigator({
    SuraList: {
        screen: SuraList,
        navigationOptions: {

            title: langauge.sura_list,

            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    SuraDetails: {
        screen: SuraDetails,
        navigationOptions: {

            title: langauge.sura_list,

            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
});

export const MaslaMasayelListNav = createStackNavigator({
    MaslaMasayelList: {
        screen: MaslaMasayelList,
        navigationOptions: {

            title: langauge.masla_masayel,

            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    MaslaMasayelDetails: {
        screen: MaslaMasayelDetails,
        navigationOptions: {
            title: langauge.masla_masayel,
            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
});

export const ZakatInfoListNav = createStackNavigator({
    ZakatInfoList: {
        screen: ZakatInfoList,
        navigationOptions: {
            title: langauge.zakat,
            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    },
    ZakatInfoDetails: {
        screen: ZakatInfoDetails,
        navigationOptions: {
            title: langauge.zakat,
            headerStyle: {
                backgroundColor: configs.defaultColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
});

export const Tabs = createBottomTabNavigator({
    RamadanDayList: {
        screen: RamadanDayListNav,
        navigationOptions: {

            title: langauge.ramadan,

            tabBarIcon: <Ionicons name={'ios-alarm-outline'} size={32} color={configs.defaultColor} />,
        },
    },
    SuraList: {
        screen: SuraListNav,
        navigationOptions: {

            title: langauge.sura_list_menu,

            tabBarIcon: <Ionicons name={'ios-list-box-outline'} size={32} color={configs.defaultColor} />,
        },
    },

    MaslaMasayelList: {
        screen: MaslaMasayelListNav,
        navigationOptions: {

            title: langauge.masla_masayel,

            tabBarIcon: <Ionicons name={'ios-book-outline'} size={32} color={configs.defaultColor} />,
        },
    },

    ZakatInfoList: {
        screen: ZakatInfoListNav,
        navigationOptions: {

            title: langauge.zakat,

            tabBarIcon: <Ionicons name={'ios-cash-outline'} size={32} color={configs.defaultColor} />,
        },
    }
},
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: configs.defaultColor,
            inactiveTintColor: '#000000',
        },
        animationEnabled: true,
        swipeEnabled: true,
    });