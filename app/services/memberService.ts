import type {
  Member,
  MemberFilters,
  MemberListResponse,
  MemberFormData,
  Role,
  SmallGroup,
} from "~/types/member";

/**
 * Member management service
 * 會友管理服務層
 *
 * Note: This is a placeholder implementation with mock data.
 * Backend engineer should replace these with actual API calls.
 * 注意：這是使用模擬資料的佔位實作。
 * 後端工程師應將這些替換為實際的 API 呼叫。
 */

// Mock data for development
const mockMembers: Member[] = [
  {
    id: "1",
    name: "王小明",
    email: "wang.xiaoming@example.com",
    phone: "0912345678",
    address: "台北市信義區信義路五段7號",
    avatar: "https://i.pravatar.cc/150?img=1",
    birthDate: "1990-05-15",
    baptismDate: "2010-03-20",
    joinDate: "2010-04-01",
    roleId: "member",
    roleName: "會友",
    smallGroupId: "group1",
    smallGroupName: "信心小組",
    familyMemberIds: ["2"],
    trainingCourses: [
      {
        courseId: "c1",
        courseName: "新生命課程",
        completionDate: "2011-12-15",
      },
      { courseId: "c2", courseName: "門徒訓練", completionDate: "2012-06-20" },
    ],
    createdAt: "2010-04-01T00:00:00Z",
    updatedAt: "2023-12-01T00:00:00Z",
  },
  {
    id: "2",
    name: "李美麗",
    email: "li.meili@example.com",
    phone: "0923456789",
    address: "台北市信義區信義路五段7號",
    avatar: "https://i.pravatar.cc/150?img=5",
    birthDate: "1992-08-22",
    baptismDate: "2012-07-10",
    joinDate: "2012-08-01",
    roleId: "small_group_leader",
    roleName: "小組長",
    smallGroupId: "group2",
    smallGroupName: "愛心小組",
    familyMemberIds: ["1"],
    trainingCourses: [
      {
        courseId: "c1",
        courseName: "新生命課程",
        completionDate: "2013-01-10",
      },
      { courseId: "c3", courseName: "領袖訓練", completionDate: "2014-09-15" },
    ],
    createdAt: "2012-08-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    name: "陳大偉",
    email: "chen.dawei@example.com",
    phone: "0934567890",
    address: "新北市板橋區文化路一段188號",
    birthDate: "1985-11-30",
    baptismDate: "2008-05-25",
    joinDate: "2008-06-01",
    roleId: "elder",
    roleName: "長老",
    smallGroupId: "group3",
    smallGroupName: "喜樂小組",
    trainingCourses: [
      {
        courseId: "c1",
        courseName: "新生命課程",
        completionDate: "2009-03-20",
      },
      { courseId: "c2", courseName: "門徒訓練", completionDate: "2009-09-15" },
      { courseId: "c3", courseName: "領袖訓練", completionDate: "2010-12-10" },
    ],
    createdAt: "2008-06-01T00:00:00Z",
    updatedAt: "2024-02-20T00:00:00Z",
  },
];

const mockRoles: Role[] = [
  { id: "pastor", code: "PASTOR", name: "牧師", status: "active" },
  { id: "elder", code: "ELDER", name: "長老", status: "active" },
  {
    id: "small_group_leader",
    code: "SG_LEADER",
    name: "小組長",
    status: "active",
  },
  { id: "member", code: "MEMBER", name: "會友", status: "active" },
];

const mockSmallGroups: SmallGroup[] = [
  { id: "group1", name: "信心小組", leaderId: "1", leaderName: "王小明" },
  { id: "group2", name: "愛心小組", leaderId: "2", leaderName: "李美麗" },
  { id: "group3", name: "喜樂小組", leaderId: "3", leaderName: "陳大偉" },
];

