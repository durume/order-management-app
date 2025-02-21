# Copilot Studio Custom Connector 를 활용한 주문 정보 관리 챗봇 개발 가이드 (초보자용)
1. 개발 환경 준비
1.1. 필수 프로그램 설치
Visual Studio Code (VS Code): 코드 편집기 (https://code.visualstudio.com/)
VS Code 웹사이트에서 운영체제에 맞는 설치 파일을 다운로드하여 설치합니다.
Node.js: JavaScript 런타임 환경 (https://nodejs.org/)
Node.js 웹사이트에서 LTS (Long Term Support) 버전을 다운로드하여 설치합니다. npm (Node Package Manager) 도 함께 설치됩니다.
1.2. 프로젝트 폴더 생성
VS Code 를 실행합니다.
파일 > 폴더 열기 를 클릭하고, 적절한 위치에 order-management-app 폴더를 생성하고 엽니다.
1.3. VS Code 확장 설치 (선택 사항)
VS Code 좌측 메뉴에서 확장 아이콘을 클릭합니다.
다음 확장들을 검색하여 설치하면 코드 편집에 도움이 됩니다. (선택 사항)
Korean Language Pack for Visual Studio Code: VS Code 인터페이스를 한국어로 표시
ESLint: JavaScript 문법 검사 및 오류 자동 수정
Prettier - Code formatter: 코드 자동 포맷팅
2. Node.js 웹 애플리케이션 개발 (REST API)
2.1. package.json 파일 생성
VS Code 터미널을 열고 (터미널 > 새 터미널), 프로젝트 폴더 (order-management-app) 에서 다음 명령어를 실행하여 package.json 파일을 생성합니다.

```Bash
npm init -y
```
package.json 파일은 Node.js 프로젝트의 설정 파일이며, 프로젝트 정보, 의존성 모듈 정보 등을 관리합니다.
2.2. Express 모듈 설치
VS Code 터미널에서 다음 명령어를 실행하여 웹 서버 구축에 필요한 express 모듈을 설치합니다.

```Bash
npm install express
```
express 모듈은 Node.js 환경에서 웹 서버 및 REST API 를 쉽게 구축할 수 있도록 도와주는 프레임워크입니다.
node_modules 폴더가 생성되고, package.json 파일의 dependencies 항목에 express 모듈 정보가 추가됩니다.
2.3. app.js 파일 생성 및 코드 작성 (API 서버)
VS Code 탐색기에서 order-management-app 폴더에 app.js 파일을 생성하고, 다음 코드를 복사하여 붙여넣습니다.

```JavaScript
// app.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./demo-db'); // demo-db.js 파일 import

app.get('/api/orders', (req, res) => {
  res.json(db.orders);
});

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
```
코드 설명:
const express = require('express');: express 모듈을 import 합니다.
const app = express();: express 애플리케이션 객체를 생성합니다.
const port = 3000;: 웹 서버 포트 번호를 3000번으로 설정합니다.
const db = require('./demo-db');: demo-db.js 파일에서 데이터베이스 (JSON 데이터) 를 import 합니다.
app.get('/api/orders', ...): GET /api/orders 엔드포인트로 요청이 들어오면, db.orders (모든 주문 정보) 를 JSON 형태로 응답합니다. (모든 주문 정보 조회 API)
app.get('/api/orders/:orderId', ...): GET /api/orders/{orderId} 엔드포인트로 요청이 들어오면, req.params.orderId 로부터 주문 ID 를 추출하고, db.orders 에서 해당 주문 ID 에 해당하는 주문 정보를 찾아 JSON 형태로 응답합니다. 주문 ID 에 해당하는 주문 정보가 없으면 404 오류 응답을 반환합니다. (특정 주문 ID로 주문 정보 조회 API)
app.listen(port, ...): 웹 서버를 port (3000번) 포트에서 실행하고, 서버 실행 완료 메시지를 콘솔에 출력합니다.
2.4. demo-db.js 파일 생성 및 코드 작성 (데이터베이스)
VS Code 탐색기에서 order-management-app 폴더에 demo-db.js 파일을 생성하고, 다음 코드를 복사하여 붙여넣습니다.

```JavaScript

// demo-db.js
const orders = [
  {
    orderId: 'ORDER-001',
    customerName: '김철수',
    orderDate: '2025-02-21',
    orderStatus: 'Pending',
    items: [
      { productName: '아메리카노', quantity: 2 },
      { productName: '카페라떼', quantity: 1 },
    ],
  },
  {
    orderId: 'ORDER-002',
    customerName: '박영희',
    orderDate: '2025-02-20',
    orderStatus: 'Shipped',
    items: [
      { productName: '녹차 라떼', quantity: 1 },
      { productName: '카푸치노', quantity: 1 },
    ],
  },
  {
    orderId: 'ORDER-003',
    customerName: '이민준',
    orderDate: '2025-02-19',
    orderStatus: 'Delivered',
    items: [
      { productName: '콜드 브루', quantity: 2 },
    ],
  },
];

module.exports = { orders };
```
코드 설명:
const orders = [...]: 3개의 주문 정보를 담고 있는 JSON 배열 orders 를 정의합니다. 각 주문 정보는 주문 ID, 고객 이름, 주문 날짜, 주문 상태, 주문 상품 목록 (items 배열) 을 포함합니다.
module.exports = { orders };: orders 배열을 외부 모듈에서 사용할 수 있도록 export 합니다. (app.js 에서 require('./demo-db') 로 import 하여 사용)
2.5. index.html 파일 생성 및 코드 작성 (OpenAPI 테스트 페이지)
VS Code 탐색기에서 order-management-app 폴더에 index.html 파일을 생성하고, 다음 코드를 복사하여 붙여넣습니다.

```HTML

<!DOCTYPE html>
<html>
<head>
    <title>주문 정보 API 테스트 페이지</title>
</head>
<body>
    <h1>주문 정보 API 테스트</h1>

    <h2>모든 주문 정보 조회</h2>
    <button onclick="fetchAllOrders()">모든 주문 정보 가져오기</button>
    <div id="all-orders-display"></div>

    <h2>특정 주문 ID로 주문 정보 조회</h2>
    <label for="orderIdInput">주문 ID:</label>
    <input type="text" id="orderIdInput" value="ORDER-001">
    <button onclick="fetchOrderById()">주문 정보 가져오기</button>
    <div id="order-by-id-display"></div>

    <script>
        const apiEndpoint = '/api/orders'; // API 엔드포인트 주소 (app.js와 동일)

        async function fetchAllOrders() {
            const response = await fetch(apiEndpoint);
            const orders = await response.json();

            let ordersHTML = '<h3>모든 주문 목록</h3><ul>';
            orders.forEach(order => {
                ordersHTML += `<li>주문 ID: ${order.orderId}, 고객 이름: ${order.customerName}, 주문 상태: ${order.orderStatus}</li>`;
            });
            ordersHTML += '</ul>';
            document.getElementById('all-orders-display').innerHTML = ordersHTML;
        }

        async function fetchOrderById() {
            const orderId = document.getElementById('orderIdInput').value;
            const response = await fetch(`${apiEndpoint}/${orderId}`);
            if (response.status === 200) {
                const order = await response.json();
                let orderHTML = '<h3>주문 상세 정보</h3><ul>';
                orderHTML += `<li>주문 ID: ${order.orderId}</li>`;
                orderHTML += `<li>고객 이름: ${order.customerName}</li>`;
                orderHTML += `<li>주문 날짜: ${order.orderDate}</li>`;
                orderHTML += `<li>주문 상태: ${order.orderStatus}</li>`;
                orderHTML += '<li>주문 상품:<ul>';
                order.items.forEach(item => {
                    orderHTML += `<li>${item.productName} (${item.quantity}개)</li>`;
                });
                orderHTML += '</ul></li></ul>';
                document.getElementById('order-by-id-display').innerHTML = orderHTML;

            } else {
                const error = await response.json();
                document.getElementById('order-by-id-display').innerHTML = `<p style="color: red;">에러: ${error.message}</p>`;
            }
        }
    </script>
</body>
</html>
```
코드 설명:
HTML: 간단한 HTML 폼을 구성하여, "모든 주문 정보 조회" 및 "특정 주문 ID로 주문 정보 조회" 기능을 테스트할 수 있는 버튼과 결과를 표시할 영역 (div) 을 제공합니다.
JavaScript:
apiEndpoint: API 엔드포인트 기본 주소를 /api/orders 로 설정합니다.
fetchAllOrders() 함수: /api/orders API 를 호출하여 모든 주문 정보를 가져와 HTML 목록 형태로 표시합니다.
fetchOrderById() 함수: /api/orders/{orderId} API 를 호출하여 특정 주문 ID 에 대한 주문 정보를 가져와 상세 정보 또는 에러 메시지를 HTML 형태로 표시합니다.
2.6. 웹 애플리케이션 실행 및 API 테스트
VS Code 터미널에서 node app.js 명령어를 실행합니다.
"Node.js 웹 애플리케이션이 http://localhost:3000 에서 실행 중입니다." 메시지가 콘솔에 출력되면, 웹 서버가 정상적으로 실행된 것입니다.
웹 브라우저를 열고 다음 주소로 접속하여 API 를 테스트합니다.
OpenAPI 테스트 페이지: http://localhost:3000/index.html
"모든 주문 정보 가져오기" 및 "주문 정보 가져오기" 버튼을 클릭하여 API 동작을 확인합니다.
API 엔드포인트 직접 호출:
모든 주문 정보 조회: http://localhost:3000/api/orders
특정 주문 ID로 주문 정보 조회: http://localhost:3000/api/orders/ORDER-001
웹 브라우저 화면에 JSON 형식으로 API 응답 결과가 표시되는지 확인합니다.
3. Swagger UI 연동 (API 문서 자동 생성 및 확인)
3.1. Swagger UI Express 및 swagger-jsdoc 모듈 설치
VS Code 터미널에서 프로젝트 디렉토리 (order-management-app) 로 이동한 후, 다음 명령어를 실행하여 swagger-ui-express 및 swagger-jsdoc 모듈을 설치합니다.

```Bash

npm install swagger-ui-express swagger-jsdoc
```
3.2. app.js 파일 수정 - Swagger UI 설정 및 API 문서 주석 추가
app.js 파일을 열고, 다음과 같이 코드를 수정합니다.

```JavaScript

// app.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./demo-db'); // demo-db.js 파일 import

// Swagger UI 설정
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    swagger: '2.0', // OpenAPI 버전 2.0 명시
    info: {
      title: '주문 정보 관리 API',
      version: '1.0.0',
      description: 'Copilot Studio Custom Connector 연동 데모를 위한 주문 정보 관리 REST API',
    },
    basePath: '/api', // API 기본 경로 (/api 로 설정)
  },
  apis: ['./app.js'], // API 문서 주석을 작성할 파일 경로 (현재 파일: app.js)
};

const specs = swaggerJsdoc(options);

// Swagger UI 엔드포인트: /api-docs 경로로 접속하면 Swagger UI 페이지가 표시됨
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
```
코드 설명:
swagger-ui-express, swagger-jsdoc 모듈 import 및 설정 코드 추가
options 객체 설정을 통해 OpenAPI 버전, API 정보, 기본 경로, API 문서 주석 파일 경로 등을 정의합니다.
app.use('/api-docs', ...) 를 통해 /api-docs 경로로 Swagger UI 페이지를 제공하도록 설정합니다.
/** ... */ 형태의 JSDoc 스타일 주석을 사용하여 각 API 엔드포인트 및 데이터 모델에 대한 설명을 추가합니다. @swagger 태그를 사용하여 OpenAPI 스펙에 맞는 정보를 작성합니다.
3.3. 웹 애플리케이션 재실행 및 Swagger UI 페이지 확인
VS Code 터미널에서 Ctrl + C 를 눌러 웹 애플리케이션을 종료하고, 다시 node app.js 명령어를 실행하여 웹 애플리케이션을 재실행합니다.
웹 브라우저 주소창에 http://localhost:3000/api-docs 를 입력하고 접속합니다.
Swagger UI 페이지가 표시되는지 확인합니다. API 정보, 엔드포인트 목록, 데이터 모델 등이 시각적으로 잘 표현되는지 확인합니다.
3.4. swagger.json 파일 다운로드
Swagger UI 페이지 오른쪽 상단 또는 페이지 상단을 살펴보면 "Download", "Download OpenAPI definition", "Export", 또는 "Swagger JSON" 과 유사한 이름의 버튼이나 링크가 있습니다.

해당 버튼 또는 링크를 클릭합니다.

웹 브라우저가 swagger.json 또는 openapi.json 과 유사한 이름의 JSON 형식 파일을 다운로드합니다. 다운로드 위치를 확인하고 파일을 저장합니다.

만약 다운로드 버튼이 없는 경우: 웹 브라우저 주소창에 http://localhost:3000/api-docs/swagger.json 을 입력하여 접속합니다. 웹 브라우저에 JSON 텍스트 내용이 표시되면, 해당 내용을 복사하여 텍스트 편집기에 붙여넣고 swagger.json 이라는 이름으로 저장합니다.
4. Copilot Studio Custom Connector 생성 (빈 캔버스에서 생성)
4.1. Custom Connector 생성 시작
Copilot Studio 포털 (https://copilotstudio.microsoft.com/) 에 접속하여 에이전트를 선택합니다.
좌측 메뉴에서 "Custom" 을 클릭하고, "+ Custom Connector" 또는 "Create custom connector" 버튼을 클릭합니다.
"Create from blank" 옵션을 선택합니다.
4.2. 기본 정보 입력
Connector name: OrderManagementConnector 를 입력합니다.
Data loss prevention: 기본 설정 유지
Description: (선택 사항) "주문 정보 관리 API 데모 커넥터" 와 같이 설명을 입력합니다.
Icon: (선택 사항) 아이콘을 선택하거나 업로드합니다.
"Continue" 또는 "Create" 버튼을 클릭합니다.
4.3. 인증 (Authentication) 설정
"Authentication" 탭으로 이동합니다.
"No authentication" 을 선택합니다. (데모 API 는 인증 불필요)
4.4. Definition (액션) 정의 - GetOrderList (모든 주문 정보 조회)
"Definition" 탭으로 이동합니다.
"New action" 을 클릭합니다.
General:
Summary: Get Order List 를 입력합니다.
Description: 모든 주문 목록을 조회합니다. 와 같이 설명을 입력합니다.
Operation ID: GetOrderList 를 입력합니다.
Request:
HTTP Method: GET 을 선택합니다.
Request URL: /api/orders 를 입력합니다.
Response:
"Add default response" 를 클릭합니다.

"Body" 섹션에서 "Definition" 을 클릭합니다.

"Definition" 패널에 다음 JSON 스키마를 복사하여 붙여넣습니다.

```JSON

{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "orderId": { "type": "string" },
      "customerName": { "type": "string" },
      "orderDate": { "type": "string" },
      "orderStatus": { "type": "string" },
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "productName": { "type": "string" },
            "quantity": { "type": "number" }
          },
          "required": [
            "productName",
            "quantity"
          ]
        }
      }
    },
    "required": [
      "orderId",
      "customerName",
      "orderDate",
      "orderStatus",
      "items"
    ]
  }
}
```
4.5. Definition (액션) 정의 - GetOrder (특정 주문 ID로 주문 정보 조회)
"New action" 을 다시 클릭합니다.
General:
Summary: Get Order by ID 를 입력합니다.
Description: 특정 주문 ID로 주문 정보를 조회합니다. 와 같이 설명을 입력합니다.
Operation ID: GetOrder 를 입력합니다.
Request:
HTTP Method: GET 을 선택합니다.
Request URL: /api/orders/{orderId} 를 입력합니다.
Parameters: "Add parameter" 를 클릭합니다.
Name: orderId 를 입력합니다.
Required: "Yes" 를 체크합니다.
Parameter type: Path 를 선택합니다.
Schema: string 을 선택합니다.
Response:
"Add default response" 를 클릭합니다.

"Body" 섹션에서 "Definition" 을 클릭합니다.

"Definition" 패널에 다음 JSON 스키마를 복사하여 붙여넣습니다.

```JSON

{
  "type": "object",
  "properties": {
    "orderId": { "type": "string" },
    "customerName": { "type": "string" },
    "orderDate": { "type": "string" },
    "orderStatus": { "type": "string" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "productName": { "type": "string" },
          "quantity": { "type": "number" }
        },
        "required": [
          "productName",
          "quantity"
        ]
      }
    }
  },
  "required": [
    "orderId",
    "customerName",
    "orderDate",
    "orderStatus",
    "items"
  ]
}
```
4.6. Definition (액션) 정의 - GetCustomerName (주문자 이름 조회)
"New action" 을 다시 클릭합니다.
General:
Summary: Get Customer Name 를 입력합니다.
Description: 주문 ID를 이용하여 주문자 이름을 조회합니다. 와 같이 설명을 입력합니다.
Operation ID: GetCustomerName 를 입력합니다.
Request:
HTTP Method: GET 을 선택합니다.
Request URL: /api/orders/{orderId} 를 입력합니다.
Parameters: "Add parameter" 를 클릭합니다.
Name: orderId 를 입력합니다.
Required: "Yes" 를 체크합니다.
Parameter type: Path 를 선택합니다.
Schema: string 을 선택합니다.
Response:
"Add default response" 를 클릭합니다.

"Body" 섹션에서 "Definition" 을 클릭합니다.

"Definition" 패널에 다음 JSON 스키마를 복사하여 붙여넣습니다.

```JSON

{
  "type": "object",
  "properties": {
    "customerName": {
      "type": "string",
      "description": "주문자 이름",
      "example": "김철수"
    }
  },
  "required": [
    "customerName"
  ]
}
```
4.7. Test (Custom Connector 테스트)
"Test" 탭으로 이동합니다.
GetOrderList Action 테스트: "GetOrderList" Action 을 선택하고 "Test operation" 을 클릭하여 주문 목록이 정상적으로 반환되는지 확인합니다.
GetOrder Action 테스트: "GetOrder" Action 을 선택하고, "orderId" 파라미터에 ORDER-001 과 같은 주문 ID를 입력한 후 "Test operation" 을 클릭하여 해당 주문 정보가 정상적으로 반환되는지 확인합니다.
GetCustomerName Action 테스트: "GetCustomerName" Action 을 선택하고, "orderId" 파라미터에 ORDER-002 와 같은 주문 ID를 입력한 후 "Test operation" 을 클릭합니다. Response Body 에서 customerName 값만 추출되어 표시되는지 확인합니다.
5. Copilot Studio 에이전트 토픽 구성
5.1. "주문 정보 조회" 토픽 수정 (특정 주문 ID 조회)
기존 "주문 정보 조회" 토픽을 선택하고 "작성 캔버스" 로 이동합니다.
트리거 문구 수정: 트리거 문구를 주문번호 {orderId} 조회 로 수정합니다.
질문 노드 삭제: "주문 ID를 입력해주세요." 질문 노드를 삭제합니다.
Action 노드 수정: "Custom Connector Action" 노드를 다음과 같이 수정합니다.
Action: GetOrder - OrderManagementConnector Action 을 선택합니다.
Input Parameters: orderId 파라미터에 topic.orderId 변수를 매핑합니다.
메시지 노드는 기존과 동일하게 유지합니다.
5.2. 새로운 토픽 생성 - "전체 주문 목록 조회"
새로운 토픽을 생성합니다. (예: "전체 주문 목록 조회")
트리거 문구 추가: 모든 주문 보여줘, 전체 주문 목록, 주문 목록 과 같은 트리거 문구를 추가합니다.
토픽 캔버스 구성:
Action 노드: "Custom Connector Action" > Connector: OrderManagementConnector > Action: GetOrderList (Input Parameters: 없음)

메시지 노드:  Action 노드 결과를 활용하여 전체 주문 목록 요약 메시지를 표시합니다.

전체 주문 목록입니다.
<#list Action.GetOrderList_1.value as order>
  - 주문 ID: ${order.orderId}, 고객 이름: ${order.customerName}, 주문 상태: ${order.orderStatus}
</#list>
5.3. 새로운 토픽 생성 - "주문자 이름 조회"
새로운 토픽을 생성합니다. (예: "주문자 이름 조회")
트리거 문구 추가: 주문 {orderId} 고객 이름, 주문번호 {orderId} 주문자, {orderId} 주문 고객 과 같은 트리거 문구를 추가합니다.
토픽 캔버스 구성:
Action 노드: "Custom Connector Action" > Connector: OrderManagementConnector > Action: GetCustomerName (Input Parameters: orderId = topic.orderId)

메시지 노드:  Action 노드 결과를 활용하여 주문자 이름 메시지를 표시합니다.

주문 ID ${topic.orderId} 의 주문 고객 이름은 ${Action.GetCustomerName_1.customerName} 입니다.
5.4. 새로운 토픽 생성 - "주문 정보 문의" (애매한 질문 처리)
새로운 토픽을 생성합니다. (예: "주문 정보 문의")
트리거 문구 추가: 주문 정보, 주문 내역, 주문, 주문 건, 주문 관련된 내용 과 같은 트리거 문구를 추가합니다.
토픽 캔버스 구성:
질문 노드: "어떤 주문 정보를 원하시나요?" (선택지: 전체 주문 정보 리스트, 특정 주문 ID로 상세 정보 조회, 변수: user_choice_order_info)
조건 분기 노드: user_choice_order_info 변수 값에 따라 분기
조건 1 (전체 주문 정보 리스트):
Action 노드: GetOrderList
메시지 노드: 전체 주문 목록 요약 메시지
조건 2 (특정 주문 ID로 상세 정보 조회):
질문 노드: "주문 ID를 입력해주세요." (변수: orderId_for_detail)
Action 노드: GetOrder (Input Parameters: orderId = topic.orderId_for_detail)
메시지 노드: 주문 상세 정보 메시지
Else (예외 처리):
메시지 노드: "죄송합니다. 선택지를 다시 한번 확인해주세요." 또는 토픽 종료
6. Copilot Studio 에이전트 테스트
Copilot Studio 에이전트 테스트 창을 열고, 각 토픽 시나리오를 테스트합니다.
"주문 정보 조회" 토픽: 주문번호 ORDER-001 조회 와 같이 입력하여 특정 주문 정보 조회 테스트
"전체 주문 목록 조회" 토픽: 모든 주문 보여줘, 주문 목록 과 같이 입력하여 전체 주문 목록 조회 테스트
"주문자 이름 조회" 토픽: 주문 ORDER-002 고객 이름, ORDER-003 주문 고객 과 같이 입력하여 주문자 이름 조회 테스트
"주문 정보 문의" 토픽: 주문 정보, 주문 내역 과 같이 입력하여 주문 정보 유형 선택 질문 후, 각 선택지에 따른 시나리오 테스트
에러 상황 테스트: 존재하지 않는 주문 ID 로 조회 시나리오 테스트 (에이전트의 에러 처리 확인)
7. Azure 웹 앱 배포 (선택 사항)
Azure 계정 및 구독 준비 후, 강의 자료의 "Azure 웹 앱으로 웹 애플리케이션 배포 방법" 섹션을 참고하여 웹 애플리케이션을 Azure Web Apps 에 배포할 수 있습니다.
Azure 배포 후에는 Custom Connector 의 기본 URL 을 Azure 웹 앱 URL 로 변경하고, Copilot Studio 에이전트 토픽을 재테스트합니다.
본 가이드라인을 따라 Copilot Studio Custom Connector 를 활용한 주문 정보 관리 챗봇을 개발하고, 다양한 시나리오를 통해 챗봇 기능을 확장해보세요. 궁금한 점이나 추가 문의 사항은 언제든지 질문해주세요.
