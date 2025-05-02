import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';

export const uploadFile : RequestHandler = (req, res) => {
  if (!req.file){ 
     res.status(400).json({ message: 'No file uploaded' })
      return;
  };

  res.status(200).json({
    message: 'File uploaded successfully',
    fileName: req.file.filename,
  });
};

export const uploadMultipleFile : RequestHandler = (req, res) => {
  const files = req.files as Express.Multer.File[];
  console.log("files",files);
  if (!files.length){ 
     res.status(400).json({ message: 'No file uploaded' })
      return;
  };

  res.status(200).json({
    message: 'File uploaded successfully',
    fileName: files.map((file) => file.filename),
  });
};
 
export const getUploadedFile : RequestHandler =(req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname,'../..','uploads', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.log("err",err);
      res.status(404).json({ message: 'File not found' });
    }
  });
};

export const getFileLinks :RequestHandler = (req, res) => {
  const filenames = req?.body?.filenames as string[];
 
  if (!Array.isArray(filenames) || filenames.length === 0) {
     res.status(400).json({ message: 'Filenames array is required in body' });
     return;
  }

  const uploadDir = path.join(__dirname, '../..', 'uploads');
  const host = `${req.protocol}://${req.get('host')}`;

  const links = filenames
    .filter((filename) => {
      const filePath = path.join(uploadDir, filename);
      return fs.existsSync(filePath);
    })
    .map((filename) => ({
      name: filename,
      url: `${host}/uploads/${filename}`,
    }));

  res.status(200).json({ files: links });
};
 