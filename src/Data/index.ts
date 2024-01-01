import IPropRegister from "../Interface"

const FORMREGISTER:IPropRegister[] = [
    {
        name:"userName",
        placeholder:"userName",
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
export default FORMREGISTER