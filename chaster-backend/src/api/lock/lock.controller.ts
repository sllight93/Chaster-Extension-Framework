// src/api/incement.controller.ts


import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PartnerExtensionsApi, FreezeLockActionModel, FreezeLockActionModelNameEnum } from '@chasterapp/chaster-js'


import { getSessionAuthData } from '../../utils/sessionUtils';
import { createLogEntry } from '../../utils/logUtils';
import * as lock from '../../utils/lockUtils';

const partnerExtensionsApi = new PartnerExtensionsApi();

@Controller('api/lock')
export class LockController {
  @Post()
  async handlePost(@Body() body: any): Promise<any> {
    // Beispiel: Überprüfe, ob ein bestimmtes Feld im Request-Body vorhanden ist.
    if (!body.value) {
      throw new HttpException('value fehlt im Request-Body', HttpStatus.BAD_REQUEST);
    }
    console.log("Incement number to " + body.value)
    return {
      success: true,
      message: 'POST-Anfrage an /api/lock erfolgreich verarbeitet',
      receivedData: body,
    };
  }

  @Post('freeze')
  async freezeLock(@Body('token') token: string): Promise<any> { 
    return lock.freezeLock(token); 
  }

  @Post('unfreeze')
  async unfreezeLock(@Body('token') token: string): Promise<any> { 
    return lock.unfreezeLock(token); 
  }

  @Post('togglefreeze')
  async toggleFreezeLock(@Body('token') token: string): Promise<any> { 
    return lock.toggleFreezeLock(token); 
  }



  //create custom log entry 
  @Post('log')
  async logAction(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('role') role?: string,
    @Body('icon') icon?: string,  
    @Body('color') color?: string
  ) {

    

    if (!token || !title || !description) {
      throw new HttpException('Fehlende Parameter: sessionId, token, title oder description', HttpStatus.BAD_REQUEST);
    }

    try {
      await createLogEntry(token, { title, description, icon, color });
      return { success: true };
    } catch (error) {
      throw new HttpException('Fehler beim Erstellen des Logs', HttpStatus.INTERNAL_SERVER_ERROR);
    }  
  }
}
