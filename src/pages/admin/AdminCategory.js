import React, { useEffect } from "react";
import { Button, message, Modal } from 'antd';
import { Divider, Radio, Table, Popconfirm } from 'antd';
import { useState } from "react";
import MdAddcategory from "../../Modals/MdAddcategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllcategory, createnewCategory, delcategory, updatecategory } from "../../redux/slices/categorySlice";
import MdEditcategory from "../../Modals/MdEditCategory";
const AdminCategory = (props) => {
    const [modal2Open, setModal2Open] = useState(false);
    const [modaledit, setModaledit] = useState(false);
    const dispatch = useDispatch();
    const listCategory = useSelector((state) => state.category.listCategory);
    const isLoading = useSelector((state) => state.category.isLoading);
    const [categoryName, setcategoryName] = useState('');
    const [editcategory, setEditcategory] = useState('')
    const [newCategoryName, setNewCategoryName] = useState('');
    const [datacategory, setDataCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleCreateCategory = () => {

        if (!categoryName.trim()) {
            message.error("Chưa điền tên danh mục cần thêm");
            return;
        }
        dispatch(createnewCategory({ categoryName }))
            .unwrap()
            .then(() => {
                setcategoryName('');
                message.success("Tạo danh mục thành công");
                setModal2Open(false);
                dispatch(fetchAllcategory());
            })
            .catch((error) => {
                message.error(error || 'tạo thất bại!');
            });


    }

    const handleEditModalCategory = (data) => {
        setEditcategory(data.categoryName);
        setNewCategoryName(data.categoryName);
        setDataCategory(data.id);
        setModaledit(true);
    }
    const handleSubmitEditcategory = async () => {


        if (editcategory.trim() === newCategoryName.trim()) {
            message.error("Nếu bạn muốn thay đổi, vui lòng nhập tên danh mục khác.");
            return;
        }



        try {
            await dispatch(updatecategory({ datacategory, editcategory })).unwrap();
            setModaledit(false);
            message.success("Sửa thành công");
            dispatch(fetchAllcategory());
        } catch (error) {
            message.error(error || 'Cập nhật thất bại!');
        }
    }

    const handleDelete = async (category) => {

        try {
            await dispatch(delcategory({ category })).unwrap();
            message.success("Xóa thành công");

        } catch (error) {
            message.error("Xóa thất bại: " + error);
        }

        dispatch(fetchAllcategory());
    }
    useEffect(
        () => {
            dispatch(fetchAllcategory())
        }
        , [])
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => <a>{index + 1 + (currentPage - 1) * pageSize}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'categoryName',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>

                    <Popconfirm

                        title="Sửa danh mục"
                        description="Bạn có muốn sửa danh mục này ?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleEditModalCategory(record)}
                    >
                        <Button
                            type="primary"
                            size="small"
                            icon={<i className="bi bi-pen"></i>}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 10px',
                            }}

                        />
                    </Popconfirm>
                    <Popconfirm

                        title="Xóa danh mục"
                        description="Bạn có muốn xóa danh mục này ?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button
                            type="danger"
                            size="small"
                            icon={<i className="bi bi-x-circle-fill"></i>}
                            style={{
                                border: 'solid 1px red',
                                color: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 10px',
                            }}
                        />
                    </Popconfirm>
                </div>
            ),
            align: 'center',

        },
    ];


    return (
        <>
            <div className="container" >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button type="primary" onClick={() => setModal2Open(true)}><i class="bi bi-bookmark-plus"></i>Thêm danh mục</Button>
                    <Modal
                        centered
                        open={modal2Open}
                        onOk={() => setModal2Open(false)}
                        onCancel={() => setModal2Open(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setModal2Open(false)}>
                                Hủy
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => handleCreateCategory()}>
                                Thêm danh mục
                            </Button>,
                        ]}
                    >
                        <MdAddcategory
                            categoryname={categoryName}
                            setcategoryname={setcategoryName} />
                    </Modal>




                </div>

                <Modal

                    centered
                    open={modaledit}
                    onOk={() => setModaledit(false)}
                    onCancel={() => setModaledit(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setModaledit(false)}>
                            Hủy
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => handleSubmitEditcategory()} disabled={editcategory === newCategoryName}>
                            Sửa danh mục
                        </Button>,
                    ]}
                >
                    <MdEditcategory
                        editcategory={editcategory}
                        seteditcategoryname={setEditcategory} />

                </Modal>

            </div>
            <div>


                <Divider />

                <Table

                    columns={columns}
                    dataSource={isLoading ? [] : listCategory}
                    loading={isLoading}
                    pagination={{ current: currentPage, pageSize: pageSize }}
                    onChange={handleTableChange}
                />
            </div>
        </>
    );
}


export default AdminCategory;