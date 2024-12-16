import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  alert,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import TextLink from "../components/TextLink";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";

function Register() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isRead, setIsRead] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>loremjhh danandnandan dandandn</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false);
                setIsRead(true);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Image
        source={require("../assets/walled.png")}
        style={styles.logo}
        resizeMode="stretch"
      />

      <TextInput
        style={styles.input}
        placeholder="Fullname"
        placeholderTextColor="#aaa"
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar url"
        placeholderTextColor="#aaa"
        keyboardType="url"
      />

      <Text>{"\n"}</Text>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <Text style={styles.paragraph}>I have read and agree to the </Text>
        <Link href="/tnc">
          <Text style={styles.tnclink}>Terms and Condition</Text>
        </Link>
        {/* <Pressable onPress={() => setModalVisible(true)}>
          
        </Pressable> */}
      </View>

      <Text>{"\n"}</Text>

      <Button text="Register" link="/" />

      <TextLink text="Login here" desc="Have account?" link="/" />
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
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
export default Register;
