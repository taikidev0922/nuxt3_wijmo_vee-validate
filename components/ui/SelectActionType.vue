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

const { setActionType } = useActionType();

const onChange = (event: Event) => {
  setActionType(Number((event.target as HTMLInputElement).value) as ActionType);
};
</script>

<template>
  <section
    class="flex space-x-4 border border-gray-400 rounded-sm p-1 my-2 bg-white"
  >
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
  </section>
</template>
