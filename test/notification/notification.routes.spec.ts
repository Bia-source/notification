import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'; 

describe('NotificationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notifications (POST) should create a new notification', async () => {
    const createNotificationDto = {
      recipentId: '1',
      content: 'Test notification',
      category: 'WORK',
      readAt: new Date().toISOString(),
    };

    const response = await request(app.getHttpServer())
      .post('/notifications')
      .send(createNotificationDto)
      .expect(201);  

    expect(response.body).toHaveProperty('id');  
    expect(response.body.recipentId).toBe(createNotificationDto.recipentId);  
    expect(response.body.content).toBe(createNotificationDto.content);  
  });

  it('/notifications (GET) should return all notifications', async () => {
    const response = await request(app.getHttpServer())
      .get('/notifications')
      .expect(200); 

    expect(Array.isArray(response.body)).toBe(true);  
  });

  it('/notifications/:id (GET) should return a notification by id', async () => {
    const createNotificationDto = {
      recipentId: '1',
      content: 'Test notification',
      category: 'WORK',
      readAt: new Date().toISOString(),
    };

    const createdResponse = await request(app.getHttpServer())
      .post('/notifications')
      .send(createNotificationDto)
      .expect(201);

    const notificationId = createdResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/notifications/${notificationId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', notificationId); 
  });

  it('/notifications/:id (PUT) should update a notification', async () => {
    const createNotificationDto = {
      recipentId: '1',
      content: 'Test notification',
      category: 'WORK',
      readAt: new Date().toISOString(),
    };

    const createdResponse = await request(app.getHttpServer())
      .post('/notifications')
      .send(createNotificationDto)
      .expect(201);

    const notificationId = createdResponse.body.id;

    const updateNotificationDto = {
      recipentId: '1',
      content: 'Updated content',
      category: 'WORK',
      readAt: new Date().toISOString(),
    };

    const response = await request(app.getHttpServer())
      .put(`/notifications/${notificationId}`)
      .send(updateNotificationDto)
      .expect(200);

    expect(response.body).toHaveProperty('id', notificationId); 
    expect(response.body.content).toBe(updateNotificationDto.content); 
  });

  it('/notifications/:id (DELETE) should remove a notification', async () => {
    const createNotificationDto = {
      recipentId: '1',
      content: 'Test notification',
      category: 'WORK',
      readAt: new Date().toISOString(),
    };

    const createdResponse = await request(app.getHttpServer())
      .post('/notifications')
      .send(createNotificationDto)
      .expect(201);

    const notificationId = createdResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/notifications/${notificationId}`)
      .expect(200);  

    await request(app.getHttpServer())
      .get(`/notifications/${notificationId}`)
      .expect(404);  
  });

  afterAll(async () => {
    await app.close();
  });
});
