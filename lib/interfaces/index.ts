export interface IRole {
    id: number;
    roleName: string;
    description: string;
  }
  export interface IPermission {
    id: number;
    permissionName: string;
    description: string;
  }
  
  export interface IUser {
    message: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      id: number;
      role: IRole;
      permissions: IPermission[];
    };
  }