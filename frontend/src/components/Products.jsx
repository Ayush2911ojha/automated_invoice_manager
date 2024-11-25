import React from "react";

const Products = () => {
  const sampleProducts = [
    {
      name: "Laptop",
      quantity: 10,
      unitPrice: 500,
      tax: 50,
      priceWithTax: 550,
      discount: "10%",
    },
    {
      name: "Headphones",
      quantity: 20,
      unitPrice: 30,
      tax: 3,
      priceWithTax: 33,
      discount: "5%",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b border-gray-300">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Unit Price</th>
              <th className="py-3 px-6">Tax</th>
              <th className="py-3 px-6">Price with Tax</th>
              <th className="py-3 px-6">Discount</th>
            </tr>
          </thead>
          <tbody>
            {sampleProducts.map((product, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">{product.quantity}</td>
                <td className="py-3 px-6">${product.unitPrice}</td>
                <td className="py-3 px-6">${product.tax}</td>
                <td className="py-3 px-6">${product.priceWithTax}</td>
                <td className="py-3 px-6">{product.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
