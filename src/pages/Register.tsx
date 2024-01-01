import FORMREGISTER from "../Data";
import InputErrorMessage from "../components/errors/InputErrorMessage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaValid } from "../Vaildation";

interface IFormInput {
  userName: string
  email: string
  password: string
}
const RegisterPage = () => {
  // const { register, handleSubmit } = useForm<IFormInput>()
  
  const {register,formState: { errors },handleSubmit} = useForm<IFormInput>(
    {
      resolver: yupResolver(schemaValid),
    }
  )

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

console.log(errors);

// render
const formData = FORMREGISTER.map(({name,placeholder,type,validation},index)=>(
     <div key={index}>
         <Input type={type} placeholder={placeholder} {...register(name ,{ validation })} />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
     </div>

))
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
        {formData}
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
