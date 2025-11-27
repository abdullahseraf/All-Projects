import { Button } from "react-native-paper";
import {
  Image,
  Text,
  View,
  Pressable,
  Modal,
  StatusBar,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [visible, setVisible] = useState(true);
  const styles = {
    Image: {
      borderRadius: 10,
      borderColor: "#666666ff",
      borderWidth: 4,
      height: 200,
      width: 360,
      marginBottom: 20,
    },
    Button: {
      width: 200,
      backgroundColor: "#2d2d2dff",
      padding: 10,
      borderRadius: 20,
      fontSize: 16,
      textAlign: "center",
      fontWeight: "500",
      color: "white",
    },
    header: {
      marginTop: 150,
      marginBottom: 20,
      fontSize: 30,
      fontWeight: "700",
      textAlign: "center",
    },
  };
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
            style={styles.header}
          >
            Hello, I am a Abdullah!
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              style={styles.Button}
              textColor="white"
              onPress={() => setVisible(false)}
            >
              Click To Close
            </Button>
          </View>
          <View style={{ alignItems: "center", marginTop: 40, flex: 1 }}>
            <Text style={{ marginBottom: 10, fontWeight: "400", fontSize: 16 }}>
              Scroll down to see more images:
            </Text>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <Image
                style={styles.Image}
                source={require("@/assets/images/weather.png")}
              ></Image>
              <Image
                style={styles.Image}
                source={require("@/assets/images/Rectangle 12.png")}
              ></Image>
              <Image
                style={styles.Image}
                source={require("@/assets/images/Rectangle 11.png")}
              ></Image>
            </ScrollView>
          </View>
        </Modal>
      </View>
      <Text
        style={styles.header}
      >
        abdullah
      </Text>
      <View style={{ marginTop: 20 }}>
        <Pressable onPress={() => setVisible(true)}>
          <Text style={styles.Button}>open modal</Text>
        </Pressable>
      </View>
      <Image
        source={require("@/assets/images/icon.png")}
        style={{ borderRadius: 10, width: 64, height: 64, marginTop: 20 }}
      />
    </View>
  );
}
