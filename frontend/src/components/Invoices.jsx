import React from "react";
import { useSelector } from "react-redux";

const Invoices = () => {
  const invoices = useSelector(state => state.invoices);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Serial</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Tax</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td className="border p-2">{invoice.serial}</td>
              <td className="border p-2">{invoice.customer}</td>
              <td className="border p-2">{invoice.product}</td>
              <td className="border p-2">{invoice.qty}</td>
              <td className="border p-2">{invoice.tax}%</td>
              <td className="border p-2">${invoice.total}</td>
              <td className="border p-2">{invoice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
