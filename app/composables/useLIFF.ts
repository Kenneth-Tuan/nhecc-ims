// 移除頂層的靜態 import，避免 Server 端執行時崩潰
import liff from "@line/liff";

export const useLIFF = () => {
  async function login() {
    const toast = useToast();

    const liffInfos = getLIFFInfos(liff);

    const runtimeConfig = useRuntimeConfig();
    const liffId = runtimeConfig.public.liffId;

    if (!liffId) {
      toast.add({
        title: "Error",
        description: "Please set LIFF_ID in .env file",
        color: "error",
      });
      return;
    }

    liff
      .init({
        liffId: liffId,
      })
      .then(async () => {
        const isLoggedIn = liff.isLoggedIn();

        toast.add({
          title: isLoggedIn ? "Success" : "Error",
          description: isLoggedIn
            ? "LIFF is logged in"
            : "LIFF is not logged in",
          color: isLoggedIn ? "success" : "error",
        });

        if (liffInfos?.isInClient === false) {
          toast.add({
            title: "Warning",
            description: "LIFF is not in client",
            color: "warning",
          });
          liff.login({
            redirectUri: window.location.href,
          });
        }

        const userProfile = await getUserProfile();
        if (userProfile) {
          toast.add({
            title: "Success",
            description: "User profile: " + JSON.stringify(userProfile),
            color: "success",
          });
        }
      })
      .catch((err) => {
        console.error("LIFF init error: ", err);
        return;
      });
  }

  async function logout() {
    if (liff?.isLoggedIn()) {
      liff.logout();
    }
  }

  function getLIFFInfos() {
    try {
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

      return {
        currentOS,
        appLanguage,
        liffVersion,
        lineVersion,
        isInClient,
      };
    } catch (error) {
      console.error("Error getting LIFF infos: ", error);
      return null;
    }
  }

  function externalLogin() {
    const runtimeConfig = useRuntimeConfig();
    const liffId = runtimeConfig.public.liffId;

    liff
      .init({
        liffId: liffId,
      })
      .then(() => {
        liff.login({
          redirectUri: window.location.href,
        });
      });
  }

  async function getUserProfile() {
    const runtimeConfig = useRuntimeConfig();
    const liffId = runtimeConfig.public.liffId;

    liff
      .init({
        liffId: liffId,
      })
      .then(async () => {
        const idToken = liff.getIDToken();
        const accessToken = liff.getAccessToken();
        console.log("ID token: ", idToken);
        console.log("Access token: ", accessToken);

        if (liff.isLoggedIn()) {
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
          console.log("LIFF is not logged in");
        }
      });
  }

  return {
    login,
    logout,
    getUserProfile,
    externalLogin,
  };
};
