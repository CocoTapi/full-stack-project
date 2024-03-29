import express from "express";
import { signUp, login, getUserDataFromGoogle, oAuthLogin, generateTokens, checkOAuthData } from "./auth";
import { asyncHandler } from "../util/route-util";
import { LoginInfo, SignUpInfo } from "../util/types";
import env from "dotenv";

const fs = require('fs');
const path = require('path');


env.config();

const router = express.Router();

router.post("/signup", asyncHandler(async (req, res) => {
    const signUpInfo: SignUpInfo = req.body;
    console.log(signUpInfo);
    await signUp(signUpInfo);
    res.status(200).json({ message: 'Successfully created user.' })
}));

router.post("/login", asyncHandler(async (req, res) => {
    const loginInfo: LoginInfo = req.body;
    const userDetails = await login(loginInfo);
    res.status(200).json({ message: 'Successfully logged in with user credentials.', userDetails })
}));

//cliant info



//create the url for google login and send it back to the frontend
router.post("/oauth", asyncHandler(async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Referrer-Policy", 'no-referrer-when-downgrade');

    const authUrl = await oAuthLogin();
    res.status(200).json({ authUrl });
}));



router.get("/auth/google", asyncHandler(async function (req, res) {
    const code: string = req.query.code as string;
    if (!code) res.status(400).json({ message: 'Authorization code is missing' });

    const tokens = await generateTokens(code);

    const {email, firstName, lastName} = await getUserDataFromGoogle(tokens.id_token);
    
    const password = "google";

    await checkOAuthData({email, password, firstName, lastName});
    const token = "1345rhgdfjhgav4yug1q4hetkqh345y134thqekrjhvgtkq3h5";
    const filePath = path.join(__dirname, '../redirect.html');

    // Read in the HTML file content
    fs.readFile(filePath, { encoding: 'utf-8' }, (err: any, htmlContent: string) => {
        if (err) {
            console.error('Error reading the HTML file:', err);
            return res.status(500).send('Error loading the authentication page.');
        }

        // Replace the placeholder with the actual idToken
        const updatedHtmlContent = htmlContent.replace('RETRIEVED_ID_TOKEN', token);

        // Send the modified HTML content as the response
        res.send(updatedHtmlContent);
    });
    // res.send(`<script>window.opener.postMessage({ token: '${token}' }, window.origin); window.close();</script>`);
    // res.status(200).json({
    //     message: "Success",
    //     token: "1345rhgdfjhgav4yug1q4hetkqh345y134thqekrjhvgtkq3h5"
    // })
}))

export default router;