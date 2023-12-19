export interface BloggerApp {
  adopterId: number;
  blogFieldId: number;
  blogFieldName: string;
  bappDate: Date;
  bappFile: Blob | null; // Assuming the file is stored as binary data
  bappStatus: string;
  bappResponseDate: Date;
  bmotivationText: string;
  badminId: number;
}

export interface ExpertApp {
  adopterId: number;
  expertiseFieldId: number;
  expertiseFieldName: string;
  eappDate: Date;
  eappFile: Blob | null; // Assuming the file is stored as binary data
  eappStatus: string;
  eappResponseDate: Date;
  emotivationText: string;
  eadminId: number;
}

export interface GranteeApp {
  aoId: number;
  gappAmount: number;
  gappDate: Date;
  gappFile: Blob | null; // Assuming the file is stored as binary data
  gappStatus: string;
  gappResponseDate: Date;
  gMotivationText: string;
  gappDecidedAmount: number;
  gadminId: number;
}

export interface AgreementReq {
  file: File | null;
  aoId: number;
  vetId: number;
  agreqDate: Date;
  requesterId: number;
  aqreqStatus: string;
  agreqResponseDate: Date | null;
  agMotivationText: string;
  agreqTermDate: Date;
}

export interface OverseeingReq {
  aoId: number;
  aoName: string;
  adopterId: number;
  adopterName: string;
  oreqDate: Date;
  oreqStatus: string;
  oreqResponseDate: Date;
  omotivationText: string;
  oreqResult: string | null;
}

export interface AdoptionApp {
  adopter_id: number,
  ao_id: number,
  aapp_date: Date,
  pet_id: number,
  petName: string,
  aapp_file: string,
  aapp_status: string,
  aapp_response_date: Date| null;
  amotivation_text: string;
}


