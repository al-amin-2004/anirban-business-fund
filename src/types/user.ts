import { blood, country, gender, role } from "@/constants/user";

type Gender = (typeof gender)[number];
type Blood = (typeof blood)[number];
type Role = (typeof role)[number];
type Country = (typeof country)[number];

export interface IUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  isVerifiedEmail: boolean;

  number: string;
  isVerifiedNumber: boolean;

  avatar: string;
  avatarId: string;

  gender: Gender;
  dateOfBirth?: Date;
  blood: Blood;
  nationality: Country;
  address?: string;

  role: Role;

  identification: {
    birthId?: string;
    nid?: string;
  };
}

export interface IUserWithPassword extends IUser {
  password: string;
}
