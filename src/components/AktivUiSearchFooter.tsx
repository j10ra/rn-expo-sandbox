import React from 'react';
import AktivUiSkelSearch from './AktivUiSkelSearch';
import { Box } from 'native-base';

export default function AktivUiSearchFooter({ items, currentPage, total }: any) {
  if (currentPage === 1) {
    return <AktivUiSkelSearch type={'initial'} />;
  }

  if (currentPage === 2 && total === 0) {
    return <BoxIt text={'No items to show'} />;
  }

  if (items.length < total && currentPage > 1) {
    return <AktivUiSkelSearch type={'loading'} />;
  }

  return <BoxIt text={'End of feed'} />;
}

const BoxIt = ({ text }: any) => (
  <Box
    p={2}
    mx={4}
    borderRadius={5}
    bg="blueGray.700"
    _text={{ color: '#fff', fontWeight: 'bold' }}
  >
    {text}
  </Box>
);
