import { NavigationContainer } from '@react-navigation/native';

import { DrawerNavigator } from './drawer/drawer-navigator';
import { authClient } from '../lib/auth-client';
import { AuthNavigator } from './public-routes/auth-navigator';

export const Navigator = () => {
  const {data} = authClient.useSession()
  console.log('session',data)
  return (
    <NavigationContainer>
      {data ? <DrawerNavigator /> : <AuthNavigator/>}
    </NavigationContainer>
  );
};
