import { Text, StyleSheet, View, Pressable, FlatList, TextInput } from "react-native";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

const data = [
    {
        id: "1",
        title: "Vegan",
        key: "vegan",
    },
    {
        id: "2",
        title: "Cruelty-Free",
        key: "crueltyfree",
    },
    {
        id: "3",
        title: "Fragrance-Free",
        key: "fragrancefree",
    },
    {
        id: "4",
        title: "Natural/Organic",
        key: "natural",
    },
    {
        id: "5",
        title: "Paraben-Free",
        key: "parabenfree",
    },
    {
        id: "6",
        title: "Sulfate-Free",
        key: "sulfatefree",
    },
    {
        id: "7",
        title: "Oil-Free",
        key: "oilfree",
    },
    {
        id: "8",
        title: "Hypoallergenic",
        key: "hypoallergenic",
    },
     {
        id: "9",
        title: "Dermatologically Tested",
        key: "dermatested",
    },
    {
        id: "10",
        title: "Alcohol-Free",
        key: "alcoholfree",
    },
    {
        id: "11",
        title: "Silicone-Free",
        key: "siliconefree",
    },
    {
        id: "12",
        title: "Ecofriendly",
        key: "ecofriendly",
    },
]
export default function preferences(){
    const [preferencesList, setPreferencesList] = useState([]);
    const [allergyVal, setAllergyVal] = useState(""); // text input value
    const {skinData, setSkinData} = useContext(SkinDataContext);

    useEffect(() => {
    }, []);

    function toggleOptions(itemKey){
        if(preferencesList.includes(itemKey)) setPreferencesList([...preferencesList.filter((item) => item !== itemKey)]);
        else setPreferencesList([...preferencesList, itemKey]);
    }

    function handleNext(){
        const allergies = allergyVal.split(','); //fragrance, retinol //if cannot split by comma will use the entire string into the array
        setSkinData({...skinData, allergies: allergies, preferences: preferencesList});
        router.push("/lifestyle");
    }

    //render each of the item ine data (flatlist)
    const renderItem = ({item}) => {
        const valueExists = preferencesList.includes(item.key);
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
                    <Progress.Bar progress={0.75} width={300} color='#0097f5ff' animationType='spring'/>
                    <Text style={styles.question}>Any allergies or ingredients to avoid?</Text>
                    <Text style={styles.description}>We'll exclude these from recommendations</Text>
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g, fragrance, retinol, vitamin c, alchohol..."
                        onChangeText={setAllergyVal}
                    />
                    <Text style={styles.inputContainerText}>Leave blank if you have no allergies</Text>
                </View>
                <View style={{marginVertical: 15}}></View>
                <Text  style={styles.question}>Product Preferences</Text>
                <Text  style={styles.description}>Select what matters to you</Text>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={2}
                    scrollEnabled={true}
                    contentContainerStyle={styles.listContainer}
                >
                </FlatList>
                 <View style={styles.buttons}>
                    <Pressable style={styles.backbutton}
                    onPress={() => router.push("/concerns")}><Text style={{fontSize: 15}}>Back</Text>
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
        borderRadius: 20
    },
    inputContainerText:{
        textAlign: 'center',
        fontSize: 15,
        fontFamily: "serif",
        color: '#915d13ff',
        marginTop: 10
    },
    input:{
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
        height: 50,
        transform: [{scale: 1.04}]
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