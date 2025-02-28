import { Router } from "express";
import { loginUser, logOutUser, registerUser ,refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUsercoverImage, getuserChannelProfile, getWatchHistory} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/authetication.middlewares.js";

const router = Router();

router.route("/register").post
(upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }]),registerUser)
router.route("/login").post(loginUser)
//secured route
router.route("/logout").post(verifyJWT,logOutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/coverimage").patch(verifyJWT,upload.single("coverImage"),updateUsercoverImage)
router.route("/channel/:username").get(verifyJWT,getuserChannelProfile)
router.route("/watch-history").get(verifyJWT,getWatchHistory)


export default router;
