"use client";

import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    logoutUser,
    selectUser,
    userLoggedIn,
} from "../redux/features/user-slice";
import { AppDispatch } from "../redux/store";
import { getUserFromLocalStorage } from "../utils/auth";
import Login from "./Login";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  const user = useSelector(selectUser);
  const [loading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      dispatch(userLoggedIn(user));
    }
    setIsLoading(false);
  }, []);

  const Logout = (key: string) => {
    if (key === "logout") {
      dispatch(logoutUser());
    }
  };

  return (
    <Navbar
      maxWidth="full"
      position="sticky"
      className="bg-white dark:bg-[#18181B] shadow-sm w-screen"
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">Parcel</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex gap-2">
            <ThemeSwitcher />
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    name={user.username}
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  onAction={(key: any) => Logout(key)}
                >
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.username}</p>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Login />
            )}
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
