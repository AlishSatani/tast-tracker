import { NextPageContext } from "next";
import nookies from "nookies";

const cookieAge = 60 * 60 * 24; // 24 hours

class AuthToken {
  static get(context?: NextPageContext) {
    const cookies = nookies.get(context);
    return cookies;
  }

  static remove(key: "accessToken" | "refreshToken") {
    nookies.destroy(null, key);
  }

  static set(key: "accessToken" | "refreshToken", value: string, ctx?: NextPageContext) {
    // Mostly executed on client end, no need context
    nookies.set(ctx || null, key, value, {
      maxAge: cookieAge,
      path: "/",
    });
  }
}

export default AuthToken;
