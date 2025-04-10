import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { bricks } from "../data/bricks";
import Header from "../components/Header";

const slogan = require("../assets/images/auchan-slogan.jpg");
const leftImage = require("../assets/images/auchan-recharge.jpg");

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 1024;
  const isSmallScreen = width < 450;
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        <View style={styles.sloganContainer}>
          <Image
            source={slogan}
            style={[
              {
                width: isSmallScreen ? width * 0.7 : width * 0.4,
                height: isSmallScreen
                  ? width * 0.7 * (80 / 400)
                  : width * 0.4 * (80 / 400),
              },
            ]}
            resizeMode="contain"
          />
        </View>

        <View>
          <View style={[styles.content, !isTablet && styles.contentMobile]}>
            {/* Show image first on mobile */}
            {!isTablet && (
              <View style={styles.mobileImageContainer}>
                <Image source={leftImage} style={styles.mobileImage} />
              </View>
            )}

            {isTablet && (
              <View style={[styles.leftContainer, { height: "100%" }]}>
                <Image
                  source={leftImage}
                  style={[styles.leftImage, { aspectRatio: 1 }]}
                  resizeMode="cover"
                />
              </View>
            )}

            <View
              style={[
                styles.rightContainer,
                {
                  maxWidth: isTablet ? undefined : "100%",
                },
              ]}
            >
              {bricks.map((item, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.brick,
                    {
                      width: isTablet ? "32%" : "48%",
                      aspectRatio: 1,
                      minHeight: isTablet ? 150 : 120,
                      maxHeight: isTablet ? 185 : 150,
                    },
                    (item.name === "Lave-glaces (conseils)" ||
                      item.name === "Liquide de refroidissement (conseils)") &&
                      styles.greyBackground,
                    item.name === "" && styles.whiteBackground,
                  ]}
                  onPress={() => {
                    if (item.product) {
                      router.push({
                        pathname: "/brands",
                        params: { product: item.product },
                      });
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.brickText,
                      { fontSize: isSmallScreen ? 13 : isTablet ? 16 : 14 },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Image
                    source={item.icon}
                    style={[
                      styles.brickIcon,
                      {
                        width: isSmallScreen ? 30 : 40,
                        height: isSmallScreen ? 30 : 40,
                      },
                    ]}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  sloganContainer: {
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    maxHeight: 600,
  },
  contentMobile: {
    flexDirection: "column",
  },
  leftContainer: {
    flex: 1,
    marginRight: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  leftImage: {
    width: "100%",
    height: "100%",
  },
  mobileImageContainer: {
    flex: 1,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  mobileImage: {
    width: "100%",
    height: "100%",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  brick: {
    backgroundColor: "#81C784",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  greyBackground: {
    backgroundColor: "#d3d3d3",
  },
  whiteBackground: {
    backgroundColor: "#fff",
  },
  brickText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  brickIcon: {
    resizeMode: "contain",
  },
});
