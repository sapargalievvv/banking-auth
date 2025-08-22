import React, { PropsWithChildren } from "react";
import { AuthNavigator } from "../navigation/public-routes/auth-navigator";
import { authClient } from "../lib/auth-client";
import { ActivityIndicator, View } from "react-native";

const AuthContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isPending } = authClient.useSession();
  console.log("data", data);
  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!data) {
    return <AuthNavigator />;
  }

  return children;
};

export default AuthContainer;
