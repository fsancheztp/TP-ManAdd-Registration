import {
  addNewLot,
  completePhase,
  deleteLot,
  fetchLots,
  fetchSingleManAdd,
  getLabelTemplates,
  lotValidation,
} from "@/actions/actions";

import { Button } from "@/components/ui/button";

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

// Removed Avatar to avoid stray fallback dot
import { Trash2Icon } from "lucide-react";

import  { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import "@/css/03-layouts/section.css";
import "@/css/04-components/card.css";
import "@/css/02-utilities/form-row.css";
import "@/css/03-layouts/page.css";
import { ManAddCard } from "@/components/ManAddCard";
import Header from "@/components/Header";


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
  const [selectedTemplate, setSelectedTemplate] = useState<LabelTemplate | null>(null);

  const { toast } = useToast();
  const barCodeInput = useRef<HTMLInputElement>(null);
  const barCodeInput2 = useRef<HTMLInputElement>(null);

  /* ---------------------------------------------------------
     BUSINESS LOGIC (unchanged)
  --------------------------------------------------------- */

  const handleValidate = async () => {
    if (!user || user.userName === "") {
      alert("Selecciona un usuario para continuar...");
      return;
    }

    const lotToValidate: LotValidation = {
      templateName: selectedTemplate?.templateName,
      barCode1: scannedCode.barCode1,
      barCode2: scannedCode.barCode2 ? scannedCode.barCode2 : "",
      barCode3: scannedCode.barCode3 ? scannedCode.barCode3 : "",
      materialId: manAdd?.materialName,
      materialValidation:
        sessionStorage.getItem("materialValidation") === "true",
    };

    const validationResult: ValidationResponse = await lotValidation(lotToValidate);

    if (validationResult?.validation === "NOT VALID") {
      alert(validationResult.result);
      setScannedCode({ barCode1: null, barCode2: null, barCode3: null });
      return;
    }

    if (sessionStorage.getItem("qtyManual") === "false") {
      const value = Number(validationResult.quantity);
      if (Number.isNaN(value)) {
        alert(
          `El valor obtenido del codigo de barras para la cantidad del lote: ${validationResult.quantity} no es valido.`
        );
        setScannedCode({ barCode1: null, barCode2: null, barCode3: null });
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
      lastUpdateAt: new Date().toISOString(),
      lotId: validationResult.lotId,
    };

    await addNewLot(newLot);
    fetchLotsById(id);

    setScannedCode({ barCode1: null, barCode2: null, barCode3: null });

    toast({
      title: "Cantidad añadida",
      description: "Escanea otra bolsa hasta alcanzar el objetivo",
    });

    barCodeInput.current?.focus();
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

  const handleDeleteLot = async (lotId: string) => {
    const response = await deleteLot(lotId);

    if (response.value === 1) {
      toast({
        title: "Lote Eliminado",
        description: "Escanea otra bolsa hasta alcanzar el objetivo",
        variant: "destructive",
      });
    }

    fetchLotsById(id);
    barCodeInput.current?.focus();
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

  const updateQtyBag = (value: number) => setQtyBag(value);

  const handleBarCodeChange = (e: CustomChangeEvent, barCode: string) => {
    const { value } = e.target;
    setScannedCode({ ...scannedCode, [barCode]: value });
  };

  const handleTemplateChange = (value: string) => {
    const found = templates?.find((t) => t.templateName === value);
    console.log("Selected template:", found);
    if (found) setSelectedTemplate(found);

    barCodeInput.current?.focus();
  };

  const applyLocalSettings = () => {
    const mv = sessionStorage.getItem("materialValidation");
    const qm = sessionStorage.getItem("qtyManual");
    const bi = sessionStorage.getItem("barCodeManualInput");

    sessionStorage.setItem("materialValidation", mv || "false");
    sessionStorage.setItem("qtyManual", qm || "false");
    sessionStorage.setItem("barCodeManualInput", bi || "false");
  };

  useEffect(() => {
    fetchData(id);
    fetchLotsById(id);
    fetchLabelTemplates();
    applyLocalSettings();
    barCodeInput.current?.focus();
  }, []);

  /* ---------------------------------------------------------
     UI LAYER — compact fields using corp-form-row
  --------------------------------------------------------- */

  const fmtDate = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString();
  };

  const qtyOk =
    manAdd?.targetAmount !== undefined &&
    actualQty === manAdd?.targetAmount;

  // Enable "Validar" only when a template is selected and required barcodes are present
  const canValidate = Boolean(
    selectedTemplate &&
      scannedCode.barCode1 &&
      (selectedTemplate.barCode2 === "" || Boolean(scannedCode.barCode2))
  );

  return (
    <main className="page">
      <Header title = {manAdd?.phaseName}/>
      <div className="page__container">

        {/* CARD */}

        {manAdd && (<ManAddCard 
                        manAddInfo={manAdd} 
                        showBasket={false} 
                    />
                    )
        }   

        {/* Tipo de Etiqueta y Códigos de barra leídos*/}
        <div className="corp-card corp-card-content" style={{ margin: "10px 0px 10px 0px", padding: "10px 15px 10px 15px" }}>
            <label className="corp-form-row__label" style={{ fontSize: "18px"}}>
              Tipo de Etiqueta
            </label>
            <div className="corp-form-row__control">         
              <Select onOpenChange={(o) => console.log('Select open?', o)} onValueChange={handleTemplateChange}>
                <SelectTrigger id="labelTemplate" className="corp-selectTrigger" style={{margin: "10px"}}>
                  <SelectValue placeholder="Seleccione..."/>
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={6}
                  avoidCollisions={false}    // reduces measurement complexity during test
                  className="z-[9999]"
                >
                  {templates?.map((tmpl) => (
                    <SelectItem key={tmpl.id} value={tmpl.templateName}>
                      {tmpl.templateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>      
          {/* Bar Codes */}
          <div className="corp-form-row" style={{ margin: "10px 0" }}>
            <label className="corp-form-row__label" htmlFor="barcode">
              Bar Code
            </label>
            <div className="corp-form-row__control">
              <div className="corp-inlineFields">
                <Input
                  type="text"
                  id="barcode"
                  placeholder="Barcode 1"
                  value={scannedCode.barCode1 || ""}
                  onChange={(e) => handleBarCodeChange(e, "barCode1")}
                  ref={barCodeInput}
                  disabled={!selectedTemplate}
                  className="corp-input"
                />
                {selectedTemplate?.barCode2 !== "" && (
                  <Input
                    type="text"
                    id="barcode2"
                    placeholder="Barcode 2"
                    value={scannedCode.barCode2 || ""}
                    onChange={(e) => handleBarCodeChange(e, "barCode2")}
                    ref={barCodeInput2}
                    disabled={!selectedTemplate}
                    className="corp-input"
                  />
                )}
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="corp-btn-row">
            <Button
              size="lg"
              onClick={handleValidate}
              disabled={!canValidate}
              variant="primary"
              className="corp-btn--block"
            >
              Validar
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={handleComplete}
              className="corp-btn--block"
            >
              Fin Fase
            </Button>
          </div>
        </div>
        {/* TABLE AREA */}
        <div className="corp-card corp-card-content">
          <section className="corp-section corp-section--table" aria-labelledby="tags-read-title">
            <header className="corp-section__header">
              <h2 style={{margin: 5, fontSize: "18px", fontWeight: 600, paddingBottom: "10px"}}>
                Etiquetas Leídas
              </h2>
            </header>

            <div className="corp-section__body">
              <Table>
                {/* remove the TableCaption */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="corp-table__th--narrow">Lote</TableHead>
                    <TableHead className="corp-table__th--center">Cantidad</TableHead>
                    <TableHead className="corp-table__th--center" style={{textAlign: "center"}}>Leído</TableHead>
                    <TableHead className="corp-table__th--center">Borrar</TableHead>
                  </TableRow>
                </TableHeader>

                {lots && (
                  <TableBody>
                    {lots.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="corp-table__cell-strong">
                          {item.lotId}
                        </TableCell>

                        <TableCell style={{ textAlign: "right" }} className="corp-table__cell-mono">
                          {item.actualAmount}
                        </TableCell>

                        <TableCell style={{ textAlign: "right" }} className="corp-table__cell-right">
                          <div className="corp-stack--tight">
                            <span style={{ fontSize: "13px"}}>
                              {item?.lastUpdateAt ? new Date(item.lastUpdateAt).toLocaleDateString() : ""}
                            </span>
                            <span> </span>
                            <span style={{ fontSize: "13px"}}>
                              {item?.lastUpdateAt
                                ? new Date(item.lastUpdateAt).toLocaleTimeString([], { hour12: false })
                                : ""}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="corp-table__cell-center">
                          <Button variant="danger" onClick={() => handleDeleteLot(item.id.toString())}>
                            <Trash2Icon aria-hidden="true" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
};

export default ManAddPage;