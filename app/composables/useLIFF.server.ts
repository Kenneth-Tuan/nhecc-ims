// Server-side mock for useLIFF
// 在伺服器端渲染時，提供空實作以避免 500 Error

export const useLIFF = () => {
  const init = async () => {
    // Server 端不做任何事
    return Promise.resolve();
  };

  const login = async () => {
    return Promise.resolve();
  };

  const logout = () => {
    // Do nothing
  };

  const getIDToken = () => null;
  const getAccessToken = () => null;
  const getUserProfile = async () => Promise.resolve(null);

  return {
    init,
    login,
    logout,
    getIDToken,
    getAccessToken,
    getUserProfile
  };
};

