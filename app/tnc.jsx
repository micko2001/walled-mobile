import {
  ScrollView,
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { useState } from "react";
import { Link } from "expo-router";

function Tnc() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={styles.centeredView}>
      <ScrollView>
        <Modal animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                loremjhh danandnandan dandandn
              </Text>

              <Pressable
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  button: {
    backgroundColor: "#4DB6AC",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  tnclink: {
    color: "blue",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Tnc;
