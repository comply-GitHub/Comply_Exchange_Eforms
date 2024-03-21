/**
 * To get token value from the storage
 * @returns return token
 */
export const getAccessToken = () => localStorage.getItem('accessToken');

/**
 * To set token value in the storage
 * @param token token value to store
 */

export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};
