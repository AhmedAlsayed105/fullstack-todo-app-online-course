import * as yup from "yup";

export const schemaValid = yup
  .object({
    userName: yup
      .string()
      .required("UserName Is Required")
      .min(5, "UserName Should be at least 5 Characters. "),
    email: yup
      .string()
      .required("Email Is Required")
      .matches(
        /^[a-zA-Z]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        "Not a valid email address"
      ),
    password: yup
      .string()
      .required("UserName Is Password")
      .min(6, "UserName Should be at least 6 Characters."),
  })
  .required();

//   /^[a-zA-Z]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}$/
