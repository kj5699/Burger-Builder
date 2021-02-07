import axios from 'axios';

const instance =axios.create({
    baseURL: 'https://react-burger-builder-7754a-default-rtdb.firebaseio.com/'
});

export default instance;
