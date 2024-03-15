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
  <form @submit="onSubmit">
    <InputText name="email" label="email" type="email" />
    <InputText name="password" label="password" type="password" />
    <Button text="signin" />
  </form>
</template>
