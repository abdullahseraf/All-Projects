import { View, Text, StatusBar, Pressable } from "react-native";
import { useTheme } from "@/src/theme/ThemeContext";
import { typography } from "@/src/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PrayerDetails() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle="light-content" backgroundColor={"#00000000"} />

      {/* Header */}
      <View
        style={{
          width: "100%",
          height: 100,
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderBottomRightRadius: 50,
          backgroundColor: theme.Header,
          flexDirection: "row",
        }}
      >
        <Pressable onPress={() => router.push("/tabs/prayers")}>
          <Ionicons
            style={{
              color: theme.cTitle,
              paddingLeft: 25,
              paddingBottom: 15,
            }}
            name="chevron-back"
            size={25}
          />
        </Pressable>
        <Text
          style={[
            typography.elmessiriBold,
            {
              paddingRight: 35,
              paddingBottom: 15,
              fontSize: 20,
              color: theme.cTitle,
            },
          ]}
        >
          الظهر
        </Text>
      </View>
      {/* card */}
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 15,
        }}
      >
        <View
          style={{
            height: 120,
            width: "100%",
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 10,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom: 15,
          }}
        >
          <Text
            style={[
              typography.elmessiriBold,
              {
                color: theme.cTitle,
                fontSize: 20,
                paddingBottom: 10,
                paddingRight: 20,
              },
            ]}
          >
            الفرض
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.cardAlt,
              height: 55,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={[
                typography.elmessiriBold,
                { fontSize: 16, color: theme.cText },
              ]}
            >
              اربع ركعات
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 120,
            width: "100%",
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 10,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom: 15,
          }}
        >
          <Text
            style={[
              typography.elmessiriBold,
              {
                color: theme.cTitle,
                fontSize: 20,
                paddingBottom: 10,
                paddingRight: 20,
              },
            ]}
          >
            السنة القبلية
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.cardAlt,
              height: 55,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={[
                typography.elmessiriBold,
                { fontSize: 16, color: theme.cText },
              ]}
            >
              ركعتان + ركعتان
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 120,
            width: "100%",
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 10,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={[
              typography.elmessiriBold,
              {
                color: theme.cTitle,
                fontSize: 20,
                paddingBottom: 10,
                paddingRight: 20,
              },
            ]}
          >
            السنة البعدية
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.cardAlt,
              height: 55,
              borderRadius: 12,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={[
                typography.elmessiriBold,
                { fontSize: 16, color: theme.cText },
              ]}
            >
              ركعتان
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
