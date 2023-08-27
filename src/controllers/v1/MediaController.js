const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const crypto = require("crypto");
const httpStatus = require("http-status");
const {createMediaFIle} = require("../../repository/mediaFileRepository")
const MediaFileSerializer = require("../../serializers/v1/MediaFileSerializer")

// Instantiate a storage client with credentials

const keyFile = process.env.GCP_TOKEN_JSON;
// parse the JSON string into an object
const key = JSON.parse(keyFile)

const bucketName = "soinskarisma-salon-images"

const storage = new Storage({ credentials: key });

const bucket = storage.bucket(bucketName);

const upload = async (req, res) => {
    try {
        const {contentType, extension, directory} = req.query;

        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        const hash = crypto.randomBytes(20).toString('hex');
        req.file.originalname = `${hash}.${extension}`;
        
        // Create a new blob in the bucket and upload the file data.
        if (directory) {
            req.file.originalname = `${directory}/${hash}.${extension}`;
        }

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("error", (err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                statusCode: httpStatus.INTERNAL_SERVER_ERROR, 
                message: err.message 
            });
        });

        blobStream.on("finish", async (data) => {

            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );

            const mediaFile = await createMediaFIle({
                reference: req.file.originalname, 
                originalName: req.file.originalname,
                path: publicUrl
            })

            const mediaFileObj = await (new MediaFileSerializer()).serialize(mediaFile)
            const response = {
                statusCode: httpStatus.OK,
                ...mediaFileObj
            }

            try {
                // Make the file public
                await bucket.file(req.file.originalname).makePublic();
            } catch {
                return res.status(response.statusCode).send(response);
            }

            return res.status(response.statusCode).send(response);
        });

        blobStream.end(req.file.buffer);
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = async () => {
    try {
      const [files] = await bucket.getFiles();
      let fileInfos = [];
  
      files.forEach((file) => {
        fileInfos.push({
          name: file.name,
          url: file.metadata.mediaLink,
        });
      });
  
      res.status(200).send(fileInfos);
    } catch (err) {
      console.log(err);
  
      res.status(500).send({
        message: "Unable to read list of files!",
      });
    }
  };

// const getListFiles = async (req, res) => {
// ...
// };

// const download = async (req, res) => {
// ...
// };

module.exports = {
    upload,
    getListFiles,
};