import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

function TextLink({ desc, text, link }) {
  return (
    <View>
      <View style={styles.registerContainer}>
        <Text style={styles.text}>{desc} </Text>
        <Link href={link}>
          <Text style={styles.linkText}>{text}</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  text: { fontSize: 16, fontFamily: "OpenSans_400Regular" },
  linkText: { fontSize: 16, color: "blue", fontFamily: "OpenSans_400Regular" },
});
module.exports = TextLink;
