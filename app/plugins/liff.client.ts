import liff from "@line/liff";

export default defineNuxtPlugin({
  name: "liff.client",
  enforce: "pre",
  async setup(nuxtApp) {
    const toast = useToast();
    const runtimeConfig = useRuntimeConfig();
    const liffId = runtimeConfig.public.liffId;
    const isLoggedIn_dev = useCookie<boolean>("isLoggedIn_dev");

    async function init() {
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
          // withLoginOnExternalBrowser: true, // 這個選項在透過外部瀏覽器進行登入的時候，會自動登入，但會導致在瀏覽器網址的 query string 會帶有 code 和 state 參數，所以需要手動處理
        })
        .then(async () => {
          try {
            const isLoggedIn = liff.isLoggedIn();

            if (isLoggedIn) {
              await login();
            } else {
              const isInClient = liff.isInClient();
              if (isInClient) throw new Error("User is not logged in");
            }
          } catch (error) {
            throw new Error((error as Error).message);
          }
        })
        .catch((err) => {
          toast.add({
            title: "初始化失敗",
            description: "請稍後，並重新整理頁面。",
            color: "warning",
          });
          console.error("LIFF init error: ", err);
          return;
        });
    }

    async function logout() {
      if (liff?.isLoggedIn()) {
        liff.logout();
      }
    }

    function externalAuth() {
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

    async function login() {
      try {
        const idToken = liff.getIDToken();
        const accessToken = liff.getAccessToken();

        console.log("ID token: ", idToken);
        console.log("Access token: ", accessToken);

        if (!idToken || !accessToken) {
          throw new Error("ID token or access token is not available");
        }
        const { data, error } = await useFetch("/api/line/login", {
          method: "POST",
          body: { idToken: idToken, accessToken: accessToken },
        });

        const isLoggedInSuccess = Boolean(data.value?.ok);

        if (error.value) {
          throw new Error(error.value.message);
        }

        toast.add({
          title: isLoggedInSuccess ? "Success" : "Error",
          description: isLoggedInSuccess
            ? "Logged in successfully"
            : "Logged in failed, please try again.",
          color: isLoggedInSuccess ? "success" : "error",
        });

        isLoggedIn_dev.value = Boolean(isLoggedInSuccess);
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }

    if (!isLoggedIn_dev.value) await init();

    return {
      provide: {
        logout,
        externalAuth,
      },
    };
  },
  hooks: {
    "app:created"() {
      console.log("app:created");
    },
  },
});

// 在透過外部瀏覽器進行登入的時候，當 user 授權給 Line 之後，會自動跳轉到 redirectUri 的頁面
// 這時候瀏覽器網址的 query string 會帶有 code 和 state 參數
// 所以會需要在 vue hook 中掛載 liff.init() 來初始化 LIFF，取得授權後的狀態
// 才算真正的登入

// LIFF 登入流程如下：
// 1. 進入 /login 頁面時，經過 onMounted hook 透過 init() 初始化 LIFF
// 2. 透過 liff.isLoggedIn() 判斷 user 是否已經授權給 Line
//   a. 如果是在外部瀏覽器，且 query string 中沒有附帶正確的狀態碼，則會授權失敗，需要手動點擊 line Login button 調用 externalLogin() 進行外部瀏覽器登入，登入完成之後再次回到 /login 頁面，同時在 query string 中會附上授權成功的狀態碼，再次從步驟 1 開始執行。
//   b. 如果是在 Line 內部，則會授權成功，透過 getUserProfile() 取得 user 資料
// 3. 成功取得 user 資料之後，將登入資料儲存到 cookie，然後 redirect to index page
