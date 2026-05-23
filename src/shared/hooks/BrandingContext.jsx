import { createContext, useContext } from "react";

export const BrandingContext = createContext(null);

export const useBranding = () => {
  return useContext(BrandingContext);
};