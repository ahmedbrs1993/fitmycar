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
import { setVehicleConfig } from "@/store/vehicleSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { carData } from "@/data/cars";
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";

import Header from "@/components/Header";

const chat = require("@/assets/images/chat.png");

export default function GenerationsScreen() {
  const { brand, model }: { brand: string; model: string } =
    useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const brandData = carData.find((item) => item.brand === brand);
  const modelData = brandData?.models.find((item) => item.name === model);

  const handleSelect = (generation: string) => {
    dispatch(
      setVehicleConfig({
        brand,
        model,
        generation,
        fuelType: "",
      })
    );
    router.push({
      pathname: "/fuelType",
      params: {
        brand,
        model,
        generation,
      },
    });
  };

  if (!modelData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Model not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header showBack={true} showHome={true} />

        <View style={styles.instructionContainer}>
          <Image source={chat} style={styles.chat} resizeMode="contain" />
          <Text style={styles.instructionText}>
            Sélectionnez la génération de votre véhicule
          </Text>
        </View>

        <View style={styles.gridContainer}>
          {modelData.generations.map((generation) => (
            <Pressable
              key={generation}
              onPress={() => handleSelect(generation)}
              style={styles.generationItem}
            >
              <Text style={styles.generationText}>{generation}</Text>
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
    width: "100%",
    alignItems: "center",
  },
  chat: {
    width: 100,
    height: 40,
  },
  instructionText: {
    color: Colors.red,
    fontSize: Typography.fontSize.base,
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  generationItem: {
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
  generationText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
  },
});
