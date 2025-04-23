import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { setVehicleConfig } from "@/store/vehicleSlice";
import { carData } from "@/data/cars";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

const chat = require("@/assets/images/chat.png");

export default function FuelTypeScreen() {
  const { brand, model, generation, product } = useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const brandData = carData.find((b) => b.brand === brand);
  const modelData = brandData?.models.find((m) => m.name === model);
  const fuelTypes: string[] = modelData?.fuelType || [];

  if (!modelData || !fuelTypes.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Fuel types not found</Text>
      </SafeAreaView>
    );
  }

  const handleFuelTypeSelect = (type: string) => {
    dispatch(
      setVehicleConfig({
        brand: brand as string,
        model: model as string,
        generation: generation as string,
        fuelType: type,
      })
    );

    router.push({
      pathname: "/products",
      params: {
        brand,
        model,
        generation,
        fuelType: type,
        product,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header showBack={true} showHome={true} />

        <View style={styles.instructionContainer}>
          <Image source={chat} style={styles.chat} resizeMode="contain" />
          <Text style={styles.instructionText}>
            Choisissez le type de carburant
          </Text>
        </View>

        <View style={styles.gridContainer}>
          {fuelTypes.map((type) => (
            <Pressable
              key={type}
              style={styles.fuelItem}
              onPress={() => handleFuelTypeSelect(type)}
            >
              <Text style={styles.fuelText}>{type}</Text>
            </Pressable>
          ))}
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
  instructionContainer: {
    padding: Spacing.md,
    alignItems: "center",
  },
  instructionText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "bold",
    color: Colors.red,
    textAlign: "center",
  },
  chat: {
    width: 100,
    height: 40,
    marginBottom: Spacing.md,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  fuelItem: {
    width: "48%",
    backgroundColor: Colors.lightGrey,
    padding: Spacing.lg,
    borderRadius: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
  },
  fuelText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "bold",
    color: Colors.black,
  },
  errorText: {
    fontSize: Typography.fontSize.base,
    color: Colors.red,
    textAlign: "center",
    marginTop: 50,
  },
});
