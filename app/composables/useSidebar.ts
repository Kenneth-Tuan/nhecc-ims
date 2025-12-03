/**
 * 管理側邊欄收合狀態的 composable
 * 使用 useState 確保狀態在組件間共享且 SSR-friendly
 */
export const useSidebar = () => {
  // 使用 useState 創建共享狀態，key 必須是唯一的
  const isCollapsed = useState<boolean>("sidebar-collapsed", () => false);

  const toggle = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  const open = () => {
    isCollapsed.value = false;
  };

  const close = () => {
    isCollapsed.value = true;
  };

  return {
    isCollapsed: readonly(isCollapsed), // 使用 readonly 防止外部直接修改
    toggle,
    open,
    close,
  };
};
