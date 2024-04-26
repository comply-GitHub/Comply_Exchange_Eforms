import React from "react";
import { RouteType } from "./types";
import Utils from "../Utils";

import EntityUs from "../Components/entity"
// const login = React.lazy(() => import("../Components/LoginNew"));
const login = React.lazy(() => import("../Components/login"));
// const W9 = React.lazy(() => import("../Components/w9"));
const IndividualUs = React.lazy(() => import("../Components/individualUS"));
const Layout = React.lazy(() => import("../Components/Layout"));
// const EntityUs = React.lazy(() => import("../Components/entity"));
const Term = React.lazy(() => import("../Components/term"));
const Certificates = React.lazy(() => import("../Components/certificates"));
const form = React.lazy(() => import("../FormGuide/form/index"));
const Guide = React.lazy(() => import("../FormGuide/form/guide"));
const Complete = React.lazy(() => import("../Components/complete"));
const Security = React.lazy(() => import("../Components/Security"));
const Submit = React.lazy(() => import("../Components/Submit"));
const PDFViewer = React.lazy(() => import("../Components/reusables/PdfViewer"));
const Chapter4Guide_Exp = React.lazy(() => import("../Components/Chapter4GuideEXP/index"));
const Chapter4 = React.lazy(() => import("../Components/Chapter4Guide/index"));
const Taxpayer_DC = React.lazy(
  () => import("../Components/W9Form/Tax Identification Dual Cert")
);
const Certification_W9_DC = React.lazy(
  () => import("../Components/W9Form/Certification_DualCert")
);

const Participation_W9_DC = React.lazy(
  () => import("../Components/W9Form/Penalities_DC")
);
const Submit_W9_DC = React.lazy(
  () => import("../Components/W9Form/Submit_DC")
);
const Thankyou_W9_DC = React.lazy(
  () => import("../Components/W9Form/ThankYou_DC")
);


const TaxPurpose_entity_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/tax_purpose_DualCert")
);


const CRS_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/CRS_DualCert")
);

const Financial_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/CRS_DualCert/Financial")
);
const SelfCert_Passive_W9_DC = React.lazy(
  () => import("../Components/W9Form/SelfCertPassive")
);

const US_Determination_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/USDetermination")
);
const Complete_CRS_W9 = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/CRS_Complete")
);
const Active_Non_Financial_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/CRS_DualCert/Active_Non_financial")
);



const Non_Reporting_CRS_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/CRS_DualCert/NonReporting")
);

const Financial_CRS_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/Financial")
);
const FinancialReport_CRS_W9_DC = React.lazy(
  () => import("../Components/W9Form/Entity_DC_W9/Financial/FinancialModal")
);

const TaxPurpose_W9 = React.lazy(
  () => import("../Components/W9Form/TaxPurpose_W9/index")
);
//
const Declaration = React.lazy(
  () => import("../Components/W-8BEN/Declaration")
);
//
const US_Sourced = React.lazy(
  () => import("../Components/W-8BEN/Declaration/US")
);

//
const Non_us_sourced = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/Status")
);
const Non_us_tin = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/US_Tin")
);
const Claim = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/Claim/index")
);
const Rates = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/Rates/index")
);
const Certi = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/Certificates")
);
const Part = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/Part-certi")
);
const Submit_Ben = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/Sumit_ben")
);
const ThankYou_Ben = React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/Thankyou_ben")
);


const TaxPayer_DC_BEN = React.lazy(
  () => import("../Components/W-8BEN/Declaration/DualCert/TaxPayerDualCert")
);
const Certification_DC_BEN = React.lazy(
  () => import("../Components/W-8BEN/Declaration/DualCert/Certification_DualCert")
);
const penalities_DC_BEN = React.lazy(
  () => import("../Components/W-8BEN/Declaration/DualCert/Penalities_DualCert")
);
const Submit_DC_BEN = React.lazy(
  () => import("../Components/W-8BEN/Declaration/DualCert/Submit_DualCert")
);
const ThankYou_DC_BEN = React.lazy(
  () => import("../Components/W-8BEN/Declaration/DualCert/ThankYou_DualCert")
);
const Susbtantial_BEN= React.lazy(
  () => import("../Components/W-8BEN/Declaration/Non-US/SustantialPresence")
);
//
const Fedral_tax = React.lazy(() => import("../Components/W9Form/Purposes/index"));
const Back = React.lazy(() => import("../Components/W9Form/Backup"));
const Exemption = React.lazy(() => import("../Components/W9Form/Exemption"));
const tax = React.lazy(() => import("../Components/W9Form/tax"));
const Certificates_w9 = React.lazy(() => import("../Components/W9Form/Certification"));
const Penlities_W9 = React.lazy(() => import("../Components/W9Form/penalities"));
const ThankYou_W9 = React.lazy(() => import("../Components/W9Form/Thankyou/index"));
const Submit_w9 = React.lazy(() => import("../Components/W9Form/Submit"));

