import { useRef, useState } from "react";
import { TextInput } from "react-native";
import {
  VStack,
  Heading,
  Button,
  Center,
  Box,
  Text,
  HStack,
  Icon,
  Alert,
  Collapse,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordRef = useRef<TextInput>(null);
  const { handleLogin, handleGoogleSignIn } = useAuth();

  const onLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const response = await handleLogin(email, password);
      console.log(response);
      if (response.error) {
        throw new Error(response.error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      await handleGoogleSignIn();
    } catch (e: any) {
      setError(e.message || "Google sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center flex={1} bg="white" px={6}>
      <Box w="100%" maxW="350px">
        <Heading mb={6} textAlign="center">
          Sign In
        </Heading>

        {/* Ошибки */}
        <Collapse isOpen={!!error}>
          <Alert w="100%" status="error" mb={4} borderRadius="lg">
            <Text color="red.600">{error}</Text>
          </Alert>
        </Collapse>

        <VStack space={4}>
          <TextInput
            onSubmitEditing={() => passwordRef?.current?.focus()}
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />
          <TextInput
            onSubmitEditing={onLogin}
            ref={passwordRef}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
          />

          <Button
            onPress={onLogin}
            isLoading={loading}
            isDisabled={loading}
            colorScheme="blue"
            borderRadius="xl"
          >
            Login
          </Button>

          <Button
            onPress={onGoogle}
            isLoading={loading}
            isDisabled={loading}
            borderRadius="xl"
            bg="white"
            borderWidth={1}
            borderColor="gray.300"
            _pressed={{ bg: "gray.100" }}
          >
            <HStack space={2} alignItems="center">
              <Icon as={FontAwesome} name="google" size="sm" color="red.500" />
              <Text color="black">Continue with Google</Text>
            </HStack>
          </Button>

          <Text
            mt={4}
            textAlign="center"
            color="blue.600"
            onPress={() => navigation.navigate("SignUp")}
          >
            Create an account
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}
