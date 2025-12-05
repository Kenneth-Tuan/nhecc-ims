import liff from "@line/liff";

export const useLIFF = () => {
  async function init() {
    const runtimeConfig = useRuntimeConfig();
    const liffId = runtimeConfig.public.NUXT_LIFF_ID;

    if (!liffId) {
      console.error("Please set LIFF_ID in .env file");
      return;
    }
    const res = await liff.init({
      liffId: liffId,
      withLoginOnExternalBrowser: true,
    });

    await liff.ready;

    const isLoggedIn = liff.isLoggedIn();
    if (!isLoggedIn) {
      console.error("LIFF is not logged in");
      return;
    }
    console.log("LIFF init success");
    console.log("LIFF SDK version", liff.getVersion());
    return res;
  }

  function getIDToken() {
    return liff.getIDToken();
  }

  function getAccessToken() {
    return liff.getAccessToken();
  }

  async function getUserProfile() {
    const idToken = getIDToken();
    const accessToken = getAccessToken();
    if (!idToken || !accessToken) {
      throw new Error("ID token or access token is not available");
    }
    const { data, error } = await useFetch("/api/line/login", {
      method: "POST",
      body: {
        idToken: idToken,
        accessToken: accessToken,
      },
    });

    console.log("test data: ", data, "error: ", error);

    if (error.value) {
      throw new Error(error.value.message);
    }

    return data.value;
  }

  async function login() {
    const runtimeConfig = useRuntimeConfig();
    const liffId = runtimeConfig.public.NUXT_LIFF_ID;

    if (!liffId) {
      console.error("Please set LIFF_ID in .env file");
      return;
    }

    liff
      .init({
        liffId: liffId,
      })
      .then(async () => {
        console.log("LIFF init success");
        console.log("LIFF SDK version", liff.getVersion());
        const isLoggedIn = liff.isLoggedIn();
        console.log("LIFF is logged in: ", isLoggedIn);

        const idToken = liff.getIDToken();
        const accessToken = liff.getAccessToken();
        console.log("ID token: ", idToken);
        console.log("Access token: ", accessToken);
        
        if (!isLoggedIn) {
          if (!idToken || !accessToken) {
            throw new Error("ID token or access token is not available");
          }
          const { data, error } = await useFetch("/api/line/login", {
            method: "POST",
            body: { idToken: idToken, accessToken: accessToken },
          });
          if (error.value) {
            throw new Error(error.value.message);
          }
          return data.value;
        } else {
          console.log("LIFF is already logged in");
        }
      })
      .catch((err) => {
        console.error("LIFF init error: ", err);
        return;
      });
  }

  function logout() {
    if (liff.isLoggedIn()) {
      liff.logout();
    }
  }

  return {
    login,
    logout,
  };
};
