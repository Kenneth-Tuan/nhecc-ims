<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import type { Member, MemberFormData, Role, SmallGroup } from "~/types/member";
import {
  createMemberSchema,
  updateMemberSchema,
} from "~/schemas/member.schema";
import type { z } from "zod";
import dayjs from "dayjs";

interface Props {
  member?: Member | null;
  roles: Role[];
  smallGroups: SmallGroup[];
  members: Member[]; // For family member selection
  loading?: boolean;
}

interface Emits {
  (e: "submit", data: MemberFormData): void;
  (e: "cancel"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Determine if we're in edit mode
const isEditMode = computed(() => !!props.member);

// Form state
const formData = ref<MemberFormData>({
  name: "",
  email: "",
  phone: "",
  password: "",
  address: "",
  avatar: "",
  birthDate: "",
  baptismDate: "",
  joinDate: "",
  roleId: "",
  smallGroupId: "",
  familyMemberIds: [],
});

// Initialize form data if editing
watchEffect(() => {
  if (props.member) {
    formData.value = {
      name: props.member.name,
      email: props.member.email,
      phone: props.member.phone || "",
      password: "", // Don't populate password
      address: props.member.address || "",
      avatar: props.member.avatar || "",
      birthDate: props.member.birthDate || "",
      baptismDate: props.member.baptismDate || "",
      joinDate: props.member.joinDate || "",
      roleId: props.member.roleId,
      smallGroupId: props.member.smallGroupId || "",
      familyMemberIds: props.member.familyMemberIds || [],
    };
  }
});

// Schema selection based on mode
const schema = computed(() =>
  isEditMode.value ? updateMemberSchema : createMemberSchema
);

// Role options
const roleOptions = computed(() =>
  props.roles.map((role) => ({
    label: role.name,
    value: role.id,
  }))
);

// Small group options
const smallGroupOptions = computed(() => [
  { label: "無", value: "" },
  ...props.smallGroups.map((group) => ({
    label: group.name,
    value: group.id,
  })),
]);

// Family member options (exclude current member)
const familyMemberOptions = computed(() =>
  props.members
    .filter((m) => m.id !== props.member?.id)
    .map((m) => ({
      label: m.name,
      value: m.id,
    }))
);

// Form submission
const onSubmit = (event: FormSubmitEvent<z.infer<typeof schema.value>>) => {
  emit("submit", event.data as MemberFormData);
};

// Date helper
const formatDateForInput = (date: string) => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};
</script>

<template>
  <UForm
    :state="formData"
    :schema="schema"
    class="space-y-6"
    @submit="onSubmit"
  >
    <!-- Name -->
    <UFormField name="name" label="姓名" required>
      <UInput
        v-model="formData.name"
        placeholder="請輸入姓名"
        icon="i-lucide-user"
      />
    </UFormField>

    <!-- Email -->
    <UFormField name="email" label="Email" required>
      <UInput
        v-model="formData.email"
        type="email"
        placeholder="example@email.com"
        icon="i-lucide-mail"
      />
    </UFormField>

    <!-- Phone -->
    <UFormField name="phone" label="電話">
      <UInput
        v-model="formData.phone"
        placeholder="0912345678"
        icon="i-lucide-phone"
      />
    </UFormField>

    <!-- Password (only show in create mode or as optional in edit) -->
    <UFormField
      name="password"
      :label="isEditMode ? '密碼（留空表示不變更）' : '密碼'"
      :required="!isEditMode"
    >
      <UInput
        v-model="formData.password"
        type="password"
        :placeholder="isEditMode ? '留空表示不變更密碼' : '請輸入密碼'"
        icon="i-lucide-lock"
      />
    </UFormField>

    <!-- Role -->
    <UFormField name="roleId" label="角色" required>
      <USelect
        v-model="formData.roleId"
        :items="roleOptions"
        placeholder="請選擇角色"
        icon="i-lucide-shield"
      />
    </UFormField>

    <!-- Address -->
    <UFormField name="address" label="住址">
      <UInput
        v-model="formData.address"
        placeholder="請輸入住址"
        icon="i-lucide-map-pin"
      />
    </UFormField>

    <!-- Birth Date -->
    <UFormField name="birthDate" label="出生年月日">
      <UInput v-model="formData.birthDate" type="date" icon="i-lucide-cake" />
    </UFormField>

    <!-- Baptism Date -->
    <UFormField name="baptismDate" label="受洗年月日">
      <UInput
        v-model="formData.baptismDate"
        type="date"
        icon="i-lucide-droplet"
      />
    </UFormField>

    <!-- Join Date -->
    <UFormField name="joinDate" label="加入教會時間">
      <UInput
        v-model="formData.joinDate"
        type="date"
        icon="i-lucide-calendar"
      />
    </UFormField>

    <!-- Small Group -->
    <UFormField name="smallGroupId" label="歸屬小組">
      <USelect
        v-model="formData.smallGroupId"
        :items="smallGroupOptions"
        placeholder="請選擇小組"
        icon="i-lucide-users"
      />
    </UFormField>

    <!-- Avatar URL -->
    <UFormField name="avatar" label="頭像網址" help="請輸入圖片網址">
      <UInput
        v-model="formData.avatar"
        placeholder="https://example.com/avatar.jpg"
        icon="i-lucide-image"
      />
    </UFormField>

    <!-- Avatar Preview -->
    <div v-if="formData.avatar" class="flex justify-center">
      <UAvatar :src="formData.avatar" :alt="formData.name" size="xl" />
    </div>

    <!-- Family Members -->
    <UFormField
      name="familyMemberIds"
      label="家庭成員"
      help="可複選多位家庭成員"
    >
      <USelectMenu
        v-model="formData.familyMemberIds"
        :items="familyMemberOptions"
        multiple
        placeholder="請選擇家庭成員"
      />
    </UFormField>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-4">
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        @click="emit('cancel')"
      >
        取消
      </UButton>
      <UButton type="submit" :loading="loading">
        {{ isEditMode ? "更新" : "新增" }}
      </UButton>
    </div>
  </UForm>
</template>
