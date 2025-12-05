export default defineEventHandler(async (event) => {
    const body = await readBody<{ idToken?: string; accessToken?: string }>(event);
    const config = useRuntimeConfig();
  
    if (!body.idToken && !body.accessToken) {
      throw createError({ statusCode: 400, statusMessage: 'Missing token' });
    }
  
    // 例：用 ID Token 方式
    if (body.idToken) {
      // 向 LINE 驗證並取 user 資料
      const verifyRes = await $fetch('https://api.line.me/oauth2/v2.1/verify', {
        method: 'POST',
        body: new URLSearchParams({
          id_token: body.idToken,
          client_id: config.public.NUXT_LINE_CHANNEL_ID
        }).toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
  
      // verifyRes 會包含 sub (userId), email, name 等欄位
      // 在這裡用 userId 去對應你自家的 User，做登入 / 註冊
      // ...
  
      return { ok: true };
    }
  
    // 例：用 Access Token 方式
    if (body.accessToken) {
      // 先 verify access token
      const verifyRes = await $fetch('https://api.line.me/oauth2/v2.1/verify', {
        query: { access_token: body.accessToken }
      });
  
      // 再用 /v2/profile 拿 user profile
      const profile = await $fetch('https://api.line.me/v2/profile', {
        headers: { Authorization: `Bearer ${body.accessToken}` }
      });
  
      // profile.userId / displayName / pictureUrl ...
      // 在這裡做登入 / 註冊
      // ...
  
      return { ok: true };
    }
  });
  