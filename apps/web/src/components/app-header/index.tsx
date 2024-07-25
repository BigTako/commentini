"use client";
import styled from "@emotion/styled";
import LoginIcon from "@mui/icons-material/Login";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCallback, useState } from "react";
import { useScreenSize } from "~/hooks/useScreenSize";
import { Popover } from "../popover";
import { AppLogo } from "./app-logo.component";
import { HeaderProfileInfo } from "./header-profile-info.component";
import { VioletRoundedButton } from "../buttons/rounded-violet-button.component";
import { VioletRectButton } from "../buttons/rect-violet-button.component";
import { MenuListItem } from "../containers/menu-list/item.component";
import { MenuList } from "../containers/menu-list";
import { useRouter } from "next/navigation";

const StyledAppHeader = styled("div")`
  padding: 10px 20px;
  display: flex;
  min-height: 70px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-primary-300);
  color: var(--color-secondary-600);
`;

function UnAuthedPopover({ visible }: { visible: boolean }) {
  const router = useRouter();
  return (
    <Popover top="75px" right="10px" visible={visible}>
      <MenuList>
        <MenuListItem
          onClick={() => router.push("/login")}
          icon={<LoginIcon />}
          text="Log In/Sign Up"
        />
      </MenuList>
    </Popover>
  );
}

function AuthedPopover({ visible }: { visible: boolean }) {
  return (
    <Popover top="75px" right="10px" visible={visible}>
      <MenuList>
        <MenuListItem icon={<AccountCircleIcon />} text="View Profile" />
        <MenuListItem icon={<LogoutIcon />} text="Log Out" />
      </MenuList>
    </Popover>
  );
}

function LoginButton() {
  return <VioletRectButton href="/login">Login</VioletRectButton>;
}

export function AppHeader() {
  const [PopoverOpened, setPopoverOpened] = useState("");

  const { isMobile } = useScreenSize();

  const isAuthenticated = false;

  const togglePopoverOpened = useCallback((name: string) => {
    setPopoverOpened((v) => (v === name ? "" : name));
  }, []);

  return (
    <StyledAppHeader>
      <AppLogo />
      {isMobile && (
        <VioletRoundedButton
          onClick={() => {
            const name = isAuthenticated
              ? "authed-Popover"
              : "unauthed-Popover";
            togglePopoverOpened(name);
          }}
        >
          <MoreVertIcon />
        </VioletRoundedButton>
      )}
      {!isMobile && (
        <>
          {isAuthenticated && (
            <HeaderProfileInfo
              username="Alexander Shcherbatov"
              profileImage="/avatar.png"
              onClick={() => {
                togglePopoverOpened("authed-Popover");
              }}
            />
          )}
          {!isAuthenticated && <LoginButton />}
        </>
      )}
      <UnAuthedPopover visible={PopoverOpened === "unauthed-Popover"} />
      <AuthedPopover visible={PopoverOpened === "authed-Popover"} />
    </StyledAppHeader>
  );
}
