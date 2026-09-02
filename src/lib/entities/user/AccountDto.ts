import { HorizonUserDto } from "./HorizonUserDto";

/**
 * Mirrors the server's `LoggedUserDto` (`src/auth/dto/logged-user.dto.ts`).
 * `email` is filled in client side right after signing in.
 */
export interface LoggedUserDto {
  user: {
    id: number;
    horizonUserId: number;
    email?: string;
  };
  token: string;
}

/** What the auth endpoints answer with once the status is folded in. */
export interface AuthResultDto extends Partial<LoggedUserDto> {
  status: number;
  error: HttpErrorDto | null;
}

/** The logged account kept by the `AccountProvider`. */
export interface AccountDto extends Partial<LoggedUserDto> {
  horizonUser?: HorizonUserDto;
}

export interface HttpErrorDto {
  status: number;
  message: string;
}
