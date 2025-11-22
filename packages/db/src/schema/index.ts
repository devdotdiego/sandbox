import { account, session, user, verification } from "./auth";

const schema = {
  user,
  session,
  account,
  verification,
};

export type Schema = typeof schema;
export { schema };
