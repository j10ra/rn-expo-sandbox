import { Image } from 'react-native';
import { Asset } from 'expo-asset';

export const cacheImages = (images: string[]) => {
  return images.map((image: string) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};
