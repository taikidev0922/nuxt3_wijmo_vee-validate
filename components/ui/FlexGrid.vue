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
  console.log("?");
});
const gridRef = ref<FlexGrid>();
const onInitialized = (grid: FlexGrid) => {
  gridRef.value = grid;
  grid.selectionMode = SelectionMode.Row;
  grid.keyActionTab = KeyAction.CycleEditable;
  grid.cellEditEnded.addHandler((g, args) => {
    grid.beginUpdate();
    grid.collectionView.items[args.row].operation = "SAVE";
    if (args.getColumn().binding !== "isSelected") {
      grid.collectionView.items[args.row].isSelected = true;
    }
    grid.endUpdate();
  });
  grid.itemFormatter = (panel, r, c, cell) => {
    if (panel.cellType === CellType.Cell) {
      if (isEditableActionType.value) {
        cell.classList.add("editable");
      }
      cell.classList.add("editable");
    }
  };
};

const columns = computed<Column[]>(() => [
  {
    binding: " ",
    header: "",
    dataType: DataType.Boolean,
    width: 30,
    cssClass: "wj-header",
  },
  {
    binding: "operation",
    header: " ",
    width: 30,
    dataType: DataType.String,
    cssClass: "wj-header",
    cellTemplate(ctx, cell) {
      if (ctx.value === "SAVE" && ctx.item.id) {
        cell!.style.backgroundColor = "green";
        return `<span class="font-bold text-white text-xl h-6 w-4 rounded-full flex items-center justify-center">U</span>`;
      }
      if (ctx.value === "SAVE" && !ctx.item.id) {
        cell!.style.backgroundColor = "blue";
        return `<span class="font-bold text-white text-xl h-6 w-4 rounded-full flex items-center justify-center">I</span>`;
      }
      if (ctx.value === "DELETE") {
        cell!.style.backgroundColor = "red";
        return `<span class="font-bold text-white text-xl h-6 w-4 rounded-full flex items-center justify-center">D</span>`;
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
    style="height: 70vh"
    :initialized="onInitialized"
  >
    <WjFlexGridColumn
      v-for="column in columns"
      :key="column.binding"
      :binding="column.binding"
      :header="column.header"
      :dataType="column.dataType"
      :isReadOnly="column.isReadOnly"
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
  <Button text="更新" color="bg-blue-500 h-1/3" @click="update" />
</template>
