import path from "path";
import fs from "fs";

import { OpticBackendClient } from "./optic-client";

export const loadFile = (filePath: string): Promise<Buffer> => {
  const workingDir = process.cwd();
  const resolvedPath = path.resolve(workingDir, filePath);
  return new Promise((resolve, reject) => {
    fs.readFile(resolvedPath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const uploadFileToS3 = async (
  opticClient: OpticBackendClient,
  file: Buffer
) => {
  const signedUrl = await opticClient.getUploadUrl();
  // TODO validate that Buffers can be sent to AWS S3
  await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "x-amz-server-side-encryption": "AES256",
    },
    body: file,
  });

  return "TODO get location of uploaded file";
};