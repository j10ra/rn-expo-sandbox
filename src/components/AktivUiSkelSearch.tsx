import React from 'react';
import { Box, HStack, Skeleton } from 'native-base';
interface IAktivUiSkelSearch {
  type: 'initial' | 'loading';
}
export default function AktivUiSkelSearch({ type }: IAktivUiSkelSearch) {
  const heightVal = {
    initial: 250,
    loading: 60,
  };
  return (
    <Box px={3} pb={3} mb={2} mx={1} position="relative">
      <Skeleton
        h={heightVal[type]}
        borderRadius={8}
        endColor="blueGray.700"
        startColor="blueGray.400"
      />
      <HStack position={'absolute'} bottom="6" left="6">
        <Skeleton
          h="5"
          width={10}
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
