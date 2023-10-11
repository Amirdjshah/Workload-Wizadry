import { useQuery } from "@tanstack/react-query";
import { getAllFacultiesApi, getAllRolesApi } from "../role";

const ROLE_SERVER_KEY = "roles";
const FACULTY_SERVER_KEY = "faculties";

const useRoles = () => {
  const roleLists = useQuery([ROLE_SERVER_KEY], getAllRolesApi, {
    enabled: true,
    onError: (error) => {
      console.log("Error", error);
    },
    select: (data) => {
      return data?.data?.roles;
    },
  });

  return {
    roles: roleLists?.data,
    rolesLoading: roleLists?.isLoading,
  };
};
const useFaculties = () => {
  const list = useQuery([FACULTY_SERVER_KEY], getAllFacultiesApi, {
    enabled: true,
    onError: (error) => {
      console.log("Error", error);
    },
    select: (data) => {
      return data?.data?.faculties;
    },
  });

  return {
    faculties: list?.data,
    facultyLoading: list?.isLoading,
  };
};

export { useRoles, useFaculties };
