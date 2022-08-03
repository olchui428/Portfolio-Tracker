import _ from 'lodash';
import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
};

const DOMAIN = 'http://localhost:4000';

export async function call(_method, _endpoint, _data, _config) {
  try {
    let method = _.toString(_method).toLowerCase();
    let endpoint = _.toString(_endpoint);
    let data = _.clone(_data) || {};
    let config = _.clone(_config) || {};

    let resp = await axios[method](endpoint, data, config);
    // console.log(resp, "response from service");
    let respData = resp.data;
    let { status, errorCode, errorMessage, result } = respData;

    // console.log(`respData >> `, respData);

    // TODO :: change status back to <= 0
    if (status < 0) {
      console.error(`Service.call() Error :: ${errorCode} :: ${errorMessage}`);
      // if (errorCode === -101) {
      // TODO :: Redirect ???
      // }
      let errorObj = {
        status,
        errorCode,
        errorMessage,
      };
      return errorObj;
    }

    // status >= 0
    // Return "result" property
    if (result) {
      return result;
    } else {
      return respData;
    }
  } catch (err) {
    console.error(err, 'from service');
  }
  return null;
}

export function createURL(action, endpoint, content) {
  content = content || {};
  let url = '';
  url += endpoint;
  if (action.toLowerCase() === 'get') {
    let queryStr = '';
    _.each(content, (val, key) => {
      queryStr += `${key}=${val}&`;
    });
    url += `?${queryStr}`;
    console.log(url, 'url show');
  }
  return url;
}

// const joinURL = (baseURL, url) => {
//   return `${baseURL}/${url}`;
// };

// export const request = (url, method = 'post', data = null) => {
//   url = joinURL(DOMAIN, url)
//   const options = {
//     headers,
//     method
//   }
//   if (data) {
//     options.body = JSON.stringify({data})
//   }
//   console.log('inside request>>>', url)
//   return fetch(url, options)
// };

// export const post = (url, data) => {
//   const method = 'POST'
//   return request(url, method, data).then(res => res.json())
// }

// export const get = (url, id) => {
//   const method = 'GET'
//   if (id) {
//     url = `${url}/${id}`
//   }
//   return request(url, method).then(res => res.json())
// }

// export const del = (url, id) => {
//   const method = 'DELETE'
//   if (id) {
//     url = `${url}/${id}`
//   }
//   return request(url, method).then(res => res.json())
// }
