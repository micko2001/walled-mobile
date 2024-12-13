import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

function Button({ bgColor = "#19918F", text, link }) {
  const router = useRouter();

  const handlePress = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <Link href={link}>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: bgColor }}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "#19918F",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

module.exports = Button;
