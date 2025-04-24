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
import { setProduct, clearProduct } from "@/store/productSlice";
import { useEffect } from "react";

import Header from "@/components/Header";

const slogan = require("@/assets/images/auchan-slogan.jpg");
const leftImage = require("@/assets/images/auchan-recharge.jpg");

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { brand, model, generation, fuelType } = useSelector(
    (state: RootState) => state.vehicle
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearProduct());
  }, []);

  const isTabletHome = width >= 870;
  const isSmallScreen = width < 450;
  const hasVehicleConfig = !!brand && !!model && !!generation && !!fuelType;

  const handleBrickPress = (item: any) => {
    dispatch(setProduct(item.product));

    if (item.subProducts) {
      router.push("/subProduct");
    } else if (hasVehicleConfig) {
      router.push("/products");
    } else {
      router.push("/brands");
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
        {hasVehicleConfig && isTabletHome && (
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
          width: isTabletHome ? "32%" : "48%",
          aspectRatio: 1,
          minHeight: isTabletHome ? 150 : 120,
          maxHeight: isTabletHome ? 172 : 150,
        },
        (item.id === 7 || item.id === 8) && styles.greyBackground,
        item.id === 6 && styles.whiteBackground,
      ]}
      onPress={() => item.product && handleBrickPress(item)}
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
      <View style={styles.imageContainer}>
        <Image source={leftImage} style={styles.image} />
      </View>
      <View style={styles.rightContainer}>{bricks.map(renderBrick)}</View>
    </View>
  );

  const renderMobileLayout = () => (
    <View style={styles.contentMobile}>
      <View style={styles.imageContainer}>
        <Image source={leftImage} style={styles.image} />
      </View>

      {hasVehicleConfig && (
        <Pressable
          onPress={() => dispatch(clearVehicleConfig())}
          style={[styles.reinitializeButton, { marginBottom: 10 }]}
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
        <Header isHome={true} />
        {renderSloganSection()}
        {isTabletHome ? renderTabletLayout() : renderMobileLayout()}
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
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.md,
    overflow: "hidden",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: Spacing.md,
    paddingTop: 10,
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
});
