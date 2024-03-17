<script setup lang="ts">
import InputText from "@/components/ui/InputText.vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
const { login } = useSanctumAuth();
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    })
  ),
});

const onSubmit = handleSubmit(async (values) => {
  await login(values);
});
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-gray-200">
    <div class="rounded-lg px-4 py-6 mb-10 w-1/4 h-1/3 bg-white shadow-md">
      <h2 class="text-xl font-semibold text-gray-800">
        サンプル販売管理システム
      </h2>
      <form @submit="onSubmit">
        <InputText name="email" label="email" type="email" class="my-3" />
        <InputText
          name="password"
          label="password"
          type="password"
          class="my-3"
        />
        <Button text="signin" class="w-full mt-3" />
      </form>
    </div>
  </div>
</template>
