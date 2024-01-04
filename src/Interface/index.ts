export  interface IPropRegister 
{
    name:  'username' | 'email'| 'password'
    placeholder:string,
    type:string,
    validation:{
        required?:boolean,
        minLength?:number,
        pattern?:RegExp,
    }
}

export interface HandelErrInterFace 
{
    error:{

        message?:string
    }
}