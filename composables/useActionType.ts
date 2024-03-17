import { ActionType } from "~/types/action-type";

export function useActionType() {
  const selectedActionType = useState(
    "selectedActionType",
    () => ActionType.register
  );

  const setActionType = (actionType: ActionType) => {
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
