import type {
  Member,
  MemberFilters,
  MemberFormData,
  Role,
  SmallGroup,
} from "~/types/member";
import { memberService } from "~/services/memberService";

/**
 * Composable for member management
 * 會友管理的可組合函數
 */
export const useMemberManagement = () => {
  const toast = useToast();

  // State
  const members = ref<Member[]>([]);
  const currentMember = ref<Member | null>(null);
  const roles = ref<Role[]>([]);
  const smallGroups = ref<SmallGroup[]>([]);
  const isLoading = ref(false);
  const isSubmitting = ref(false);
  const totalMembers = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10);

  // Filters
  const filters = ref<MemberFilters>({
    search: "",
    roleId: "",
    smallGroupId: "",
  });

  /**
   * Load members with current filters
   * 以目前篩選條件載入會友
   */
  const loadMembers = async () => {
    isLoading.value = true;
    try {
      const response = await memberService.getMembers({
        ...filters.value,
        page: currentPage.value,
        pageSize: pageSize.value,
      });

      members.value = response.data;
      totalMembers.value = response.total;
    } catch (error) {
      console.error("Failed to load members:", error);
      toast.add({
        title: "載入失敗",
        description: "無法載入會友資料，請稍後再試",
        color: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Load member by ID
   * 以 ID 載入會友
   */
  const loadMemberById = async (id: string) => {
    isLoading.value = true;
    try {
      const member = await memberService.getMemberById(id);
      currentMember.value = member;
      return member;
    } catch (error) {
      console.error("Failed to load member:", error);
      toast.add({
        title: "載入失敗",
        description: "無法載入會友資料",
        color: "error",
      });
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Create new member
   * 建立新會友
   */
  const createMember = async (data: MemberFormData) => {
    isSubmitting.value = true;
    try {
      const newMember = await memberService.createMember(data);

      toast.add({
        title: "新增成功",
        description: `已成功新增會友：${newMember.name}`,
        color: "success",
      });

      await loadMembers(); // Reload list
      return newMember;
    } catch (error) {
      console.error("Failed to create member:", error);
      toast.add({
        title: "新增失敗",
        description: "無法新增會友，請檢查資料後再試",
        color: "error",
      });
      throw error;
    } finally {
      isSubmitting.value = false;
    }
  };

  /**
   * Update existing member
   * 更新現有會友
   */
  const updateMember = async (id: string, data: Partial<MemberFormData>) => {
    isSubmitting.value = true;
    try {
      const updatedMember = await memberService.updateMember(id, data);

      toast.add({
        title: "更新成功",
        description: `已成功更新會友：${updatedMember.name}`,
        color: "success",
      });

      await loadMembers(); // Reload list
      return updatedMember;
    } catch (error) {
      console.error("Failed to update member:", error);
      toast.add({
        title: "更新失敗",
        description: "無法更新會友資料，請稍後再試",
        color: "error",
      });
      throw error;
    } finally {
      isSubmitting.value = false;
    }
  };

  /**
   * Delete member
   * 刪除會友
   */
  const deleteMember = async (id: string, name: string) => {
    isSubmitting.value = true;
    try {
      await memberService.deleteMember(id);

      toast.add({
        title: "刪除成功",
        description: `已成功刪除會友：${name}`,
        color: "success",
      });

      await loadMembers(); // Reload list
    } catch (error) {
      console.error("Failed to delete member:", error);
      toast.add({
        title: "刪除失敗",
        description: "無法刪除會友，請稍後再試",
        color: "error",
      });
      throw error;
    } finally {
      isSubmitting.value = false;
    }
  };

  /**
   * Load roles
   * 載入角色
   */
  const loadRoles = async () => {
    try {
      roles.value = await memberService.getRoles();
    } catch (error) {
      console.error("Failed to load roles:", error);
    }
  };

  /**
   * Load small groups
   * 載入小組
   */
  const loadSmallGroups = async () => {
    try {
      smallGroups.value = await memberService.getSmallGroups();
    } catch (error) {
      console.error("Failed to load small groups:", error);
    }
  };

  /**
   * Update filters and reload
   * 更新篩選條件並重新載入
   */
  const updateFilters = async (newFilters: Partial<MemberFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
    currentPage.value = 1; // Reset to first page
    await loadMembers();
  };

  /**
   * Clear all filters
   * 清除所有篩選條件
   */
  const clearFilters = async () => {
    filters.value = {
      search: "",
      roleId: "",
      smallGroupId: "",
    };
    currentPage.value = 1;
    await loadMembers();
  };

  /**
   * Change page
   * 變更頁碼
   */
  const changePage = async (page: number) => {
    currentPage.value = page;
    await loadMembers();
  };

  return {
    // State
    members: computed(() => members.value),
    currentMember: computed(() => currentMember.value),
    roles: computed(() => roles.value),
    smallGroups: computed(() => smallGroups.value),
    isLoading: computed(() => isLoading.value),
    isSubmitting: computed(() => isSubmitting.value),
    totalMembers: computed(() => totalMembers.value),
    currentPage: computed(() => currentPage.value),
    pageSize: computed(() => pageSize.value),
    filters: computed(() => filters.value),

    // Computed
    totalPages: computed(() => Math.ceil(totalMembers.value / pageSize.value)),

    // Methods
    loadMembers,
    loadMemberById,
    createMember,
    updateMember,
    deleteMember,
    loadRoles,
    loadSmallGroups,
    updateFilters,
    clearFilters,
    changePage,
  };
};
