import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { configGet, configSet, configUpdate } from '../../utils/configUtil';

@ApiTags('config')
@Controller('api/config')
export class ConfigController {
  /**
   * Ruft die aktuelle Konfiguration für die angegebene Session ab.
   * GET /config/:sessionToken
   */
  @Get(':sessionToken')
  @ApiOperation({ summary: 'Liefert die aktuelle Konfiguration', description: 'Dieses Endpoint gibt die aktuelle Konfiguration der angegebenen Session zurück.' })
  @ApiResponse({
    status: 200,
    description: 'Erfolgreiche Antwort',
    schema: {
      example: {
        success: true,
        config: {
          config: {
            difficulty: [
              { type: "nothin", weight: 320 },
              { type: "double", weight: 25 },
              { type: "invert", weight: 25 },
              { type: "double_invert", weight: 20 },
              { type: "jackpot", weight: 1 },
            ],
            votes_target: 300,
            count_only_loggedin: true,
            split: 50,
            daily_quota: 20,
            punish_mult: 1,
          },
          metadata: { /* beliebige Metadaten */ },
          data: { /* beliebige Daten */ },
        },
      },
    },
  })
  async getConfig(@Param('sessionToken') sessionToken: string): Promise<any> {
    const config = await configGet(sessionToken);
    return { success: true, config };
  }

  /**
   * Setzt die vollständige Konfiguration für die angegebene Session.
   * POST /config/:sessionToken
   * Erwartet im Body das vollständige Konfigurationsobjekt.
   */
  @Post(':sessionToken')
  @ApiOperation({ summary: 'Setzt die vollständige Konfiguration', description: 'Ersetzt die komplette vorhandene Konfiguration mit dem übergebenen Objekt.' })
  @ApiBody({
    description: 'Das vollständige Konfigurationsobjekt',
    schema: {
      example: {
        config: {
          difficulty: ['easy', 'medium', 'hard'],
          votes_target: 300,
          count_only_loggedin: true,
          split: 50,
          daily_quota: 20,
          punish_mult: 1,
        },
        metadata: { anyKey: 'anyValue' },
        data: { anyKey: 'anyValue' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Configuration set successfully' })
  async setConfig(@Param('sessionToken') sessionToken: string, @Body() config: any): Promise<any> {
    await configSet(sessionToken, config);
    return { success: true, message: 'Configuration set successfully' };
  }

  /**
   * Aktualisiert (merged) die Konfiguration für die angegebene Session.
   * PATCH /config/:sessionToken
   * Erwartet im Body ein JSON-Objekt mit den Feldern, die aktualisiert werden sollen.
   * Dabei werden die neuen Werte in die bestehende Konfiguration integriert, wobei vorhandene Felder überschrieben werden.
   */
  @Patch(':sessionToken')
  @ApiOperation({ summary: 'Aktualisiert die Konfiguration', description: 'Nur die im Body angegebenen Felder werden in die bestehende Konfiguration integriert. (Shallow-Merge)' })
  @ApiBody({
    description: 'Teilweise Konfigurationsänderungen',
    schema: {
      example: {
        config: {
          votes_target: 350,
        },
        metadata: { updatedKey: 'newValue' },
        data: {},
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Configuration updated successfully' })
  async updateConfig(@Param('sessionToken') sessionToken: string, @Body() newConfig: any): Promise<any> {
    await configUpdate(sessionToken, newConfig);
    return { success: true, message: 'Configuration updated successfully' };
  }
}
