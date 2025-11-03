import { useState } from "react";
import { fetchUsers } from "../actions/actions";
import { ManAddUser } from "../types";
import { useUserContext } from "../context";
import { Link } from "react-router-dom";
import { NavMenu } from "./NavBar";
import {
  ExclamationTriangleIcon,
  ExitIcon,
  FileIcon,
  HamburgerMenuIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Header = () => {
  const { setUser } = useUserContext();
  const [users, setUsers] = useState<ManAddUser[]>([]);

  const handleUsersPopulation = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };
  const handleUserSelection = (e: string) => {
    if (e === "#") {
      setUser({ id: 0, userName: "" });
      return;
    }
    setUser({
      id: 0,
      userName: e,
    });
  };
  return (
    <div className="flex flex-row justify-between items-center bg-primary text-white w-full p-2">
      <div>
        <Link to={"/"}>
          <img src="/images/logo.png" width={120} height={60} alt="" />
        </Link>
      </div>
      <NavMenu />
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row gap-0 items-center">
          <DropdownMenuDemo />
          <PersonIcon
            width={20}
            height={20}
            className="rounded-full md:block hidden"
          />
          {users && (
            <div className="md:block hidden">
              <Select
                onValueChange={(e) => handleUserSelection(e)}
                onOpenChange={() => handleUsersPopulation()}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecciona Usuario" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.userName}>
                      {user.userName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            // <select
            //   onClick={handleUsersPopulation}
            //   className="text-md uppercase bg-inherit md:block hidden p-5"
            //   onChange={handleUserSelection}
            // >
            //   <option value="#">Selecciona Usuario</option>
            //   {users.map((user) => (
            //     <option
            //       key={user.id}
            //       value={user.userName}
            //       className="bg-slate-600 opacity-20"
            //     >
            //       {user.userName}
            //     </option>
            //   ))}
            // </select>
          )}
        </div>
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
};

const DropdownMenuDemo = () => {
  const [users, setUsers] = useState<ManAddUser[]>([]);
  const { user, setUser } = useUserContext();
  const [toggle, setToggle] = useState<boolean>(false);
  const handleUsersPopulation = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
    setToggle((prev) => !prev);
  };
  const handleUserSelection = (userName: string) => {
    setUser({
      id: 0,
      userName: userName,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <HamburgerMenuIcon width={30} height={30} className="block md:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-5 py-10 flex flex-col items-start gap-2 justify-start bg-primary text-secondary z-50 w-screen h-screen uppercase">
        <DropdownMenuLabel className="flex flex-row gap-3 items-center">
          <PersonIcon />
          {/* <div className="flex flex-col"> */}
          <p onClick={() => handleUsersPopulation()}>
            {user.userName === ""
              ? "Usuario desconocido"
              : "Hola, " + user.userName}
          </p>
        </DropdownMenuLabel>
        {users?.length > 0 && toggle && (
          <div className="ml-10 bg-slate-500 px-5 py-2 rounded-lg w-[90%]">
            {users.map((newUser) => (
              <li
                key={newUser.id}
                className="list-none"
                onClick={() => handleUserSelection(newUser.userName)}
              >
                {newUser.userName}
              </li>
            ))}
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-2">
          <DropdownMenuItem asChild>
            <Link to={"/"} className="flex flex-row gap-3 items-center">
              <HomeIcon />
              Inicio
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to={"/reports-page"}
              className="flex flex-row gap-3 items-center"
            >
              <FileIcon /> Informes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to={"/help-page"}
              className="flex flex-row gap-3 items-center"
            >
              <ExclamationTriangleIcon /> Ayuda
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
            <DropdownMenuItem>Informes</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup> */}
        {/* <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setUser({ id: 0, userName: "" })}
          className="flex flex-row gap-3 items-center"
        >
          <ExitIcon />
          <p>Log out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
