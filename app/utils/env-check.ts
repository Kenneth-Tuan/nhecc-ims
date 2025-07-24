/**
 * 環境變數檢查工具
 */
export function checkEnvironmentVariables() {
  const envVars = {
    VITE_APPWRITE_ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
    VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    VITE_APPWRITE_DATABASE_ID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    VITE_APPWRITE_COLLECTION_ID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  };

  console.log("🔍 環境變數檢查結果:");
  console.log("==================================");
  
  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      console.log(`✅ ${key}: ${value}`);
    } else {
      console.log(`❌ ${key}: 未設定`);
    }
  });
  
  console.log("==================================");
  
  const missingVars = Object.entries(envVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
    
  if (missingVars.length > 0) {
    console.error("❌ 缺少以下環境變數:");
    missingVars.forEach(key => console.error(`   - ${key}`));
    console.error("");
    console.error("💡 請檢查:");
    console.error("   1. env/.env.development 檔案是否存在");
    console.error("   2. 環境變數名稱是否正確");
    console.error("   3. 是否重新啟動了開發伺服器");
    console.error("   4. nuxt.config.ts 中的 envDir 設定是否正確");
  } else {
    console.log("✅ 所有環境變數都已正確設定!");
  }
  
  return {
    envVars,
    isValid: missingVars.length === 0,
    missingVars
  };
}
