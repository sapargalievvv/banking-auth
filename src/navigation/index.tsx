import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigator } from './drawer/drawer-navigator';

export const Navigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
