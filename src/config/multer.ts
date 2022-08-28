import multer from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const storegeTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err, file.originalname);
                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
                });
            }
        })
    }

    // multerS3({
    //     S3: new aws.S3(),
    //     bucket: "justissimo",
    //     contentType: multerS3.AUTO_CONTENT_TYPE,
    //     acl: "public-read",
    //     key: (req, file, cb) => {
    //         crypto.randomBytes(16, (err, hash) => {
    //             if (err) cb(err, file.originalname);
    //             const fileName = `${hash.toString("hex")}-${file.originalname}`;
    //             cb(null, fileName);
    //         });
    //     }
    // })

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");