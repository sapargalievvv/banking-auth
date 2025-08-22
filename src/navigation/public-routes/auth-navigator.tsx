import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../../screens/auth/sign-in";
import SignUpScreen from "../../screens/auth/sign-up";
import ForgotPasswordScreen from "../../screens/auth/forgot-password";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () =>  {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
