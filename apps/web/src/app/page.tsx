"use client";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Link from "next/link";

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHomePage = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 20px;
`;

export default function Page(): JSX.Element {
  return (
    <StyledMainContainer>
      <StyledHomePage>
        <div>Hello, it's homepage</div>
        <Link href="/posts" style={{ textAlign: "center" }}>
          <Button variant="outlined">Overview posts</Button>
        </Link>
      </StyledHomePage>
    </StyledMainContainer>
  );
}
