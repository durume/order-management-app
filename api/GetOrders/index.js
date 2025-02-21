// api/GetOrders/index.js
const db = require('../demo-db'); // Import demo-db.js from one level up

module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');

    try {
        const orders = db.orders; // Access the orders data from demo-db.js

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: orders,
            headers: {
                'Content-Type': 'application/json' // Explicitly set Content-Type
            }
        };
    } catch (error) {
        context.log.error("Error fetching orders:", error);
        context.res = {
            status: 500,
            body: { error: "Failed to fetch orders" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};