//

const Eci = React.lazy(() => import("../Components/W-8ECI/Info"));
const TaxPurpose = React.lazy(() => import("../Components/W-8ECI/TaxPurpose"));
const TaxPayer = React.lazy(() => import("../Components/W-8ECI/TaxPayer"));
const Income_Eci = React.lazy(() => import("../Components/W-8ECI/Income"));
const Certi_Eci = React.lazy(
  () => import("../Components/W-8ECI/Certification")
);
const Part_ceri = React.lazy(
  () => import("../Components/W-8ECI/Participation")
);
const Submit_Eci = React.lazy(
  () => import("../Components/W-8ECI/Sumit_eci")
);
const ThankYou_Eci = React.lazy(
  () => import("../Components/W-8ECI/Thankyou_eci")
);

const Tax_dualCert_Eci = React.lazy(
  () => import("../Components/W-8ECI/DualCert/TaxDualCert")
);


const Certi_dualCert_Eci = React.lazy(
  () => import("../Components/W-8ECI/DualCert/CertificationDualCert")
);

const Perti_dualCert_Eci = React.lazy(
  () => import("../Components/W-8ECI/DualCert/PenalitiesDualCert")
);

const Submit_dualCert_Eci = React.lazy(
  () => import("../Components/W-8ECI/DualCert/Submit_DualCert_Eci")
);
const Thankyou_dualCert_Eci = React.lazy(
  () => import("../Components/W-8ECI/DualCert/ThankYou_DualCert")
);

const Formw9 = React.lazy(
  () => import("../formPDF/formw9")
);
const W8Ben = React.lazy(
  () => import("../formPDF/W8BEN")
);
const W8BENE = React.lazy(
  () => import("../formPDF/W8BENE")
);
const W8Eci= React.lazy(
  () => import("../formPDF/W8ECI")
);

const W8Exp= React.lazy(
  () => import("../formPDF/W8EXP")
);

const Presence = React.lazy(() => import("../Components/Form8233/SubstantialPresence"));
const TaxPay = React.lazy(() => import("../Components/Form8233/Taxpayer"));
const Owner = React.lazy(() => import("../Components/Form8233/owner"));
const Claim_part = React.lazy(() => import("../Components/Form8233/ClaimPart"));
const Documentaion = React.lazy(() => import("../Components/Form8233/Documentation"));
const Certi_8233 = React.lazy(() => import("../Components/Form8233/Certi"));
const Submission = React.lazy(() => import("../Components/Form8233/submission"));
const Submit_8233 = React.lazy(() => import("../Components/Form8233/Sumit_8233"));
const ThankYou_8233 = React.lazy(() => import("../Components/Form8233/Thankyou_8233"));
//
const Tax_Purpose_BenE = React.lazy(() => import("../Components/W8BEN-E/Tax-Purposes"));
const Factors_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/US/Factors"));
const Declaration_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE"));
const Status_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/Status"));
const US_Tin_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/US_Tin"));
const Claim_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/Claim_Non_US"));
const Rates_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/Rates"));
const Certi_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/Certification_BenE"));
const Participation_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/Participation_BenE"));
const Submit_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/Sumit_benE"));
const ThankYou_BenE = React.lazy(() => import("../Components/W8BEN-E/Declaration_BENE/Non_US/Thankyou_benE"));

