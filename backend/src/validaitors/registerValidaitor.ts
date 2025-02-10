import Validator from "fastest-validator";

const v = new Validator();

const schema = {
  username: {
    type: "string",
    min: 3,
    max: 20,
    messages: { min: "Username must be at least 3 characters." },
  },
  email: {
    type: "string",
    pattern: "^[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$",
    messages: { pattern: "Invalid email format" },
  },
  password: {
    type: "string",
    min: 8,
    pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    messages: {
      pattern:
        "Password must be at least 8 characters with letters and numbers",
    },
  },
  $$strict: true,
};

const validationCheck = v.compile(schema);

export default validationCheck;
