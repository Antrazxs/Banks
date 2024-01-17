const  puppeteer = require("puppeteer");
function CheckDB(){
    return "AG";
}
function Api(email,senha){
    (async () => {
      try{ 
        console.log(`Inicializando com Sucesso ✅  [ SPX ] [ ID: ] [ Technical Analysis [ SPX ] ]`);
        const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768});
        console.log(`Processando com Sucesso ✅  [ SPX ] [ ID: ] [ Technical Analysis [ SPX ] ]`);
        await page.goto('https://www.itau.com.br/', {waitUntil: 'load', timeout: 0});
        await new Promise(r => setTimeout(r, 2000));
        const Api = await page.evaluate(async() =>{
            /***
             * ? 1-) AS ORDEM DE SER FILTRADA A DB  [ '''' PF - | PJ | IM | CO | IT    ''''].
             * ! [
             * ! AG = Agencias e Conta.
             * ! CO = Codigo Operador.
             * ! CF = 
             * ! ]
             */
            let CheckMenu = await document.querySelector('[class="acessos"]').click();
        });
        await new Promise(r => setTimeout(r, 2000));
        await page.waitForSelector('#opcoes_login');
        let GetItem = await page.$x(`//*[@id="opcoes_login"]`)
        await GetItem[0].select('1: codigo_operador');
        switch (expressão) {
          case "ag":
            // bloco de código a ser executado
            break;
          case valor2:
            // bloco de código a ser executado
            break;
          // mais cases...
          default:
            // bloco de código a ser executado se nenhum case combinar
          } 
      }catch(error){
        console.log(`Erro no PDF ❌ [ SPX ] [ ID: ] [ ERRO Technical Analysis [ SPX ] ]`);
      }finally{
        console.log(`[ REQUEST ✅  ] [ SPX ] [ ID: ] [ Technical Analysis [ SPX ] ]`);
      }
    })();
  };
Api("Bbb24.oficiall","6897668976");