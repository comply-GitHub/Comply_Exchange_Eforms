
export const convertToFormData=(payload:any)=>{
    const form_data = new FormData();
    let keys=Object.keys(payload);
    keys.forEach(element => {
        if(payload[element]!=null&&payload[element]!=undefined)
        form_data.append(element,payload[element])
    });
    return form_data;
}