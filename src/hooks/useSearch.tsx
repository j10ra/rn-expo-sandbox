import React from 'react';
import { fetchItems, IPayload, IUseSearch } from '@utils/fetch';
import { FETCH } from '@constants/types';

export function useSearch({ query, pageSize = 10 }: IUseSearch) {
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [status, setStatus] = React.useState(FETCH.LOADING);
  const [state, setState] = React.useState({
    hits: [],
    total: 0,
    pageIndex: 1,
    errors: {},
  } as any);
  const update = (stateUpdate: any) => {
    setState({
      ...state,
      ...stateUpdate,
    });
  };
  const successHandler = (response: IPayload) => {
    const { payload } = response;
    const { hits, total } = payload;
    let data = hits;

    state.pageIndex > 1 && (data = state.hits.concat(data));
    setShouldFetch(false);
    update({
      hits: data,
      total,
      pageIndex: state.pageIndex + 1,
      shouldFetch: false,
    });
  };
  const fetchMore = React.useCallback(() => setShouldFetch(true), []);
  const resetItems = React.useCallback(() => {
    setShouldFetch(true);
    update({
      pageIndex: 1,
      hits: [],
      total: 0,
    });
  }, []);

  /**
   * Side effects
   */
  React.useEffect(() => resetItems(), [query]);
  React.useEffect(() => {
    const bootstapFetch = async () => {
      setStatus(FETCH.LOADING);
      const response = await fetchItems({ query, pageSize, index: state.pageIndex });

      response.hasError ? update({ errors: response }) : successHandler(response);
      setStatus(FETCH.IDLE);
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
  };
}
