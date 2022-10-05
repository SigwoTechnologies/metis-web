/* eslint-disable import/prefer-default-export */
import constants from '../configuration/constants';

export const saveToken = (token: string) => {
  const stringifiedToken = JSON.stringify({ access_token: token });
  localStorage.setItem(constants.TOKEN, JSON.stringify(stringifiedToken));
};
