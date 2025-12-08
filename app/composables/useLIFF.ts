// 移除頂層的靜態 import，避免 Server 端執行時崩潰
// import liff from "@line/liff";

export const useLIFF = () => {
  // Helper: 統一的動態載入函式
  async function loadLiff() {
    if (import.meta.server) return null;
    const liffModule = await import("@line/liff");
    return liffModule.default; // @line/liff 是 default export
  }

  async function init() {
    if (import.meta.server) return;
    const liff = await loadLiff();
    if (!liff) return;

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

  async function getIDToken() {
    if (import.meta.server) return null;
    const liff = await loadLiff();
    return liff?.getIDToken() || null;
  }

  async function getAccessToken() {
    if (import.meta.server) return null;
    const liff = await loadLiff();
    return liff?.getAccessToken() || null;
  }

  async function getUserProfile() {
    if (import.meta.server) return;

    // 注意：這裡變成 async 了，因為要等 loadLiff
    const idToken = await getIDToken();
    const accessToken = await getAccessToken();

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
    if (import.meta.server) return;
    const liff = await loadLiff();
    if (!liff) return;

    getLIFFInfos(liff);

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

  async function logout() {
    if (import.meta.server) return;
    const liff = await loadLiff();
    if (liff?.isLoggedIn()) {
      liff.logout();
    }
  }

  function getLIFFInfos(liff: any) {
    try {
      if (!liff) return null;
      const currentOS = liff?.getOS();
      const appLanguage = liff?.getAppLanguage();
      const liffVersion = liff?.getVersion();
      const lineVersion = liff?.getLineVersion();
      const isInClient = liff?.isInClient();

      console.group("LIFF Infos");
      console.log("Current OS: ", currentOS);
      console.log("App Language: ", appLanguage);
      console.log("Liff Version: ", liffVersion);
      console.log("Line Version: ", lineVersion);
      console.log("Is In Client: ", isInClient);
      console.groupEnd();
    } catch (error) {
      console.error("Error getting LIFF infos: ", error);
      return null;
    }
  }

  return {
    init, // 記得要把 init 也導出 (如果原本有)
    login,
    logout,
    getIDToken,
    getAccessToken,
    getUserProfile,
  };
};
