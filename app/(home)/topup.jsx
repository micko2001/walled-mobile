import { View, Text, StyleSheet } from "react-native";
import Input from "../../components/Input";
import Amount from "../../components/Amount.jsx";
import Button from "../../components/Button";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const topupSchema = z.object({
  amount: z.number({ message: "Invalid number format" }),
  description: z.string({ message: "Invalid text format" }),
});

export default function Topup() {
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});

  handleText = (key, text) => {
    setErrors({ ...errorMsg, [key]: "" });
    setForm({ ...form, [key]: text });
  };

  const handleSubmit = async () => {
    try {
      console.log(form);
      const data = topupSchema.parse(form);
      console.log(data);
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        "https://walled-api.vercel.app/transactions/topup",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data: responseData } = res;
      console.log(responseData);
    } catch (e) {
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
      <Amount
        marginBottom={24}
        changeText={(text) => handleText("amount", Number(text))}
      />
      <Input
        text={"Notes"}
        changeText={(text) => handleText("description", text)}
      />
      <Button
        text={"Top Up"}
        link="/topup"
        marginTop={150}
        handlePress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
});
