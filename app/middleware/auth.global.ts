export default defineNuxtRouteMiddleware((to) => {
  const isLoggedIn_dev = useCookie("isLoggedIn_dev");
  if (isLoggedIn_dev.value && to.name === ROUTER_NAME.LOGIN) {
    return navigateTo({
      name: ROUTER_NAME.HOME,
    });
  }
  // 1. 定義需要保護的路徑規則 (支援開頭匹配)
  // 只要是 /admin 或 /dashboard 開頭的，全部都要驗證
  const protectedPrefixes = [ROUTER_NAME.HOME];

  // 2. 判斷當前路徑是否在保護範圍內
  const isProtected = protectedPrefixes.some((prefix) => {
    return to.name === prefix;
  });

  if (!isProtected) return; // 如果不是保護路徑，直接放行

  // // 3. 執行驗證邏輯
  if (!isLoggedIn_dev.value) {
    return navigateTo({
      name: ROUTER_NAME.LOGIN,
      query: to.query,
    });
  }
});
