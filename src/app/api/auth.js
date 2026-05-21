import { BASE_URL } from './config';

export async function userLogin({ username, password }) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(`${BASE_URL}/api/login`, options);

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  console.log('Login HTTP status:', response.status);
  console.log('Login response body:', data);

  if (response.ok) {
    console.log('Login success response:', data);
    return data;
  }

  const message =
    (data && (data.errors?.password || data.errors?.detail || data.detail)) ||
    'Login failed';
  throw new Error(message);
}
