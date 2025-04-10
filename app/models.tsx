import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, Link } from "expo-router";
import { useState } from "react";
import { cars } from "../data/cars";
import Header from "../components/Header";

const chat = require("../assets/images/chat.png");

const MODELS_PER_PAGE = 12;

export default function ModelsScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const { product, brand } = useLocalSearchParams();

  const brandData = cars.find((item) => item.brand === brand);

  if (!brandData) {
    return (
      <View style={styles.container}>
        <Text>Brand not found</Text>
      </View>
    );
  }

  const totalPages = Math.ceil(brandData.models.length / MODELS_PER_PAGE);
  const paginatedModels = brandData.models.slice(
    (currentPage - 1) * MODELS_PER_PAGE,
    currentPage * MODELS_PER_PAGE
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header showBack={true} showHome={true} />

        <View style={styles.instructionContainer}>
          <Image source={chat} style={styles.chat} resizeMode="contain" />

          <Text style={styles.instructionText}>
            Indiquez le modèle de votre véhicule
          </Text>
        </View>

        {/* Models Grid - 3 per row */}
        <View style={styles.gridContainer}>
          {paginatedModels.map((model) => (
            <View key={model} style={styles.modelContainer}>
              <Link
                href={{
                  pathname: "/products",
                  params: {
                    product,
                    brand,
                    model,
                  },
                }}
                asChild
              >
                <Pressable style={styles.modelItem}>
                  <Text style={styles.modelText}>{model}</Text>
                </Pressable>
              </Link>
            </View>
          ))}
        </View>

        {/* Pagination Controls */}
        <View style={styles.paginationContainer}>
          <Pressable
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledButton,
            ]}
            onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationText}>Previous</Text>
          </Pressable>

          <Text style={styles.pageIndicator}>
            {currentPage} / {totalPages}
          </Text>

          <Pressable
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.disabledButton,
            ]}
            onPress={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <Text style={styles.paginationText}>Next</Text>
          </Pressable>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#f8f8f8",
    textAlign: "center",
    color: "#2E7D32",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  modelContainer: {
    width: "32%",
    marginBottom: 16,
  },
  modelItem: {
    backgroundColor: "#E5E5E5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  chat: {
    width: 100,
    height: 40,
  },
  modelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: "auto",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  paginationButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginHorizontal: 15,
    minWidth: 120,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#A5D6A7",
  },
  paginationText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  pageIndicator: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginHorizontal: 15,
    minWidth: 60,
    textAlign: "center",
  },
  instructionContainer: {
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  instructionText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
});
