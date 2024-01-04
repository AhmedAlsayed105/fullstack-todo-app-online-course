import {IPropLogin, IPropRegister} from "../Interface"

export  const FORMREGISTER:IPropRegister[] = [
    {
        name:"username",
        placeholder:"username",
        type:"text",
        validation:{
            required:true,
            minLength:5,
        },
    },  
    {
        name:"email",
        placeholder:"Email address",
        type:"text",
        validation:{
            required:true,
            pattern:/^[a-zA-Z]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        },
    },
    {
        name:"password",
        placeholder:"Password",
        type:"text",
        validation:{
            required:true,
            minLength:6,
        },
    }
]
// export  FORMREGISTER

export  const FORMRLOGIN:IPropLogin[] = [
    {
        name:"identifier",
        placeholder:"Email address",
        type:"text",
        validation:{
            required:true,
            pattern:/^[a-zA-Z]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        },
    },
    {
        name:"password",
        placeholder:"Password",
        type:"text",
        validation:{
            required:true,
            minLength:6,
        },
    }
]