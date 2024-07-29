import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { STORAGE_KEYS } from "~/keys";

export class HttpService {
  constructor(
    private baseUrl = process.env.SERVER_URL,
    private fetchingService = axios
  ) {}

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  private populateTokenToHeaderConfig(): { Authorization: string } {
    const token = localStorage?.getItem(STORAGE_KEYS.TOKEN)?.replace(/"/g, "");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  get(config: AxiosRequestConfig, withAuth = true): Promise<AxiosResponse> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    const url = config.url as string;
    return this.fetchingService.get(
      this.getFullApiUrl(url),
      this.extractUrlAndDataFromConfig(config)
    );
  }

  put(
    config: AxiosRequestConfig,
    withAuth: boolean = true
  ): Promise<AxiosResponse> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    const url = config.url as string;
    return this.fetchingService.put(
      this.getFullApiUrl(url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  post(
    config: AxiosRequestConfig,
    withAuth: boolean = true
  ): Promise<AxiosResponse> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }
    const url = config.url as string;
    return this.fetchingService.post(
      this.getFullApiUrl(url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  delete(
    config: AxiosRequestConfig,
    withAuth: boolean = true
  ): Promise<AxiosResponse> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig(),
      };
    }

    const url = config.url as string;
    return this.fetchingService.delete(
      this.getFullApiUrl(url),
      this.extractUrlAndDataFromConfig(config)
    );
  }

  private extractUrlAndDataFromConfig({
    data: __,
    url: _,
    ...configWithoutDataAndUrl
  }: AxiosRequestConfig): AxiosRequestConfig {
    return configWithoutDataAndUrl;
  }
}
