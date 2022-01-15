import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";


function refreshPage() {
  window.location.reload(false);
  console.log ('you pressed refresh!')
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=44151";
  const BusNo = "188";
  const BusStop = "44151";
  const [arrival, setArrival]  = useState("");
  const [arrival2, setArrival2] = useState("");



  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);

      const myBus = responseData.services.filter((item) => item.no === "188")[0];
      console.log("My Bus:");
      console.log(myBus);
      setArrival(myBus.next.time);
      setArrival2(myBus.next2.time);
      setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 3000);

    // return the function to run when unmounting
    return () => clearInterval(interval);
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Stop: {BusStop}</Text>
       <Text style={styles.title}>Bus No: {BusNo}</Text>
      <br></br>
      <Text style={styles.title}>Bus arrival time:</Text>
      <br></br> 
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color="black" size="large"/> : arrival}</Text>
      <Text style={styles.arrivalTime2}>{loading ? <ActivityIndicator color="black" size="large"/> : arrival2}</Text>
      <br></br> 
      <TouchableOpacity onPress={refreshPage} style={styles.button}><Text style={styles.buttonText}>Refresh!</Text></TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },

  arrivalTime: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',

  },

  arrivalTime2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    justifyContent: 'center',

  },

  button: {
backgroundColor: "black",
padding: 20,
margin: 10,
borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',

  }
});
