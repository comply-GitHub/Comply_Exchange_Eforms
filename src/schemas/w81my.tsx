import * as Yup from "yup";

export const TaxPurposeSchemaW81Chapter3 = ()=>{
    return Yup.object().shape({
        chapter3StatusId: Yup.number().notOneOf([0], 'Please select a valid federal tax classification'),
        businessName:Yup.string().when("chapter3StatusId",{
            is : (val:any) => val!==0,
            then:()=> Yup.string().required("Business Name is required"),
            otherwise:()=>Yup.string().notRequired()
        }),
        countryOfIncorporationId:Yup.string().when("chapter3StatusId",{
            is : (val:any) => val!==0,
            then:()=> Yup.string().required("Please select Country"),
            otherwise:()=>Yup.string().notRequired()
        })
      });
}

export const TaxPurposeSchemaW81Chapter4 = ()=>{
    return Yup.object().shape({
        chapter4StatusId: Yup.number().notOneOf([0], 'Please select a valid federal tax classification'),
        
      });
}