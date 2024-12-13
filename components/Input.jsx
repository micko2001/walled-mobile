import { StyleSheet, TextInput, View, Text } from "react-native";

function Input({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>{text}</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    paddingHorizontal: 35,
    width: "100%",
    height: 100,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  placeholder: {
    color: "grey",
    fontSize: 16,
    paddingTop: 12,
  },
  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    paddingBottom: 12,
  },
});

export default Input;
