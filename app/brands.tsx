import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { cars } from "../data/cars";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";
import { Typography } from "../constants/Typography";

import Header from "../components/Header";

const chat = require("../assets/images/chat.png");
const BRANDS_PER_PAGE = 12;

export default function BrandsScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cars.length / BRANDS_PER_PAGE);
  const { product } = useLocalSearchParams();

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
    backgroundColor: Colors.white,
  },
  chat: {
    width: 100,
    height: 40,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  brandContainer: {
    width: "32%",
    marginBottom: Spacing.lg,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  brandItem: {
    backgroundColor: Colors.lightGrey,
    padding: Spacing.xl,
    borderRadius: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
  },
  brandText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "bold",
    color: Colors.black,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: Colors.disabledGreen,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    marginTop: Spacing.md,
    backgroundColor: Colors.lightBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.lightBorder,
  },
  paginationButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginHorizontal: 15,
    minWidth: 120,
    alignItems: "center",
  },
  paginationText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: Typography.fontSize.base,
  },
  pageIndicator: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "600",
    color: Colors.primary,
    marginHorizontal: 15,
    minWidth: 60,
    textAlign: "center",
  },
  instructionContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    width: "100%",
    alignItems: "center",
  },
  instructionText: {
    color: Colors.red,
    fontSize: Typography.fontSize.base,
    fontWeight: "bold",
  },
});
