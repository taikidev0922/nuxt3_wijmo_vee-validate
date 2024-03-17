<template>
  <div class="form-group mx-1">
    <div class="flex flex-col">
      <label for="theComboNoSrc" class="font-semibold">
        {{ label }}
      </label>
      <WjComboBox
        id="theComboNoSrc"
        :textChanged="onTextChanged"
        :initialized="onInit"
        class="border"
        :inputType="type || 'text'"
      ></WjComboBox>
    </div>
    <div class="text-red-500 text-sm h-2">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { WjComboBox } from "@grapecity/wijmo.vue2.input";
import { ComboBox } from "@grapecity/wijmo.input";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: String,
  modelValue: String,
});
const onInit = (e: ComboBox) => {
  e.inputElement.name = props.name;
  e.inputElement.required = false;
};
const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const onTextChanged = (e: ComboBox) => {
  value.value = e.text;
};
</script>
