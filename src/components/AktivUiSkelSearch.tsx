import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Badge, Box, HStack, Icon, Input, Skeleton, Spinner, Text, VStack } from 'native-base';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Animated, Dimensions } from 'react-native';

interface IAktivUiSkelSearch {
  type: 'initial' | 'loading';
}
export default function AktivUiSkelSearch({ type }: IAktivUiSkelSearch) {
  const heightVal = {
    initial: 250,
    loading: 60,
  };
  return (
    <Box px={3} pb={3} mb={2} position="relative">
      <Skeleton
        h={heightVal[type]}
        borderRadius={8}
        endColor="blueGray.700"
        startColor="blueGray.400"
      />
      <HStack position={'absolute'} bottom="6" left="6">
        <Skeleton
          h="5"
          width={20}
          borderRadius={8}
          endColor="blueGray.600"
          startColor="blueGray.300"
          mr={2}
        />
        <Skeleton
          h="5"
          width={20}
          borderRadius={8}
          endColor="blueGray.600"
          startColor="blueGray.300"
        />
      </HStack>
    </Box>
  );
}
