export interface Permission {
    read: boolean;
    write: boolean;
    edit: boolean;
    delete: boolean;
}

export interface UserPermissions {
    [module: string]: {
        [routine: string]: Permission;
    };
}