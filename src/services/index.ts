import fetch from "unfetch";
// const fetch = require("unfetch");

import { BASE_URL } from "../constants/endpoints";
import { Constants } from "../constants/localStorage";
import { Log } from "./analytics.service";
import { getItem } from "./storage.service";

export interface IApiRequest {
  method?: "get" | "post" | "put" | "delete" | undefined;
  baseUrl?: string | undefined;
  url: string;
  body?: any | undefined;
  headers?: object | undefined;
  withAuthToken?: boolean;
}
export interface IApiResponse<T> {
  data: T | undefined;
}

export const getHeaders = async (withAuthToken: boolean) => {
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  if (withAuthToken) {
    const jwtToken = getItem(Constants.JWT_TOKEN);
    // const refreshToken = getItem(Constants.REFRESH_TOKEN);
    // const expirationToken = getItem(Constants.EXPIRATION_TOKEN);
    // const rememberMe = getItem(Constants.REMEMBER_ME);
    Log(`[🚀] fetcher - jwtToken: ${jwtToken}`);
    // Log(`[🚀] fetcher - expirationToken: ${expirationToken}`);

    // NOTE: Meccanismo di Refresh token
    // if (expirationToken && parseInt(expirationToken, 10) < new Date().getTime()) {
    //   if (rememberMe === 'false') {
    //     Log(`[🚀] fetcher - need refresh, but rememberMe is FALSE`);
    //     removeItem(Constants.JWT_TOKEN)
    //     window.location.href = AUTH

    //     return false
    //   } else {
    //     Log(`[🚀] fetcher - need refresh, refreshToken: ${refreshToken}`);

    //     const response = await fetch(`${BASE_URL}${REFRESH_TOKEN}`, {
    //       method: 'post',
    //       body: JSON.stringify({ refreshToken }),
    //       headers: { ...baseHeaders, Authorization: `Bearer ${jwtToken}` },
    //     });
    //     if (response.ok) {
    //       const refreshTokenResponse = await response.json();

    //       const jwtToken = setItem(Constants.JWT_TOKEN, refreshTokenResponse.jwtToken);
    //       setItem(Constants.REFRESH_TOKEN, refreshTokenResponse.refreshToken);
    //       setItem(Constants.EXPIRATION_TOKEN, refreshTokenResponse.expirationToken);

    //       return { ...baseHeaders, Authorization: `Bearer ${jwtToken}` };
    //     }

    //     return baseHeaders
    //   }
    // }

    if (jwtToken) {
      return { ...baseHeaders, Authorization: `Bearer ${jwtToken}` };
    }
  }

  return baseHeaders;
};

export async function fetcher<T>(
  params: IApiRequest
): Promise<IApiResponse<T>> {
  const { withAuthToken = true } = params;

  const headers = await getHeaders(withAuthToken);
  const _headers: any = { ...headers, ...params?.headers };

  Log(`[🚀] fetcher - url: ${params.baseUrl || BASE_URL}${params.url}`);
  Log(
    `[🚀] fetcher - params: ${JSON.stringify({
      method: params.method || "get",
      body: params?.body,
      headers: _headers,
    })}`
  );

  const response = await fetch(`${params.baseUrl || BASE_URL}${params.url}`, {
    method: params.method || "get",
    body: params?.body && JSON.stringify(params.body),
    headers: _headers,
  });

  if (response.ok) {
    if (response.status !== 204) {
      const jsonResponse = await response.json();
      return { data: jsonResponse };
    }
    /* @ts-ignore */
    return { data: { status: response.status } };
  }
  if (!response.ok) {
    const jsonResponse = await response.json();
    throw jsonResponse;
  }

  return { data: undefined };
}
