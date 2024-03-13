import React, { useState } from 'react';

const DNSForm = () => {


    const [newRecord, setNewRecord] = useState({ domain: '', type: '', value: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
    };

    const handleAddRecord = () => {
        // Implement logic to add a new DNS record
        fetch('http://localhost:9000/addingDomain',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newRecord)
            }
        )
            .then((req) => req.json())
            .then((data) => {
                console.log(data);
               
               
            })
            .catch((error) => {
                console.error('Error adding DNS record:', error);
            });

            setNewRecord({ domain: '', type: '', value: '' });
    };








    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md" style={{ width: "100%", height: "100%" }}>
            <h2 className="text-2xl font-semibold mb-4">Add DNS Record</h2>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Domain:</label>
                    <input
                        type="text"
                        name="domain"
                        value={newRecord.domain}
                        onChange={handleInputChange}
                        className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={newRecord.type}
                        onChange={handleInputChange}
                        className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Value:</label>
                    <input
                        type="text"
                        name="value"
                        value={newRecord.value}
                        onChange={handleInputChange}
                        className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddRecord}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                    Add Record
                </button>
            </form>
        </div>

    );
};

export default DNSForm;