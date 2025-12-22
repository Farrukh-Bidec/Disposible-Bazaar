import React from 'react';
import CustomSeo from '../components/CustomSeo';

function ReturnPolicy() {
    return (
        <div className="min-h-screen my-6 py-10">
            <CustomSeo id={14} />
            <div className="container mx-auto px-4 lg:px-16">

                <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Return Policy</h1>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Introduction</h2>
                        <p className="text-gray-600">
                            At Disposable Bazar, customer satisfaction is our priority. If you are not entirely satisfied with your purchase, we're here to help. Please read through our return policy to understand the conditions and procedures for returning products.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Eligibility for Returns</h2>
                        <p className="text-gray-600">
                            You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. Certain types of products are exempt from being returned, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Perishable goods (e.g., food, flowers).</li>
                            <li>Intimate or sanitary goods (e.g., disposable items).</li>
                            <li>Health and personal care items.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Return Process</h2>
                        <p className="text-gray-600">
                            To initiate a return, please contact us at info@disposablebazaar.com with your order details. We will provide instructions on how and where to send your returned item. Items sent back to us without first requesting a return will not be accepted.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Refunds</h2>
                        <p className="text-gray-600">
                            Once we receive your item, we will inspect it and notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain number of days, depending on your card issuer's policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Late or Missing Refunds</h2>
                        <p className="text-gray-600">
                            If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. If you’ve done all of this and you still have not received your refund, please contact us at info@disposablebazaar.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Shipping Costs</h2>
                        <p className="text-gray-600">
                            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Exchanges</h2>
                        <p className="text-gray-600">
                            We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at info@disposablebazaar.com, and we will guide you through the exchange process.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Non-Returnable Items</h2>
                        <p className="text-gray-600">
                            Several types of goods are exempt from being returned. These include perishable goods, custom or personalized items, digital downloads, gift cards, and health/hygiene-related products.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Us</h2>
                        <p className="text-gray-600">
                            If you have any questions about our return policy or need further assistance, please contact us at:
                        </p>
                        <p className="text-gray-600">
                            <strong>Email:</strong> info@disposablebazaar.com <br />
                            <strong>Phone:</strong> 0321-3850002
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ReturnPolicy;
