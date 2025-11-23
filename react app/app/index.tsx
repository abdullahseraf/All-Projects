import { Button } from "react-native-paper";
import { Image, Text, View, Pressable, Modal, StatusBar } from "react-native";
import { useState } from "react";

export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor={"#fff"}></StatusBar>
      <View>
        <Modal visible={visible} animationType="fade">
          <Text
            style={{
              marginTop: 350,
              marginBottom: 20,
              justifyContent: "center",
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Hello, I am a Abdullah!
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              style={{ width: 200, backgroundColor: "#2d2d2dff" }}
              textColor="white"
              onPress={() => setVisible(false)}
            >
              Click To Close
            </Button>
          </View>
        </Modal>
      </View>
      <View></View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        abdullah
      </Text>
      <View style={{ marginTop: 20 }}>
        <Pressable onPress={() => setVisible(true)}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "medium",
              color: "white",
              backgroundColor: "#2d2d2dff",
              padding: 10,
              borderRadius: 25,
              textAlign: "center",
              width: 200,
            }}
          >
            open modal
          </Text>
        </Pressable>
      </View>
      <Image
        source={require("@/assets/images/icon.png")}
        style={{ borderRadius: 10, width: 64, height: 64, marginTop: 20 }}
      />
    </View>
  );
}
