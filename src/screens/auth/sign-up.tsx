import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { authClient } from "../../lib/auth-client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const { handleSignUp } = useAuth();

  const onSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Пароли не совпадают");
      return;
    }

    return handleSignUp(email, password, name);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Sign Up</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
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
        secureTextEntry={!__DEV__}
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={!__DEV__}
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TouchableOpacity
        onPress={onSignUp}
        className="bg-green-500 px-6 py-3 rounded-lg mb-2"
      >
        <Text className="text-white font-semibold">Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-blue-600 mt-4">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
