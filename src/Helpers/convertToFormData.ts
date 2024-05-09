
export const convertToFormData=(payload:any)=>{
    const form_data = new FormData();
    let keys=Object.keys(payload);
    keys.forEach(element => {
        if(payload[element]!=null&&payload[element]!=undefined)
        form_data.append(element,payload[element])
    });
    return form_data;
}

export const convertToFormData_ArrayOfObject=(payload:any[])=>{    
    let form_data = new FormData();
    for (let index = 0; index < payload.length; index++) {
        const element = payload[index];
        let keys=Object.keys(element);     
        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            if(element[key]!=null && element[key]!=undefined){
                form_data.append(`[${index}].${key}`,element[key])
            }
        }
    }  
    return form_data;
}
