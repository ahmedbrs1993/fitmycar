import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/Colors";

interface HeaderProps {
  showBack?: boolean;
  showHome?: boolean;
}

const logo = require("../assets/images/auchan-logo.png");

export default function Header({
  showBack = false,
  showHome = false,
}: HeaderProps) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 450;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <Link
            href="../"
            asChild
            style={{
              width: isSmallScreen ? 100 : 140,
            }}
          >
            <Pressable style={styles.navButton}>
              <View style={styles.buttonContent}>
                <Ionicons
                  name="arrow-back"
                  size={isSmallScreen ? 24 : 32}
                  color="white"
                />

                <Text
                  style={[
                    styles.navButtonText,
                    isSmallScreen && styles.navSmallButtonText,
                  ]}
                >
                  Back
                </Text>
              </View>
            </Pressable>
          </Link>
        )}
        {showHome && (
          <Link
            href={"/"}
            asChild
            style={{
              width: isSmallScreen ? 100 : 140,
            }}
          >
            <Pressable style={styles.navButton}>
              <View style={styles.buttonContent}>
                <Ionicons
                  name="home"
                  size={isSmallScreen ? 24 : 32}
                  color="white"
                />

                <Text
                  style={[
                    styles.navButtonText,
                    isSmallScreen && styles.navSmallButtonText,
                  ]}
                >
                  Home
                </Text>
              </View>
            </Pressable>
          </Link>
        )}
      </View>

      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorder,
    borderRadius: 16,
  },
  leftContainer: {
    flexDirection: "row",
    gap: 12,
  },
  logo: {
    width: 100,
    height: 40,
  },
  navButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  navButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 12,
  },
  navSmallButtonText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
    marginRight: 4,
    color: Colors.white,
  },
});
