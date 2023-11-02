const express = require('express');
const router = express.Router();

const _ = require('lodash');
const sendResponse = require('../Utils/sendResponse');
const controller = require('../Controllers/Code');
const { fs } = require('../Utils/global');


router.post('/compile', async (req, res) => {
    let { language, content, stdin } = req.body;
    // content = `import java.util.Scanner;

    // public class HelloWorld {
    
    //     public static void main(String[] args) {
    
            
    //         System.out.println("hello " );
    //     }
    // }`
    
    stdin = stdin ? stdin : '';
    content = content ? content : '';
    console.log("before res")
    const result = await controller.runFile({ language, code: content, stdin });
    if (!result) return sendResponse('Bad Request', res);
    if (result.err) return sendResponse(result.err, res, 404);
    sendResponse(result, res);
});

module.exports = router;