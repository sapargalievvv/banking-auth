import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, useTheme } from 'native-base';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { CaretLeft as BackIcon } from 'phosphor-react-native';

import { useStickyScrollContext } from '../contexts/sticky-scroll-context';

import { MenuButton } from './menu-button';

const AnimatedHStack = Animated.createAnimatedComponent(HStack);

type Props = {
  title: string;
  rightHeader?: React.ReactNode;
  backButton?: boolean;
};

export const Header = ({ title, backButton, rightHeader }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { isScrollingDown } = useStickyScrollContext();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const renderBackButton = () => {
    return (
      <IconButton
        variant="ghost"
        alignItems="center"
        justifyContent="center"
        p={1}
        icon={<BackIcon size={24} color={colors.text[500]} />}
        onPress={() => navigation.goBack()}
      />
    );
  };

  const headerAnimatedStyles = useAnimatedStyle(() => {
    const top = isScrollingDown ? -54 : 0;
    return {
      height: 54,
      top: withTiming(top, { duration: 200 }),
      shadowOffset: {
        width: 0,
        height: -1,
      },
      shadowOpacity: isScrollingDown ? 0 : 0.1,
      shadowRadius: 4.0,
    };
  });

  return (
    <AnimatedHStack
      px={2}
      py={3}
      justifyContent="space-between"
      alignItems="center"
      position="absolute"
      zIndex={2}
      left={0}
      right={0}
      style={headerAnimatedStyles}
      bg={colors.secondary[500]}
    >
      <HStack flex={1} justifyContent="flex-start">
        {backButton ? renderBackButton() : <MenuButton onPress={openDrawer} />}
      </HStack>
      <Heading
        fontSize="lg"
        flex={1}
        textAlign="center"
        color={colors.text[500]}
      >
        {title}
      </Heading>
      <HStack flex={1} justifyContent="flex-end">
        {rightHeader}
      </HStack>
    </AnimatedHStack>
  );
};
