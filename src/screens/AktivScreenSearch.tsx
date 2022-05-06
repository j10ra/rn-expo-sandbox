import React from 'react';
import AktivUiSearch from '@components/AktivUiSearch';
import AktivUiBadge from '@components/AktivUiBadge';
import AktivUiSearchFooter from '@components/AktivUiSearchFooter';
import { AspectRatio, Box, Center, Image } from 'native-base';
import { Animated, TouchableOpacity } from 'react-native';
import { useSearch } from '@hooks/useSearch';
import { useDispatch } from 'react-redux';
import { setImageDetails } from '@core/store';
import { CompositeScreenProps } from '@react-navigation/native';
import { deBouncer } from '@utils/deBouncer';

export default function AktivScreenSearch({ navigation }: CompositeScreenProps<any, any>) {
  const dispatch = useDispatch();
  const [scrollYValue] = React.useState(new Animated.Value(0));
  const interpolation = Animated.add(
    scrollYValue.interpolate({
      inputRange: [0, 2],
      outputRange: [0, 1],
      extrapolateLeft: 'clamp',
    }),
    new Animated.Value(0)
  );
  const clampedScroll = Animated.diffClamp(interpolation, 0, 50);
  const { items, total, fetchMore, currentPage, status, resetItems, setQuery } = useSearch({
    pageSize: 20,
  });
  const imageTapHandler = (image: any) =>
    deBouncer(() => {
      dispatch(setImageDetails(image));
      navigation.push('AktivScreenDetails', {
        uri: image.previewURL,
      });
    });
  const renderItem = ({ item }: any) => {
    return (
      <Center>
        <Box mx={3.5} mb={2} position="relative" maxW={460}>
          <TouchableOpacity onPress={() => imageTapHandler(item)}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                resizeMode="cover"
                resizeMethod="auto"
                source={{
                  uri: item.previewURL,
                }}
                alt={item.id.toString()}
                rounded={5}
              />
            </AspectRatio>
            <AktivUiBadge item={item} />
          </TouchableOpacity>
        </Box>
      </Center>
    );
  };
  const onReachEndHandler = () => items.length <= total && fetchMore();

  return (
    <Animated.View style={{ flex: 1 }}>
      <AktivUiSearch
        clampedScroll={clampedScroll}
        loading={status === 'loading'}
        onChangeText={(str: string) => setQuery(str)}
      />
      <Animated.FlatList
        data={items}
        onRefresh={resetItems}
        renderItem={renderItem}
        onEndReached={onReachEndHandler}
        refreshing={currentPage === 1 && status === 'loading'}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item) => item.id.toString()}
        style={{
          flex: 1,
          zIndex: -1,
        }}
        contentContainerStyle={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: 85,
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYValue } } }], {
          useNativeDriver: true,
        })}
        ListFooterComponent={() => (
          <AktivUiSearchFooter items={items} currentPage={currentPage} total={total} />
        )}
      />
    </Animated.View>
  );
}
