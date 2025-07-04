import React, { useEffect, useState } from "react";
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
import { Colors } from "@/constants/Colors";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { API_BASE_URL_API } from "@/constants/Api";

import Header from "@/components/Header";

const chat = require("@/assets/images/chat.png");

type FuelType = {
  id: number;
  fuel: string;
  generation: string;
  modelName?: string;
  brandName?: string;
  fuelName?: string;
};

export default function FuelTypeScreen() {
  const { generationId, brandName, modelName, generationName }: any =
    useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFuelTypes = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL_API}/fuel_types?generation=/api/generations/${generationId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setFuelTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des types de carburant:", err);
        setError("Impossible de charger les types de carburant.");
      } finally {
        setLoading(false);
      }
    };

    if (generationId) fetchFuelTypes();
  }, [generationId]);

  const handleFuelTypeSelect = (fuel: FuelType) => {
    dispatch(
      setVehicleConfig({
        brand: brandName,
        model: modelName,
        generation: generationName,
        fuelType: fuel.fuelName || "Inconnu",
        fuelTypeId: fuel.id,
      })
    );

    router.push({
      pathname: "/Products",
      params: {
        brand: brandName,
        model: modelName,
        generation: generationName,
        fuelTypeId: fuel.id,
        fuelTypeName: fuel.fuelName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header showBack showHome />

        <View style={styles.instructionContainer}>
          <Image source={chat} style={styles.chat} resizeMode="contain" />
          <Text style={styles.instructionText}>
            Choisissez le type de carburant
          </Text>
        </View>

        {loading ? (
          <Text style={{ textAlign: "center" }}>Chargement...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.gridContainer}>
            {fuelTypes.map((fuel) => (
              <Pressable
                key={fuel.id}
                style={styles.fuelItem}
                onPress={() => handleFuelTypeSelect(fuel)}
              >
                <Text style={styles.fuelText}>
                  {fuel.fuelName || "Type inconnu"}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContainer: { flexGrow: 1 },
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
