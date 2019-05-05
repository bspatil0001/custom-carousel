import Axios from 'axios';

export default () => {
  return Axios.create({
    headers: {}
  });
};