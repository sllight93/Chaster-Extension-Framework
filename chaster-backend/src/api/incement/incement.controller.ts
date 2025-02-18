import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';

@Controller('api/incement')
export class IncementController {
  @Post()
  async handlePost(@Body() body: any): Promise<any> {
    // Beispiel: Überprüfe, ob ein bestimmtes Feld im Request-Body vorhanden ist.
    if (!body.value) {
      throw new HttpException('value fehlt im Request-Body', HttpStatus.BAD_REQUEST);
    }
    
    // Hier kannst du beliebige Logik einbauen, um mit dem Request zu interagieren.
    // Zum Beispiel: Eine Nachricht verarbeiten, Daten speichern oder eine Antwort an den Nutzer generieren.
    console.log("Incement number to" + body.value)




    
    return {
      success: true,
      message: 'POST-Anfrage an /api/incement erfolgreich verarbeitet',
      receivedData: body,
    };
  }
}
