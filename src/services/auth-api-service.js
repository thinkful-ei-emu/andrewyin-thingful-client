import config from '../config';

const AuthAPIService = {
  postLogin: async function(cred) {
    const res = await fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(cred)
    });

    if (!res.ok) {
      const e = await res.json();
      return Promise.reject(e);
    }
    else {
      return res.json();
    }
  }
};

export default AuthAPIService;