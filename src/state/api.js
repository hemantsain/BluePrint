const BASE_URL = 'https://hn.algolia.com/api/v1/';
const BITCOIN_BASE_URL = 'https://api.blockcypher.com/v1/btc/main/';

export const fetchListData = async (data) => {
  const url = new URL(`${BASE_URL}search_by_date`);
  const params = {
    tags: 'story',
    page: data,
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  );
  const response = await fetch(url, {
    method: 'GET',
    timeout: 30 * 1000,
  });
  const result = await response.json();
  return result.hits;
};

export const fetchBitCoinData = async (token) => {
  const url = new URL(`${BITCOIN_BASE_URL}addrs/${token}/balance`);
  const response = await fetch(url, {
    method: 'GET',
    timeout: 30 * 1000,
  });
  const result = await response.json();
  return result;
};
