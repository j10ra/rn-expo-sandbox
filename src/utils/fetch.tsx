const key = '27187995-926f7ce19370efb6014fb874d';
const baseUrl = `https://pixabay.com/api/?key=${key}`;

export interface IPayload {
  hasError: boolean;
  errorMassage: string;
  payload?: any;
}

export interface IUseSearch {
  query: string;
  pageSize: number;
  index?: number;
}

export const fetchItems = async ({ query, pageSize, index = 1 }: IUseSearch): Promise<IPayload> => {
  try {
    const searchString = encodeURIComponent(query);
    const requestUrl = `${baseUrl}&q=${searchString}&per_page=${pageSize}&page=${index}`;
    const response = await fetch(requestUrl, { method: 'GET' });
    const data = await response.json();

    return {
      hasError: false,
      errorMassage: '',
      payload: data,
    };
  } catch (err: any) {
    return {
      hasError: true,
      errorMassage: err,
    };
  }
};
