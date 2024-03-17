<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import { ActionType } from "~/types/action-type";
import { useActionType } from "~/composables/useActionType";

const props = defineProps({
  actionTypes: {
    type: Array as PropType<ActionType[]>,
    required: true,
  },
  value: {
    type: Number as PropType<ActionType>,
  },
});

const { selectedActionType, setActionType } = useActionType();

const onChange = (event: Event) => {
  setActionType(
    (event.target as HTMLInputElement).value as unknown as ActionType
  );
};
</script>

<template>
  <div class="flex space-x-4 border border-gray-400 rounded-sm p-1 mb-3">
    <div
      class="flex items-center"
      v-for="actionType in actionTypes"
      :key="actionType"
    >
      <input
        type="radio"
        :id="`action-${actionType}`"
        name="action"
        :value="actionType"
        class="mr-1"
        :checked="value === actionType"
        @change="onChange"
      />
      <label
        :for="`action-${actionType}`"
        v-if="actionType === ActionType.register"
      >
        登録する
      </label>
      <label
        :for="`action-${actionType}`"
        v-else-if="actionType === ActionType.update"
      >
        更新する
      </label>
      <label
        :for="`action-${actionType}`"
        v-else-if="actionType === ActionType.refer"
      >
        参照する
      </label>
      <label
        :for="`action-${actionType}`"
        v-else-if="actionType === ActionType.delete"
        >削除する</label
      >
    </div>
  </div>
</template>
