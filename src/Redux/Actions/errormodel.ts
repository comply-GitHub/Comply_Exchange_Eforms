import Utils from "../../Utils";

export interface ErrorModel{
    message:string,
    payload:any,
    statusCode:number|undefined
}
