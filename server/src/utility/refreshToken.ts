import { Express } from "express";
import Jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";

export const refreshToken = (app: Express) => {
  //! Refresh token link in FE contains error
  app.post("/refresh_token", (req, res) => {
    const options = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    const token = options.jwtFromRequest(req);

    if (token) {
      passport.authenticate("jwt", {
        session: false,
      })(req, res);

      const accessToken = Jwt.sign(
        { session_id: req.user.session_id, exp: 60 },
        process.env.JWT_SECRET || "",
        {
          issuer: process.env.ROOT_URL,
          expiresIn: "5h",
        }
      );

      const refreshToken = Jwt.sign(
        { session_id: req.user.session_id, exp: "3d" },
        process.env.JWT_SECRET || "",
        {
          issuer: process.env.ROOT_URL,
          expiresIn: "3d",
        }
      );

      res.json({
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: "Token not found" });
    }
  });

  return app;
};
