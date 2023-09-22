#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>

const char *ssid = "APT 63";
const char *password = "jakson63";
const int serverPort = 80; // Porta do servidor TCP

WiFiServer server(serverPort);

void setup() {
  Serial.begin(115200);
  delay(10);

  // Conecte-se à sua rede Wi-Fi
  Serial.println();
  Serial.print("Conectando-se a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Conectado à rede WiFi");
  Serial.println("Endereço IP: " + WiFi.localIP().toString());

  // Inicialize o servidor TCP
  server.begin();
}

void loop() {
  // Aguarde uma conexão de cliente
  WiFiClient client = server.available();

  if (client) {
    Serial.println("Novo cliente conectado");

    // Leia os dados enviados pelo cliente
    while (client.connected()) {
      if (client.available()) {
        String data = client.readStringUntil('\n');
        Serial.println("Dados recebidos: " + data);

        // Aqui você pode processar os dados recebidos do aplicativo
        // Neste exemplo, apenas ecoaremos os dados de volta para o cliente

        // Envie os dados de volta para o cliente
        client.print("Você enviou: ");
        client.println(data);
      }
    }

    // Feche a conexão com o cliente
    client.stop();
    Serial.println("Cliente desconectado");
  }
}
