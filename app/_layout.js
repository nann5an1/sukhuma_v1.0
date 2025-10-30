// app/_layout.js
import { View } from 'react-native';
import { Stack } from 'expo-router';
import SkinDataProvider from '../context/SkinDataContext';

export default function RootLayout() {

  return (
    <SkinDataProvider>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="skin_types" options={{ title: "Skin Type" }} />
          <Stack.Screen name="sensitivity" options={{ title: "Sensitivity" }} />
          <Stack.Screen name="skincare_exp" options={{ title: "Skincare Experience" }} />
          <Stack.Screen name="details" options={{ title: "Details" }} />
          <Stack.Screen name="concerns" options={{ title: "Concerns" }} />
          <Stack.Screen name="preferences" options={{ title: "Preferences" }} />
          <Stack.Screen name="lifestyle" options={{ title: "Lifestyle" }} />
          <Stack.Screen name="budget" options={{ title: "Budget" }} />
          <Stack.Screen name="routine" options={{ title: "Routine" }} />
        </Stack>
      </View>
    </SkinDataProvider>
  );
}
