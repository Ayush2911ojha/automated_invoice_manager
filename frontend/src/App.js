import React, { useEffect, useState } from "react";
import Invoices from "./components/Invoices";
import Products from "./components/Products";
import Customers from "./components/Customers";
import FileUpload from "./components/FileUpload";

import { useDispatch } from "react-redux";
import { addInvoice } from "./slices/invoicesSlice";
import { addProduct } from "./slices/productsSlice";
import { addCustomer } from "./slices/customersSlice";

const App = () => {
  const [activeTab, setActiveTab] = useState("Upload");
  
  const dispatch = useDispatch();

  useEffect(() => {
    // Mock Data
    const mockInvoices = [
      { id: 1, serial: "INV001", customer: "John Doe", product: "Laptop", qty: 1, tax: 10, total: 1100, date: "2024-11-20" },
    ];
    const mockProducts = [
      { id: 1, name: "Laptop", qty: 50, unitPrice: 1000, tax: 10, priceWithTax: 1100 },
    ];
    const mockCustomers = [
      { id: 1, name: "John Doe", phone: "1234567890", totalPurchase: 1100 },
    ];

    // Dispatch to Redux Store
    mockInvoices.forEach(invoice => dispatch(addInvoice(invoice)));
    mockProducts.forEach(product => dispatch(addProduct(product)));
    mockCustomers.forEach(customer => dispatch(addCustomer(customer)));
  }, [dispatch]);
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Automated Invoice Manager
      </h1>

      {/* Tabs Navigation */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            activeTab === "Upload"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("Upload")}
        >
          Upload
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            activeTab === "Invoices"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("Invoices")}
        >
          Invoices
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            activeTab === "Products"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("Products")}
        >
          Products
        </button>
        <button
          className={`px-6 py-2 rounded-lg text-sm font-medium ${
            activeTab === "Customers"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("Customers")}
        >
          Customers
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activeTab === "Upload" && <FileUpload />}
        {activeTab === "Invoices" && <Invoices />}
        {activeTab === "Products" && <Products />}
        {activeTab === "Customers" && <Customers />}
      </div>
    </div>
  );
};

export default App;
