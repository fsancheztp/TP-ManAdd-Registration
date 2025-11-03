import {
  addNewLot,
  completePhase,
  deleteLot,
  fetchLots,
  fetchSingleManAdd,
  getLabelTemplates,
  lotValidation,
} from "@/actions/actions";
import { LogRegistrationSettings } from "@/components/Dialogs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserContext } from "@/context";
import { useToast } from "@/hooks/use-toast";
import {
  CustomChangeEvent,
  LabelTemplate,
  LotValidation,
  ManAdd,
  ManAddLot,
  ScanedCode,
  ValidationResponse,
} from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { Trash2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ManAddPage = () => {
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();

  const { user } = useUserContext();
  const [actualQty, setActualQty] = useState(0);
  const [qtyBag, setQtyBag] = useState(25);
  const [scannedCode, setScannedCode] = useState<ScanedCode>({
    barCode1: null,
    barCode2: null,
    barCode3: null,
  });
  const [manAdd, setManAdd] = useState<ManAdd | null>(null);
  const [lots, setLots] = useState<ManAddLot[] | null>(null);
  const [templates, setTemplates] = useState<LabelTemplate[] | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<LabelTemplate | null>(null);
  const { toast } = useToast();
  const barCodeInput = useRef<HTMLInputElement>(null);
  const barCodeInput2 = useRef<HTMLInputElement>(null);

  const handleValidate = async () => {
    if (!user || user.userName === "") {
      alert("Selecciona un usuario para continuar...");
      return;
    }

    // Validate the lot according with selected Label Template the information provided from the Scanner

    const lotToValidate: LotValidation = {
      templateName: selectedTemplate?.templateName,
      barCode1: scannedCode.barCode1,
      barCode2: scannedCode.barCode2 ? scannedCode.barCode2 : "",
      barCode3: scannedCode.barCode3 ? scannedCode.barCode3 : "",
      materialId: manAdd?.materialName,
      materialValidation:
        sessionStorage.getItem("materialValidation") === "true" ? true : false,
    };
    const validationResult: ValidationResponse = await lotValidation(
      lotToValidate
    );

    if (validationResult?.validation === "NOT VALID") {
      alert(validationResult.result);
      setScannedCode({
        barCode1: null,
        barCode2: null,
        barCode3: null,
      });
      return;
    }

    // If Lot is valid, then add it
    // If Lot Quantity is taken from the Scanned Code, first check if the Qty value exists or is a valid number

    if (sessionStorage.getItem("qtyManual") === "false") {
      const value = Number(validationResult.quantity);  
      if (Number.isNaN(value)) {
        alert(
          `El valor obtenido del codigo de barras para la cantidad del lote: ${validationResult.quantity} no es valida o no existe. Intentalo de nuevo o introduce la cantidad de forma manual`
        );
        setScannedCode({
          barCode1: null,
          barCode2: null,
          barCode3: null,
        });
        return;
      }
    }

    setActualQty((prev) => prev + 1);
    const newLot: ManAddLot = {
      id: 0,
      manAdds_Registration_Id: manAdd?.id,
      actualAmount:
        sessionStorage.getItem("qtyManual") === "true"
          ? qtyBag
          : parseFloat(validationResult.quantity),
      registeredBy: user.userName,
      lastUpdateAt: "2024-10-31",
      lotId: validationResult.lotId,
    };
    await addNewLot(newLot);

    const manAddid = id;
    fetchLotsById(manAddid);

    setScannedCode({
      barCode1: null,
      barCode2: null,
      barCode3: null,
    });
    toast({
      title: "Cantidad añadida",
      description: "Escanea otra bolsa hasta alcanzar el objetivo",
      variant: "default",
    });
    if (barCodeInput?.current) barCodeInput.current.focus();
  };

  const handleComplete = async () => {
    if (!user || user.userName === "") {
      alert("Selecciona un usuario para continuar...");
      return;
    }
    await completePhase({
      id: manAdd?.id || 0,
      phaseID: manAdd?.phaseID || 0,
      phaseName: manAdd?.phaseName || "",
      materialID: manAdd?.materialID || 0,
      materialName: manAdd?.materialName || "",
      targetAmount: manAdd?.targetAmount || 0,
      actualAmount: actualQty,
      startDateTime: manAdd?.startDateTime || "",
      endDateTime: manAdd?.startDateTime || "",
      registeredBy: user.userName,
      plcWorkID: manAdd?.plcWorkID || 0,
      registrationStatus: "Complete",
      equipmentName: manAdd?.equipmentName || "",
    });
    navigate(`/`);
  };

  const handleDeleteLot = async (lotid: string) => {
    const response = await deleteLot(lotid);
    if (response.value === 1) {
      toast({
        title: "Lote Eliminado",
        description: "Escanea otra bolsa hasta alcanzar el objetivo",
        variant: "destructive",
      });
    }
    fetchLotsById(id);
    if (barCodeInput?.current) barCodeInput.current.focus();
  };

  const fetchData = async (id: string | string[] | undefined) => {
    const data = await fetchSingleManAdd(id);
    setManAdd(data);
  };

  const fetchLotsById = async (id: string | string[] | undefined) => {
    const data = await fetchLots(id);
    setLots(data);
    const totalQty = data.reduce(
      (acc: number, curr: ManAddLot) => acc + curr.actualAmount,
      0
    );
    setActualQty(totalQty);
  };

  const fetchLabelTemplates = async () => {
    const data = await getLabelTemplates();
    setTemplates(data);
  };

  const updateQtyBag = (e: number) => {
    setQtyBag(e);
  };

  const handleBarCodeChange = (e: CustomChangeEvent, barCode: string) => {
    const { value } = e.target;
    if (barCode) setScannedCode({ ...scannedCode, [barCode]: value });
    // if (
    //   barCode === "barCode1" &&
    //   sessionStorage.getItem("barCodeManualInput") === "false"
    // ) {
    //   if (barCodeInput2?.current) barCodeInput2.current.focus();
    // }
  };

  const handleTemplateChange = (e: string) => {
    const fetchTemplate = templates?.find(
      (template) => template.templateName === e
    );
    if (fetchTemplate) setSelectedTemplate(fetchTemplate);
    console.log(selectedTemplate);

    if (barCodeInput?.current) barCodeInput.current.focus();
  };

  const applyLocalSettings = () => {

    console.log(sessionStorage.getItem("materialValidation"))
    const materialValidation = sessionStorage.getItem("materialValidation")
    const qtyManual = sessionStorage.getItem("qtyManual")
    const barCodeManualInput = sessionStorage.getItem("barCodeManualInput")

    sessionStorage.setItem("materialValidation", materialValidation || "false");
    sessionStorage.setItem("qtyManual", qtyManual || "false");
    sessionStorage.setItem("barCodeManualInput", barCodeManualInput || "false");
  }

  useEffect(() => {
    fetchData(id);
    fetchLotsById(id);
    fetchLabelTemplates();
    applyLocalSettings()
    if (barCodeInput?.current) barCodeInput.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="lg:px-10 lg:py-10 mt-0 p-0 min-h-screen bg-secondary">
      <div className="flex flex-col mx-auto lg:w-[70%] w-full gap-5 text-white">
        <Card className="mx-auto mt-2 w-full bg-primary">
          <CardHeader>
            <div className="flex flex-row justify-between items-center w-full">
              <div>
                <CardTitle className="text-orange">Salsa Rica</CardTitle>
                <CardDescription>Manual Addition {id}</CardDescription>
              </div>
              <div className="p-2 hover:bg-primary/10 rounded-full cursor-pointer">
                <LogRegistrationSettings />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 lg:p-4 p-0 w-[80%] mx-auto">
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <span className="font-extralight sm:text-lg text-sm text-gray-200">
                  Equipo:{" "}
                </span>
                <p className="font-bold md:text-xl text-md">
                  {manAdd?.equipmentName}
                </p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <span className="font-extralight sm:text-lg text-sm text-gray-200">
                  Material:{" "}
                </span>
                <p className="font-bold md:text-xl text-md">
                  {manAdd?.materialName}
                </p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <span className="font-extralight sm:text-lg text-sm text-gray-200">
                  Fecha de inicio:{" "}
                </span>
                <p className="font-bold md:text-xl text-md">
                  {new Date(
                    manAdd?.startDateTime ? manAdd.startDateTime : ""
                  ).toLocaleString()}
                </p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <span className="font-extralight sm:text-lg text-sm text-gray-200">
                  Cantidad Objetivo:{" "}
                </span>
                <p className="font-bold md:text-xl text-md">
                  {manAdd?.targetAmount}
                </p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <span className="font-extralight sm:text-lg text-sm">
                  Cantidad por bolsa:{" "}
                </span>
                <Input
                  type="number"
                  step={0.5}
                  onChange={(e: React.ChangeEvent<Element>) =>
                    updateQtyBag(
                      parseFloat((e.target as HTMLInputElement).value)
                    )
                  }
                  defaultValue={25}
                  className="font-bold w-[5rem] text-right md:text-lg bg-input-enabled border-none text-blue text-md"
                  disabled={
                    sessionStorage.getItem("qtyManual") === "true"
                      ? false
                      : true
                  }
                />
              </div>
              <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <span className="font-extralight sm:text-lg text-sm text-gray-200">
                  Cantidad Ingresada:{" "}
                </span>
                <div className="flex flex-row items-center justify-center gap-2">
                  {actualQty && (
                    <p
                      className={`font-bold md:text-xl text-md ${
                        actualQty !== manAdd?.targetAmount
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {actualQty}
                    </p>
                  )}
                  <Avatar>
                    <AvatarImage
                      className="w-[20px] h-[20px]"
                      src={
                        actualQty !== manAdd?.targetAmount
                          ? "/images/redcross.png"
                          : "/images/greencheck.png"
                      }
                    />
                    <AvatarFallback>Check</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-5 w-full">
              <Label htmlFor="barcode">Bar Code</Label>
              <Select onValueChange={(e) => handleTemplateChange(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Plantilla de Etiqueta" />
                </SelectTrigger>
                <SelectContent className=" text-white">
                  {templates?.map((template) => (
                    <SelectItem key={template.id} value={template.templateName}>
                      {template.templateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex sm:flex-row flex-col w-full gap-2">
                <Input
                  type="text"
                  id="barcode"
                  placeholder="Barcode 1"
                  className="w-full bg-input-enabled text-primary"
                  value={scannedCode.barCode1 || ""}
                  onChange={(e: CustomChangeEvent) =>
                    handleBarCodeChange(e, "barCode1")
                  }
                  autoFocus={scannedCode.barCode1 ? false : true}
                  ref={barCodeInput}
                  disabled={!selectedTemplate}
                />
                {selectedTemplate?.barCode2 !== "" && (
                  <Input
                    type="text"
                    id="barcode2"
                    placeholder="Barcode 2"
                    className="w-full bg-input-enabled text-primary"
                    value={scannedCode.barCode2 || ""}
                    onChange={(e: CustomChangeEvent) =>
                      handleBarCodeChange(e, "barCode2")
                    }
                    autoFocus={scannedCode.barCode2 ? false : true}
                    ref={barCodeInput2}
                    disabled={!selectedTemplate}
                  />
                )}
              </div>
              <Button
                size={"lg"}
                onClick={() => handleValidate()}
                disabled={!scannedCode}
                className="text-lg uppercase text-white bg-orange hover:bg-third"
              >
                Validar
              </Button>
              <Button
                size={"lg"}
                onClick={() => handleComplete()}
                variant="secondary"
                className="bg-blue text-white hover:bg-third text-lg uppercase"
              >
                Finalizar Fase
              </Button>
            </div>
          </CardFooter>
        </Card>
        <div>
          <Table>
            <TableCaption className="text-primary">
              Listado de lotes registrados
            </TableCaption>
            <TableHeader className="text-primary">
              <TableRow>
                <TableHead className="w-[100px]">Lote</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right md:text-left">
                  Ultima actualizacion
                </TableHead>
                <TableHead className="text-center">Borrar</TableHead>
              </TableRow>
            </TableHeader>
            {lots && (
              <TableBody>
                {lots?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium  dark:text-white text-primary">
                      {item.lotId}
                    </TableCell>
                    <TableCell className="text-center dark:text-white text-primary">
                      {item.actualAmount}
                    </TableCell>
                    <TableCell className="text-right dark:text-white text-primary">
                      <div className="flex flex-col md:flex-row md:gap-2">
                        <p>
                          {item?.lastUpdateAt
                            ? new Date(item.lastUpdateAt).toLocaleDateString()
                            : ""}
                        </p>
                        <p className="text-xs md:text-sm">
                          {item?.lastUpdateAt
                            ? new Date(item.lastUpdateAt).toLocaleTimeString()
                            : ""}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center dark:text-white text-primary">
                      <Button
                        variant={"default"}
                        onClick={() => handleDeleteLot(item.id.toString())}
                        className="bg-red text-white"
                      >
                        <Trash2Icon /> Borrar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManAddPage;
