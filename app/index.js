import { StyleSheet, Image, View } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';


export default function App(){
  useEffect(() => {
    const timer = setTimeout(() => {
    router.replace("/home")
  }, 3000); //in 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/sukhuma.jpeg')}/>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  image: {
    borderRadius: 12,
    width: 130,
    height: 130
  }
});