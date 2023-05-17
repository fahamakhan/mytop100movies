import { UserEntity } from "src/user/entities/user.entity";

export enum Role {
  User = 'user'
}

export interface IAuthenticate {
  readonly user: UserEntity;
  readonly token: string;
}
