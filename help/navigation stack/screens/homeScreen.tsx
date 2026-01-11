import { RootStackParamList } from "@/app/index";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>الصفحة الرئيسية</Text>
      <Image
        source={require("@/assets/images/start.png")}
        style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 15 }}
      />
      <Pressable
        onPress={() => navigation.navigate("About")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        {" "}
        <Image
          source={require("@/assets/images/start.png")}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            borderRadius: 15,
          }}
        />
        <Text style={styles.buttonText}>اذهب إلى صفحة About</Text>
        <Text style={styles.buttonText}>اذهب إلى صفحة About</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Cairo-Bold",
  },
  button: {
    backgroundColor: "#344986ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 30,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Cairo-Bold",
    marginBottom: 50,
  },
});
