interface MenuItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function MenuItem({ label, icon, onClick }: MenuItemProps) {
  return (
    <button type="button" className="corp-menuItem" onClick={onClick}>
      <span className="corp-menuItem__icon" aria-hidden="true">{icon}</span>
      <span className="corp-menuItem__label">{label}</span>
    </button>
  );
}