import { instance } from "@/api/client";

import type {
  Permission,
  Role,
  RoleApiResponse,
  RoleFormValues,
} from "../types/role.types";

const BASE_URL = "/settings/roles";

const getAll = async (): Promise<Role[]> => {
  const response = await instance.get<RoleApiResponse<Role[]>>(BASE_URL);
  return response.data.data;
};

const getPermissions = async (): Promise<Permission[]> => {
  const response = await instance.get<RoleApiResponse<Permission[]>>(
    `${BASE_URL}/permissions`,
  );

  return response.data.data;
};

const getById = async (id: string): Promise<Role> => {
  const response = await instance.get<RoleApiResponse<{ role: Role }>>(
    `${BASE_URL}/${id}`,
  );

  return response.data.data.role;
};

const create = async (values: RoleFormValues): Promise<Role> => {
  const response = await instance.post<RoleApiResponse<{ role: Role }>>(
    BASE_URL,
    values,
  );

  return response.data.data.role;
};

const update = async (
  id: string,
  values: Pick<RoleFormValues, "name" | "description">,
): Promise<Role> => {
  const response = await instance.patch<RoleApiResponse<{ role: Role }>>(
    `${BASE_URL}/${id}`,
    values,
  );

  return response.data.data.role;
};

const updatePermissions = async (
  id: string,
  permissionIds: string[],
): Promise<Role> => {
  const response = await instance.put<RoleApiResponse<{ role: Role }>>(
    `${BASE_URL}/${id}/permissions`,
    { permissionIds },
  );

  return response.data.data.role;
};

const remove = async (id: string): Promise<void> => {
  await instance.delete(`${BASE_URL}/${id}`);
};

export const rolesApi = {
  getAll,
  getPermissions,
  getById,
  create,
  update,
  updatePermissions,
  remove,
};
