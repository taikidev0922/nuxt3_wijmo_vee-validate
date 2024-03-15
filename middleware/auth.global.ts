export default defineNuxtRouteMiddleware((from, to) => {
  const { isAuthenticated } = useSanctumAuth();
  if (from.path !== "/login" && !isAuthenticated.value) {
    return navigateTo("/login" + "?redirect=" + from.path);
  }
  if (from.path === "/login" && isAuthenticated.value) {
    return navigateTo("/");
  }
});
