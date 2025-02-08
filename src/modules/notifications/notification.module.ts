import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [NotificationController],
  providers: [PrismaService,NotificationService],
})
export class NotificationModule {}
