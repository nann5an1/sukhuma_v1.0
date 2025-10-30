import { Text, StyleSheet, View, Pressable, FlatList, TextInput, Alert } from "react-native";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

const data = [
    {
        id: "1",
        title: "High Stress",
        key: "highstress",
    },
    {
        id: "2",
        title: "Poor Sleep",
        key: "poorsleep",
    },
     {
        id: "3",
        title: "Smoking",
        key: "smoking",
    },
     {
        id: "4",
        title: "Regular Exercise",
        key: "regularexercise",
    },
    {
        id: "5",
        title: "Sun Exposure",
        key: "sunexposure",
    },
    {
        id: "6",
        title: "Air Pollution",
        key: "airpollution",
    },
]
export default function lifestyle(){
    const [lifestyleList, setLifestyleList] = useState([]);
    const [dietaryVal, setDietaryVal] = useState(""); // text input value
    const {skinData, setSkinData} = useContext(SkinDataContext);

    function toggleOptions(itemKey){
        if(lifestyleList.includes(itemKey)) setLifestyleList([...lifestyleList.filter((item) => item !== itemKey)]);
        else setLifestyleList([...lifestyleList, itemKey]);
    }

    function handleNext(){
        setSkinData({...skinData, diet: dietaryVal.split(","), lifestyle: lifestyleList});
        router.push("/budget");
    }

    //render each of the item ine data (flatlist)
    const renderItem = ({item}) => {
        const valueExists = lifestyleList.includes(item.key);
        return(
            <Pressable onPress={() => toggleOptions(item.key)} style={valueExists ? styles.optionactive : styles.option}>
                  <Text style={valueExists ? styles.optiontitleactive :styles.optiontitle}>{item.title}</Text>
            </Pressable>
        );
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff"}}>
                <View style={styles.pageheader}>
                    <Progress.Bar progress={0.875} width={300} color='#0097f5ff' animationType='spring'/>
                    <Text style={styles.question}>What's your diet like?</Text>
                    <Text style={styles.description}>Your diet affects your skin health</Text>
                    
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g, High sugar, lots of diary, salt, vegetarian, plenty of water, fruits and vegetables..."
                        onChangeText={setDietaryVal}
                    />
                    <Text style={styles.inputContainerText}>optional, but helps us give better recommendations</Text>
                </View>
                <View style={{marginVertical: 15}}></View>
                <Text  style={styles.question}>Lifestyle Factors</Text>
                <Text  style={styles.description}>What applies to you?</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={2}
                    scrollEnabled={false}
                    contentContainerStyle={styles.listContainer}
                >
                </FlatList>
                 <View style={styles.buttons}>
                    <Pressable style={styles.backbutton}
                    onPress={() => router.push("/preferences")}><Text style={{fontSize: 15}}>Back</Text>
                    </Pressable>
                    <Pressable style={styles.nextbutton}
                    onPress={() => handleNext()}
                    ><Text style={{color: '#ffffffff', fontSize: 15}}>Continue</Text>
                    </Pressable>
                </View>
            </SafeAreaView>    
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
     pageheader:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    question:{
        textAlign: 'center',
        color: '#ce6915ff',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "serif",
        marginVertical: 20
    },
    description:{
        color: '#2b2a2aff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "200",
        marginBottom: 30
    },
    inputContainer:{
        backgroundColor: '#fef3d2ff',
        padding: 20,
        borderColor: '#b95e13ff',
        borderWidth: 0.7,
        borderRadius: 20,
        width: "90%"
    },
    inputContainerText:{
        textAlign: 'center',
        fontSize: 15,
        fontFamily: "serif",
        color: '#915d13ff',
        marginTop: 10
    },
    input:{
        alignItems: 'center',
        justifyContent: 'center',
        width: "300",
        padding: 15,
        borderColor: '#cc8b1cff',
        backgroundColor: '#ffffffff',
        borderWidth: 0.7,
        borderRadius: 15
    },
    option:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8ff',
        gap: 8,
        padding: 5,
        marginHorizontal: 8,
        marginVertical: 2,
        borderRadius: 20,
        borderWidth: 0.7,
        borderColor: '#b8b8b8ff',
        width : 170,
        height: 50
    },
    optionactive:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eea53eff',
        gap: 8,
        padding: 5,
        marginHorizontal: 8,
        marginVertical: 2,
        borderRadius: 20,
        width : 170,
        height: 50
    },
    optioninfoactive:{
        color: '#e3e3e3ff',
    },
    optiontitle: {
        textAlign: 'center',
        color: '#202121ff',
        fontSize: 15,
        fontWeight: "semibold",
        fontFamily: "serif"
    },
    optiontitleactive:{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "semibold",
        color: '#ffffffff'
    },
    optioninfo:{
        textAlign: 'center',
        color: '#767676ff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "20",
        marginBottom: 10
    },
    listContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    backbutton:{
        paddingVertical: 10, 
        paddingHorizontal: 40,
        borderColor: '#767676ff',
        borderWidth: 1,
        borderRadius: 10,
    },
    nextbutton:{
        paddingVertical: 10, 
        paddingHorizontal: 40,
        backgroundColor: '#04a2adff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#04a2adff'
    },
    buttons:{
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    }
});