//
const Tax_Purpose_Exp = React.lazy(() => import("../Components/W-8EXP/US Status"));
const Chapter4_Exp = React.lazy(() => import("../Components/W-8EXP/Chapter4"));
const Tin_Exp = React.lazy(() => import("../Components/W-8EXP/Tin"));
const Certificate_Exp = React.lazy(() => import("../Components/W-8EXP/Certificates"));
const Participation_Exp = React.lazy(() => import("../Components/W-8EXP/Participation"));
const Submit_Exp = React.lazy(() => import("../Components/W-8EXP/Sumit_exp"));
const ThankYou_Exp = React.lazy(() => import("../Components/W-8EXP/Thankyou_exp"));
//
const Purpose_IMY = React.lazy(() => import("../Components/W-8IMY/Status"));
const Chapter4_IMY = React.lazy(() => import("../Components/W-8IMY/Chapter4_IMY"));
const TaxPayer_IMY = React.lazy(() => import("../Components/W-8IMY/TaxPayer"));
const Statement_IMY = React.lazy(() => import("../Components/W-8IMY/Statement"));
const Certificates_IMY = React.lazy(() => import("../Components/W-8IMY/Certificates"));
const Participation_IMY = React.lazy(() => import("../Components/W-8IMY/Participation"));
const Submit_IMY = React.lazy(() => import("../Components/W-8IMY/Sumit_imy"));
const ThankYou_IMY = React.lazy(() => import("../Components/W-8IMY/Thankyou_imy"));

const CaymanIndividualStart = React.lazy(() => import("../Components/Cayman/Individual/Start"));
const CaymanIndividualStartSustantialPresence= React.lazy(() => import("../Components/Cayman/Individual/Start/SustantialPresence"));
const CaymanIndividualStartUSTin= React.lazy(() => import("../Components/Cayman/Individual/Start/USTin"));
const CaymanIndividualStartCertification= React.lazy(() => import("../Components/Cayman/Individual/Start/Certification"));
const CaymanIndividualStartSubmission= React.lazy(() => import("../Components/Cayman/Individual/Start/Submission"));
const CaymanIndividualStartESConfirmation= React.lazy(() => import("../Components/Cayman/Individual/Start/ESConfirmation"));
const CaymanIndividualStartThankyou= React.lazy(() => import("../Components/Cayman/Individual/Start/Thankyou"));

const CaymanEntityStart = React.lazy(() => import("../Components/Cayman/Entity/Start"));
const CaymanEntityFatcaClassification= React.lazy(() => import("../Components/Cayman/Entity/Start/FATCA/Classification"));
// const CaymanIndividualStartUSTin= React.lazy(() => import("../Components/Cayman/Individual/Start/USTin"));
// const CaymanIndividualStartCertification= React.lazy(() => import("../Components/Cayman/Individual/Start/Certification"));
// const CaymanIndividualStartSubmission= React.lazy(() => import("../Components/Cayman/Individual/Start/Submission"));
// const CaymanIndividualStartESConfirmation= React.lazy(() => import("../Components/Cayman/Individual/Start/ESConfirmation"));
// const CaymanIndividualStartThankyou= React.lazy(() => import("../Components/Cayman/Individual/Start/Thankyou"));



