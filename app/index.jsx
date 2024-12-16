import { StatusBar } from "expo-status-bar";
import { navigate } from "expo-router/build/global-state/routing";
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
import axios, { Axios } from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export default function App() {
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});
  const [authEmail, setAuthEmail] = useState("");

  handleInputChange = (key, value) => {
    setErrors({ ...errorMsg, [key]: "" });
    setForm({ ...form, [key]: value });
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (e) {
      console.error(e.message);
    }
  };
  const storeProfile = async (value) => {
    try {
      console.log(value);
      await AsyncStorage.setItem("profile", value);
    } catch (e) {
      console.error(e.message);
    }
  };

  const auth = async (token) => {
    try {
      const res = await axios.get("http://192.168.148.146:8080/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data: responseData } = res;
      setAuthEmail(responseData.data.email);
      const dataProfile = JSON.stringify(responseData.data);
      storeProfile(dataProfile);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  handleSubmit = async () => {
    try {
      const data = LoginSchema.parse(form);

      const res = await axios.post(
        "http://192.168.148.146:8080/auth/login",
        data
      );

      // Destructuring untuk mengambil token dari respons
      const { data: responseData } = res;
      const { token } = responseData.data;
      storeData(token);
      auth(token);
      router.navigate("(home)");
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
      <Link href="(home)" style={styles.linkText}>
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
