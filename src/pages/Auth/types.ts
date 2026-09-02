export type SignInFormDto = {
  email: string;
  password: string;
};

export type SignUpFormDto = SignInFormDto & {
  rPassword: string;
};

export type RecoveryFormDto = {
  email: string;
};

export type UpdatePasswordFormDto = {
  password: string;
  rPassword: string;
};
