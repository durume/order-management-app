// app.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./demo-db'); // demo-db.js 파일 import

// Swagger UI 설정
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: { // Changed 'swaggerDefinition' to 'definition'
    swagger: '2.0', // <-- Explicitly set swagger version to 2.0
    info: {
      title: '주문 정보 관리 API',
      version: '1.0.0',
      description: 'Copilot Studio Custom Connector 연동 데모를 위한 주문 정보 관리 REST API',
    },
    basePath: '/api', // API 기본 경로 (app.js 에서 설정한 경로와 일치)
  },
  apis: ['./app.js'], // API 문서화할 파일 경로 (현재 파일: app.js)
};

const specs = swaggerJsdoc(options);

// Swagger UI 엔드포인트: /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: 모든 주문 정보 조회
 *     description: 모든 주문 정보를 JSON 형태로 반환합니다.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: 성공적으로 주문 목록을 반환했습니다.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Order'
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       orderId:
 *         type: string
 *         description: 주문 ID
 *         example: ORDER-001
 *       customerName:
 *         type: string
 *         description: 고객 이름
 *         example: 김철수
 *       orderDate:
 *         type: string
 *         format: date
 *         description: 주문 날짜 (YYYY-MM-DD)
 *         example: 2025-02-21
 *       orderStatus:
 *         type: string
 *         description: 주문 상태
 *         example: Pending
 *       items:
 *         type: array
 *         items:
 *           $ref: '#/definitions/OrderItem'
 *   OrderItem:
 *     type: object
 *     properties:
 *       productName:
 *         type: string
 *         description: 상품 이름
 *         example: 아메리카노
 *       quantity:
 *         type: number
 *         description: 수량
 *         example: 2
 */
app.get('/api/orders', (req, res) => {
  res.json(db.orders);
});

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: 특정 주문 ID로 주문 정보 조회
 *     description: 특정 주문 ID에 해당하는 주문 정보를 JSON 형태로 반환합니다.
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: 조회할 주문 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 성공적으로 주문 정보를 반환했습니다.
 *         schema:
 *           $ref: '#/definitions/Order'
 *       404:
 *         description: 주문 정보를 찾을 수 없습니다.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: 주문 정보를 찾을 수 없습니다.
 */
app.get('/api/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const order = db.orders.find(order => order.orderId === orderId);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: '주문 정보를 찾을 수 없습니다.' });
  }
});


app.listen(port, () => {
  console.log(`Node.js 웹 애플리케이션이 http://localhost:${port} 에서 실행 중입니다.`);
});