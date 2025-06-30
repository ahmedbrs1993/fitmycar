import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_BASE_URL_API } from "@/constants/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "@/components/Header";

export type Product = {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  specs: string[];
  category: string;
};

export type ProductCompatibility = {
  id: number;
  fuelType: string;
  product: Product;
};

export default function ProductsScreen() {
  const params = useLocalSearchParams<{
    brand: string;
    model: string;
    generation: string;
    fuelTypeId: string;
    fuelTypeName: string;
  }>();

  const vehicle = useSelector((state: RootState) => state.vehicle);
  const { product, subProduct } = useSelector(
    (state: RootState) => state.product
  );

  const brand = vehicle.brand || params.brand;
  const model = vehicle.model || params.model;
  const generation = vehicle.generation || params.generation;
  const fuelType = vehicle.fuelType || params.fuelTypeName;
  const fuelTypeId = vehicle.fuelTypeId || params.fuelTypeId;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL_API}/product_compatibilities?fuelType=/api/fuel_types/${fuelTypeId}`,
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: ProductCompatibility[] = await res.json();

        const filtered: Product[] = data
          .map((compatibility) => compatibility.product)
          .filter((productFiltered) => productFiltered?.category === product);

        setProducts(filtered);
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    if (fuelTypeId) fetchProducts();
  }, [fuelTypeId]);

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack showHome />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Type and Vehicle Info */}
        <View style={styles.topRowContainer}>
          <View style={styles.productSection}>
            <View style={styles.iconTextRow}>
              <Ionicons name="checkmark" size={22} color="#4CAF50" />
              <Text style={styles.highlightedText}>
                {product
                  ? product.charAt(0).toUpperCase() + product.slice(1)
                  : ""}
                {subProduct
                  ? " - " +
                    subProduct.charAt(0).toUpperCase() +
                    subProduct.slice(1)
                  : ""}
              </Text>
            </View>
          </View>
          <View style={styles.brandModelSection}>
            <View style={styles.iconTextRow}>
              <Ionicons name="car" size={22} color="#4CAF50" />
              <Text style={styles.vehicleBrand}>
                {brand}{" "}
                <Text style={styles.vehicleModel}>
                  {model + " - "} {generation + " - "} {fuelType}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Results */}
        <View style={styles.resultsTitleContainer}>
          <Text style={styles.resultsTitle}>Résultats de votre recherche</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <View style={styles.productsContainer}>
            {products.map((item) => (
              <Pressable key={item.id} style={styles.productCard}>
                <Image
                  source={{
                    uri: `${API_BASE_URL}/images/products/${item.image}`,
                  }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productBrand}>{item.brand}</Text>
                  <Text style={styles.productPrice}>
                    {item.price.toFixed(2)} €
                  </Text>
                  {item.specs && (
                    <Text style={styles.specText}>{item.specs}</Text>
                  )}
                </View>
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
  resultsTitleContainer: { marginBottom: 16 },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.red,
    textAlign: "center",
    paddingBottom: 8,
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
    paddingHorizontal: 15,
    marginLeft: 15,
    borderRadius: 10,
  },
  brandModelSection: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  highlightedText: {
    color: Colors.primary,
    fontWeight: "bold",
    marginLeft: 6,
  },
  vehicleBrand: {
    fontWeight: "bold",
    color: Colors.black,
  },
  vehicleModel: {
    color: Colors.darkGrey,
    fontWeight: "bold",
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
  specText: {
    fontSize: 14,
    color: Colors.darkGrey,
    lineHeight: 18,
    textAlign: "center",
  },
});
