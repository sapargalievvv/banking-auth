import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function ForgotPasswordScreen({ navigation }: any) {
  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Forgot Password</Text>
      <TextInput
        placeholder="Enter your email"
        className="w-full border rounded-lg px-4 py-2 mb-3"
      />
      <TouchableOpacity className="bg-purple-500 px-6 py-3 rounded-lg mb-2">
        <Text className="text-white font-semibold">Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text className="text-blue-600 mt-4">Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
