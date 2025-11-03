import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Save, Settings2Icon } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface SwitchTypes {
  materialValidation: boolean;
  qtyManual: boolean;
  barCodeManualInput: boolean;
}

export function LogRegistrationSettings() {
  const [defaultState, setDefaultState] = useState<SwitchTypes>({
    materialValidation: false,
    qtyManual: false,
    barCodeManualInput: false,
  });
  const [open, setOpen] = useState(false);
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      materialValidation: HTMLInputElement;
      qtyManual: HTMLInputElement;
      barCodeManualInput: HTMLInputElement;
    };

    sessionStorage.setItem(
      "materialValidation",
      formElements.materialValidation.ariaChecked
        ? formElements.materialValidation.ariaChecked?.toString()
        : "unknown"
    );
    sessionStorage.setItem(
      "qtyManual",
      formElements.qtyManual.ariaChecked
        ? formElements.qtyManual.ariaChecked?.toString()
        : "unknown"
    );
    sessionStorage.setItem(
      "barCodeManualInput",
      formElements.qtyManual.ariaChecked
        ? formElements.qtyManual.ariaChecked?.toString()
        : "unknown"
    );
    setOpen(false);
  };

  const handleSwitch = (switchType: string) => {
    setDefaultState({
      ...defaultState,
      [switchType]: !defaultState[switchType as keyof boolean],
    });
  };
  useEffect(() => {
    const sessionMaterialValidation =
      sessionStorage.getItem("materialValidation");
    const sessionqtyManual = sessionStorage.getItem("qtyManual");
    const sessionQtybarCodeManualInput = sessionStorage.getItem("barCodeManualInput");
    setDefaultState({
      materialValidation: sessionMaterialValidation === "true" ? true : false,
      qtyManual: sessionqtyManual === "true" ? true : false,
      barCodeManualInput: sessionQtybarCodeManualInput === "true" ? true : false,
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Settings2Icon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-third">
        <DialogHeader>
          <DialogTitle>Configuraciones</DialogTitle>
          <DialogDescription>
            Opciones disponibles para la configuracion del registro de los lotes
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave}>
          {defaultState && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="materialValidation"
                  className="text-right col-span-2"
                >
                  Validacion de materiales
                </Label>
                <Switch
                  id="materialValidation"
                  defaultChecked={defaultState?.materialValidation}
                  onClick={() => handleSwitch("materialValidation")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="qtyManual" className="text-right col-span-2">
                  Cantidad manual
                </Label>
                <Switch
                  id="qtyManual"
                  defaultChecked={defaultState?.qtyManual}
                  onClick={() => handleSwitch("qtyManual")}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="barCodeManualInput" className="text-right col-span-2">
                  Insercion manual
                </Label>
                <Switch
                  id="barCodeManualInput"
                  defaultChecked={defaultState?.barCodeManualInput}
                  onClick={() => handleSwitch("barCodeManualInput")}
                />
              </div>
              <Button type="submit" className="bg-primary text-secondary mt-3">
                <Save /> Guardar
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
