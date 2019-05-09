import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService'

import 'react-toastify/dist/ReactToastify.css';

axios.interceptors.response.use(
  successfulResponse => {// pass null if don't want to intercept
    console.log('interceptSucc');
    console.log(successfulResponse);
    return successfulResponse;
  },
  exception => {
    const expectedError = (
      exception.response
      && exception.response.status >= 400
      && exception.response.status < 500
    );
    console.log('intercepted');
    console.log(exception.response);

    //Unexpected (network down, server down, db down, bug)
    // - Log them
    // - Display a generic and friendly error message
    if (!expectedError) {
      logger.log(exception);
      toast.error('An unexpected error occurred');
    } else {
    //Expected (404 not found, 400 bad request) - Client errors
    // - Display a specific error message (ex: post not found etc.)
      toast.info('Error occured' + exception.response.status + ', message: ' + exception.response.data);
    }

    return Promise.reject(exception);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
}
