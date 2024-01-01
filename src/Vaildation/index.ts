import * as yup from "yup";

const schema = yup
  .object({
    UserName: yup
      .string()
      .required("UserName Is Required")
      .min(5, "UserName Should be at least 5 Characters. "),
    email: yup
      .string()
      .required("UserName Is Email")
      .matches(
        /^[a-zA-Z]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        "Not a valid email address"
      ),
    password: yup
      .number()
      .positive()
      .integer()
      .required("UserName Is Password")
      .min(6, "UserName Should be at least 6 Characters."),
  })
  .required();

export default schema;
//   /^[a-zA-Z]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}$/
