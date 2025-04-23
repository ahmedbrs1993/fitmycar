import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { products } from "@/data/products";
import { Colors } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { setVehicleConfig } from "@/store/vehicleSlice";
import { useEffect } from "react";

import Header from "@/components/Header";

type ProductType =
  | "balais"
  | "eclairage"
  | "batteries"
  | "huiles-moteur"
  | "filtres"
  | "lave-glaces"
  | "liquide-refroidissement";

type ProductItem = {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: any;
  specs: string[];
};

export default function ProductsScreen() {
  const { product, brand, model, generation, fuelType } = useLocalSearchParams<{
    product: ProductType;
    brand: string;
    model: string;
    generation: string;
    fuelType: string;
  }>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (brand && model) {
      dispatch(setVehicleConfig({ brand, model, generation, fuelType }));
    }
  }, [product, brand, model, generation, fuelType]);

  const allProducts: ProductItem[] = products[product] || [];

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack={true} showHome={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Type, Brand and Model Row */}
        <View style={styles.topRowContainer}>
          {/* Product Section */}
          <View style={styles.productSection}>
            <View style={styles.iconTextRow}>
              <Ionicons
                name="checkmark"
                size={22}
                color="#4CAF50"
                style={styles.icon}
              />
              <Text style={styles.highlightedText}>
                {product.charAt(0).toUpperCase() + product.slice(1)}
              </Text>
            </View>
          </View>

          {/* Brand + Model Section */}
          <View style={styles.brandModelSection}>
            <View style={styles.iconTextRow}>
              <Ionicons
                name="car"
                size={22}
                color="#4CAF50"
                style={styles.icon}
              />

              <Text style={styles.vehicleBrand}>
                {brand}{" "}
                <Text style={styles.vehicleModel}>
                  {model + " -"} {generation + " -"} {fuelType}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Results Title */}
        <View style={styles.resultsTitleContainer}>
          <Text style={styles.resultsTitle}>Résultats de votre recherche</Text>
        </View>

        {/* Products List */}
        <View style={styles.productsContainer}>
          {allProducts.map((item) => (
            <Pressable key={item.id} style={styles.productCard}>
              <Image
                source={item.image}
                style={styles.productImage}
                resizeMode="contain"
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <View style={styles.specsContainer}>
                  {item.specs.map((spec, i) => (
                    <Text key={i} style={styles.specText}>
                      • {spec}
                    </Text>
                  ))}
                </View>
              </View>
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
  productType: {
    fontSize: 24,
    flex: 1,
  },
  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 6,
  },
  productTypeHighlight: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  brandModelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  resultsTitleContainer: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.red,
    textAlign: "center",
    paddingBottom: 8,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    justifyContent: "space-between",
    gap: 12,
  },
  productCard: {
    width: "48%",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 12,
  },
  productDetails: {
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  productBrand: {
    fontSize: 14,
    color: Colors.darkGrey,
    marginBottom: 2,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 6,
    textAlign: "center",
  },
  specsContainer: {
    marginTop: 8,
  },
  specText: {
    fontSize: 14,
    color: Colors.darkGrey,
    lineHeight: 18,
  },
  topRowContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
  },
  productSection: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  brandModelSection: {
    width: "67%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkGrey,
    textAlign: "center",
  },
  highlightedText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  vehicleBrand: {
    fontWeight: "bold",
    color: Colors.black,
  },
  vehicleModel: {
    color: Colors.darkGrey,
    fontWeight: "bold",
  },
  brandModelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    flexShrink: 1,
  },
});
