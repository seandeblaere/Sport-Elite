const AUTH_TOKEN_KEY = "token";

const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

const saveAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export { getAuthToken, saveAuthToken };
