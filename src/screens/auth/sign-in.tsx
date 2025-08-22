import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authClient } from "../../lib/auth-client";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await authClient.signIn.email({
      email,
      password,
    });
  };

  const signInWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/sign-in",
      });
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Sign In</Text>
      <TextInput
        onChangeText={setEmail}
        placeholder="Email"
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-500 px-6 py-3 rounded-lg mb-2"
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="bg-blue-500 px-6 py-3 rounded-lg mb-2"
      >
        <Text className="text-white font-semibold">Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text className="text-blue-600">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text className="text-blue-600 mt-4">Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
