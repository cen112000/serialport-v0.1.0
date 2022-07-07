let asyncFuncWrapper = async (func: any, ...args: any) => {
  try {
    const resp = await func(...args);
    return { resp };
  } catch (err) {
    return { err };
  }
};
let testAsync = (fn: any) => {
  return new Promise(async (resovle) => {
    try {
      let res = await fn;
      resovle([null, res]);
    } catch (err) {
      resovle([err, null]);
    }
  });
};
export { asyncFuncWrapper, testAsync };
