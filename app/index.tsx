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
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";
import { Typography } from "../constants/Typography";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearVehicleConfig } from "../store/vehicleSlice";

import Header from "../components/Header";

const slogan = require("../assets/images/auchan-slogan.jpg");
const leftImage = require("../assets/images/auchan-recharge.jpg");

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 1024;
  const isSmallScreen = width < 450;
  const router = useRouter();
  const dispatch = useDispatch();
  const { brand, model } = useSelector((state: RootState) => state.vehicle);

  const hasVehicleConfig = !!brand && !!model;

  const handleBrickPress = (product: string) => {
    if (hasVehicleConfig) {
      router.push({
        pathname: "/products",
        params: { product, brand, model },
      });
    } else {
      router.push({
        pathname: "/brands",
        params: { product },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />

        <View style={styles.sloganContainer}>
          <Image
            source={slogan}
            style={{
              width: isSmallScreen ? width * 0.7 : width * 0.4,
              height: isSmallScreen
                ? width * 0.7 * (80 / 400)
                : width * 0.4 * (80 / 400),
            }}
            resizeMode="contain"
          />
          {hasVehicleConfig && isTablet && (
            <Pressable
              onPress={() => dispatch(clearVehicleConfig())}
              style={styles.reinitializeButton}
            >
              <Text style={styles.reinitializeText}>
                Réinitialiser véhicule : {brand} {model}
              </Text>
            </Pressable>
          )}
        </View>

        <View>
          <View style={[styles.content, !isTablet && styles.contentMobile]}>
            {!isTablet && (
              <View style={styles.mobileImageContainer}>
                <Image source={leftImage} style={styles.mobileImage} />
              </View>
            )}

            {hasVehicleConfig && !isTablet && (
              <Pressable
                onPress={() => dispatch(clearVehicleConfig())}
                style={styles.reinitializeButton}
              >
                <Text style={styles.reinitializeText}>
                  Réinitialiser véhicule : {brand} {model}
                </Text>
              </Pressable>
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
                  onPress={() => item.product && handleBrickPress(item.product)}
                >
                  <Text
                    style={[
                      styles.brickText,
                      { fontSize: isSmallScreen ? 14 : 16 },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Image
                    source={item.icon}
                    style={{
                      width: isSmallScreen ? 30 : 40,
                      height: isSmallScreen ? 30 : 40,
                    }}
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
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  reinitializeButton: {
    backgroundColor: Colors.secondary,
    padding: 15,
    alignSelf: "center",
    borderRadius: 6,
    margin: 15,
  },
  reinitializeText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: Typography.fontSize.base,
  },
  sloganContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: Spacing.md - 2, // 10
    flexDirection: "row",
    maxHeight: 600,
  },
  contentMobile: {
    flexDirection: "column",
  },
  leftContainer: {
    flex: 1,
    marginRight: Spacing.xl, // 20
    borderRadius: Spacing.md, // 12
    overflow: "hidden",
  },
  leftImage: {
    width: "100%",
    height: "100%",
  },
  mobileImageContainer: {
    flex: 1,
    marginBottom: Spacing.xl, // 20
    borderRadius: Spacing.md,
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
    gap: Spacing.sm,
  },
  brick: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.xs + 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.sm,
  },
  greyBackground: {
    backgroundColor: Colors.grey,
  },
  whiteBackground: {
    backgroundColor: Colors.white,
  },
  brickText: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: Typography.fontSize.lg,
    textAlign: "center",
    marginBottom: Spacing.xs + 1,
  },
  brickIcon: {
    resizeMode: "contain",
  },
});
