import multer from "multer";
import path from "path";
import crypto from "crypto";
import * as AWS from "aws-sdk";
import multerS3 from "multer-s3";
import encrypt from "./utils/crypto";
import { S3Client } from "@aws-sdk/client-s3";

let s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    }
});

const storageTypes = {
    local: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./uploads/");
        },
        filename: function (req, file, cb) {
          cb(null, encrypt(new Date().toLocaleString()) + "-" + file.originalname);
        },
      }),

    s3: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET || "",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            const fileName = encrypt(new Date().toLocaleString()) + "-" + file.originalname;
            cb(null, fileName);
        },
    })
}

const fileFilter = (
  req: any,
  file: { mimetype: string },
  cb: (arg0: null, arg1: boolean) => void
) => {

  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImage = multer({
  storage: storageTypes['s3'],
  limits: {
    fileSize: 1024 * 1024 * 3,
    fieldNameSize: 100,
  },
  fileFilter: fileFilter,
});

export default uploadImage;
