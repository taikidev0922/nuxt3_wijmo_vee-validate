<script setup lang="ts">
import {
  WjFlexGrid,
  WjFlexGridColumn,
  WjFlexGridCellTemplate,
} from "@grapecity/wijmo.vue2.grid";
import { DataType } from "@grapecity/wijmo";
import {
  FlexGrid,
  SelectionMode,
  KeyAction,
  CellType,
} from "@grapecity/wijmo.grid";
import type { Column } from "~/types/wijmo";
import { ActionType } from "~/types/action-type";
const props = defineProps({
  items: Array,
  columns: {
    type: Array<Column>,
    default: () => [],
  },
});
const { isEditableActionType, selectedActionType } = useActionType();
watch(selectedActionType, () => {
  gridRef.value!.collectionView.sourceCollection = [];
  gridRef.value?.collectionView?.refresh();
  if (selectedActionType.value === ActionType.register) {
    gridRef.value!.collectionView.sourceCollection = Array.from(
      { length: 10 },
      () => ({})
    );
    gridRef.value?.collectionView?.refresh();
  }
});
const gridRef = ref<FlexGrid>();
const onInitialized = (grid: FlexGrid) => {
  gridRef.value = grid;
  grid.selectionMode = SelectionMode.Row;
  grid.keyActionTab = KeyAction.CycleEditable;
  if (selectedActionType.value === ActionType.register) {
    gridRef.value!.collectionView.sourceCollection = Array.from(
      { length: 10 },
      () => ({})
    );
  }
  grid.cellEditEnded.addHandler((g, args) => {
    grid.beginUpdate();
    if (selectedActionType.value === ActionType.delete) {
      grid.collectionView.items[args.row].operation = "DELETE";
    } else if (isEditableActionType.value) {
      grid.collectionView.items[args.row].operation = "SAVE";
    }
    if (args.getColumn().binding !== "isSelected") {
      grid.collectionView.items[args.row].isSelected = true;
    }
    grid.endUpdate();
  });
  grid.itemFormatter = (panel, r, c, cell) => {
    if (
      panel.cellType === CellType.Cell &&
      !cell.classList.contains("wj-header")
    ) {
      if (isEditableActionType.value) {
        cell.classList.add("editable");
      }
    }
  };
};

const columns = computed<Column[]>(() => [
  {
    binding: "isSelected",
    header: " ",
    dataType: DataType.Boolean,
    width: 30,
    cssClass: "wj-header",
  },
  {
    binding: "operation",
    header: " ",
    width: 30,
    dataType: DataType.String,
    cssClass: "wj-header wj-row-header",
    cellTemplate(ctx, cell) {
      if (ctx.value === "SAVE" && ctx.item.id) {
        return `<span class="bg-green-600 font-bold text-white text-xl h-8 w-8 flex items-center justify-center absolute left-0 top-0">U</span>`;
      }
      if (ctx.value === "SAVE" && !ctx.item.id) {
        return `<span class="bg-blue-500 font-bold text-white text-xl h-8 w-8 flex items-center justify-center absolute left-0 top-0">I</span>`;
      }
      if (ctx.value === "DELETE") {
        return `<span class="bg-red-500 font-bold text-white text-xl h-8 w-8 flex items-center justify-center absolute left-0 top-0">D</span>`;
      }
      cell!.style.backgroundColor = "";
      return "";
    },
  },
  ...props.columns,
]);

const emit = defineEmits(["submit"]);

const update = () => {
  emit(
    "submit",
    gridRef.value?.collectionView.items.filter((item) => item.isSelected)
  );
};
</script>

<template>
  <WjFlexGrid
    :items-source="items"
    style="height: 60vh"
    :initialized="onInitialized"
  >
    <WjFlexGridColumn
      v-for="column in columns"
      :key="column.binding"
      :binding="column.binding"
      :header="column.header"
      :dataType="column.dataType"
      :isReadOnly="
        column.isReadOnly ||
        (!isEditableActionType && column.binding !== 'isSelected')
      "
      :visible="column.visible"
      :cellTemplate="column.cellTemplate"
      :width="column.width"
      :cssClass="column.cssClass"
      :isRequired="false"
    />
    <WjFlexGridCellTemplate cellType="RowHeader" v-slot="{ row }">
      {{ row.index + 1 }}
    </WjFlexGridCellTemplate>
  </WjFlexGrid>
  <div class="flex justify-end">
    <Button text="更新" color="bg-green-500" @click="update" />
  </div>
</template>
