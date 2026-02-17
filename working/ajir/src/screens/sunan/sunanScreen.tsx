import { typography } from "@/src/theme/typography";
import { useFonts } from "expo-font";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { useTheme } from "@/src/theme/ThemeContext";

export default function SunanScreen() {
  const { theme } = useTheme();

  const sunan = [
    {
      title: "سنة مهجورة",
      textTitel: "التَّنفس عند الشُّرب خارج الإناء ثلاثاً :",
      text: "أَنَسُ بنُ مالِكٍ رضِيَ اللهُ عنه:كان النَّبيُّ صلَّى اللهُ عليه وسلَّم يَتنفَّسُ في الشَّرابِ ثلاثًا، أي: إنَّه عليه الصَّلاةُ والسَّلامُ كان لا يَشرَبُ في نَفَسٍ واحدٍ، وإنَّما يَشرَبُ على ثلاثِ مرَّاتٍ، وفي كُلِّ مرَّةٍ يتنفَّسُ خارجَ الإنَّاءِ، ويقول: هو أَهْنَأُ، أي: هو ألذُّ وأكْثَرُ,"
    },
    {
      title: "سنة مهجورة",
      textTitel: "عدم نزع اليد عند المصافحة حتَّى ينزعها الآخـر :",
      text: "عن أنس رضي الله عنه قال: كان رسول الله صلَّى الله عليه وسلَّم إذا صافح رجلاً لم يترك يده؛ حتَّى يكون المصافح هو التَّارك ليد رسول الله صلَّى الله عليه وسلَّم. صحَّحه الألباني.",
    },
    {
      title: "سنة مهجورة",
      textTitel: "شرب الماء جالساً :",
      text: "عَنْ أَنَسٍ وأَبِي سَعِيدٍ الْخُدْرِيِّ رضي الله عنهما أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ زَجَرَ ( في لفظ : نَهَى) عَنْ الشُّرْبِ قَائِمًا . أخرجه مسلم",
    },
    {
      title: "سنة مهجورة",
      textTitel: "منع الصبيان من الخروج بعد صلاة المغرب :",
      text: "إِذَا كَانَ جُنْحُ اللَّيْلِ أَوْ أَمْسَيْتُمْ فَكُفُّوا صِبْيَانَكُمْ فَإِنَّ الشَّيَاطِينَ تَنْتَشِرُ حِينَئِذٍ فَإِذَا ذَهَبَتْ سَاعَةٌ مِنْ اللَّيْلِ فَخَلُّوهُمْ الحديث رواه البخاري و مسلم",
    },
    {
      title: "سنة مهجورة",
      textTitel:"المضمضه والاستنشاق بكف واحده :",
      text:"(عن عبد الله بن زيد – رضي الله عنه- في صفة وضوء رسول الله صلى الله عليه وسلم : « أنه أفرغ من الإناء على يديه فغسلهما ثم غسل أو مضمض واستنشق من كف واحدة ففعل ذلك ثلاثاً… ثم قال: هكذا وضوء رسول الله – صلى الله عليه وسلم- » أخرجه البخاري ",
    },
    {
      title: "سنة مهجورة",
      textTitel:"المضمضه بعد شرب اللبن :",
      text:"قال رسول الله صلى الله عليه وسلم : ( إذا شربتم اللبن فمضمضوا فإن له دسما ) صحيح ابن ماجه ",
    },
        {
      title: "سنة مهجورة",
      textTitel:"قرآءة بعض السور الخاصة في السنة البعدية للمغرب :",
      text:"ففي الحديث( كان النبي صلى الله عليه وسلم : يقـــرأ في سنة المغرب البعدية { قُلْ يَا أَيُّهَا الْكَافِرُونَ } في الأولى و { قُلْ هُوَ اللَّهُ أَحَدٌ } في الثانية . صحيح النسائي ",
    },
            {
      title: "سنة مهجورة",
      textTitel:"البدء باليمين في لبس الملابس :",
      text:"( كان رسول الله صلى الله عليه وسلم إذا لبس قميصا بدأ بميامنه ) صحيح الترمذي ",
    },
                {
      title: "سنة مهجورة",
      textTitel:"أن ينفض الفراش قبل النوم :",
      text:"( إذا أوى أحدكم إلى فراشه فلينفض فراشه بداخله إزاره فإنه لا يدري ما خلفه عليه ، ثم ليضطجع على شقه الأيمن ، ثم ليقل : باسمك ربي وضعت جنبي ، وبك أرفعه ، إن أمسكت نفسي فارحمها ، وإن أرسلتها فاحفظها بما تحفظ به عبادك الصالحين ) صحيح أبي داود ",
    },
  ];

  const [fontsLoaded] = useFonts({
    ElMessiriRegular: require("@/src/assets/fonts/ElMessiri-Regular.ttf"),
    ElMessiriMedium: require("@/src/assets/fonts/ElMessiri-Medium.ttf"),
    ElMessiriSemiBold: require("@/src/assets/fonts/ElMessiri-SemiBold.ttf"),
    ElMessiriBold: require("@/src/assets/fonts/ElMessiri-Bold.ttf"),
    ReadexProRegular: require("@/src/assets/fonts/ReadexPro-Regular.ttf"),
    ReadexProMedium: require("@/src/assets/fonts/ReadexPro-Medium.ttf"),
    ReadexProSemiBold: require("@/src/assets/fonts/ReadexPro-SemiBold.ttf"),
    ReadexProBold: require("@/src/assets/fonts/ReadexPro-Bold.ttf"),
    AmiriQuran: require("@/src/assets/fonts/AmiriQuran-Regular.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View>
        <Text>Loading fonts...</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle="light-content" backgroundColor={"#00000000"} />

      {/* Header */}
      <View
        style={{
          width: "100%",
          height: 100,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          borderBottomRightRadius: 50,
          backgroundColor: theme.Header,
        }}
      >
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
          السنن
        </Text>
      </View>

      {/*  Scroll فقط للمحتوى */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 15 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
      >
        {sunan.map((item, index) => (
          <View
            key={index}
            style={{
              width: "100%",
              alignItems: "center",
              paddingHorizontal: 15,
              marginTop: 15,
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: theme.card,
                borderRadius: 15,
                paddingTop: 10,
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  marginBottom: 6,
                  marginRight: 15,
                }}
              >
                <Text
                  style={[
                    typography.elmessiriSemiBold,
                    { fontSize: 20, color: theme.cTitle },
                  ]}
                >
                  {item.title}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  backgroundColor: theme.cardAlt,
                  borderRadius: 15,
                  alignItems: "flex-end",
                  paddingTop: 15,
                  paddingRight: 20,
                }}
              >
                <Text
                  style={[
                    typography.elmessiriSemiBold,
                    { color: theme.cText, fontSize: 16 },
                  ]}
                >
                  {item.textTitel}
                </Text>

                <Text
                  style={[
                    typography.elmessiriSemiBold,
                    {
                      color: theme.cParagraph,
                      fontSize: 15,
                      textAlign: "right",
                      paddingTop: 8,
                      paddingBottom: 10,
                      paddingLeft: 15,
                      lineHeight: 30,
                    },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <View
          style={{
            alignItems: "center",
            marginTop: 15,
            backgroundColor: theme.cardAlt,
            borderRadius: 15,
            marginHorizontal: 15,
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              typography.quran,
              {
                fontSize: 18,
                color: theme.cText,
                textAlign: "center",
              },
            ]}
          >
            من أحيا سنَّةً من سنَّتي قد أميتت بعدي فإنَّ لَه منَ الأجرِ مثلَ
            أجورِ من عملَ بِها
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
