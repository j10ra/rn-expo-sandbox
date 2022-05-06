import React from 'react';
import { fetchItems, IPayload, IUseSearch } from '@utils/fetch';
import { FETCH } from '@constants/types';
import { cacheImages } from '@utils/cacheImages';

interface IState {
  hits: any[];
  total: number;
  pageIndex: number;
  errors: IPayload;
}
export function useSearch({ pageSize = 10 }: any) {
  const [query, setQuery] = React.useState('');
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [status, setStatus] = React.useState(FETCH.LOADING);
  const [state, setState] = React.useState({
    hits: [],
    total: 0,
    pageIndex: 1,
    errors: {},
  } as unknown as IState);
  const update = (stateUpdate: any) => {
    setState((state: any) => ({
      ...state,
      ...stateUpdate,
    }));
  };
  const successHandler = (response: IPayload) => {
    const { payload } = response;
    const { hits, total } = payload;
    let data = hits;

    // let caching run in background
    cacheImages(hits.map((image: any) => image.largeImageURL));
    cacheImages(hits.map((image: any) => image.previewURL));

    state.pageIndex > 1 && (data = state.hits.concat(data));
    setShouldFetch(false);
    update({
      hits: data,
      total,

      // set for next fetch
      pageIndex: state.pageIndex + 1,
    });
  };
  const fetchMore = React.useCallback(() => setShouldFetch(true), []);
  const resetItems = React.useCallback(() => {
    update({
      pageIndex: 1,
      hits: [],
      total: 0,
    });
    setShouldFetch(true);
  }, []);

  /**
   * Side effects
   */
  React.useEffect(() => resetItems(), [query]);
  React.useEffect(() => {
    const bootstapFetch = async () => {
      setStatus(FETCH.LOADING);
      const response = await fetchItems({ query, pageSize, index: state.pageIndex });

      setStatus(FETCH.IDLE);
      response.hasError ? update({ errors: response }) : successHandler(response);
    };

    if (shouldFetch) bootstapFetch();
  }, [state, shouldFetch]);

  return {
    items: state.hits,
    total: state.total,
    currentPage: state.pageIndex,
    errors: state.errors,
    status,
    fetchMore,
    resetItems,
    setQuery,
  };
}
