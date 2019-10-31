export { default as history } from './history';
export { default as theme } from './theme';

export const extractParamId = (url) => {
  const [id] = url.match(/(\d+)(?!.*\d)/);
  return id;
};
