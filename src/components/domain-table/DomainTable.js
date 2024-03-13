import React, { useEffect, useState } from 'react';

const DomainTable = () => {
    const [domainsRecord, setDomainsRecord] = useState([])
    const [data, setData] = useState()
    const [editRecord, setEditRecord] = useState({ domain: '', type: '', value: '' });
    const [domain, setDomain] = useState()
    const [edit, setEdit] = useState()
    const [filters, setFilters] = useState({ type: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
    };

    const smart = data || edit
    useEffect(() => {

        fetch('http://localhost:9000/domains')
            .then(res => res.json())
            .then(data => {
                setDomainsRecord(data)
                if (!data) {
                    return (<div>
                        Loading
                    </div>)
                }
            })
    }, [smart])

    const deleteItem = (id) => {
        fetch(`http://localhost:9000/deletingDomain/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },

            }
        )
            .then((req) => req.json())
            .then((data) => {

                setData(data)
            })
            .catch((error) => {
                console.error('Error adding DNS record:', error);
            });
    }




    const handleEditing = () => {
        // Implement logic to add a new DNS record
        fetch(`http://localhost:9000/editDomain/${domain?._id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(editRecord)
            }
        )
            .then((req) => req.json())
            .then((data) => {
                setEdit(data)


            })
            .catch((error) => {
                console.error('Error adding DNS record:', error);
            });

        // setEditRecord({ domain: '', type: '', value: '' });
    };

    const filteredData = domainsRecord.filter(record => (
        (filters.type === '' || record.type === filters.type) &&
        (record.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.value.toLowerCase().includes(searchTerm.toLowerCase()))
    ));




    if (!domainsRecord) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className="overflow-x-auto" style={{ width: "100%", height: "100%" }}>

            <div className='flex '>
                
                {/* Search Input */}
                <div class="mb-4 mr-4" style={{ width: "80%" }}>
                   
                    <input
                        type="text"
                        placeholder="Search..."
                        class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>


                <div class="mb-4" style={{ width: "20%" }}>
                  
                    <select
                        class="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    >
                        <option value="">All Types</option>
                        <option value="A">Type A</option>
                        {/* Add more options based on your data */}
                    </select>
                </div>




            </div>





            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Domain</th>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        filteredData?.map((record, index) =>
                            <tr className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{record.domain}</td>
                                <td>{record.type}</td>
                                <td>{record.value}</td>
                                <td>
                                    <label className='btn' onClick={() => deleteItem(record._id)}>Delete</label>
                                    
                                    </td>
                                <td>
                                    <label htmlFor="my_modal_7" className="btn" onClick={() => setDomain(record)} >Edit</label>
                                </td>
                            </tr>)
                    }


                </tbody>
            </table>




            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Domain:</label>
                            <input
                                type="text"
                                name="domain"
                                placeholder={domain?.domain}
                                value={editRecord?.domain}
                                onChange={handleInputChange}
                                className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Type:</label>
                            <input
                                type="text"
                                name="type"
                                value={editRecord.type}
                                placeholder={domain?.type}
                                onChange={handleInputChange}
                                className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-600">Value:</label>
                            <input

                                type="text"
                                name="value"
                                placeholder={domain?.value}
                                value={editRecord.value}
                                onChange={handleInputChange}
                                className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleEditing()}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Add Record
                        </button>
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>






        </div>
    );
};

export default DomainTable;