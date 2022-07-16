const { VITE_METIS_API_URL } = import.meta.env;

console.log('VITE_METIS_API_URL', VITE_METIS_API_URL);

const appConfig = {
  api: {
    baseUrl: VITE_METIS_API_URL,
  },
};

export default appConfig;
