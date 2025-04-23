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
import { bricks } from "@/data/bricks";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearVehicleConfig } from "@/store/vehicleSlice";

import Header from "@/components/Header";

const slogan = require("@/assets/images/auchan-slogan.jpg");
const leftImage = require("@/assets/images/auchan-recharge.jpg");
const googlePlay = require("@/assets/images/google-play.png");

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { brand, model, generation, fuelType } = useSelector(
    (state: RootState) => state.vehicle
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const isTablet = width >= 870;
  const isSmallScreen = width < 450;
  const hasVehicleConfig = !!brand && !!model && !!generation && !!fuelType;
  const apkUrl = "https://expo.dev/artifacts/eas/bqLow3TUfDwkZUCnMqJcFp.apk";

  const handleBrickPress = (product: string) => {
    if (hasVehicleConfig) {
      router.push({
        pathname: "/products",
        params: { product, brand, model, generation, fuelType },
      });
    } else {
      router.push({ pathname: "/brands", params: { product } });
    }
  };

  const renderSloganSection = () => (
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
      <View style={{ alignItems: "center", marginRight: Spacing.md }}>
        {/* APK Download Button */}
        {isTablet && (
          <Pressable
            onPress={() => {
              window.open(apkUrl, "_blank");
            }}
            style={styles.downloadButton}
          >
            <Image source={googlePlay} style={styles.downloadImage} />
            <View style={styles.textContainer}>
              <Text style={styles.downloadTextTop}>Get it on</Text>
              <Text style={styles.downloadTextBottom}>Google Play</Text>
            </View>
          </Pressable>
        )}

        {hasVehicleConfig && isTablet && (
          <Pressable
            onPress={() => dispatch(clearVehicleConfig())}
            style={styles.reinitializeButton}
          >
            <Text style={styles.reinitializeText}>
              Réinitialiser véhicule : {brand} {model} {generation} {fuelType}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const renderBrick = (item: (typeof bricks)[0], index: number) => (
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
        (item.id === 7 || item.id === 8) && styles.greyBackground,
        item.id === 6 && styles.whiteBackground,
      ]}
      onPress={() => item.product && handleBrickPress(item.product)}
    >
      <Text
        style={[
          styles.brickText,
          {
            fontSize: isSmallScreen
              ? Typography.fontSize.sm
              : Typography.fontSize.base,
          },
        ]}
      >
        {item.name}
      </Text>
      <Image source={item.icon} style={styles.brickIcon} />
    </Pressable>
  );

  const renderTabletLayout = () => (
    <View style={styles.content}>
      <View style={[styles.leftContainer, { height: "100%" }]}>
        <Image
          source={leftImage}
          style={[styles.leftImage, { aspectRatio: 1 }]}
          resizeMode="cover"
        />
      </View>
      <View style={styles.rightContainer}>{bricks.map(renderBrick)}</View>
    </View>
  );

  const renderMobileLayout = () => (
    <View style={styles.contentMobile}>
      <View style={styles.mobileImageContainer}>
        <Image source={leftImage} style={styles.mobileImage} />
      </View>

      <Pressable
        onPress={() => {
          window.open(apkUrl, "_blank");
        }}
        style={[
          styles.downloadButton,
          {
            width: 200,
            alignSelf: "center",
          },
        ]}
      >
        <Image source={googlePlay} style={styles.downloadImage} />
        <View style={styles.textContainer}>
          <Text style={styles.downloadTextTop}>Get it on</Text>
          <Text style={styles.downloadTextBottom}>Google Play</Text>
        </View>
      </Pressable>

      {hasVehicleConfig && (
        <Pressable
          onPress={() => dispatch(clearVehicleConfig())}
          style={styles.reinitializeButton}
        >
          <Text style={styles.reinitializeText}>
            Réinitialiser véhicule : {brand} {model} {generation} {fuelType}
          </Text>
        </Pressable>
      )}
      <View style={styles.rightContainer}>{bricks.map(renderBrick)}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        {renderSloganSection()}
        {isTablet ? renderTabletLayout() : renderMobileLayout()}
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
    padding: Spacing.lg - 1,
    alignSelf: "center",
    borderRadius: 6,
    marginHorizontal: Spacing.lg - 1,
    maxWidth: 390,
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
    padding: Spacing.md - 2,
    flexDirection: "row",
    maxHeight: 600,
  },
  contentMobile: {
    flexDirection: "column",
  },
  leftContainer: {
    flex: 1,
    marginRight: Spacing.xl,
    borderRadius: Spacing.md,
    overflow: "hidden",
  },
  leftImage: {
    width: "100%",
    height: "100%",
  },
  mobileImageContainer: {
    flex: 1,
    margin: Spacing.md,
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
    margin: Spacing.md,
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
    marginBottom: Spacing.md + 1,
  },
  brickIcon: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: Spacing.md,
    width: 220,
    height: "auto",
    backgroundColor: Colors.black,
    borderRadius: 6,
    padding: Spacing.md - 2,
  },
  downloadImage: {
    width: 24,
    height: 24,
    marginRight: Spacing.sm,
    resizeMode: "contain",
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  downloadTextTop: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
  },
  downloadTextBottom: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: Typography.fontSize.base,
  },
});
