import { Text, StyleSheet, View, Pressable, FlatList } from "react-native";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';


const data = [
    {
        id:"1",
        title: "Anti-Aging",
        key: "antiaging"
    },
    {
        id:"2",
        title: "Dark Spots",
        key: "darkspots",
    },
     {
        id:"3",
        title: "Dryness",
        key: "dryness",
    },
     {
        id:"4",
        title: "Large Pores",
        key: "largepores",
    },
     {
        id:"5",
        title: "Dullness",
        key: "dullness",
    },
     {
        id:"6",
        title: "Redness",
        key: "redness",
    },
    {
        id:"7",
        title: "Uneven Texture",
        key: "uneventexture",
    },
    {
        id:"6",
        title: "Oiliness/Shine",
        key: "oiliness",
    },
    {
        id:"6",
        title: "Fine Lines",
        key: "finelines",
    },
    {
        id:"6",
        title: "Uneven Tone",
        key: "uneventone",
    }
];
export default function concerns(){
    const {skinData, setSkinData} = useContext(SkinDataContext);
    const [skinConcerns, setSkinConcerns] = useState([]);
    const [selectCount, setSelectCount] = useState(0);

     useEffect(() => {
        if (skinData?.skinConcerns && Array.isArray(skinData.skinConcerns) && skinData.skinConcerns.length > 0) {
            setSkinConcerns(skinData.skinConcerns);
        }
    }, []);

    function handleSkinData(){
        console.log("skinConcernsArray in handleSkinData: ", skinConcerns);
        setSkinData({...skinData, skinConcerns: skinConcerns});
        router.push("/preferences");
    }

    function toggleSkinConcerns(concerns){
        if(skinConcerns.includes(concerns)){
            setSkinConcerns(skinConcerns.filter((item) => item !== concerns));
            if (selectCount != 0)setSelectCount(selectCount - 1);
        }
        else{
            setSkinConcerns([...skinConcerns, concerns]);
            setSelectCount(selectCount + 1);
        }
    }

    function renderItem({item}){
        const valueExists = skinConcerns.includes(item.key);
        // console.log("valueExists: ", valueExists);
        return(
            <Pressable 
            onPress={() => toggleSkinConcerns(item.key)}
            style={[styles.option, valueExists ? styles.optionactive : null]}>
                <Text style={[styles.optiontitle, valueExists && styles.optiontitleactive]}>{item.title}</Text>
            </Pressable>
            
        );
    }
    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#ffffffff'}}>
                <View style={styles.pageheader}>
                    <Progress.Bar progress={0.625} width={300} color='#0097f5ff' animationType='spring'/>
                    <Text style={styles.question}>What are your main concerns?</Text>
                    <Text style={styles.description}>Select all that apply (or skip if none)</Text>
                </View>
                <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={styles.listcontainer}
                >
                </FlatList>
                <View style={styles.status}>
                    {selectCount > 0 ? <Text style={styles.statusinfo}>You've selected {selectCount} concern(s)</Text> :
                    <Text style={styles.statusinfo}>No concerns? That's great! You can continue without selecting any.</Text>}
                    
                </View>
                <View style={styles.buttons}>
                    <Pressable style={styles.backbutton}
                    onPress={() => router.push("/details")}><Text style={{fontSize: 15}}>Back</Text>
                    </Pressable>
                    <Pressable style={styles.nextbutton}
                    onPress={handleSkinData}
                    ><Text style={{color: '#ffffffff', fontSize: 15}}>Continue</Text>
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
        marginVertical: 20
    },
    description:{
        color: '#767676ff',
        fontFamily: "serif",
        fontSize: 15,
        fontWeight: "170",
        fontSize: 16,
        marginBottom: 30
    },
    option:{
        justifyContent: 'center',
        marginHorizontal: 10,
        backgroundColor: '#f5faf7ff',
        padding: 10,
        width: 150,
        height:50,
        borderRadius: 20,
        borderWidth: 0.8,
        borderColor: '#a2d8beff',
    },
    optionactive:{
        textAlign: 'center',
        backgroundColor: '#04a2adff',
        padding: 10,
        width: 150,
        height:50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#04a2adff'
    },
    optiontitle:{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 15,
        color: '#3b494aff'
    },
    optiontitleactive:{
        textAlign: 'center',
        fontFamily: "serif",
        fontSize: 15,
        color: '#ffffffff'
    },
    listcontainer:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    status:{
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 30,
        width: 300,
        height: 80,
        borderColor: '#04a2adff',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 20,
        padding: 20
    },
    statusinfo:{
        textAlign: 'center',
        color: '#3f4b4cff',
        fontFamily: "serif",
        fontSize: 15
    },
     buttons:{
        marginVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
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
});