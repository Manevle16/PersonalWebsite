import { getHostName } from './index';

describe('reducer index', () => {
  it('should return hostname', () => {
    const result = getHostName();
    expect(result).toEqual('https://matthewnevleserver.com:3000');
  });
});
