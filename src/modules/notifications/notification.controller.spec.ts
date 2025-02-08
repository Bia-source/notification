import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';


const mockNotificationService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('NotificationController', () => {
  let controller: NotificationController;
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a notification', async () => {
      const createNotificationDto: CreateNotificationDto = {
        recipentId: '1',
        content: 'New notification',
        category: 'SOCIAL',
      };

      mockNotificationService.create.mockResolvedValue(createNotificationDto);

      expect(await controller.create(createNotificationDto)).toEqual(createNotificationDto);
      expect(mockNotificationService.create).toHaveBeenCalledWith(createNotificationDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of notifications', async () => {
      const result = [{ recipentId: '1', content: 'Notification 1', category: 'SOCIAL' }];
      mockNotificationService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockNotificationService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single notification', async () => {
      const id = '1';
      const result = { recipentId: '1', content: 'Notification 1', category: 'SOCIAL' };
      mockNotificationService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(mockNotificationService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a notification', async () => {
      const id = '1';
      const updateNotificationDto: UpdateNotificationDto = {
        id: '1', 
        recipentId: '1',
        content: 'Updated content',
        category: 'WORK',
        readAt: new Date('2025-02-08T00:00:00Z'),
      };
  
      const updatedNotification = {...updateNotificationDto };
  
      mockNotificationService.update.mockResolvedValue(updatedNotification);
  
      const result = await controller.update(id, updateNotificationDto);
  
      expect(result).toEqual(updatedNotification);
      expect(mockNotificationService.update).toHaveBeenCalledWith(id, updateNotificationDto);
    });
  });
  

  describe('remove', () => {
    it('should remove a notification', async () => {
      const id = '1';
      const result = { recipentId: '1', content: 'Notification 1', category: 'SOCIAL' };
      mockNotificationService.remove.mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
      expect(mockNotificationService.remove).toHaveBeenCalledWith(id);
    });
  });
});
