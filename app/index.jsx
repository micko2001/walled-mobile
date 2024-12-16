import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";
import HelloWorld from "../components/helloworld";
import Button from "../components/Button";
import TextLink from "../components/TextLink";
import { z } from "zod";
import { useState } from "react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export default function App() {
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});

  handleInputChange = (key, value) => {
    setErrors({ ...errorMsg, [key]: "" });
    setForm({ ...form, [key]: value });
  };

  handleSubmit = () => {
    try {
      LoginSchema.parse(form);
    } catch (err) {
      const validation = err.errors;
      const errors = {};
      validation.map((item) => {
        const key = item.path[0];
        errors[key] = item.message;
      });
      setErrors(errors);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/walled.png")}
        style={styles.logo}
        resizeMode="stretch"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errorMsg.email ? (
        <Text style={styles.errorMsg}>{errorMsg.email}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg.password}</Text>}
      <Link href="/(home)" style={styles.linkText}>
        Masuk
      </Link>

      <Button handlePress={handleSubmit} text="Login" />

      <TextLink
        text="Register here"
        desc="Don't have account?"
        link="/register"
      />
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
  button: {
    backgroundColor: "#4DB6AC",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    width: "100%",
    textAlign: "left",
    marginTop: 5,
    marginBottom: 10,
  },
});
