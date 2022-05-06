import React from 'react';
import { AspectRatio, Badge, Box, Center, Heading, HStack, Image, Text, VStack } from 'native-base';
import { CompositeScreenProps } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getImageData } from '@core/store';

export default function AktivScreenDetails({ route }: CompositeScreenProps<any, any>) {
  const imageData = useSelector(getImageData);
  const { largeImageURL, user, tags, imageHeight, imageWidth } = imageData;

  return (
    <Box flex={1}>
      <Box p={3}>
        <AspectRatio w="100%" ratio={1 / 1} mb={1}>
          <Image
            resizeMode="cover"
            resizeMethod="auto"
            loadingIndicatorSource={{
              uri: route.params.uri,
            }}
            source={{
              uri: largeImageURL,
            }}
            alt="image"
            rounded={5}
          />
        </AspectRatio>
        <Heading size="md" mx={1} color="blueGray.900">
          By: {user}
        </Heading>
        <Text mx={1}>
          Resolution: {imageWidth} x {imageHeight}
        </Text>
        <Text mx={1} mt={1}>
          Tags:
        </Text>
        <HStack alignItems={'center'} space={0.5} ml={1}>
          {tags.split(',').map((tag: string, i: number) => (
            <Badge
              key={i}
              alignSelf="flex-start"
              colorScheme="coolGray"
              variant={'solid'}
              flexDirection="column"
              rounded="5"
            >
              {tag.toUpperCase()}
            </Badge>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
