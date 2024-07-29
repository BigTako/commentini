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
import { useAuthQuery } from "~/contexts/auth-query.context";
import { Loader } from "../loader.component";
import toast from "react-hot-toast";

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

function AuthedPopover({
  visible,
  onLogout,
}: {
  visible: boolean;
  onLogout?: () => void;
}) {
  const logout = useAuthQuery().useLogout({
    onSuccess: () => {
      toast.success("Logged out");
      onLogout?.();
    },
  }).logout;

  return (
    <Popover top="75px" right="10px" visible={visible}>
      <MenuList>
        <MenuListItem icon={<AccountCircleIcon />} text="View Profile" />
        <MenuListItem
          icon={<LogoutIcon />}
          text="Log Out"
          onClick={() => logout()}
        />
      </MenuList>
    </Popover>
  );
}

function LoginButton() {
  return <VioletRectButton href="/login">Login</VioletRectButton>;
}

const LoaderContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

export function AppHeader() {
  const [popoverOpened, setPopoverOpened] = useState("");
  const { isLoading, data: profile, error } = useAuthQuery().useUserProfile();

  const { isMobile } = useScreenSize();

  const isAuthenticated = profile && !error;

  const togglePopoverOpened = useCallback((name: string) => {
    setPopoverOpened((v) => (v === name ? "" : name));
  }, []);

  const { username } = profile || {};

  return (
    <StyledAppHeader>
      <AppLogo />
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <>
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
                  username={username}
                  profileImage="/avatar.png"
                  onClick={() => {
                    togglePopoverOpened("authed-Popover");
                  }}
                />
              )}
              {!isAuthenticated && <LoginButton />}
            </>
          )}
        </>
      )}
      <UnAuthedPopover visible={popoverOpened === "unauthed-Popover"} />
      <AuthedPopover
        visible={popoverOpened === "authed-Popover"}
        onLogout={() => setPopoverOpened("")}
      />
    </StyledAppHeader>
  );
}
