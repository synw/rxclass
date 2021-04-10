type PropCallback = (value: any) => any; // eslint-disable-line

interface RxParam {
  value: any; // eslint-disable-line
  callback: PropCallback;
}

export { RxParam, PropCallback }