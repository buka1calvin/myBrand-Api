const isAuth = (passport) => {
    return passport.authenticate("jwt", { session: false });
  };
  export default isAuth