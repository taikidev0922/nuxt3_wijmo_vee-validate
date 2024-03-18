import { ActionType } from "~/types/action-type";
import { ref, computed } from "vue";
export function useActionType() {
  const selectedActionType = useState<ActionType>(
    "selectedActionType",
    () => ActionType.register
  );
  const setActionType = (actionType: ActionType) => {
    actionType;
    selectedActionType.value = actionType;
  };
  const isEditableActionType = computed(() => {
    if (
      selectedActionType.value === ActionType.register ||
      selectedActionType.value === ActionType.update
    ) {
      return true;
    }
    return false;
  });

  return {
    selectedActionType,
    setActionType,
    isEditableActionType,
  };
}
