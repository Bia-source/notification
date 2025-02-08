import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { PrismaService } from '../../prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

const mockPrismaService = {
  notification: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('NotificationService', () => {
  let service: NotificationService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new notification', async () => {
      const createNotificationDto: CreateNotificationDto = {
        recipentId: '1',
        content: 'Notification content',
        category: 'SOCIAL',
        readAt: new Date('2025-02-08T00:00:00Z'),
      };

      mockPrismaService.notification.create.mockResolvedValue(createNotificationDto);

      const result = await service.create(createNotificationDto);

      expect(result).toEqual(createNotificationDto);
      expect(mockPrismaService.notification.create).toHaveBeenCalledWith({
        data: createNotificationDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all notifications', async () => {
      const notifications = [
        {
          recipentId: '1',
          content: 'Notification content',
          category: 'SOCIAL',
          readAt: '2025-02-08T00:00:00Z',
        },
      ];

      mockPrismaService.notification.findMany.mockResolvedValue(notifications);

      const result = await service.findAll();
      expect(result).toEqual(notifications);
    });
  });

  describe('findOne', () => {
    it('should return a notification by id', async () => {
      const notification = {
        id: '1',
        recipentId: '1',
        content: 'Notification content',
        category: 'SOCIAL',
        readAt: '2025-02-08T00:00:00Z',
      };

      mockPrismaService.notification.findUnique.mockResolvedValue(notification);

      const result = await service.findOne('1');
      expect(result).toEqual(notification);
    });
  });

  describe('update', () => {
    it('should update a notification', async () => {
      const updateNotificationDto: UpdateNotificationDto = {
        id: '1',
        recipentId: '2',
        content: 'Updated content',
        category: 'WORK',
        readAt: new Date('2025-02-08T00:00:00Z'),
      };

      mockPrismaService.notification.update.mockResolvedValue(updateNotificationDto);

      const result = await service.update('1', updateNotificationDto);
      expect(result).toEqual(updateNotificationDto);
    });
  });

  describe('remove', () => {
    it('should delete a notification', async () => {
      mockPrismaService.notification.delete.mockResolvedValue({ id: '1' });

      const result = await service.remove('1');
      expect(result).toEqual({ id: '1' });
    });
  });
});
