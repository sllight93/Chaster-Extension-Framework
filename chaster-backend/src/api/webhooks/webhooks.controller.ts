import { Controller, Post, Body, Headers, Logger, UseGuards } from '@nestjs/common';
//import { BasicAuthGuard } from '../../guards/basic-auth.guard';

@Controller('api/webhooks')
//@UseGuards(BasicAuthGuard)
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  @Post()
  handleWebhook(
    @Body() payload: any,
    @Headers() headers: Record<string, any>
  ) {
    this.logger.log(`Webhook received with headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Payload: ${JSON.stringify(payload)}`);


    // Hier kannst du zusätzliche Validierungen und Verarbeitung durchführen

    return { status: 'received' };
  }
}
