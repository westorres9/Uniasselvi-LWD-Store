import { createContext } from "react";
import { AccessTokenPayload } from "../types/auth";

export type ContextTokenType = {
  contextTokenPayload: AccessTokenPayload | undefined;
  setContextTokenPayload: (
    accessTokenPayload: AccessTokenPayload | undefined
  ) => void;
};

export const ContextToken = createContext<ContextTokenType>({
  contextTokenPayload: undefined,
  setContextTokenPayload: () => {},
});
