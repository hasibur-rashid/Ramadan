import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, YellowBox, Image } from 'react-native';
import { Tabs } from './app-file/config/Router';
// import { SplashPage } from './app-file/screens/SplashPage';
// import { SettingPageNav } from './app-file/screens/SettingPageRoute';
import { configs } from './app-file/config/Configs';
import LanguageData from './app-file/asset/language.json';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const langauge = LanguageData.bn[0];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: (<View style={styles.container}>
              {/* <Image source={require('./app-file/asset/ramadan_splash_5.png')} style={{ width: '100%', height: 196, flexDirection: 'row', }} /> */}
            </View>)
    }
  }

  // getToSetting() {
  //   this.setState({
  //     data: (<SettingPageNav />)
  //   })
  // }


  getData() {
    setTimeout(() => {
      this.setState({
        data: (
          <Tabs />
        )
      })
    }, 120)
  }


  componentDidMount = () => {

    //AsyncStorage.clear();
    this.getData();

    // AsyncStorage.getItem('user_info')
    //   .then((item) => {
    //      console.log(item)
        // if (item == null) {
        //   AsyncStorage.setItem('user_info', JSON.stringify({
        //     "id": 18,
        //     "name": "ঢাকা",
        //     "iftar_time": 0.00,
        //     "sehri_time": 0.00
        //   }))
        //   this.getData();
        // } else {
        //   this.getData();
        // }
      // });

    // if (this.haveData() !== null){
    //   this.getToSetting();
    // } else {
    //    this.getData();
    // }
  }

  render() {
    return this.state.data
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sp_container: {
//     padding: 10, flex: 1, justifyContent: 'center',
//     backgroundColor: '#ddd'
//   },
//   text_style: {
//     color: configs.defaultColor,
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   }
// });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default App;
