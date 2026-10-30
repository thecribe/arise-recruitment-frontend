import { instance } from "@/api/client";
import type {
  AssignableRole,
  User,
  UserApiResponse,
  UserCreateValues,
  UserListParams,
  UserListResponse,
  UserUpdateValues,
  UserStatusValues,
  UserRoleValues,
} from "../types/user.types";

const BASE_URL = "/settings/users";

const getAll = async (
  params: UserListParams = {},
): Promise<UserListResponse> => {
  const response = await instance.get<UserApiResponse<UserListResponse>>(
    BASE_URL,
    { params },
  );

  return response.data.data;
};

const getById = async (id: string): Promise<User> => {
  const response = await instance.get<UserApiResponse<User>>(
    `${BASE_URL}/${id}`,
  );

  return response.data.data;
};

const getAssignableRoles = async (): Promise<AssignableRole[]> => {
  const response = await instance.get<UserApiResponse<AssignableRole[]>>(
    `${BASE_URL}/roles`,
  );

  return response.data.data;
};

const create = async (values: UserCreateValues): Promise<User> => {
  const response = await instance.post<UserApiResponse<User>>(BASE_URL, values);

  return response.data.data;
};

const update = async (id: string, values: UserUpdateValues): Promise<User> => {
  const response = await instance.patch<UserApiResponse<User>>(
    `${BASE_URL}/${id}`,
    values,
  );

  return response.data.data;
};

const updateRole = async (
  id: string,
  values: UserRoleValues,
): Promise<User> => {
  const response = await instance.patch<UserApiResponse<User>>(
    `${BASE_URL}/${id}/role`,
    values,
  );

  return response.data.data;
};

const updateStatus = async (
  id: string,
  values: UserStatusValues,
): Promise<User> => {
  const response = await instance.patch<UserApiResponse<User>>(
    `${BASE_URL}/${id}/status`,
    values,
  );

  return response.data.data;
};

const resetPassword = async (id: string, password: string): Promise<User> => {
  const response = await instance.patch<UserApiResponse<User>>(
    `${BASE_URL}/${id}/password`,
    { password },
  );

  return response.data.data;
};
export const usersApi = {
  getAll,
  getById,
  getAssignableRoles,
  create,
  update,
  updateRole,
  updateStatus,
  resetPassword,
};
