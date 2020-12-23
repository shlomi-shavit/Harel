import React, { useEffect, useState } from 'react';
// Component
import Table from '../table/table';
// Packages
import axios from 'axios';

const Users = () => {

    // Get Data
    const [data, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const users = await axios(
                'https://test-api-server.herokuapp.com/users',
            );
            setUsers(users.data);
        };

        fetchData();
    }, []);

    // Table Headers
    const columns = React.useMemo(
        () => ([
            {
                "Header": "ID",
                "accessor": "id"
            },
            {
                "Header": "Name",
                "accessor": "firstName"
            },
            {
                "Header": "Last Name",
                "accessor": "lastName",
            },
            {
                "Header": "Date",
                "accessor": "date",
            },
            {
                "Header": "Phone",
                "accessor": "phone",
            }
        ]),
        []
    )

    return (
        <div>
            <Table columns={columns} data={data} />
        </div>
    )
};

export default Users;
