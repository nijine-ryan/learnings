import { Router } from "express";
import { createUser, getUsers } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { getFileLinks, getUploadedFile, uploadFile, uploadMultipleFile } from "../controllers/file-upload.controller";


const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World")
})

router.post('/upload',upload.single('file'),uploadFile)
router.post('/upload-multiple',upload.array('files'),uploadMultipleFile)
router.get('/file/:filename', getUploadedFile);
router.post('/files/links', getFileLinks);
router.get('/users',getUsers)
router.post('/users',createUser)

export default router;