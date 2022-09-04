import multer from "multer";

const customStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (_req, file, cb) {
    cb(null, +Date.now() + "-" + file.originalname);
  },
});

const customUpload = multer({ storage: customStorage });

export const upload = customUpload.single("image");
