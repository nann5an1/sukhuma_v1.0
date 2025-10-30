
import {View, Text, Button, StyleSheet, Pressable, Alert} from 'react-native';
import { router } from 'expo-router';
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import * as Progress from 'react-native-progress';
export default function skin_types() {
    const {skinData, setSkinData} = useContext(SkinDataContext); //parse the conetext object not the context component(SkinDataProvider)
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
            skinData && skinData.sensitivity && skinData.sensitivity.length > 0 ? setIsDisabled(false) : setIsDisabled(true);
        }, [skinData.sensitivity]);
    function handleSkinType(skinType){
        setSkinData({...skinData, sensitivity: skinType});
    }
    const isNotSensitive = skinData.sensitivity === "not";
    const isSlightly = skinData.sensitivity === "slightly";
    const isModerate = skinData.sensitivity === "moderate";
    const isVery = skinData.sensitivity === "very";

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffffff'}}>
            <Progress.Bar progress={0.25} width={300} color='#0097f5ff' animationType='spring'/>
            <Text style={styles.question}>How sensitive is your skin?</Text>
            <Text style={styles.description}>This helps us recommend gentle products</Text>
            <Pressable 
                style={[styles.option, isNotSensitive ? styles.optionactive : styles.option]} onPress={() => {isNotSensitive ? handleSkinType("") : handleSkinType("not")}}>
                <View style={styles.optioncontainer}>
                    {/* <Text style={styles.emoji}>💪</Text> */}
                    <View>
                        <Text style={[styles.optiontitle, isNotSensitive ? styles.optiontitleactive  : styles.optiontitle]}>Not Sensitive</Text>
                        <Text style={[styles.optioninfo, isNotSensitive ? styles.optioninfoactive  : styles.optioninfo]}>My skin tolerate most products</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable style={[styles.option, isSlightly ? styles.optionactive : styles.option]} onPress={() => isSlightly ? handleSkinType("") : handleSkinType("slightly")}>
                <View style={styles.optioncontainer}>
                    {/* <Text style={styles.emoji}>🤔</Text> */}
                    <View>
                        <Text style={[styles.optiontitle,isSlightly ? styles.optiontitleactive : styles.optiontitle]}>Slightly Sensitive</Text>
                        <Text  style={[styles.optioninfo, isSlightly ? styles.optioninfoactive : styles.optioninfo]}>Occational reactions to new products</Text>
                    </View>
                </View>
            </Pressable>
              <Pressable style={[styles.option, isModerate ? styles.optionactive : styles.option]} onPress={() => isModerate ? handleSkinType("") : handleSkinType("moderate")}>
                <Text style={[styles.optiontitle, isModerate ? styles.optiontitleactive : styles.optiontitle]}>Moderatly Sensitive</Text>
                <Text  style={[styles.optioninfo, isModerate ? styles.optioninfoactive : styles.optioninfo]}>Frequent reactions to products</Text>
            </Pressable>
              <Pressable style={[styles.option, isVery ? styles.optionactive : styles.option]} onPress={() =>  isVery ? handleSkinType("") : handleSkinType("very")}>
                <Text style={[styles.optiontitle, isVery ? styles.optiontitleactive : styles.optiontitle]}>Very Sensitive</Text>
                <Text  style={[styles.optioninfo, isVery ? styles.optioninfoactive : styles.optioninfo]}>Reacts to many products easily</Text>
            </Pressable>
            <View style={styles.buttons}>
                <Pressable style={styles.backbutton}
                onPress={() => router.push("/skin_types")}><Text style={{fontSize: 15}}>Back</Text>
                </Pressable>
               
                <Pressable style={isDisabled ? styles.nextbtndisabled :styles.nextbutton}
                onPress={() => router.push("/skincare_exp")}
                disabled={isDisabled}><Text style={{color: '#ffffffff', fontSize: 15}}>Continue</Text>
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
    emoji:{
        fontSize: 25,
        paddingRight: 10
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
    optioncontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        marginTop: 100,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    }
});