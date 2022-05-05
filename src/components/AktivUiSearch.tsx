import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Center, Icon, Input, Spinner, VStack } from 'native-base';
import { Animated, StyleSheet } from 'react-native';

interface AktivUiSearch {
  clampedScroll: Animated.AnimatedDiffClamp;
  loading: boolean;
  onChangeText: (str: string) => any;
}

export default function AktivUiSearch({ clampedScroll, loading, onChangeText }: AktivUiSearch) {
  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -280],
    extrapolate: 'clamp',
  });
  const styles = useStyles(searchBarTranslate);
  const icons = {
    left: <Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />,
    right: <Box px="3">{loading && <Spinner color="emerald.500" />}</Box>,
  };

  return (
    <Animated.View style={[styles.root, styles.trans]}>
      <Center>
        <VStack mb="4" mt={4} space={1} px={3} w="100%" maxW={520} alignSelf="center">
          <Input
            onSubmitEditing={({ nativeEvent: { text } }) => onChangeText(text)}
            placeholder="Search Images..."
            fontSize="14"
            borderRadius="4"
            width="100%"
            bg="#fff"
            py="3"
            px="1"
            _focus={{ bg: '#fff' }}
            InputLeftElement={icons['left']}
            InputRightElement={icons['right']}
          />
        </VStack>
      </Center>
    </Animated.View>
  );
}

const useStyles = (y: any) =>
  StyleSheet.create({
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 1,
    },
    trans: {
      transform: [
        {
          translateY: y,
        },
      ],
    },
  });
