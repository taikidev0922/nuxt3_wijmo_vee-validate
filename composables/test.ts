export function useTest() {
  const state = ref("local state");

  const change = () => {
    state.value = "test2";
  };
  return {
    state,
    change,
  };
}
