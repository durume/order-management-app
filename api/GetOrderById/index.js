// api/GetOrderById/index.js
const db = require('../demo-db'); // Import demo-db.js from one level up

module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');

    try {
        const orderId = req.params.orderId; // Get orderId from route parameters
        const order = db.orders.find(order => order.orderId === orderId);

        if (order) {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: order,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            context.res = {
                status: 404,
                body: { message: '주문 정보를 찾을 수 없습니다.' },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
    } catch (error) {
        context.log.error("Error fetching order by ID:", error);
        context.res = {
            status: 500,
            body: { error: "Failed to fetch order" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};