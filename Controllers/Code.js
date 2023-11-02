const { errorToJSON, fs } = require('../Utils/global');
const { c, node, python,cpp,java } = require('../Utils/compile-run');


const dir = './assets/code';
function generateFilePath(fileName, language) {
    let result = null;
    language = language.toLowerCase();

    if (language === 'c') {
        result = `${dir}/${fileName}.c`;
    } else if (language === 'c++' || language === 'cpp') {
        result = `${dir}/${fileName}.cpp`;
    } else if (language === 'python' || language === 'py') {
        result = `${dir}/${fileName}.py`;
    } else if (language === 'java') {
        result = `${dir}/${fileName}.java`;
    } else if (language === 'javascript' || language === 'js') {
        result = `${dir}/${fileName}.js`;
    }
    return result;
}



async function runFile({ language, code, stdin }) {
    let runner = null;
    console.log(stdin)
    language = language.toLowerCase();
    if (language === 'c') {
        runner = c;
    } else if (language === 'c++' || language === 'cpp') {
        runner = cpp;
    } else if (language === 'java') {
        runner = java;
    } else if (language === 'javascript' || language === 'js') {
        runner = node;
    } else if (language === 'python' || language === 'py') {
        runner = python;
    }
    
    if (!runner) return null;
    
    const path = generateFilePath('Decoder', language);
    await fs.writeFileAsync(path, code);
    let result;
    const startTime = new Date();
    if(language === 'python'){
        result = await runner.runFile(path, {executionPath: 'python3', stdin });
    }else{
        result = await runner.runFile(path, { stdin });
    }
    
    const endTime = new Date();

    if (!result || result.err) return result;
    const runTime = endTime.getTime() - startTime.getTime();
    if (!result.manualrunTime) result.manualrunTime = runTime;
    return result;
}

module.exports = {
    runFile,generateFilePath
}
