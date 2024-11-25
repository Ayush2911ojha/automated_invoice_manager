import React from "react";

const Customers = () => {
  const sampleCustomers = [
    {
      name: "John Doe",
      phoneNumber: "+1 123 456 7890",
      totalPurchase: 1050,
    },
    {
      name: "Jane Smith",
      phoneNumber: "+1 987 654 3210",
      totalPurchase: 750,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Customers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="py-3 px-6">Customer Name</th>
              <th className="py-3 px-6">Phone Number</th>
              <th className="py-3 px-6">Total Purchase Amount</th>
            </tr>
          </thead>
          <tbody>
            {sampleCustomers.map((customer, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-6">{customer.name}</td>
                <td className="py-3 px-6">{customer.phoneNumber}</td>
                <td className="py-3 px-6">${customer.totalPurchase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