const ROUTES: Array<RouteType> = [
  {
    name: "Login",
    path: "login",
    id: 0,
    Component: login,
    isPrivate: true,
  },
  {
    name: "purposes",
    path: "/W9/purposes",
    id: 1,
    Component: Fedral_tax,
    isPrivate: true,
  },
  {
    name: "IndividualUs",
    path: "IndividualUs",
    id: 2,
    Component: IndividualUs,
    isPrivate: true,
  },
  {
    name: "Security",
    path: "/Security",
    id: 2,
    Component: Security,
    isPrivate: true,
  },
  {
    name: "Taxpayer_DC",
    path: "/Taxpayer_DC",
    id: 2,
    Component: Taxpayer_DC,
    isPrivate: true,
  },

  {
    name: "Certification_W9_DC",
    path: "/Certification_W9_DC",
    id: 2,
    Component: Certification_W9_DC,
    isPrivate: true,
  },
  {
    name: "TaxPayer_DC_BEN",
    path: "/TaxPayer_DC_BEN",
    id: 2,
    Component: TaxPayer_DC_BEN,
    isPrivate: true,
  },
  {
    name: "Certification_DC_BEN",
    path: "/Certification_DC_BEN",
    id: 2,
    Component: Certification_DC_BEN,
    isPrivate: true,
  },
  {
    name: "Tax_dualCert_Eci",
    path: "/Tax_dualCert_Eci",
    id: 2,
    Component: Tax_dualCert_Eci,
    isPrivate: true,
  },
  {
    name: "Certi_dualCert_Eci",
    path: "/Certi_dualCert_Eci",
    id: 2,
    Component: Certi_dualCert_Eci,
    isPrivate: true,
  },
  {
    name: "Perti_dualCert_Eci",
    path: "/Perti_dualCert_Eci",
    id: 2,
    Component: Perti_dualCert_Eci,
    isPrivate: true,
  },
  {
    name: "Submit_dualCert_Eci",
    path: "/Submit_dualCert_Eci",
    id: 2,
    Component: Submit_dualCert_Eci,
    isPrivate: true,
  },

  {
    name: "TaxPurpose_entity_W9_DC",
    path: "/TaxPurpose_entity_W9_DC",
    id: 2,
    Component: TaxPurpose_entity_W9_DC,
    isPrivate: true,
  },
  {
    name: "Financial_W9_DC",
    path: "/Financial_W9_DC",
    id: 2,
    Component: Financial_W9_DC,
    isPrivate: true,
  },
  {
    name: "Complete_CRS_W9",
    path: "/Complete_CRS_W9",
    id: 2,
    Component: Complete_CRS_W9,
    isPrivate: true,
  },
  //Complete_CRS_W9
  {
    name: "CRS_W9_DC",
    path: "/CRS_W9_DC",
    id: 2,
    Component: CRS_W9_DC,
    isPrivate: true,
  },
  {
    name: "Active_Non_Financial_W9_DC",
    path: "/Active_Non_Financial_W9_DC",
    id: 2,
    Component: Active_Non_Financial_W9_DC,
    isPrivate: true,
  },
 
  {
    name: "Non_Reporting_CRS_W9_DC",
    path: "/Non_Reporting_CRS_W9_DC",
    id: 2,
    Component: Non_Reporting_CRS_W9_DC,
    isPrivate: true,
  },
  //Non_Reporting_CRS_W9_DC
  {
    name: "Financial_CRS_W9_DC",
    path: "/Financial_CRS_W9_DC",
    id: 2,
    Component: Financial_CRS_W9_DC,
    isPrivate: true,
  },
  {
    name: "FinancialReport_CRS_W9_DC",
    path: "/FinancialReport_CRS_W9_DC",
    id: 2,
    Component: FinancialReport_CRS_W9_DC,
    isPrivate: true,
  },
  {
    name: "SelfCert_Passive_W9_DC",
    path: "/SelfCert_Passive_W9_DC",
    id: 2,
    Component: SelfCert_Passive_W9_DC,
    isPrivate: true,
  },
  {
    name: "US_Determination_W9_DC",
    path: "/US_Determination_W9_DC",
    id: 2,
    Component: US_Determination_W9_DC,
    isPrivate: true,
  },
  //US_Determination_W9_DC
  {
    name: "TaxPurpose_W9",
    path: "/TaxPurpose_W9",
    id: 2,
    Component: TaxPurpose_W9,
    isPrivate: true,
  },
  //TaxPurpose_W9
  {
    name: "Thankyou_dualCert_Eci",
    path: "/Thankyou_dualCert_Eci",
    id: 2,
    Component: Thankyou_dualCert_Eci,
    isPrivate: true,
  },

  //Tax_dualCert_Eci
  {
    name: "Susbtantial_BEN",
    path: "/Susbtantial_BEN",
    id: 2,
    Component: Susbtantial_BEN,
    isPrivate: true,
  },
  //Susbtantial_BEN
  {
    name: "penalities_DC_BEN",
    path: "/penalities_DC_BEN",
    id: 2,
    Component: penalities_DC_BEN,
    isPrivate: true,
  },
  {
    name: "ThankYou_DC_BEN",
    path: "/ThankYou_DC_BEN",
    id: 2,
    Component: ThankYou_DC_BEN,
    isPrivate: true,
  },
  {
    name: "Submit_DC_BEN",
    path: "/Submit_DC_BEN",
    id: 2,
    Component: Submit_DC_BEN,
    isPrivate: true,
  },

  {
    name: "Participation_W9_DC",
    path: "/Participation_W9_DC",
    id: 2,
    Component: Participation_W9_DC,
    isPrivate: true,
  },
  {
    name: "Submit_W9_DC",
    path: "/Submit_W9_DC",
    id: 2,
    Component: Submit_W9_DC,
    isPrivate: true,
  },
  {
    name: "Thankyou_W9_DC",
    path: "/Thankyou_W9_DC",
    id: 2,
    Component: Thankyou_W9_DC,
    isPrivate: true,
  },
  
  {
    name: "EntityUs",
    path: "EntityUs",
    id: 2,
    Component: EntityUs,
    isPrivate: true,
  },
  {
    name: "Term",
    path: "Term",
    id: 3,
    Component: Term,
    isPrivate: true,
  },
  {
    name: "Guide",
    path: "/Guide",
    id: 3,
    Component: Guide,
    isPrivate: true,
  },
  {
    name: "Submit",
    path: "/Submit",
    id: 3,
    Component: Submit,
    isPrivate: true,
  },
  {
    name: "Certificates",
    path: "/Certificates",
    id: 4,
    Component: Certificates,
    isPrivate: true,
  },
  {
    name: "Complete",
    path: "Complete",
    id: 4,
    Component: Complete,
    isPrivate: true,
  },
  
  {
    name: "form",
    path: "/form",
    id: 4,
    Component: form,
    isPrivate: true,
  },

  {
    name: "Declaration",
    path: "W-8BEN/Declaration",
    id: 5,
    Component: Declaration,
    isPrivate: true,
  },
  {
    name: "Non_us_sourced",
    path: "W-8BEN/Declaration/Non_US_Sorced/Status",
    id: 5,
    Component: Non_us_sourced,
    isPrivate: true,
  },

  {
    name: "US_Sourced",
    path: "W-8BEN/Declaration/US_Sourced",
    id: 4,
    Component: US_Sourced,
    isPrivate: true,
  },
  {
    name: "Non_us_tin",
    path: "W-8BEN/Declaration/US_Tin",
    id: 4,
    Component: Non_us_tin,
    isPrivate: true,
  },
  {
    name: "Claim",
    path: "W-8BEN/Declaration/US_Tin/Claim",
    id: 5,
    Component: Claim,
    isPrivate: true,
  },
  {
    name: "Rates",
    path: "W-8BEN/Declaration/US_Tin/Rates",
    id: 6,
    Component: Rates,
    isPrivate: true,
  },
  {
    name: "Certi",
    path: "W-8BEN/Declaration/US_Tin/Certificates",
    id: 6,
    Component: Certi,
    isPrivate: true,
  },


  {
    name: "Submit_Ben",
    path: "W-8BEN/Declaration/US_Tin/Certificates/Submit_Ben",
    id: 6,
    Component: Submit_Ben,
    isPrivate: true,
  },
  {
    name: "ThankYou_Ben",
    path: "W-8BEN/Declaration/US_Tin/Certificates/Submit_Ben/ThankYou_Ben",
    id: 6,
    Component: ThankYou_Ben,
    isPrivate: true,
  },

  {
    name: "Part",
    path: "/W-8BEN/Declaration/US_Tin/Certification_Substitute/participation",
    id: 6,
    Component: Part,
    isPrivate: true,
  },
  {
    name: "Eci",
    path: "W-8ECI/Info",
    id: 6,
    Component: Eci,
    isPrivate: true,
  },
  {
    name: "TaxPurpose",
    path: "W-8ECI/Tax_Purpose",
    id: 6,
    Component: TaxPurpose,
    isPrivate: true,
  },
  {
    name: "TaxPayer",
    path: "W-8ECI/Tax_Payer",
    id: 6,
    Component: TaxPayer,
    isPrivate: true,
  },
  {
    name: "Income_Eci",
    path: "W-8ECI/Income",
    id: 6,
    Component: Income_Eci,
    isPrivate: true,
  },
  {
    name: "Certi_Eci",
    path: "/W-8ECI/Certification",
    id: 6,
    Component: Certi_Eci,
    isPrivate: true,
  },

  {
    name: "Declaration",
    path: "W-8BEN/Declaration",
    id: 5,
    Component: Declaration,
    isPrivate: true,
  },
  {
    name: "Non_us_sourced",
    path: "W-8BEN/Declaration/Non_US_Sorced/Status",
    id: 5,
    Component: Non_us_sourced,
    isPrivate: true,
  },

  {
    name: "US_Sourced",
    path: "W-8BEN/Declaration/US_Sourced",
    id: 4,
    Component: US_Sourced,
    isPrivate: true,
  },
  {
    name: "Non_us_tin",
    path: "W-8BEN/Declaration/US_Tin",
    id: 4,
    Component: Non_us_tin,
    isPrivate: true,
  },
  {
    name: "Claim",
    path: "W-8BEN/Declaration/US_Tin/Claim",
    id: 5,
    Component: Claim,
    isPrivate: true,
  },
  {
    name: "Rates",
    path: "W-8BEN/Declaration/US_Tin/Rates",
    id: 6,
    Component: Rates,
    isPrivate: true,
  },
  {
    name: "Certi",
    path: "W-8BEN/Declaration/US_Tin/Certificates",
    id: 6,
    Component: Certi,
    isPrivate: true,
  },
  {
    name: "Part",
    path: "W-8BEN/Declaration/US_Tin/Certification_Substitute",
    id: 6,
    Component: Part,
    isPrivate: true,
  },
  {
    name: "Submit_Eci",
    path: "W-8ECI/Certification/Participation/Submit_Eci",
    id: 6,
    Component: Submit_Eci,
    isPrivate: true,
  },
  {
    name: "Part_ceri",
    path: "W-8ECI/Certification/Participation",
    id: 6,
    Component: Part_ceri,
    isPrivate: true,
  },
  {
    name: "ThankYou_Eci",
    path: "W-8ECI/Certification/Participation/Submit_Eci/ThankYou_Eci",
    id: 6,
    Component: ThankYou_Eci,
    isPrivate: true,
  },
  {
    name: "Presence",
    path: "Form8233/SubstantialPresence",
    id: 7,
    Component: Presence,
    isPrivate: true,
  }, {
    name: "TaxPay",
    path: "Form8233/TaxPayer_Identification",
    id: 7,
    Component: TaxPay,
    isPrivate: true,
  },
  {
    name: "Owner",
    path: "Form8233/TaxPayer_Identification/Owner",
    id: 7,
    Component: Owner,
    isPrivate: true,
  },
  {
    name: "Claim_part",
    path: "Form8233/TaxPayer_Identification/Owner/Claim_part",
    id: 7,
    Component: Claim_part,
    isPrivate: true,
  },
  {
    name: "Documentaion",
    path: "Form8233/TaxPayer_Identification/Owner/Documentaion",
    id: 7,
    Component: Documentaion,
    isPrivate: true,
  }, {
    name: 'Certi_8233',
    path: "Form8233/TaxPayer_Identification/Owner/Documentaion/certification",
    id: 7,
    Component: Certi_8233,
    isPrivate: true,
  },
  {
    name: "Submission",
    path: "Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission",
    id: 7,
    Component: Submission,
    isPrivate: true,
  },

  {
    name: "Submit_8233",
    path: "Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233",
    id: 7,
    Component: Submit_8233,
    isPrivate: true,
  },
  {
    name: "ThankYou_8233",
    path: "Form8233/TaxPayer_Identification/Owner/Documentaion/certification/Submission/Submit_8233/ThankYou_8233",
    id: 7,
    Component: ThankYou_8233,
    isPrivate: true,
  },
  {
    name: "CaymanIndividualStart",
    path: "Cayman/Individual/Start",
    id: 7,
    Component: CaymanIndividualStart,
    isPrivate: true,
  },
  {
    name: "CaymanIndividualStartUSTin",
    path: "/Cayman/Individual/Start/US_Tin",
    id: 7,
    Component: CaymanIndividualStartUSTin,
    isPrivate: true,
  },
  {
    name: "CaymanIndividualStartSustantialPresence",
    path: "/Cayman/Individual/Start/SustantialPresence",
    id: 7,
    Component: CaymanIndividualStartSustantialPresence,
    isPrivate: true,
  },
  {
    name: "CaymanIndividualStartCertification",
    path: "/Cayman/Individual/Start/Certification",
    id: 7,
    Component: CaymanIndividualStartCertification,
    isPrivate: true,
  },{
    name: "CaymanIndividualStartSubmission",
    path: "/Cayman/Individual/Start/Submission",
    id: 7,
    Component: CaymanIndividualStartSubmission,
    isPrivate: true,
  },
  {
    name: "CaymanIndividualStartESConfirmation",
    path: "/Cayman/Individual/Start/ESConfirmation",
    id: 7,
    Component: CaymanIndividualStartESConfirmation,
    isPrivate: true,
  },
  {
    name: "CaymanIndividualStartThankyou",
    path: "/Cayman/Individual/Start/Thankyou",
    id: 7,
    Component: CaymanIndividualStartThankyou,
    isPrivate: true,
  },
  {
    name: "CaymanEntityStart",
    path: "/Cayman/Entity/Start",
    id: 7,
    Component: CaymanEntityStart,
    isPrivate: true,
  },
  {
    name: "CaymanEntityFatcaClassification",
    path: "/Cayman/Entity/Start",
    id: 7,
    Component: CaymanEntityFatcaClassification,
    isPrivate: true,
  },
  
  {
    name: "PDFViewer",
    path: "PDFViewer",
    id: 7,
    Component: PDFViewer,
    isPrivate: true,
  },
  {
    name: "Back",
    path: "US_Purposes/Back",
    id: 7,
    Component: Back,
    isPrivate: true,
  },
  {
    name: "Exemption",
    path: "US_Purposes/Back/Exemption",
    id: 7,
    Component: Exemption,
    isPrivate: true,
  },
  {
    name: "tax",
    path: "US_Purposes/Back/Exemption/Tax",
    id: 7,
    Component: tax,
    isPrivate: true,
  },
  {
    name: "Certificates_w9",
    path: "US_Purposes/Back/Exemption/Tax/Certificates",
    id: 7,
    Component: Certificates_w9,
    isPrivate: true,
  },
  {
    name: "Penlities_W9",
    path: "US_Purposes/Back/Exemption/Tax/Certificates/Penlities_W9",
    id: 7,
    Component: Penlities_W9,
    isPrivate: true,
  },
  {
    name: "Formw9",
    path: "w9_pdf",
    id: 7,
    Component: Formw9,
    isPrivate: true,
  },
  {
    name: "Thankyou_w9",
    path: "Thankyou_w9",
    id: 7,
    Component: ThankYou_W9,
    isPrivate: true,
  },
  {
    name: "Submit",
    path: "W9_Submit",
    id: 7,
    Component: Submit_w9,
    isPrivate: true,
  },
  {
    name: "Formw8Ben",
    path: "w8Ben_pdf",
    id: 7,
    Component: W8Ben,
    isPrivate: true,
  },
  {
    name: "Formw8BenE",
    path: "w8BenE_pdf",
    id: 7,
    Component: W8BENE,
    isPrivate: true,
  },
  {
    name: "Formw8Eci",
    path: "w8Eci_pdf",
    id: 7,
    Component: W8Eci,
    isPrivate: true,
  },

  {
    name: "Formw8Exp",
    path: "w8Exp_pdf",
    id: 7,
    Component: W8Exp,
    isPrivate: true,
  },
  
  
  {
    name: "Tax_Purpose_BenE",
    path: "BenE/Tax_Purpose_BenE",
    id: 7,
    Component: Tax_Purpose_BenE,
    isPrivate: true,
  },
  {
    name: "Declaration_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE",
    id: 7,
    Component: Declaration_BenE,
    isPrivate: true,
  },
  {
    name: "Status_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Status_BenE",
    id: 7,
    Component: Status_BenE,
    isPrivate: true,
  },
  {
    name: "US_Tin_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/US_Tin_BenE",
    id: 7,
    Component: US_Tin_BenE,
    isPrivate: true,


  },
  {
    name: "Claim_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E",
    id: 7,
    Component: Claim_BenE,
    isPrivate: true,
  },
  {
    name: "Rates_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE",
    id: 7,
    Component: Rates_BenE,
    isPrivate: true,
  },
  {
    name: "Certi_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE",
    id: 7,
    Component: Certi_BenE,
    isPrivate: true,
  },
  {
    name: "Participation_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE",
    id: 7,
    Component: Participation_BenE,
    isPrivate: true,
  },
  {
    name: "Submit_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE/Submit_BenE",
    id: 7,
    Component: Submit_BenE,
    isPrivate: true,
  },
  {
    name: "ThankYou_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/Non_US/Claim_Ben_E/Rates_BenE/Certi_BenE/Participation_BenE/Submit_BenE/ThankYou_BenE",
    id: 7,
    Component: ThankYou_BenE,
    isPrivate: true,
  },
  {
    name: "Factors_BenE",
    path: "BenE/Tax_Purpose_BenE/Declaration_BenE/US/Factors_BenE",
    id: 7,
    Component: Factors_BenE,
    isPrivate: true,
  },
  {
    name: "Chapter4",
    path: "/Chapter4",
    id: 7,
    Component: Chapter4,
    isPrivate: true,
  },


  {
    name: "Chapter4Guide_Exp",
    path: "/Chapter4Guide_Exp",
    id: 7,
    Component: Chapter4Guide_Exp,
    isPrivate: true,
  },
  {
    name: "Tax_Purpose_Exp",
    path: "/Exp/Tax_Purpose_Exp",
    id: 7,
    Component: Tax_Purpose_Exp,
    isPrivate: true,
  },
  {
    name: "Chapter4_Exp",
    path: "/Exp/Tax_Purpose_Exp/Chapter4_Exp",
    id: 7,
    Component: Chapter4_Exp,
    isPrivate: true,

  },
  {
    name: "Tin_Exp",
    path: "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp",
    id: 7,
    Component: Tin_Exp,
    isPrivate: true,

  },
  {
    name: "Certificate_Exp",
    path: "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp",
    id: 7,
    Component: Certificate_Exp,
    isPrivate: true,
  },
  {
    name: "Participation_Exp",
    path: "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp",
    id: 7,
    Component: Participation_Exp,
    isPrivate: true,
  },
  {
    name: "Submit_Exp",
    path: "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp/Submit_Exp",
    id: 7,
    Component: Submit_Exp,
    isPrivate: true,
  },
  {
    name: "ThankYou_Exp",
    path: "/Exp/Tax_Purpose_Exp/Chapter4_Exp/Tin_Exp/Certificate_Exp/Participation_Exp/Submit_Exp/ThankYou_Exp",
    id: 7,
    Component: ThankYou_Exp,
    isPrivate: true,
  },
  {
    name: "Purpose_IMY",
    path: "/IMY/Tax_Purpose_Exp",
    id: 7,
    Component: Purpose_IMY,
    isPrivate: true,
  },
  {
    name: "Chapter4_IMY",
    path: "/IMY/Tax_Purpose_Exp/Chapter4_IMY",
    id: 7,
    Component: Chapter4_IMY,
    isPrivate: true,
  },
  {
    name: "TaxPayer_IMY",
    path: "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY",
    id: 7,
    Component: TaxPayer_IMY,
    isPrivate: true,
  },
  {
    name: "Statement_IMY",
    path: "/IMY/Tax_Purpose_Exp/Chapter4_IMY/Statement",
    id: 7,
    Component: Statement_IMY,
    isPrivate: true,
  },
  {
    name: "Certificates_IMY",
    path: "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY",
    id: 7,
    Component: Certificates_IMY,
    isPrivate: true,
  },
  {
    name: "Participation_IMY",
    path: "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY/Participation_IMY",
    id: 7,
    Component: Participation_IMY,
    isPrivate: true,
  },
  {
    name: "Submit_IMY",
    path: "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY/Participation_IMY/Submit_IMY",
    id: 7,
    Component: Submit_IMY,
    isPrivate: true,
  },
  {
    name: "ThankYou_IMY",
    path: "/IMY/Tax_Purpose_Exp/Chapter4_IMY/TaxPayer_IMY/Certificates_IMY/Participation_IMY/Submit_IMY/ThankYou_IMY",
    id: 7,
    Component: ThankYou_IMY,
    isPrivate: true,
  }



];

export default ROUTES;
