import { useState, useRef } from "react";
import { TextInput } from "react-native";
import {
  VStack,
  Heading,
  Button,
  Center,
  Box,
  Text,
  Alert,
  Collapse,
} from "native-base";
import { useAuth } from "../../hooks/useAuth";

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmPasswordRef = useRef<TextInput>(null);

  const { handleSignUp } = useAuth();

  const onSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const response = await handleSignUp(email, password, name);

      if (response.error) {
        throw new Error(response.error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center flex={1} bg="white" px={6}>
      <Box w="100%" maxW="350px">
        <Heading mb={6} textAlign="center">
          Sign Up
        </Heading>

        {/* Ошибки */}
        <Collapse isOpen={!!error}>
          <Alert w="100%" status="error" mb={4} borderRadius="lg">
            <Text color="red.600">{error}</Text>
          </Alert>
        </Collapse>

        <VStack space={4}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
            returnKeyType="next"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
            returnKeyType="next"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          />
          <TextInput
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="w-full border border-gray-300 rounded-xl px-4 py-3"
            returnKeyType="done"
            onSubmitEditing={onSignUp}
          />

          <Button
            onPress={onSignUp}
            isLoading={loading}
            isDisabled={loading}
            colorScheme="blue"
            borderRadius="xl"
          >
            Register
          </Button>

          <Text
            mt={4}
            textAlign="center"
            color="blue.600"
            onPress={() => navigation.goBack()}
          >
            Already have an account? Sign In
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}
