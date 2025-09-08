import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h3>now i am become death, the destroyer of worlds.</h3>';
  }
}
