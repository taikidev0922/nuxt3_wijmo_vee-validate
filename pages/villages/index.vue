<script setup lang="ts">
import InputText from "@/components/ui/InputText.vue";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useForm } from "vee-validate";
import { DataType } from "~/types/wijmo";
import SelectActionType from "~/components/ui/SelectActionType.vue";
import { ActionType } from "~/types/action-type";
import Accordion from "~/components/ui/Accordion.vue";
const items = useState("items", () => []);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      idm: yup.string(),
      name: yup.string(),
      name_en: yup.string(),
    })
  ),
});

const columns = computed(() => [
  { binding: "idm", header: "idm", dataType: DataType.String },
  { binding: "name", header: "村名(和文)", dataType: DataType.String },
  { binding: "name_en", header: "村名(英文)", dataType: DataType.String },
]);

const search = handleSubmit(async (values) => {
  const data = await useCustomFetch("/api/villages", {
    query: { ...values, limit: 100000 },
  });
  items.value = data.items;
});
const update = async (items: any) => {
  const data = await useCustomFetch("/api/villages", {
    method: "put",
    body: { items },
  });
  items.value = data.items;
};
</script>

<template>
  <SelectActionType
    :actionTypes="[
      ActionType.register,
      ActionType.update,
      ActionType.delete,
      ActionType.refer,
    ]"
    :value="ActionType.register"
  />
  <Accordion title="検索条件">
    <form @submit="search">
      <fieldset class="flex">
        <InputText name="idm" label="idm" />
        <InputText name="name" label="村名(和文)" />
        <InputText name="name_en" label="村名(英文)" />
        <Button text="検索" color="bg-blue-500 mt-5" />
      </fieldset>
    </form>
  </Accordion>
  <Accordion title="一覧">
    <FlexGrid :items="items" :columns="columns" @submit="update" />
  </Accordion>
</template>
