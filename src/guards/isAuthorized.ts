import passport from "passport";

export const isAuthorized = () => {
  return passport.authenticate("jwt", { session: false });
};
