
import {View, Text, Button, StyleSheet, Pressable, Alert} from 'react-native';
import { router } from 'expo-router';
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import * as Progress from 'react-native-progress';
export default function skin_types() {
    const [isDisabled, setIsDisabled] = useState(true);
    const {skinData, setSkinData} = useContext(SkinDataContext); //parse the conetext object not the context component(SkinDataProvider)

    useEffect(() => {
        skinData && skinData.type && skinData.type.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
    }, [skinData.type]);

    function handleSkinType(skinType){
        setSkinData({...skinData, type: skinType});
    }
    const isDry = skinData.type === "dry";
    const isOily = skinData.type === "oily";
    const isCombination = skinData.type === "combination";
    const isNormal = skinData.type === "normal";
    const isSensitive = skinData.type === "sensitive";


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffffff'}}>
            <Progress.Bar progress={0.125} width={300} color='#0097f5ff' animationType='spring'/>
            <Text style={styles.question}>What's your skin type?</Text>
            <Text style={styles.description}>Choose the one that best describes your skin</Text>
            <Pressable 
                style={[styles.option, isDry ? styles.optionactive : styles.option]} onPress={() => {isDry ? handleSkinType("") : handleSkinType("dry")}}>
                <Text style={[styles.optiontitle, isDry ? styles.optiontitleactive  : styles.optiontitle]}>Dry</Text>
                <Text style={[styles.optioninfo, isDry ? styles.optioninfoactive  : styles.optioninfo]}>Tight, flaky, or rough texture</Text>
            </Pressable>
            <Pressable style={[styles.option, isOily ? styles.optionactive : styles.option]} onPress={() => isOily ? handleSkinType("") : handleSkinType("oily")}>
                <Text style={[styles.optiontitle,isOily ? styles.optiontitleactive : styles.optiontitle]}>Oily</Text>
                <Text  style={[styles.optioninfo, isOily ? styles.optioninfoactive : styles.optioninfo]}>Shiny with visible pores</Text>
            </Pressable>
              <Pressable style={[styles.option, isCombination ? styles.optionactive : styles.option]} onPress={() => isCombination ? handleSkinType("") : handleSkinType("combination")}>
                <Text style={[styles.optiontitle, isCombination ? styles.optiontitleactive : styles.optiontitle]}>Combination</Text>
                <Text  style={[styles.optioninfo, isCombination ? styles.optioninfoactive : styles.optioninfo]}>Oily T-zone, dry cheeks</Text>
            </Pressable>
              <Pressable style={[styles.option, isNormal ? styles.optionactive : styles.option]} onPress={() =>  isNormal ? handleSkinType("") : handleSkinType("normal")}>
                <Text style={[styles.optiontitle, isNormal ? styles.optiontitleactive : styles.optiontitle]}>Normal</Text>
                <Text  style={[styles.optioninfo, isNormal ? styles.optioninfoactive : styles.optioninfo]}>Balanced, not too oily or dry</Text>
            </Pressable>
              <Pressable style={[styles.option, isSensitive ? styles.optionactive : styles.option]} onPress={() =>  isSensitive ? handleSkinType("") : handleSkinType("sensitive")}>
                <Text style={[styles.optiontitle, isSensitive ? styles.optiontitleactive : styles.optiontitle]}>Sensitive</Text>
                <Text  style={[styles.optioninfo, isSensitive ? styles.optioninfoactive : styles.optioninfo]}>Easily irritated or reactive</Text>
            </Pressable>
            <View style={styles.buttons}>
                <Pressable style={styles.backbutton}
                onPress={() => router.push("/")}><Text style={{fontSize: 15}}>Back</Text>
                </Pressable>
                <Pressable style={isDisabled ? styles.nextbtndisabled :styles.nextbutton}
                disabled={isDisabled}
                onPress={() => router.push("/sensitivity")}><Text style={{color: '#ffffffff', fontSize: 15}}>Continue</Text>
                </Pressable>
                
                
            </View>
        </View>
    )
}

 const styles = StyleSheet.create({
    question:{
        color: '#04a2adff',
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "serif",
        marginVertical: 20
    },
    description:{
        color: '#767676ff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "200",
        marginBottom: 30
    },
    option:{
        color: '#003119ff',
        backgroundColor: '#f5faf7ff',
        marginVertical: 10, 
        width: 300,
        paddingVertical: 10, 
        padding: 30,
        borderColor: '#a2d8beff', 
        borderWidth: 0.7,
        borderRadius: 20
    },
    optiontitle:{
        fontFamily: 'serif',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10 
    },
    optiontitleactive:{
        color: '#fcffffff',
    },
    optioninfoactive:{
        color: '#fcffffff',
    },
    optioninfo:{
        fontFamily: 'serif',
         fontSize: 15,
    },
    optionactive:{
        color: '#fcffffff',
        backgroundColor: '#04a2adff',
        marginVertical: 10, 
        padding: 30, 
        width: 300,
        borderColor: '#00b35cff', 
        borderWidth: 0.7,
        borderRadius: 20,
        transform: [{scale: 1.1}],
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