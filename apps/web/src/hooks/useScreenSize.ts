import { useMediaQuery } from "@mui/material";

interface ScreenSize {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export function useScreenSize(): ScreenSize {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const isTablet = useMediaQuery("(max-width:767px) and (min-width:425px)");
  const isMobile = useMediaQuery("(max-width:425px)");

  return { isDesktop, isTablet, isMobile };
}
