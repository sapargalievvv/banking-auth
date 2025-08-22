import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authClient } from "../../lib/auth-client";
import { useState } from "react";

export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const data = await authClient.signUp.email({
      email,
      password,
      name: "",
    });

    console.log(data);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Confirm Password"
        secureTextEntry
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-green-500 px-6 py-3 rounded-lg mb-2"
      >
        <Text className="text-white font-semibold">Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text className="text-blue-600 mt-4">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
