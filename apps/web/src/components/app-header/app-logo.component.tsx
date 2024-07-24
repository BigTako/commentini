import Link from "next/link";
import styled from "@emotion/styled";

const StyledAppLogo = styled("h2")`
  color: inherit;
  font-size: 18px;
  text-align: center;
`;

export function AppLogo() {
  return (
    <Link href="/">
      <StyledAppLogo>Commentini</StyledAppLogo>
    </Link>
  );
}
