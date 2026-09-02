export type PersonalInfoFormDto = {
  id?: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
};

export type SecurityFormDto = {
  password: string;
  rPassword: string;
};
