import React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Badge, HStack, Icon, Text } from 'native-base';

export default function AktivUiBadge({ item }: any) {
  const { likes, downloads } = item;

  return (
    <HStack alignItems={'center'} space={1} position="absolute" bottom={2} left={2} right={2}>
      <Badge {...badgeProps} flexDirection="column">
        <HStack alignItems={'center'}>
          <Icon as={MaterialIcons} name="thumb-up" size="xs" color="blueGray.900" mr={1} />
          <Text>{likes}</Text>
        </HStack>
      </Badge>
      <Badge {...badgeProps} flexDirection="column">
        <HStack alignItems={'center'}>
          <Icon
            as={MaterialCommunityIcons}
            name="cloud-download"
            size="xs"
            color="blueGray.900"
            mr={1}
          />
          <Text>{downloads}</Text>
        </HStack>
      </Badge>
    </HStack>
  );
}

const badgeProps = {
  alignSelf: 'flex-start',
  mr: '1',
  bg: '#fff',
  _text: {
    color: '#000',
    fontWeight: 'bold',
  },
  variant: 'subtle',
  rounded: 'full',
};
