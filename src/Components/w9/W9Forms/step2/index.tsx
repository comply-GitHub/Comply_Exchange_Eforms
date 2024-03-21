import Fedral_tax from "./fedralTax";
import Backup_witholding from "./backupWitholding";
import FCTA_Reporting from "./fctaReporting";
import Tin from "./tin";

export default function Step2(props: any) {
  const {
    handleTaxClassificationChange,
    selectedTaxClassification,
    data,
    handleChange,
    setselectedContinue,
    selectedContinue,
    report,
    handleReportChange,
    initialValue
  } = props;
  return (
    <>
      {selectedContinue.step1 ? (
        <Fedral_tax
          handleTaxClassificationChange={handleTaxClassificationChange}
          selectedTaxClassification={selectedTaxClassification}
          data={data}
          handleChange={handleChange}
          setselectedContinue={setselectedContinue}
        />
      ) : (
        ""
      )}

      {selectedContinue.step2 ? (
        <Backup_witholding
          handleTaxClassificationChange={handleTaxClassificationChange}
          selectedTaxClassification={selectedTaxClassification}
          data={data}
          handleChange={handleChange}
          setselectedContinue={setselectedContinue}
        />
      ) : (
        ""
      )}

      {/* step3 */}
      {/* {selectedContinue.step3 ? (
        <FCTA_Reporting
          handleTaxClassificationChange={handleTaxClassificationChange}
          selectedTaxClassification={selectedTaxClassification}
          data={data}
          handleChange={handleChange}
          setselectedContinue={setselectedContinue}
          report={report}
          handleReportChange={handleReportChange}
        />
      ) : (
        ""
      )} */}

      {selectedContinue.step3 ? (
        <Tin
          handleTaxClassificationChange={handleTaxClassificationChange}
          selectedTaxClassification={selectedTaxClassification}
          data={data}
          handleChange={handleChange}
          setselectedContinue={setselectedContinue}
          report={report}
          handleReportChange={handleReportChange}
        />
      ) : (
        ""
      )}
    </>
  );
}
