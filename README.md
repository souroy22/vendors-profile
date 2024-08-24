# Vendor Management System

A comprehensive Vendor Management System built with **Express.js** and **TypeScript** that enables users to manage vendor profiles, track purchase orders, and evaluate vendor performance.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- **Vendor Profile Management**: Create, read, update, and delete vendor profiles.
- **Purchase Order Tracking**: Track purchase orders linked to vendors with details such as order date, delivery date, and status.
- **Vendor Performance Evaluation**: Evaluate vendor performance based on metrics like on-time delivery rate, quality rating average, response time, and fulfillment rate.

## Technologies Used

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **MongoDB**: NoSQL database for storing vendor and purchase order data.

## Installation

````
1. **Clone the repository**

```bash
git clone https://github.com/yourusername/vendor-management-system.git
cd vendor-management-system
````

2. **Install dependencies**

   ```bash
   npm install
   ```

````

3. **Set up the environment variables**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb://localhost:27017/vendor-management
   ```

4. **Run the application**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

## Usage

To use the Vendor Management System, you can interact with the RESTful API endpoints using tools like **Postman** or **curl**. The application allows you to manage vendors, purchase orders, and evaluate vendor performance.

### API Endpoints

#### Vendor Endpoints

- **Create a Vendor**

  ```http
  POST /api/vendors
  ```

  - **Request Body**:

    ```json
    {
      "name": "Vendor Name",
      "contactDetails": "Vendor Contact Details",
      "address": "Vendor Address",
      "vendorCode": "VENDOR123"
    }
    ```

- **Get All Vendors**

  ```http
  GET /api/vendors
  ```

- **Get a Vendor by ID**

  ```http
  GET /api/vendors/:vendorId
  ```

- **Update a Vendor**

  ```http
  PUT /api/vendors/:vendorId
  ```

- **Delete a Vendor**

  ```http
  DELETE /api/vendors/:vendorId
  ```

- **Get Vendor Performance**

  ```http
  GET /api/vendors/:vendorId/performance
  ```

#### Purchase Order Endpoints

- **Create a Purchase Order**

  ```http
  POST /api/purchase-orders
  ```

  - **Request Body**:

    ```json
    {
      "poNumber": "PO12345",
      "vendor": "VendorID",
      "orderDate": "2024-08-24",
      "deliveryDate": "2024-09-10",
      "items": { "item1": "Details" },
      "quantity": 100,
      "status": "pending",
      "issueDate": "2024-08-20"
    }
    ```

- **Get All Purchase Orders**

  ```http
  GET /api/purchase-orders
  ```

- **Get a Purchase Order by ID**

  ```http
  GET /api/purchase-orders/:poId
  ```

- **Update a Purchase Order**

  ```http
  PUT /api/purchase-orders/:poId
  ```

- **Delete a Purchase Order**

  ```http
  DELETE /api/purchase-orders/:poId
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

```

### Explanation

- The **`README.md`** provides a clear and concise overview of the project.
- **Features** section highlights the main functionalities of the system.
- **Technologies Used** lists the primary technologies leveraged in the project.
- **Installation** instructions guide users on how to set up and run the project locally.
- **Usage** section explains how to interact with the system using API endpoints.
- **API Endpoints** provides detailed information on each endpoint, including HTTP methods, example requests, and expected responses.
```
````
