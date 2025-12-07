import { Button } from "react-native-paper";
import {
  Image,
  Text,
  View,
  Pressable,
  Modal,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import MenuItems from "@/component/fatlist";
import MenuItemsSection from "@/component/sectionlist";
import AbdullahInput from "@/component/input";

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
      <View style={{ width: "90%", height: 250 }}>
        <MenuItems />
      </View>
      <View style={{ width: "90%", height: 250 }}>
        <MenuItemsSection />
      </View>
      <View>
        <Modal visible={visible} animationType="fade">
          <AbdullahInput />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Button
              style={styles.Button}
              textColor="white"
              onPress={() => setVisible(false)}
            >
              Click To Close
            </Button>
          </View>
        </Modal>
      </View>
      <Text style={styles.headerA}>abdullah</Text>
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

const styles = StyleSheet.create({
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
    marginBottom: 150,
  },
  header: {
    paddingTop: 10,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  headerA: {
    marginTop: -30,
    marginBottom: 0,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
});
