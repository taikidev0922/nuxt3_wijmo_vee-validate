export function useLoading() {
  const count = useState("loadingCount", () => 0);

  const isLoading = computed(() => count.value > 0);

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  return {
    isLoading,
    increment,
    decrement,
  };
}
