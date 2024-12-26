import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [DatabaseModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
