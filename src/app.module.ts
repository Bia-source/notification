import { Module } from '@nestjs/common';
import { NotificationController } from './modules/notifications/notification.controller';
import { NotificationService } from './modules/notifications/notification.service';
import { NotificationModule } from './modules/notifications/notification.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [NotificationModule],
  controllers: [NotificationController],
  providers: [PrismaService, NotificationService],
})
export class AppModule {}
