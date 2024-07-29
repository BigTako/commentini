import {
  ILoginDto,
  ISignupDto,
  IUserProfile,
} from "~/components/modules/auth/types";
import { HttpService } from "./http.service";
import { STORAGE_KEYS } from "~/keys";
import { AxiosError } from "axios";
import { IServerError } from "~/types";

function extractServerErrorMessage(error: unknown) {
  const axiousError = error as AxiosError;
  const serverError = axiousError?.response?.data as IServerError;
  return serverError?.messages?.[0];
}

export class AuthService extends HttpService {
  constructor() {
    super();
  }

  async login(data: ILoginDto): Promise<{ jwt: string }> {
    try {
      const response = await this.post(
        {
          url: "auth/login",
          data,
        },
        false
      );
      const { token } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      return response.data;
    } catch (error) {
      const message = extractServerErrorMessage(error) || "Failed to login";
      throw new Error(message);
    }
  }

  async signup(data: ISignupDto): Promise<{ jwt: string }> {
    try {
      const response = await this.post(
        {
          url: "auth/signup",
          data,
        },
        false
      );
      const { token } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      return response.data;
    } catch (error) {
      const message = extractServerErrorMessage(error) || "Failed to signup";
      throw new Error(message);
    }
  }

  logout(): Promise<void> {
    return Promise.resolve(localStorage.setItem(STORAGE_KEYS.TOKEN, ""));
  }

  async getUserProfile(): Promise<IUserProfile> {
    try {
      const response = await this.get(
        {
          url: "auth/profile",
        },
        true
      );
      return response.data;
    } catch (error) {
      const message =
        extractServerErrorMessage(error) ||
        "Failed to get current user profile";
      throw new Error(message);
    }
  }
}
