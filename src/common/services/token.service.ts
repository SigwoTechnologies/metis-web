/* eslint-disable camelcase */
import constants from '../configuration/constants';

export const saveToken = (token: string) => {
  const stringifiedToken = JSON.stringify({ access_token: token });
  localStorage.setItem(constants.TOKEN, JSON.stringify(stringifiedToken));
};

export const getToken = (): string => {
  const { access_token } = JSON.parse(JSON.parse(String(localStorage.getItem(constants.TOKEN))));
  return access_token;
};
