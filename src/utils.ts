const validateError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "Unexpect Error";
  }
};

export default validateError;
