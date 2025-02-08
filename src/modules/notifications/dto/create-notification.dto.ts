import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CATEGORY_NOTIFICATION } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: 'The recipient ID of the notification' })
  recipentId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The content of the notification' })
  content: string;

  @IsEnum(CATEGORY_NOTIFICATION)
  @IsNotEmpty()
  @ApiProperty({ description: 'The category of the notification', enum: ['SOCIAL', 'WORK'] })
  category: CATEGORY_NOTIFICATION;

  @IsOptional()
  @ApiProperty({ description: 'Timestamp when the notification was read', required: false })
  readAt?: Date | null;

  @IsOptional()
  @ApiProperty({ description: 'Timestamp when the notification was created' })
  createdAt?: Date;
}
