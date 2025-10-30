import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {useState, useContext, useEffect} from 'react';
import {SkinDataContext} from '../context/SkinDataContext';
import {router} from 'expo-router';
import { Text, StyleSheet, View, FlatList, ActivityIndicator, Pressable, Alert } from "react-native";
import { RefreshCw, Download, Sun, Moon, Calendar, Lightbulb, Sparkles, Heart, ShoppingBag } from "lucide-react-native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function Routine(){
    const {skinData, setSkinData} = useContext(SkinDataContext);
    const [data, setData] = useState([]);
    const [treatments, setTreatments] = useState({ weekelytreatments: [], tips: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [generatingPDF, setGeneratingPDF] = useState(false);

    useEffect(() => {
        console.log("Skindata in routine output: ", skinData);    
        fetchFromLlama();
    }, []);

    async function fetchFromLlama(){
        const API_URL = process.env.NODE_ENV === "development" ? "http://192.168.0.7:3000" : "https://sukhuma-api.vercel.app";
        console.log("API URL", API_URL);
        try {
            // console.log("Skin data: ", skinData);
            setLoading(true);
            const response = await fetch(`${API_URL}/skincareroutine`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(skinData),
            });
            
            if(response.ok){
                const result = await response.json();
                console.log("Full response: ", result);
                console.log("Type of result: ", typeof result);
                
                // If result is a string, parse it
                let parsedResult = result;
                if (typeof result === 'string') {
                    parsedResult = JSON.parse(result);
                }
                
                // console.log("Parsed data: ", parsedResult);
                // console.log("Data array: ", parsedResult.data);
                // console.log("Treatments: ", parsedResult.treatments);
                
                setData(parsedResult.data || []);
                setTreatments(parsedResult.treatments || { weekelytreatments: [], tips: [] });
                setLoading(false);
            } else {
                console.error("Response not OK:", response.status);
                setError("Failed to fetch skincare routine");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error in getting response from api:", error);
            setError(error.message);
            setLoading(false);
        }
    }

    const generateHTMLContent = () => {
        let routinesHTML = '';
        
        // Generate routines (Morning and Evening)
        data.forEach(timeSection => {
            const isMorning = timeSection.time === "Morning";
            const bgColor = isMorning ? "#fff7d8" : "#e9deff";
            const borderColor = isMorning ? "#fbb32e" : "#5e3aa4";
            const textColor = isMorning ? "#fe942a" : "#5e3aa4";
            const iconColor = isMorning ? "#f9830e" : "#5e3aa4";
            const icon = isMorning ? "☀️" : "🌙";
            
            routinesHTML += `
                <div style="margin-top: 20px; margin-bottom: 25px; padding: 10px; background-color: ${bgColor}; border: 1px solid ${borderColor}; border-radius: 10px; text-align: center;">
                    <h2 style="color: ${textColor}; font-family: serif; margin: 0;">${icon} ${timeSection.time} Routine</h2>
                </div>
            `;
            
            timeSection.routine.forEach(item => {
                const idBg = isMorning ? "#fcd691" : "#e4d0fb";
                const idColor = isMorning ? "#f68802" : "#5200af";
                const productBg = isMorning ? "#fff6e4" : "#f7f0ff";
                const productBorder = isMorning ? "#fbb32e" : "#5200af";
                
                routinesHTML += `
                    <div style="display: flex; margin: 20px 0; gap: 10px;">
                        <div style="min-width: 30px; height: 30px; background-color: ${idBg}; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <strong style="color: ${idColor}; font-size: 17px;">${item.id}</strong>
                        </div>
                        <div style="flex: 1;">
                            <h3 style="color: #3b3b3b; font-family: serif; margin: 0 0 10px 0;">${item.title}</h3>
                            <p style="color: #848383; font-family: serif; margin: 0 0 10px 0; font-size: 14px;">${item.info}</p>
                            <p style="color: #555; font-family: serif; font-style: italic; font-size: 14px; margin: 10px 0 5px 0;">🛍️ Recommended Products:</p>
                            ${item.products ? item.products.map(product => `
                                <div style="background-color: ${productBg}; border: 1px solid ${productBorder}; border-radius: 10px; padding: 5px; margin: 5px 0; text-align: center;">
                                    <span style="color: #291f12; font-size: 13px;">${product}</span>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                `;
            });
        });

        // Generate weekly treatments
        let treatmentsHTML = '';
        if (treatments.weekelytreatments && treatments.weekelytreatments.length > 0) {
            treatmentsHTML = `
                <div style="margin: 30px 0; padding: 10px; background-color: #e6fff8; border: 1px solid #04a2ad; border-radius: 10px; text-align: center;">
                    <h2 style="color: #04a2ad; font-family: serif; margin: 0;">📅 Weekly Treatment</h2>
                </div>
            `;
            
            treatments.weekelytreatments.forEach(item => {
                treatmentsHTML += `
                    <div style="display: flex; margin: 20px 0; gap: 10px; align-items: flex-start;">
                        <div style="background-color: #e6fff8; border: 1px solid #04a2ad; border-radius: 10px; padding: 6px; min-width: 80px; text-align: center;">
                            <strong style="color: #04a2ad; font-size: 12px; font-family: serif;">${item.times}</strong>
                        </div>
                        <div style="flex: 1;">
                            <h3 style="color: #3b3b3b; font-family: serif; margin: 0 0 10px 0;">${item.treatment}</h3>
                            <p style="color: #3b3b3b; font-family: serif; margin: 0; font-size: 13px;">${item.info}</p>
                        </div>
                    </div>
                `;
            });
        }

        // Generate tips
        let tipsHTML = '';
        if (treatments.tips && treatments.tips.length > 0) {
            tipsHTML = `
                <div style="margin: 30px 0; padding: 10px; background-color: #fff6ca; border: 1px solid #f3b600; border-radius: 10px; text-align: center;">
                    <h2 style="color: #ffbf00; font-family: serif; margin: 0;">💡 Pro Tips for Better Results</h2>
                </div>
            `;
            
            treatments.tips.forEach(item => {
                tipsHTML += `
                    <div style="background-color: #fff8d7; border: 1px solid #fbb32e; border-radius: 10px; padding: 10px; margin: 10px 0;">
                        <p style="color: #848383; font-family: serif; margin: 0; font-size: 14px;">${item.info}</p>
                    </div>
                `;
            });
        }

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: serif;
                        padding: 20px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                </style>
            </head>
            <body>
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="width: 50px; height: 50px; background-color: #04a2ad; border-radius: 50%; margin: 50px auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 30px;">
                        ❤️
                    </div>
                    <h1 style="color: #04a2ad; font-family: serif; margin: 20px 0;">Your Perfect Routine is Ready!</h1>
                    <p style="color: #2b2a2a; font-family: serif; font-size: 15px;">Personalized for you based on your skincare needs</p>
                </div>
                
                ${routinesHTML}
                ${treatmentsHTML}
                ${tipsHTML}
                
                <div style="background-color: #ffd4d4; border: 1px solid #f84d44; border-radius: 10px; padding: 15px; margin: 20px 0;">
                    <p style="color: #f12929; font-family: serif; font-size: 13px; margin: 0;">
                        ⚠️ Important: Introduce new products gradually (one at a time) and always patch test. For persistent concerns, consult a dermatologist.
                    </p>
                </div>
            </body>
            </html>
        `;
    };

    const saveAsPDF = async () => {
        // Prevent multiple simultaneous PDF generation requests
        if (generatingPDF) {
            return;
        }

        try {
            setGeneratingPDF(true);
            const html = generateHTMLContent();
            
            // Generate PDF
            const { uri } = await Print.printToFileAsync({
                html,
                base64: false
            });

            // Check if sharing is available
            const isAvailable = await Sharing.isAvailableAsync();
            
            if (isAvailable) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Save your skincare routine',
                    UTI: 'com.adobe.pdf'
                });
            } else {
                Alert.alert(
                    'Success',
                    `PDF saved to: ${uri}`,
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert(
                'Error',
                'Failed to generate PDF. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setGeneratingPDF(false);
        }
    };

    const renderItem = ({item}, time) => {
        return (
            <View style={styles.cardcontainer}>
                <View style={[styles.idcontainer, time === "Morning" ?  null : {backgroundColor: "#e4d0fbff"}]}>
                    <Text style={[styles.idcontainertext, time === "Morning" ? null : {color: "#5200afff"}]}>{item.id}</Text>
                </View>
                <View style={styles.carddetailscontainer}>
                    <Text style={styles.cardtitle}>{item.title}</Text>
                    <Text style={styles.cardinfo}>{item.info}</Text>
                    <Text style={styles.recommendtitle}>
                        <ShoppingBag size={18} color={"#555555ff"}/>  Recommended Products:
                    </Text>
                    {item.products && item.products.map((product, index) => {
                        return(
                            <View key={index} style={[styles.productinfo, time === "Morning" ?  null : {backgroundColor: "#f7f0ffff", borderColor: "#5200afff"}]}>
                                <Text style={{color: "#291f12bd", fontSize: 13, textAlign: "center"}}>{product}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    };

    const renderTimeSection = ({item}) => {
        return (
            <>
                <View style={[styles.headercontainer, item.time === "Evening" ? {backgroundColor: "#e9deffff", borderColor: "#5e3aa4ff"} : {color: "#fe942aff"}]}>
                    <View>
                        {item.time === "Evening" ? <Moon size={24} color="#5e3aa4ff"/> : <Sun size={28} color="#f9830eff"/>}
                    </View>
                    <Text style={[styles.headertitle, item.time === "Evening" ? {color: "#5e3aa4ff"} : {color: "#fe942aff"}]}>
                        {item.time} Routine
                    </Text>
                </View>
                <FlatList 
                    data={item.routine}
                    renderItem={(itemData) => renderItem(itemData, item.time)}
                    keyExtractor={routine => String(routine.id)}
                    scrollEnabled={false}
                />
            </>
        );
    }

    const renderTreatments = ({item}) => {
        return (
            <View style={styles.treatmentcontainer}>
                <View style={styles.treatmenttimescontainer}>
                    <Text style={styles.treatmenttimes}>{item.times}</Text>
                </View>
                <View style={styles.treatmentdetailscontainer}>
                    <Text style={styles.cardtitle}>{item.treatment}</Text>
                    <Text style={styles.treatmentinfo}>{item.info}</Text>
                </View>
            </View>
        );
    }

    const renderHeader = () => (
        <View style={styles.headerSection}>
            <View style={styles.heartcontainer}>
                <Heart size={38} color="#ffffff" fill="#ffffff"/>
            </View> 
            <Text style={styles.question}>Your Perfect Routine is Ready!</Text>
            <Text style={styles.description}>Personalized for you based on your skincare needs</Text>
        </View>
    );

    const renderTreatmentHeader = () => (
        <View style={styles.treatmentSectionHeader}>
            <View style={styles.icon}>
                <Calendar size={24} color="#04a2adff"/>
            </View>
            <Text style={[styles.headertitle,{ color: "#04a2adff"}]}>Weekly Treatment</Text>
        </View>
    );

    const renderTipsHeader = () => (
        <View style={[styles.treatmentSectionHeader, {backgroundColor: "#fff6caff", borderColor: "#f3b600ff"}]}>
            <View style={styles.icon}>
                <Lightbulb size={24} color="#ffbf00ff"/>
            </View>
            <Text style={[styles.headertitle,{ color: "#ffbf00ff"}]}>Pro Tips for Better Results</Text>
        </View>  
    );

    const renderTips = ({item}) => {
        return (
            <View style={styles.tipscontainer}>
                <View style={styles.tipsdetailscontainer}>
                    <Text style={styles.cardinfo}>{item.info}</Text>
                </View>
            </View>
        );
    };

    const renderImportant = () => {
        return (
            <View style={styles.important}>
                <Text style={{fontSize: 13, fontFamily: "serif", color: "rgba(241, 41, 41, 1)", textAlign: "start"}}>
                    ⚠️ Important: Introduce new products gradually (one at a time) and always patch test. For persistent concerns, consult a dermatologist.
                </Text>
            </View>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator size="large" color="#04a2adff" />
                    <Text style={{marginTop: 20, color: "#848383ff"}}>Creating your personalized routine...</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    // Show error state
    if (error) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff", justifyContent: "center", alignItems: "center", padding: 20}}>
                    <Text style={{color: "red", textAlign: "center"}}>Error: {error}</Text>
                    <Text style={{marginTop: 10, color: "#848383ff", textAlign: "center"}}>
                        Please check your connection and try again.
                    </Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }


    const renderButtons = () => {
        return ( 
       <View style={styles.buttons}>
            <Pressable style={styles.backbutton}
            onPress={() => router.push("/skin_types")}><Text style={{fontSize: 15}}>Start Over</Text>
            </Pressable>
            <Pressable 
                style={[styles.nextbutton, generatingPDF && {opacity: 0.6}]}
                onPress={() => saveAsPDF()}
                disabled={generatingPDF}
            >
                <Text style={{color: '#ffffffff', fontSize: 15}}>
                    {generatingPDF ? '⏳ Generating...' : <><Download size={15} color="#ffffffff"/>  Save Routine As PDF</>}
                </Text>
            </Pressable>
        </View>
        );
    }

    // Build allData only after data is loaded
    const allData = [
        { type: 'header' },
        ...data.map((item, index) => ({ type: 'routine', data: item, index })),
        { type: 'treatmentHeader' },
        ...(treatments.weekelytreatments || []).map((item, index) => ({ type: 'treatment', data: item, index })),
        { type: 'tipsHeader' },
        ...(treatments.tips || []).map((item, index) => ({ type: 'tips', data: item, index })),
        { type: 'important' },
        { type: 'buttons' },
    ];

    const renderAllItems = ({ item }) => {
        if (item.type === 'header') {
            return renderHeader();
        } else if (item.type === 'routine') {
            return renderTimeSection({ item: item.data });
        } else if (item.type === 'treatmentHeader') {
            return renderTreatmentHeader();
        } else if (item.type === 'treatment') {
            return renderTreatments({ item: item.data });
        } else if (item.type === 'tipsHeader') {
            return renderTipsHeader();
        } else if(item.type === 'tips') {
            return renderTips({item: item.data});
        } else if(item.type === 'important') {
            return renderImportant();
        } else if(item.type == 'buttons'){
            return renderButtons();
        }
    };

    return(
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
                <FlatList 
                    data={allData}
                    renderItem={renderAllItems}
                    keyExtractor={(item, index) => String(index)}
                    contentContainerStyle={styles.flatlistcontainer}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
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
        marginBottom: 35
    },
    icon:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: 40,
        height: 40,
    },
    headercontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 20,
        marginBottom: 25,
        borderRadius: 10,
        borderWidth: 0.6,
        backgroundColor: "#fff7d8ff",
        borderColor: "#fbb32eff",
        paddingVertical: 10
    },
    headertitle:{
        fontFamily: 'serif',
        fontSize: 17,
        fontWeight: "semibold",
        color: '#fbb32eff',
        fontWeight: "bold"
    },
    heartcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 50,
        height: 50,
        padding: 35,
        backgroundColor: "#04a2adff",
        marginTop: 50
    },
    headerSection:{
        alignItems: 'center'
    },
    treatmentSectionHeader:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e6fff8ff",
        borderRadius: 10,
        borderColor: "#04a2adff",
        borderWidth: 0.6,
        height: 50,
        padding: 10,
        marginVertical: 30
    },
    flatlistcontainer:{
        padding: 20
    },
    cardcontainer:{
        justifyContent: 'center',
        alignItems: 'start',
        flexDirection: 'row',
        gap: 10,
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 20,
        borderRadius: 15
    },
    idcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 30,
        height: 30,
        backgroundColor: "#fcd691ff"
    },
    treatmenttimescontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e6fff8ff",
        padding: 6,
        borderRadius: 10,
        marginVertical: 2,
        borderWidth: 0.6,
        borderColor: "#04a2adff"
    },
    tipscontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff8d7ff",
        padding: 10,
        borderRadius: 10,
        marginVertical: 2,
        borderWidth: 0.6,
        borderColor: "#fbb32eff",
        padding: 10
    },
    tipsdetailscontainer:{
        borderRadius: 10,
        padding: 5,
        width: 300
    },
    idcontainertext:{
        fontSize: 17, 
        color: "#f68802ff", 
        fontWeight: "bold"
    },
    carddetailscontainer:{
        borderRadius: 10,
        padding: 5,
        width: 300,
        gap: 10
    },
    cardtitle:{
        color: "#3b3b3bff",
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "serif"
    },
    cardinfo:{
        fontSize: 14,
        fontWeight: "semibold",
        fontFamily: "serif",
        color: "#848383ff",
        padding: 2
    },
    productinfo:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff6e4ff", 
        padding: 5, 
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: "#fbb32eff",
    },
    recommendtitle:{
        color: "#3b3b3bff",
        fontSize: 14,
        fontWeight: "semibold",
        fontFamily: "serif",
        fontStyle: "italic",
        paddingTop: 10
    },
    treatmentcontainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        width: "100%",
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 10
    },
    treatmentdetailscontainer:{
        borderRadius: 10,
        width: 200,
        gap: 10
    },
    treatmenttimes:{
        textAlign: "center",
        color: "#04a2adff",
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: "serif"
    },
    treatmentinfo:{
        fontSize: 13,
        fontFamily: "serif",
        fontWeight: "light",
        color: "#3b3b3bff",
    },
    important:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffd4d4ff", 
        padding: 15, 
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: "#f84d44ff",
        marginTop: 20
    },
    backbutton:{
        paddingVertical: 8, 
        paddingHorizontal: 30,
        borderColor: '#767676ff',
        borderWidth: 1,
        borderRadius: 10,
    },
    nextbutton:{
        paddingVertical: 8, 
        paddingHorizontal: 20,
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
        gap: 30
    }
});