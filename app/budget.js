import { Text, StyleSheet, View, Pressable, FlatList, TextInput } from "react-native";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';


const data=[{
        id: 1,
        title: "Budget Friendly $10 - $30",
        key: "budgetfriendly",
        info: "Drugstore essentials"
    },
    {
        id: 2,
        title: "Moderate $30 - $50",
        key: "moderate",
        info: "Mix of drugstore & mid-range"
    },
    {
        id: 3,
        title: "Premium $50 - $100",
        key: "premium",
        info: "High-end brands"
    },
    {
        id: 4,
        title: "Luxury $100+",
        key: "luxury",
        info: "Top-tier products"
    },
    
]


export default function budget(){
    const [isDisabled, setIsDisabled] = useState(true);
    const {skinData, setSkinData} = useContext(SkinDataContext);
    
    useEffect(() => {
        if(skinData && skinData.budget) setIsDisabled(false);
        else setIsDisabled(true);

    }, [skinData]);
    function handleSkinData(budget){
        setSkinData({...skinData, budget: budget});
    }

    const renderItem = ({item}) => {
        const valueExists = skinData.budget === item.key;
        return (
            <Pressable style={valueExists ? styles.optionactive :styles.option} onPress={() => handleSkinData(valueExists ? "" : item.key)}>
                <Text style={valueExists ? styles.optiontitleactive :styles.title}>{item.title}</Text>
                <Text style={valueExists ? styles.optioninfoactive :styles.info}>{item.info}</Text>
            </Pressable>
        );
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff"}}>
                <View style={styles.pageheader}>
                    <Progress.Bar progress={1.0} width={300} color='#0097f5ff' animationType='spring'/>
                    <Text style={styles.question}>What's your budget?</Text>
                    <Text style={styles.description}>We'll recommend products in your price range</Text>
                </View>
                
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.optioncontainer}
                />
                <View style={styles.infocontainer}>
                    <Text style={styles.infotext}>💡   Effective skincare doesn't have to be expensive!</Text>
                </View>
                <View style={styles.buttons}>
                    <Pressable style={styles.backbutton}
                    onPress={() => router.push("/lifestyle")}><Text style={{fontSize: 15}}>Back</Text>
                    </Pressable>
                    <Pressable style={isDisabled ? styles.nextbtndisabled :styles.nextbutton}
                    onPress={() => router.push("/routine")}
                    disabled={isDisabled}><Text style={{color: '#ffffffff', fontSize: 15}}>Get Routine</Text>
                    </Pressable>
                </View>
                </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
     pageheader:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    question:{
        textAlign: 'center',
        color: '#04a2adff',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "serif",
        marginVertical: 20,
        marginTop: 30
    },
    description:{
        color: '#2b2a2aff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "200",
        marginBottom: 30
    },
    optioncontainer: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    option:{
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#f5faf7ff",
        width: 300,
        padding: 10,
        borderWidth: 0.8,
        borderColor: "#a2d8beff",
        borderRadius: 20,
        marginVertical: 10,
    },
    optionactive:{
        justifyContent: "center",
        alignContent: "center",
        width: 300,
        padding: 10,
        borderWidth: 0.8,
        borderColor: "#2d8ea2ff",
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: '#04a2adff'
    },
    optiontitleactive:{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 16,
        fontWeight: "bold",
        color: '#ffffffff',
        marginBottom: 5
    },
     optioninfoactive:{
        textAlign: 'center',
        fontFamily: "serif",
        color: '#e3e3e3ff',
        fontSize: 15
    },
    title: {
        textAlign: 'center',
        color: "#008d97ff",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "serif",
        marginBottom: 5
    },
    info: {
        textAlign: 'center',
        color: "#495b5cff",
        fontSize: 15,
        fontWeight: "semibold",
        fontFamily: "serif"
    },
    infocontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 320,
        height: 50,
        padding: 5,
        borderRadius: 15,
        borderWidth: 0.8,
        borderColor: "#008d97ff",
    },
    infotext: {
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 14
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
    nextbtndisabled:{
        paddingVertical: 10, 
        paddingHorizontal: 40,
        backgroundColor: '#b0e2e6ff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccf4f7ff'
    },
    buttons:{
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    }
});