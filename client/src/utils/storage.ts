const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`signin-token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`signin-token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`signin-token`);
  },
};

export default storage;
