import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./drawer/drawer-navigator";
import AuthContainer from "./auth-container";

export const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthContainer>
        <DrawerNavigator />
      </AuthContainer>
    </NavigationContainer>
  );
};
