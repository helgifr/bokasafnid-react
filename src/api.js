
const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status };
}

async function post(endpoint, data) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  console.log('1');
  
  const response = await fetch(url, options);
  console.log('2');
  
  const result = await response.json();

  return { result, status: response.status };
}

async function postImg(endpoint, data) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const formData = new FormData();
  formData.set('profile', data);
  
  const options = {
    body: formData,
    headers: {

    },
    method: 'POST',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status };
}

async function patch(endpoint, data) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'PATCH',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status };
}

async function deleteBook(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {
    },
    method: 'DELETE',
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, options);

  const result = await response.json();

  return { result, status: response.status };
}

/* todo aðrar aðgerðir */

export default {
  get,
  post,
  patch,
  postImg,
  deleteBook,
};
