import { Body, Inject, Injectable, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async createUser(payload: any) {
    try {
      const response = await firstValueFrom(
        this.client.send('user_created', payload),
      );
      return response;
    } catch (error) {
      if (error?.statusCode) {
        throw error;
      }
    }
  }
}
