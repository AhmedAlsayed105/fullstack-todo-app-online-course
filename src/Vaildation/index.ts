// import { schemaValid } from './index';
import * as yup from "yup";

export const schemaValid = yup
  .object({
    username: yup
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

export const schemaValidLogin = yup
  .object({
    identifier: yup
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

export const schemaValidEdit = yup
.object({
  title: yup.string().required("Title Is Required").min(6,"title Should be at least 6 Characters."),
  description: yup.string().required("description Is Required").min(10, "UserName Should be at least 10 Characters."),
})
.required()