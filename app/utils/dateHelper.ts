import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// 啟用自定義解析格式插件
dayjs.extend(customParseFormat);

/**
 * 解析日期字符串，支持 M/D/YYYY 格式
 * @param value 日期字符串
 * @returns Date 物件或 undefined
 */
export function parseDate(value: unknown): Date | undefined {
  if (!value) return undefined;

  const stringValue = value.toString().trim();
  if (!stringValue) return undefined;

  // 嘗試解析 M/D/YYYY 格式
  const date = dayjs(stringValue, "M/D/YYYY", true);

  if (date.isValid()) {
    return date.toDate();
  }

  // 如果不符合格式，返回 undefined
  return undefined;
}

/**
 * 格式化日期為 YYYY-MM-DD 格式
 * @param date Date 物件
 * @returns 格式化的日期字符串
 */
export function formatDate(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD");
}

/**
 * 格式化日期為顯示用格式
 * @param date Date 物件
 * @returns 格式化的日期字符串
 */
export function formatDisplayDate(date: Date): string {
  return dayjs(date).format("YYYY/MM/DD");
}

/**
 * 驗證日期字符串是否為有效的 M/D/YYYY 格式
 * @param value 日期字符串
 * @returns 是否有效
 */
export function isValidDateFormat(value: string): boolean {
  if (!value || !value.trim()) return false;

  const date = dayjs(value.trim(), "M/D/YYYY", true);
  return date.isValid();
}

/**
 * 將日期輸入框的值轉換為 Date 物件
 * @param dateInput 日期輸入框的值 (YYYY-MM-DD 格式)
 * @returns Date 物件或 undefined
 */
export function parseDateInput(
  dateInput: string | undefined
): Date | undefined {
  if (!dateInput) return undefined;

  const date = dayjs(dateInput, "YYYY-MM-DD", true);

  if (date.isValid()) {
    return date.toDate();
  }

  return undefined;
}

/**
 * 將 Date 物件轉換為日期輸入框的值
 * @param date Date 物件
 * @returns YYYY-MM-DD 格式的字符串
 */
export function formatDateInput(date: Date | undefined): string | undefined {
  if (!date) return undefined;

  return dayjs(date).format("YYYY-MM-DD");
}