export const memberService = {
  /**
   * Fetch members with filters
   * 以篩選條件取得會友列表
   */
  async getMembers(filters?: MemberFilters): Promise<MemberListResponse> {
    // TODO: Replace with actual API call
    // const response = await $fetch('/api/members', { params: filters });

    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    let filteredMembers = [...mockMembers];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filteredMembers = filteredMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(search) ||
          m.email.toLowerCase().includes(search)
      );
    }

    if (filters?.roleId) {
      filteredMembers = filteredMembers.filter(
        (m) => m.roleId === filters.roleId
      );
    }

    if (filters?.smallGroupId) {
      filteredMembers = filteredMembers.filter(
        (m) => m.smallGroupId === filters.smallGroupId
      );
    }

    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      data: filteredMembers.slice(start, end),
      total: filteredMembers.length,
      page,
      pageSize,
    };
  },

  /**
   * Fetch single member by ID
   * 以 ID 取得單一會友
   */
  async getMemberById(id: string): Promise<Member | null> {
    // TODO: Replace with actual API call
    // const response = await $fetch(`/api/members/${id}`);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockMembers.find((m) => m.id === id) || null;
  },

  /**
   * Create new member
   * 建立新會友
   */
  async createMember(data: MemberFormData): Promise<Member> {
    // TODO: Replace with actual API call
    // const response = await $fetch('/api/members', { method: 'POST', body: data });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newMember: Member = {
      id: String(Date.now()),
      ...data,
      roleName: mockRoles.find((r) => r.id === data.roleId)?.name,
      smallGroupName: mockSmallGroups.find((g) => g.id === data.smallGroupId)
        ?.name,
      trainingCourses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockMembers.push(newMember);
    return newMember;
  },

  /**
   * Update existing member
   * 更新現有會友
   */
  async updateMember(
    id: string,
    data: Partial<MemberFormData>
  ): Promise<Member> {
    // TODO: Replace with actual API call
    // const response = await $fetch(`/api/members/${id}`, { method: 'PUT', body: data });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = mockMembers.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error("Member not found");
    }

    const existingMember = mockMembers[index];
    const updatedMember: Member = {
      ...existingMember,
      name: data.name ?? existingMember.name,
      email: data.email ?? existingMember.email,
      phone: data.phone ?? existingMember.phone,
      address: data.address ?? existingMember.address,
      avatar: data.avatar ?? existingMember.avatar,
      birthDate: data.birthDate ?? existingMember.birthDate,
      baptismDate: data.baptismDate ?? existingMember.baptismDate,
      joinDate: data.joinDate ?? existingMember.joinDate,
      roleId: data.roleId ?? existingMember.roleId,
      roleName: data.roleId
        ? mockRoles.find((r) => r.id === data.roleId)?.name
        : existingMember.roleName,
      smallGroupId: data.smallGroupId ?? existingMember.smallGroupId,
      smallGroupName: data.smallGroupId
        ? mockSmallGroups.find((g) => g.id === data.smallGroupId)?.name
        : existingMember.smallGroupName,
      familyMemberIds: data.familyMemberIds ?? existingMember.familyMemberIds,
      updatedAt: new Date().toISOString(),
    };

    mockMembers[index] = updatedMember;
    return updatedMember;
  },

  /**
   * Delete member
   * 刪除會友
   */
  async deleteMember(id: string): Promise<void> {
    // TODO: Replace with actual API call
    // await $fetch(`/api/members/${id}`, { method: 'DELETE' });

    await new Promise((resolve) => setTimeout(resolve, 300));

    const index = mockMembers.findIndex((m) => m.id === id);
    if (index !== -1) {
      mockMembers.splice(index, 1);
    }
  },

  /**
   * Fetch all roles
   * 取得所有角色
   */
  async getRoles(): Promise<Role[]> {
    // TODO: Replace with actual API call
    // const response = await $fetch('/api/roles');

    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...mockRoles];
  },

  /**
   * Fetch all small groups
   * 取得所有小組
   */
  async getSmallGroups(): Promise<SmallGroup[]> {
    // TODO: Replace with actual API call
    // const response = await $fetch('/api/small-groups');

    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...mockSmallGroups];
  },
};
