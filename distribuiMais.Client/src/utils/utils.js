import api from "../services/api";
export const apiConnection = (url, callback, errorHandler) => {
    api.get(url).then(callback).catch(errorHandler)
};
export const setInitialData = (handlers) => {
    if (handlers.length === 0) return;
    const { route, setter } = handlers.shift();
    apiConnection(route, (response) => {
        setter(response.data);
        // console.log(route);
        // console.log(response.data);
    }, (error) => console.log(error));
    setInitialData(handlers);
};
export const generateAPIHandler = (route, setter) => {
    return {
      route: route,
      setter: setter
    }
  }
