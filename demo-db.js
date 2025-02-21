// demo-db.js
const orders = [
    {
      orderId: 'ORDER-001',
      customerName: '김철수',
      orderDate: '2025-02-21',
      items: [
        { productName: '아메리카노', quantity: 2 },
        { productName: '카푸치노', quantity: 1 },
      ],
      orderStatus: 'Pending',
    },
    {
      orderId: 'ORDER-002',
      customerName: '박영희',
      orderDate: '2025-02-20',
      items: [
        { productName: '라떼', quantity: 3 },
        { productName: '케이크', quantity: 1 },
      ],
      orderStatus: 'Shipped',
    },
    {
      orderId: 'ORDER-003',
      customerName: '이민준',
      orderDate: '2025-02-19',
      items: [
        { productName: '에스프레소', quantity: 1 },
        { productName: '머핀', quantity: 2 },
      ],
      orderStatus: 'Delivered',
    },
  ];
  
  module.exports = { orders };