import { z } from "zod";

/**
 * Zod validation schemas for member management
 * 會友管理的 Zod 驗證架構
 */

// Helper schemas
const phoneRegex = /^09\d{8}$/; // Taiwan mobile phone format
const emailSchema = z.string().email({ message: "請輸入有效的 Email 地址" });
const phoneSchema = z
  .string()
  .regex(phoneRegex, { message: "請輸入有效的手機號碼 (09XXXXXXXX)" })
  .optional()
  .or(z.literal(""));

// Date validation helper
const dateStringSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine(
    (val) => {
      if (!val) return true;
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "請輸入有效的日期" }
  );

/**
 * Schema for creating a new member
 * 新增會友的驗證架構
 */
export const createMemberSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "請輸入姓名" })
      .max(100, { message: "姓名長度不可超過 100 字元" }),
    email: emailSchema,
    phone: phoneSchema,
    password: z
      .string()
      .min(6, { message: "密碼至少需要 6 個字元" })
      .max(100, { message: "密碼長度不可超過 100 字元" }),
    address: z.string().optional().or(z.literal("")),
    avatar: z.string().optional().or(z.literal("")),
    birthDate: dateStringSchema,
    baptismDate: dateStringSchema,
    joinDate: dateStringSchema,
    roleId: z.string().min(1, { message: "請選擇角色" }),
    smallGroupId: z.string().optional().or(z.literal("")),
    familyMemberIds: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      // Validate baptism date is after birth date if both exist
      if (data.birthDate && data.baptismDate) {
        const birth = new Date(data.birthDate);
        const baptism = new Date(data.baptismDate);
        return baptism >= birth;
      }
      return true;
    },
    {
      message: "受洗日期不可早於出生日期",
      path: ["baptismDate"],
    }
  )
  .refine(
    (data) => {
      // Validate join date is after birth date if both exist
      if (data.birthDate && data.joinDate) {
        const birth = new Date(data.birthDate);
        const join = new Date(data.joinDate);
        return join >= birth;
      }
      return true;
    },
    {
      message: "加入教會日期不可早於出生日期",
      path: ["joinDate"],
    }
  );

/**
 * Schema for updating an existing member
 * 更新會友的驗證架構
 */
export const updateMemberSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "請輸入姓名" })
      .max(100, { message: "姓名長度不可超過 100 字元" }),
    email: emailSchema,
    phone: phoneSchema,
    password: z
      .string()
      .min(6, { message: "密碼至少需要 6 個字元" })
      .max(100, { message: "密碼長度不可超過 100 字元" })
      .optional()
      .or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
    avatar: z.string().optional().or(z.literal("")),
    birthDate: dateStringSchema,
    baptismDate: dateStringSchema,
    joinDate: dateStringSchema,
    roleId: z.string().min(1, { message: "請選擇角色" }),
    smallGroupId: z.string().optional().or(z.literal("")),
    familyMemberIds: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.birthDate && data.baptismDate) {
        const birth = new Date(data.birthDate);
        const baptism = new Date(data.baptismDate);
        return baptism >= birth;
      }
      return true;
    },
    {
      message: "受洗日期不可早於出生日期",
      path: ["baptismDate"],
    }
  )
  .refine(
    (data) => {
      if (data.birthDate && data.joinDate) {
        const birth = new Date(data.birthDate);
        const join = new Date(data.joinDate);
        return join >= birth;
      }
      return true;
    },
    {
      message: "加入教會日期不可早於出生日期",
      path: ["joinDate"],
    }
  );

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
