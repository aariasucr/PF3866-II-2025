# test_ucr_appium.py
import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Lee credenciales desde variables de entorno
LT_USERNAME = "aariasucr"
LT_ACCESS_KEY = "LT_patito_feliz"

# Configuración de opciones para mobile web testing con LambdaTest
options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-gpu")

# Simular dispositivo móvil con user agent y viewport
mobile_user_agent = "Mozilla/5.0 (Linux; Android 12; SM-S906B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
options.add_argument(f"--user-agent={mobile_user_agent}")
options.add_argument("--window-size=412,915")  # Galaxy S22 viewport
options.add_experimental_option("mobileEmulation", {
    "deviceMetrics": {"width": 412, "height": 915, "pixelRatio": 3.0},
    "userAgent": mobile_user_agent
})

# Configuración específica para LambdaTest
options.set_capability("browserName", "Chrome")
options.set_capability("browserVersion", "latest")
options.set_capability("platformName", "Windows 10")
options.set_capability("build", "UCR Title - Selenium Python")
options.set_capability("name", "verify-ucr-title")

# Hub URL de LambdaTest para mobile web testing
# Nota: Para producción, considera usar variables de entorno o un archivo de configuración
# para evitar exponer credenciales en el código
hub_url = f"https://{LT_USERNAME}:{LT_ACCESS_KEY}@hub.lambdatest.com/wd/hub"

print("Conectando a LambdaTest hub:", hub_url)

# Inicia la sesión remota
driver = webdriver.Remote(command_executor=hub_url,
                          options=options)

try:
    # Navega a la página
    url = "https://www.ucr.ac.cr/"
    driver.get(url)
    # espera breve por si hay redirecciones (evita sleeps largos en producción)
    time.sleep(3)

    # Obtén el título y verifica que contenga la palabra esperada
    title = driver.title
    print("Título de la página:", title)

    # Verificación simple: que contenga "Costa Rica"
    expected_substring = "Costa Rica"
    if expected_substring in title:
        print("✅ Verificación OK: el título contiene:", expected_substring)
    else:
        # registra fallo (puedes lanzar excepción para fallar un test framework)
        raise AssertionError(
            "❌ Título inesperado.")

finally:
    # Finaliza sesión (siempre)
    driver.quit()
    print("Sesión finalizada.")
