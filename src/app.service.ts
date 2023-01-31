import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAuthorName(): string {
    return 'Made by Siddhant';
  }
}
