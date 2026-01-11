
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/homeScreen";
import AboutScreen from "@/screens/aboutScreen";

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
      <Stack.Navigator screenOptions={{ headerTitleStyle: { fontWeight: "bold", color: "#dcdcdcff" }, headerStyle: { backgroundColor: "#1b1b1bff" }, headerShown: true, headerTintColor: "#dcdcdcff" }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
  );
}
