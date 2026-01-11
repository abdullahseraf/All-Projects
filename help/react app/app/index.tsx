import MenuItems from "@/component/fatlist";
import AbdullahInput from "@/component/input";
import MenuItemsSection from "@/component/sectionlist";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { Button } from "react-native-paper";

export default function App() {
  const [visible, setVisible] = useState(true);
  const [Imagevisible, setImageVisible] = useState(true);
  const window = useWindowDimensions();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100%",
      }}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#1a1a1aff" : "#fffcfcff"}
      ></StatusBar>
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
            <ScrollView style={{ height: 220 }}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.Image}
              />
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.Image}
              />
            </ScrollView>
          </View>
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
      <Image
        source={require("@/assets/images/icon.png")}
        style={{ borderRadius: 10, width: 64, height: 64, marginTop: 20 }}
      />{" "}
      <View
        style={{
          backgroundColor: "#323232ff",
          width: "100%",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <Pressable onPress={() => setVisible(true)}>
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 50,
              fontSize: 20,
            }}
          >
            open modal
          </Text>
        </Pressable>
        <Pressable onPress={() => setImageVisible(true)}>
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            open Image
          </Text>
        </Pressable>
        <Modal visible={Imagevisible} animationType="fade">
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#353535ff",
            }}
          >
            <ScrollView
              style={{
                height: 400,
                marginTop: 50,
                borderWidth: 7,
                borderRadius: 10,

                borderColor: "#535353ff",
              }}
            >
              <Image
                source={require("@/assets/images/icon.png")}
                style={{
                  borderRadius: 10,
                  width: 300,
                  height: 200,
                  marginBottom: 20,
                }}
              />
              <Image
                source={require("@/assets/images/icon.png")}
                style={{
                  borderRadius: 10,
                  width: 300,
                  height: 200,
                  marginBottom: 20,
                }}
              />
              <Image
                source={require("@/assets/images/icon.png")}
                style={{
                  borderRadius: 10,
                  width: 300,
                  height: 200,
                  marginBottom: 20,
                }}
              />
              <Image
                source={require("@/assets/images/icon.png")}
                style={{
                  borderRadius: 10,
                  width: 300,
                  height: 200,
                  marginBottom: 20,
                }}
              />
            </ScrollView>
            <Button
              style={styles.Button}
              textColor="white"
              onPress={() => setImageVisible(false)}
            >
              Close Image
            </Button>
            <View style={{ alignItems: "flex-start", marginBottom: 20 }}>
              <Text style={styles.regular}>Window Dimensions</Text>
              <Text
                style={[
                  styles.regular,
                  { color: isDarkMode ? "#b7b7b7ff" : "black" },
                ]}
              >
                Height: {window.height}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { color: isDarkMode ? "#b7b7b7ff" : "black" },
                ]}
              >
                Width: {window.width}
              </Text>
              <Text
                style={[
                  styles.regular,
                  { color: isDarkMode ? "#dcdcdcff" : "black" },
                ]}
              >
                Font scale: {window.fontScale}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
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
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  header: {
    paddingTop: 10,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  regular: {
    paddingTop: 10,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "700",
  },
  headerA: {
    marginTop: -30,
    marginBottom: 0,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
});
