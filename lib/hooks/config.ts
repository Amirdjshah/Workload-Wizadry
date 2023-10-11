import { useQuery } from "@tanstack/react-query";
import { getConfigApi } from "../config";

const CONFIG_SERVER_KEY = "config";

const useConfig = () => {
  const configs = useQuery([CONFIG_SERVER_KEY], getConfigApi, {
    enabled: true,
    onError: (error) => {
      console.log("Error", error);
    },
    select: (data) => {
      return data?.data;
    },
  });

  return {
    config: configs?.data?.config || [],
    loading: configs?.isLoading,
  };
};

export { useConfig };
