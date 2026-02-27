import { useNavigate } from "react-router-dom";
import menuConfig from "../config/menuConfig.json";
import { MenuItem } from "../components/MenuItem";
import {
  ManualAddIcon,
  RegisterIcon,
  LogoutIcon
} from "@/components/icons";

import {Header} from "@/components/Header"

export function HomeMainMenu() {
  const navigate = useNavigate();

  // Map config icon names to actual components

    const iconMap: Record<string, () => React.ReactNode> = {
    "manual-add": () => (<ManualAddIcon />),
    "register": () => (<RegisterIcon />),
    "logout": () => (<LogoutIcon />),
    };


  return (
    <div className="corp-page">
      <Header title="Material Barcode App" />
      <main className="corp-page__content">
        <nav className="corp-menu">
          {menuConfig
            .filter(item => item.enabled)
            .map(item => (
              <MenuItem
                key={item.key}
                label={item.label}
                icon={iconMap[item.icon]()}
                onClick={() => navigate(item.route)}
              />
            ))}
        </nav>
      </main>
    </div>
  );
}