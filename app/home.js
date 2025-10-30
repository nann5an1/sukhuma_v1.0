import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { router } from 'expo-router';


export default function Home() {
  return (
     <View style={styles.container}>
            <View>
                <Text style={styles.title}>Welcome to Sukhuma</Text>
            </View>
            <View style={{marginVertical: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{marginLeft: 20, marginRight: 20, paddingVertical: 40, color: '#767676ff', fontSize: 18, fontFamily: "serif", textAlign: 'center'}}>Your AI-powered skincare companion. Get a personalized routine designed just for you.</Text>
            </View>
    
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                <Text style={styles.info}>AI Personalized</Text>
               <Text style={styles.info}>2 Minutes</Text>
               <Text style={styles.info}>Science Backed</Text>
            </View>
            <View style={{marginVertical: 30, padding: 10}}>
                <Pressable style={styles.button}
                title="Start Your Glow Journey"
                onPress={() => router.push("/skin_types")}>
                    <Text style={{color: '#ffffffff', fontSize: 15, fontWeight: "bold", fontFamily: "serif"}}>Start Your Glow Journey</Text>
                </Pressable>
            </View>
            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  title:{
    color: '#04a2adff',
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "serif"
  },
  info:{
    backgroundColor: '#f5faf7ff',
    marginVertical: 5, 
    padding: 10, 
    borderColor: '#bccecaff', 
    borderWidth: 0.7,
    borderRadius: 20,
    letterSpacing: 1,
    fontWeight: "400",
    fontSize: 13
},
  button: {
    color: '#ffffffff',
    paddingVertical: 20, 
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: '#04a2adff'
  }
}
);


// export default function App() {


//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>SplashScreen Demo! 👋</Text>
//       <Entypo name="rocket" size={30} />
//     </View>
//   );
// }