"use client";

import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import SearchModal from "../fragments/SearchModal";
import UserProfile from "../fragments/UserProfile";
import Login from "../auth/Login";
import { useContext } from "react";
import { userContext } from "@/context/user.context";

const Header = () => {
  const { user } = useContext(userContext);
  return (
    <header className=" flex justify-between items-center px-10 py-6 ">
      <div>
        <Link className="text-3xl font-bold" href="/">
          Newzee<span className=" text-red-700 text-4xl">.</span>
        </Link>
      </div>
      <nav>
        <Flex gap="9" className="text-lg flex justify-center items-center">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/latest">Latest</Link>
          <Link href="/editorial">Editorial</Link>
          <SearchModal />
          {user ? <UserProfile /> : <Login />}
        </Flex>
      </nav>
    </header>
  );
};

export default Header;
