import { Link, Stack } from "expo-router";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";
import { parseISO, format } from "date-fns";

const convertDate = (transaction_date) => {
  return format(parseISO(transaction_date), "dd MMMM yyyy, HH:mm:ss");
};

const imageUri = (value) => {
  if (value !== null) {
    return value;
  } else {
    return "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Image.png";
  }
};

export default function Home() {
  const [storedValue, setStoredValue] = useState(null);
  const [transactions, setTransactions] = useState(null);

  const getTransaction = async (token) => {
    try {
      const res = await axios.get(
        "https://walled-api.vercel.app/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data: response } = res;

      setTransactions(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile = await AsyncStorage.getItem("profile");
        const token = await AsyncStorage.getItem("token");
        if (profile !== null) {
          // Value found in storage
          setStoredValue(JSON.parse(profile) || null);
        }
        if (token !== null) {
          console.log(token);
          getTransaction(token);
        }
      } catch (e) {
        console.error(e.message);
      }
    };
    getProfile();
  }, []);
  return (
    <ScrollView containerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{
              uri: imageUri(storedValue?.avatar_url),
            }}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {storedValue ? storedValue.fullname : "Loading..."}
            </Text>
            <Text style={{ fontSize: 18 }}>{user.typeofaccount}</Text>
          </View>
        </View>
        <Image source={require("../../assets/suntoggle.png")} />
      </View>
      <View style={{ backgroundColor: "#FAFBFD", paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 25,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
              Good Morning, {storedValue ? storedValue.fullname : "Loading..."}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Check all your incoming and outgoing transactions here
            </Text>
          </View>
          <Image
            source={require("../../assets/sun.svg")}
            style={{ width: 81, height: 77 }}
          />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Account No.</Text>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {storedValue ? storedValue.wallet.account_number : "Loading..."}
          </Text>
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ fontSize: 20 }}>Balance</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Rp {storedValue ? storedValue.wallet.balance : "Loading..."}
            </Text>
          </View>
          <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  router.replace("/topup");
                }}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome6 size={18} name="add" color={"#fff"} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.replace("/transfer");
                }}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome size={18} name="send" color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            marginTop: 40,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 20,
              borderBottomColor: "#b3b3b3",
              borderBottomWidth: 0.5,
            }}
          >
            Transaction History
          </Text>
          {transactions?.map((transaction) => (
            <View
              key={transaction.transaction_id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>{transaction.description}</Text>
                <Text style={{ fontSize: 16 }}>
                  {transaction.transaction_type}
                </Text>
                <Text style={{ fontSize: 14, color: "#b3b3b3" }}>
                  {convertDate(transaction.transaction_date)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color:
                    transaction.recipient_wallet_id !== null ? "red" : "green",
                }}
              >
                {transaction.recipient_wallet_id !== null ? "-" : "+"} Rp{" "}
                {transaction.amount}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const user = {
  fullname: "John Doe",
  typeofaccount: "Personal Account",
  accountnumber: "123456789",
  balance: "10.000.000",
};

// const transactions = [
//   {
//     id: 1,
//     date: "08 December 2024",
//     amount: "75.000",
//     name: "Indoapril",
//     type: "Topup",
//     debit: false,
//   },
//   {
//     id: 2,
//     date: "06 December 2024",
//     amount: "80.000",
//     name: "Si Fulan",
//     type: "Transfer",
//     debit: true,
//   },
//   {
//     id: 3,
//     date: "12 December 2024",
//     amount: "100.000",
//     name: "E-Money",
//     type: "KREDIT",
//     debit: false,
//   },
// ];

const styles = StyleSheet.create({
  balancebox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#19918F",
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
});
