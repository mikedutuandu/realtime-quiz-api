import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OkResponse } from '#shares/response/ok.response';
import { Serialize } from '#interceptors';

@ApiTags('App')
@Controller()
export class AppController {
  @Get('/')
  @ApiOkResponse({ type: OkResponse })
  @Serialize(OkResponse)
  async health() {
    return true;
  }
}
