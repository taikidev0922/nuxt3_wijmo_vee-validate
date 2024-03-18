export const useCustomFetch = async (
  url: string,
  options?: {
    query?: { [key: string]: any };
    body?: RequestInit["body"] | Record<string, any>;
    method?: RequestInit["method"];
  }
) => {
  const client = useSanctumClient();
  const token = useCookie("XSRF-TOKEN");
  const { increment, decrement } = useLoading();
  return client(url, {
    ...options,
    headers: {
      "X-XSRF-TOKEN": token.value as string,
    },
    async onResponse({ request, response, options }) {
      decrement();
      console.log("[fetch response]");
    },
    async onResponseError({ request, response, options }) {
      console.log("[fetch response error]");
    },

    async onRequest({ request, options }) {
      increment();
      console.log("[fetch request]");
    },
    async onRequestError({ request, options, error }) {
      console.log("[fetch request error]");
    },
  });
};
