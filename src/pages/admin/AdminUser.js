import { Button, Popconfirm } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { Divider, Radio, Table, Switch } from 'antd';


import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser, Changestatus, Deleteuser } from "../../redux/slices/userSlice";




const AdminUser = (props) => {

    const dispatch = useDispatch()
    const listuser = useSelector((state) => state.user.listUser);
    const isLoading = useSelector((state) => state.user.isLoading);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };
    const columns = [
        {
            title: 'STT ',
            dataIndex: 'username',
            render: (text, record, index) => <a>{index + 1 + (currentPage - 1) * pageSize}</a>,
        },
        {
            title: 'Tên',
            dataIndex: 'username',
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            align: 'center',
        },
        {
            title: 'Số điện thoại ',
            dataIndex: 'phone',
            align: 'center'
        },
        {
            title: 'Ngày tạo ',
            dataIndex: 'createdAt',
            align: 'center',
            render: (createdAt) => {
                const date = new Date(createdAt);
                return date.toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            },
        },
        {
            title: 'Active',
            dataIndex: 'status',
            render: (text, record) => (
                <div>
                    <Switch
                        checked={record.status === 'active'}
                        onChange={(checked) => handleChangeActive(checked, record.id)}
                    />
                </div>
            ),
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',

            render: (text, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Popconfirm

                        title="Xóa người dùng"
                        description="Bạn có muốn xóa người dùng này "
                        okText="Yes"
                        onConfirm={() => handledeleteUser(record.id)}
                    >
                        <Button type="danger" size="small" style={{ border: 'solid 1px red', color: 'red' }}><i class="bi bi-x-circle-fill"></i></Button>
                    </Popconfirm>

                </div>
            ),
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',

            name: record.name,
        }),
    };


    useEffect(() => {

        dispatch(fetchAllUser())
    }, [])


    const handleChangeActive = (checked, iduser) => {

        const newStatus = checked ? 'active' : 'inactive';


        dispatch(Changestatus({ iduser, newStatus }))
    };
    const handledeleteUser = async (userid) => {

        try {
            await dispatch(Deleteuser({ userid })).unwrap();


        } catch (error) {

        }


        dispatch(fetchAllUser())


    }


    const dataSource = useMemo(() => listuser, [listuser]);
    return (
        <>



            <div>


                <Divider />

                <Table

                    columns={columns}
                    dataSource={dataSource}
                    loading={isLoading}
                    pagination={{ current: currentPage, pageSize: pageSize }}
                    onChange={handleTableChange}
                />
            </div>

        </>
    );


}

export default AdminUser;