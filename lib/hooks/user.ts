import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveUserApi,
  deleteUserApi,
  getAllUsersApi,
  getUsersApi,
  rejectUserApi,
} from "../user";
// import { useNavigate } from "react-router-dom";

// import { check } from "../../../components/common/access";
// import { PERMISSION_ERROR_MESSAGE } from "../../configs/constants";
// import {
//   USER_EDIT_ROUTE_ONLY,
//   USER_LIST_ROUTE,
// } from "../../configs/path-route";
// import { access } from "../../configs/user-access";
// import { useAuth } from "../../contexts/auth";
// import { formatProxyTenantLists, formatUsers } from "../../models";
// import useAPIError from "../useApiError.hook";

const USER_SERVER_KEY = "users";
const USERS_SERVER_KEY = "all-users";

const useUser = () => {
  const userLists = useQuery([USER_SERVER_KEY], getUsersApi, {
    enabled: true,
    onError: (error) => {
      console.log("Error", error);
    },
    select: (data) => {
      return data?.data;
    },
  });

  return {
    myData: userLists?.data,
    loading: userLists?.isLoading,
  };
};

const useUsers = () => {
  const userLists = useQuery([USERS_SERVER_KEY], getAllUsersApi, {
    enabled: true,
    onError: (error) => {
      console.log("Error", error);
    },
    select: (data) => {
      return data?.data;
    },
  });

  let data = [];
  if (userLists?.data?.allUsers && userLists?.data?.allUsers.length > 0) {
    data = userLists?.data?.allUsers.map((item: any, index: number) => {
      return {
        ...item,
        sn: index + 1,
      };
    });
  }

  return {
    userList: data,
    loading: userLists?.isLoading,
  };
};

const useModifyUsers = () => {
  const queryClient = useQueryClient();
  const rejectUser = useMutation(rejectUserApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([USERS_SERVER_KEY]);
    },
    onError: (error) => {},
  });
  const approveUser = useMutation(approveUserApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([USERS_SERVER_KEY]);
    },
    onError: (error) => {},
  });

  const deleteUser = useMutation(deleteUserApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([USERS_SERVER_KEY]);
    },
    onError: (error) => {},
  });

  return {
    approveUser,
    rejectUser,
    deleteUser,
  };
};

export { useModifyUsers, useUser, useUsers };
