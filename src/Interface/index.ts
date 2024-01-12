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
export  interface IPropLogin 
{
    name: 'identifier'| 'password'
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
export interface ITodo {
    id:number,
    title: string,
    description: string,
  }