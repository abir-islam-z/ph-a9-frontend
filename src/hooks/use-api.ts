import { fetchApi } from "@/lib/api-client";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import useSWRMutation, {
  type SWRMutationConfiguration,
  type SWRMutationResponse,
} from "swr/mutation";

// Generic fetcher function for SWR\
const fetcher = async <T>(url: string): Promise<T> => {
  return fetchApi<T>(url);
};

// Generic mutation function for SWR
const mutationFetcher = async <T, P>(
  url: string,
  { arg }: { arg: P }
): Promise<T> => {
  return fetchApi<T>(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
};

// Hook for GET requests
export function useApiGet<T>(
  url: string | null,
  config?: SWRConfiguration
): SWRResponse<T, Error> {
  return useSWR<T, Error>(url, fetcher, config);
}

// Hook for POST requests
export function useApiPost<T, P = any>(
  url: string,
  config?: SWRMutationConfiguration<T, Error, string, P>
): SWRMutationResponse<T, Error, string, P> {
  return useSWRMutation<T, Error, string, P>(url, mutationFetcher, config);
}

// Hook for PUT requests
export function useApiPut<T, P = any>(
  url: string,
  config?: SWRMutationConfiguration<T, Error, string, P>
): SWRMutationResponse<T, Error, string, P> {
  return useSWRMutation<T, Error, string, P>(
    url,
    async (url: string, { arg }: { arg: P }) => {
      return fetchApi<T>(url, {
        method: "PUT",
        body: JSON.stringify(arg),
      });
    },
    config
  );
}

// Hook for PATCH requests
export function useApiPatch<T, P = any>(
  url: string,
  config?: SWRMutationConfiguration<T, Error, string, P>
): SWRMutationResponse<T, Error, string, P> {
  return useSWRMutation<T, Error, string, P>(
    url,
    async (url: string, { arg }: { arg: P }) => {
      return fetchApi<T>(url, {
        method: "PATCH",
        body: JSON.stringify(arg),
      });
    },
    config
  );
}

// Hook for DELETE requests
export function useApiDelete<T>(
  url: string,
  config?: SWRMutationConfiguration<T, Error, string, void>
): SWRMutationResponse<T, Error, string, void> {
  return useSWRMutation<T, Error, string, void>(
    url,
    async (url: string) => {
      return fetchApi<T>(url, {
        method: "DELETE",
      });
    },
    config
  );
}
