/**
 * Member entity type definitions
 * 會友實體型別定義
 */

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  avatar?: string;
  birthDate?: string; // ISO 8601 date string
  baptismDate?: string; // ISO 8601 date string
  joinDate?: string; // ISO 8601 date string
  roleId: string;
  roleName?: string;
  smallGroupId?: string;
  smallGroupName?: string;
  familyMemberIds?: string[];
  trainingCourses?: TrainingCourseCompletion[];
  createdAt: string;
  updatedAt: string;
}

export interface TrainingCourseCompletion {
  courseId: string;
  courseName: string;
  completionDate: string; // ISO 8601 date string
}

export interface MemberFormData {
  name: string;
  email: string;
  phone: string;
  password?: string; // Only for creation
  address?: string;
  avatar?: string;
  birthDate?: string;
  baptismDate?: string;
  joinDate?: string;
  roleId: string;
  smallGroupId?: string;
  familyMemberIds?: string[];
}

export interface MemberFilters {
  search?: string;
  roleId?: string;
  smallGroupId?: string;
  page?: number;
  pageSize?: number;
}

export interface MemberListResponse {
  data: Member[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Role {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: "active" | "inactive";
}

export interface SmallGroup {
  id: string;
  name: string;
  leaderId?: string;
  leaderName?: string;
}
