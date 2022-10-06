/**
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState, Component } from 'react';
 import { Alert, Modal, StyleSheet, Text, TextInput, Pressable, View, Image, SafeAreaView } from 'react-native';
 import NetInfo from "@react-native-community/netinfo";
 import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
  
 export default App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [zipcode, setZipcode] = useState(83642);
  const first = "https://api.weatherapi.com/v1/forecast.json?key=72897472b6904d78bcc210754222309&q=";
  const last = "&days=1"; //
  const [connection, setConnection] = useState(false);
  console.log(data);
  console.log(connection);

 NetInfo.addEventListener(networkState => {
  console.log("Connection type - ", networkState.type);
  console.log("Is connected? - ", networkState.isConnected);
  if (networkState.isConnected === false) {
    setConnection(false);
  }
  });

  useEffect(() => {
     // fetch('https://api.weatherapi.com/v1/forecast.json?key=16eb645822ef43399f1195018220709&q=83642&days=1', {timeout: 5000})
     let myUrl = first + zipcode + last; //
     console.log("useEffect:" + myUrl); //
     fetch(myUrl)
       .then((response) => response.json())
       .then((json) => setData(json))
       .catch((error) => console.error(error))
       .finally(() => setLoading(false));
   }, [isLoading]);

   const createZip = (newZip) => {
      if (newZip.length === 5) {
        setZipcode(newZip);
        setLoading(true);
        setModalVisible(false);
      }
   };

   const [screen, setScreen] = useState(0);
   const swipeAction = () => {
     console.log("setting screen number");
     setScreen((screen==0)?1:0);
   }
   useEffect(()=> {
    
   },[screen]);

   return (
    <View style={styles.centeredView}>
      {connection ? <Text style={{letterSpacing: 3}}>Connection: Active</Text>
      : <Text style={{letterSpacing: 3}}>Connection: Inactive</Text>}
      <Image source={require('./image/cattleSkull.png')} style={[styles.headerImage]} />
      <Text style={styles.weatherHeader}>{"Dry & Barren Weather App"}</Text>
      {connection ? <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
        }}>
          <View style={styles.centeredModalView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Zip Code:</Text>
              <TextInput value={null} onChangeText={newText => {createZip(newText)}} keyboardType='numeric'></TextInput>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
                </View>
                </View>
                </Modal> :
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                  }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}>Connection Error</Text>
                        <Text style={styles.modalText}> Oops! Looks like your device is not connected to the Internet. </Text>

              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
                </View>
                </View>
                </Modal>}

                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                  <Text style={styles.textStyle}>Change Zip Code</Text>
                  </Pressable>
                  
                  <View style={{ flex: 1, padding: 24 }}>
                    {isLoading ? <Text>Loading...</Text> : 
                    ( <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                      <SafeAreaView>
                      <GestureRecognizer onSwipe={(direction, state) => swipeAction()}>
                        <View>{(screen==0)?<Text style={[styles.apiInformation]}>
                            {"Today's Current Weather View:" + "\n \n \n"}
                            {data.location.name + "\n \n"}
                            {data.location.region + "\n \n"}
                            {data.location.country + "\n \n"}
                            {'Latitude: ' + data.location.lat + "\n \n"}
                            {'Longitude: ' + data.location.lon + "\n \n"}
                            {data.location.tz_id + "\n \n"}
                            {'Temperature: ' + data.current.temp_f + ' °F' + "\n \n"}
                            {'Humidity: ' + data.current.humidity + '%' + "\n \n"}
                            {'Wind Direction: ' + data.current.wind_dir + "\n \n"}
                            {'Visibility: ' + data.current.vis_miles + " mi" + "\n \n"}
                            {'Moon Phase: ' + data.forecast.forecastday[0].astro.moon_phase + "\n \n"}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./image/fullCircle.png')} style={[styles.footerImage, { width: 30, height: 30 }]} />
                            <Image source={require('./image/hollowCircle.png')} style={[styles.footerImage, { width: 20, height: 20 }]} />
                          </View>
                          </Text>
                          : <Text style={[styles.apiInformation]}>
                            {"Today's Hourly Weather View:" + "\n \n \n"}
                            {data.location.name + "\n \n"}
                            {data.location.region + "\n \n"}
                            {data.location.country + "\n \n"}
                            {'Latitude: ' + data.location.lat + "\n \n"}
                            {'Longitude: ' + data.location.lon + "\n \n"}
                            {data.location.tz_id + "\n \n"}
                            {'Temperature: ' + data.forecast.forecastday[0].hour[0].temp_f + ' °F' + "\n \n"}
                            {'Humidity: ' + data.forecast.forecastday[0].hour[0].humidity + '%' + "\n \n"}
                            {'Wind Direction: ' + data.forecast.forecastday[0].hour[0].wind_dir + "\n \n"}
                            {'Visibility: ' + data.forecast.forecastday[0].hour[0].vis_miles + " mi" + "\n \n"}
                            {'Moon Phase: ' + data.forecast.forecastday[0].astro.moon_phase + "\n \n"}
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./image/hollowCircle.png')} style={[styles.footerImage, { width: 20, height: 20 }]} />
                            <Image source={require('./image/fullCircle.png')} style={[styles.footerImage, { width: 30, height: 30 }]} />
                          </View>
                            </Text>
                            }

                          </View>
                          </GestureRecognizer>
                          </SafeAreaView>
                          
                      </View>
                      )}
                      </View>

                  </View>
                  );
                };

                const styles = StyleSheet.create({
                  centeredView: {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 22,
                  backgroundColor: 'sandybrown'
                },
                centeredModalView: {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 22,
                  //backgroundColor: 'burlywood'
                },
                modalView: {
                  margin: 20,
                  backgroundColor: "white",
                  //opacity: 0.5,
                  borderRadius: 20,
                  padding: 35,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5
                },
                apiInformation: {
                  fontSize: 16,
                  color: 'black',
                  textAlign: 'center',
                  //backgroundColor: 'burlywood',
                  padding: 15,
                  letterSpacing: 3
                },
                weatherHeader: {
                  fontSize: 25,
                  fontStyle: 'italic',
                  color: 'black',
                  letterSpacing: 3
                },
                headerImage: {                  
                  flexDirection: 'row',
                  width: 80,
                  height: 80,
                  marginHorizontal: 10
                },
                button: {
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2
                },
                buttonOpen: {
                  backgroundColor: "black"
                },
                buttonClose: {
                  backgroundColor: "black"
                },
                textStyle: {
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  letterSpacing: 4
                },
                modalText: {
                  marginBottom: 15,
                  textAlign: "center",
                  color: 'black',
                  letterSpacing: 3
                }
              });