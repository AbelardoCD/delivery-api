const imageToBase64 = require("image-to-base64");

export const validateError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "Unexpect Error";
  }
};

export const encodeToBase64 = (url: string) => {
  return imageToBase64(url)
    .then((response: string) => {
      return new Promise((resolve, reject) => {
        resolve(response);
        reject("error");
      });
    })
    .catch((error: any) => {
      validateError(error);
    });
};
