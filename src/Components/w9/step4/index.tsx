import Penalties from "./penalities"
import Certification from "./certification"

export default function Step4(props: any) {

    const {
        handleTaxClassificationChange,
        selectedTaxClassification,
        data,
        handleChange,
        setselectedContinue,
        selectedContinue,
        report,
        handleReportChange
    } = props;

    return (
        <>
            {selectedContinue.step6 ? (
                <Penalties
                handleTaxClassificationChange={handleTaxClassificationChange}
                selectedTaxClassification={selectedTaxClassification}
                data={data}
                handleChange={handleChange}
                setselectedContinue={setselectedContinue}


                />
) : ("")}

            {selectedContinue.step7 ? (
                <Certification
                handleTaxClassificationChange={handleTaxClassificationChange}
                selectedTaxClassification={selectedTaxClassification}
                data={data}
                handleChange={handleChange}
                setselectedContinue={setselectedContinue}


                />
            ) : ("")}




        </>

    )
}