import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  settingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default function settingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.settingText}>Settings Screen</Text>
    </View>
  );
}
