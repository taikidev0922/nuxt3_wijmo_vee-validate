// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  plugins: ["@/plugins/wijmo", "@/plugins/vee-validate"],
  modules: ["@nuxtjs/tailwindcss", "nuxt-auth-sanctum"],
  sanctum: {
    baseUrl: process.env.BASE_URL, // Laravel API
    origin: process.env.BASE_URL, // Nuxt app, by default will be used 'useRequestURL().origin'
    endpoints: {
      csrf: "/api/sanctum/csrf-cookie", // CSRF cookie endpoint
      login: "/api/auth/login", // Endpoint that accepts user credentials
      logout: "/api/auth/logout", // Endpoint to destroy the current session
      user: "/api/auth", // Endpoint that return current user information
    },
    redirect: {
      keepRequestedRoute: true, // Keep requested route in the URL for later redirect
      onLogin: "/", // Redirect to this page after successful login
      onLogout: "/login", // Redirect to this page after successful logout
      onAuthOnly: "/login", // Redirect to this page if user is not authenticated
      onGuestOnly: "/", // Redirect to this page if user is authenticated
    },
  },
  vite: {
    server: {
      proxy: {
        "/api/": {
          target: process.env.API_URL,
          secure: false,
        },
      },
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
