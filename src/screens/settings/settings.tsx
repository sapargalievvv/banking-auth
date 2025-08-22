// src/screens/SettingsScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "../../components/container";

const SettingsScreen = () => {
  const { session, signOut, verifyEmail } = useAuth();

  const handleLogout = () => {
    Alert.alert("Выход", "Вы уверены, что хотите выйти?", [
      { text: "Отмена", style: "cancel" },
      { text: "Выйти", style: "destructive", onPress: () => signOut() },
    ]);
  };

  return (
    <Container>
      <View className="flex-1 bg-white px-4 py-6">
        {/* Заголовок */}
        <Text className="text-xl font-bold mb-6">Настройки</Text>

        {/* Статус верификации */}
        <View className="flex-row items-center justify-between mb-4 p-4 rounded-xl border border-gray-200">
          <Text className="text-base">Почта</Text>
          <Text
            className={`text-sm font-medium ${
              session?.user?.emailVerified ? "text-green-600" : "text-red-500"
            }`}
          >
            {session?.user?.emailVerified ? "Подтверждено" : "Не подтверждено"}
          </Text>
        </View>

        {/* Email */}
        <View className="flex-row items-center justify-between mb-8 p-4 rounded-xl border border-gray-200">
          <Text className="text-base">Email</Text>
          <Text className="text-sm text-gray-600">{session?.user?.email}</Text>
        </View>

        {/* Кнопка повторной отправки */}
        {!session?.user?.emailVerified && (
          <TouchableOpacity
            onPress={() => verifyEmail()}
            className="bg-blue-500 rounded-xl py-3 mb-8"
          >
            <Text className="text-center text-white font-semibold text-base">
              Отправить код для верификации почты
            </Text>
          </TouchableOpacity>
        )}

        {/* Кнопка выхода */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 rounded-xl py-3"
        >
          <Text className="text-center text-white font-semibold text-base">
            Выйти
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SettingsScreen;
