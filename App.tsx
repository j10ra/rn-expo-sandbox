import React from 'react';
import Navigator from '@core/Navigator';
import { StatusBar } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';

// Define the config
const config = {
  useSystemColorMode: false,
};

// extend the theme
export const theme = extendTheme({ config });
type AktivTheme = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends AktivTheme {}
}
export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <Navigator />
    </NativeBaseProvider>
  );
}
