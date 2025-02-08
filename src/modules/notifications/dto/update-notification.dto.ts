import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CATEGORY_NOTIFICATION } from '@prisma/client';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  id: string;
  @ApiProperty({ description: 'The recipient ID of the notification' })
  recipentId?: string;

  @ApiProperty({ description: 'The content of the notification' })
  content?: string;

  @ApiProperty({
    description: 'The category of the notification',
    enum: ['SOCIAL', 'WORK'],
  })
  category?: CATEGORY_NOTIFICATION;

  @ApiProperty({ description: 'Timestamp when the notification was read', required: false })
  readAt?: Date | null;

  @ApiProperty({ description: 'Timestamp when the notification was created' })
  createdAt?: Date;
}
