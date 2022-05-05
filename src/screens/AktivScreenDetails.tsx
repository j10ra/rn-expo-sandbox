import React from 'react';
import { Box, Center, VStack } from 'native-base';
import { Text } from 'react-native';

export default function AktivScreenDetails() {
  return (
    <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
      <VStack space={5} alignItems="center">
        <Text>AktivScreenDetails</Text>
      </VStack>
    </Center>
  );
}
