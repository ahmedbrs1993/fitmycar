import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { cars } from "../data/cars";
import Header from "../components/Header";

const chat = require("../assets/images/chat.png");
const { width } = Dimensions.get("window");

// Number of brands per page
const BRANDS_PER_PAGE = 12;

export default function BrandsScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cars.length / BRANDS_PER_PAGE);
  const { product } = useLocalSearchParams();

  // Get brands for current page
  const paginatedBrands = cars.slice(
    (currentPage - 1) * BRANDS_PER_PAGE,
    currentPage * BRANDS_PER_PAGE
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header showBack={true} showHome={true} />

        <View style={styles.instructionContainer}>
          <Image source={chat} style={styles.chat} resizeMode="contain" />
          <Text style={styles.instructionText}>
            Indiquez la marque de votre véhicule
          </Text>
        </View>

        {/* Brands Grid - 3 per row */}
        <View style={styles.gridContainer}>
          {paginatedBrands.map((brand, index) => (
            <View key={brand.brand} style={styles.brandContainer}>
              <Link
                href={{
                  pathname: "/models",
                  params: {
                    product,
                    brand: brand.brand,
                  },
                }}
                asChild
              >
                <Pressable style={styles.brandItem}>
                  <Text style={styles.brandText}>{brand.brand}</Text>
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
  chat: {
    width: 100,
    height: 40,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  brandContainer: {
    width: "32%", // 3 items per row (100%/3 - some margin)
    marginBottom: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  brandItem: {
    backgroundColor: "#E5E5E5",
    padding: 20,
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
    height: 100, // Fixed height for consistency
  },
  brandText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black", // Dark green color
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#A5D6A7", // Light green for disabled
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
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
    backgroundColor: "white", // Light red background
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  instructionText: {
    color: "#D32F2F", // Dark red text
    fontSize: 16,
    fontWeight: "bold",
  },
});
