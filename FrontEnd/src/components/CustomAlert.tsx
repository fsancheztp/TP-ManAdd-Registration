import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import React from "react";
import "@/css/02-utilities/alert.css"; // ← corporate stylesheet

type CustomAlertProps = {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
  title: React.ReactNode;
  content: React.ReactNode;
  /**
   * Optional visual variant — map to your corporate palette.
   * Examples: "default" | "warning" | "danger" | "success"
   */
  variant?: "default" | "warning" | "danger" | "success";
  /**
   * Optional size density for the container.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional: label for the close button (i18n).
   */
  closeLabel?: string;
  /**
   * Optional: additional className overrides (kept for flexibility).
   */
  className?: string;
};

export function CustomAlert({
  showModal,
  setShowModal,
  title,
  content,
  variant = "default",
  size = "md",
  closeLabel = "Ok",
  className,
}: CustomAlertProps) {
  return (
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogContent
        className={cn(
          "corp-alert",
          `corp-alert--${variant}`,
          `corp-alert--${size}`,
          className
        )}
      >
        <AlertDialogHeader className="corp-alert__header">
          <AlertDialogTitle className="corp-alert__title">{title}</AlertDialogTitle>
          <AlertDialogDescription className="corp-alert__description">
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="corp-alert__footer">
          <AlertDialogCancel
            className="corp-alert__button"
            onClick={() => setShowModal(false)}
          >
            {closeLabel}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}