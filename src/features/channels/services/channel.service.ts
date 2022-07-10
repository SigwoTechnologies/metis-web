import httpService from 'src/common/services/http.service';

// TODO: Define the correct url, dummy for demonstration
const findByUser = async () => httpService.get('/pokemon?offset=0&limit=5');

export default { findByUser };
