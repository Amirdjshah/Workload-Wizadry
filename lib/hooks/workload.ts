import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    acceptWorkloadApi,
  deleteWorkloadApi,
  editWorkloadAPi,
  getWorkloadApi,
  getWorkloadSingleApi,
  postWorkloadApi,
  rejectWorkloadApi,
} from "../workload";

const WORKLOAD_SERVER_KEY = "workload";
const WORKLOAD_SINGLE_SERVER_KEY = "workloads";

const useWorkload = () => {
  const workloadList = useQuery([WORKLOAD_SERVER_KEY], getWorkloadApi, {
    enabled: true,
    onError: (error) => {
      console.log("Error", error);
    },
    select: (data) => {
      return data?.data;
    },
  });

  let data = [];
  if (
    workloadList?.data?.workload &&
    workloadList?.data?.workload?.length > 0
  ) {
    data = workloadList?.data?.workload?.map((item: any, index: number) => {
      return {
        ...item,
        serial_number: index + 1,
      };
    });
  }

  return {
    workloadData: data,
    workloadLoading: workloadList?.isLoading,
  };
};

const useSingleWorkload = (id: string) => {
  const workload = useQuery(
    [WORKLOAD_SINGLE_SERVER_KEY],
    () => getWorkloadSingleApi(id),
    {
      enabled: true,
      onError: (error) => {
        console.log("Error", error);
      },
      select: (data) => {
        return data?.data;
      },
    }
  );

  return {
    workloadData: workload?.data?.workload?.meta
      ? workload?.data?.workload?.meta
      : {},
    status: workload?.data?.workload?.status,
    workloadLoading: workload?.isLoading,
  };
};

const useModifyWorkload = () => {
  const queryClient = useQueryClient();
  const addWorkload = useMutation(postWorkloadApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([WORKLOAD_SERVER_KEY]);
    },
    onError: (error) => {},
  });
  const editWorkload = useMutation(editWorkloadAPi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([WORKLOAD_SERVER_KEY]);
    },
    onError: (error) => {},
  });

  const deleteWorkload = useMutation(deleteWorkloadApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([WORKLOAD_SERVER_KEY]);
    },
    onError: (error) => {},
  });

  const rejectWorkload = useMutation(rejectWorkloadApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([WORKLOAD_SERVER_KEY]);
    },
    onError: (error) => {},
  });
  const acceptWorkload = useMutation(acceptWorkloadApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([WORKLOAD_SERVER_KEY]);
    },
    onError: (error) => {},
  });

  return {
    addWorkload,
    editWorkload,
    deleteWorkload,
    rejectWorkload,
    acceptWorkload,
  };
};

export { useModifyWorkload, useWorkload, useSingleWorkload };
