import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return await this.prisma.notification.create({
      data: {
        recipentId: createNotificationDto.recipentId, 
        content: createNotificationDto.content,
        category: createNotificationDto.category,
        readAt: createNotificationDto.readAt || null, 
      },
    });
  }

  async findAll() {
    return await this.prisma.notification.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return await this.prisma.notification.update({
      where: { id },
      data: {
        recipentId: updateNotificationDto.recipentId,  
        category: updateNotificationDto.category,
        readAt: updateNotificationDto.readAt || null,  
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.notification.delete({
      where: { id },
    });
  }
}
