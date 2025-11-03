export interface ManAdd {
  id: number;
  phaseID: number;
  phaseName: string;
  materialID: number;
  materialName: string;
  targetAmount: number;
  actualAmount: number;
  startDateTime: string;
  endDateTime: string;
  registeredBy: string;
  plcWorkID: number;
  registrationStatus: string;
  equipmentName: string;
}

export interface ManAddLot {
  id: number;
  manAdds_Registration_Id: number | undefined;
  actualAmount: number;
  lastUpdateAt: string | undefined;
  registeredBy: string | undefined;
  lotId?: string | null;
}

export type CustomChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ManAddUser {
  id: number;
  userName: string;
}

export interface LabelTemplate {
  id:number;
  templateName: string;
  barCode1: string;
  barCode2: string;
  barCode3: string;
  lotId: string;
  expirationDate: string;
  quantity: string;
  par1: string;
  par2: string;
  par3: string;
  par4: string;
  par5: string;
  par6: string;
  par7: string;
  par8: string;
  par9: string;
  par10: string;
  lastUpdateAt: Date;
  updatedBy: string;
  isActive: string;
}

export interface LotValidation {
  templateName: string | undefined;
  barCode1: string | null;
  barCode2: string | null;
  barCode3: string | null;
  materialId: string | null | undefined;
  materialValidation: boolean;
}

export interface ValidationResponse {
  lotId: string;
  expirationDate: string;
  quantity: string;
  par1: string;
  materialID: string;
  par3: string;
  par4: string;
  par5: string;
  par6: string;
  par7: string;
  par8: string;
  par9: string;
  par10: string;
  result: string;
  validation: string;
}

export interface ScanedCode {
  barCode1: string | null;
  barCode2: string | null;
  barCode3: string | null;
}

export type ErrorSetterFunction = (value: string) => void;
