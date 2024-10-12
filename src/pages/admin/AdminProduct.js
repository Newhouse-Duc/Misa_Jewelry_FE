import React, { useEffect, useState } from 'react';
import { Button, Modal, message, Divider, Popconfirm, Table, Image, Space, Input, Select, Row, Col } from 'antd';
import { createProduct, getproduct, delproduct } from '../../redux/slices/productSlices';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddProduct from '../../Modals/MdAddprd';
import { fetchAllcategory } from "../../redux/slices/categorySlice";
import ModalEditProduct from '../../Modals/MdeditProduct';


const { Search } = Input;
const { Option } = Select;
const AdminProduct = () => {
    const dispatch = useDispatch();
    const [modal2Open, setModal2Open] = useState(false);
    const [modal1Open, setModal1Open] = useState(false);
    const listCategory = useSelector((state) => state.category.listCategory);
    const listproduct = useSelector((state) => state.product.listproduct);
    const isLoading = useSelector((state) => state.product.isLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dataedit, setdataedit] = useState(null);


    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handleDeleteProduct = async (product) => {
        try {
            await dispatch(delproduct({ product })).unwrap();
            message.success("Xóa thành công");
        } catch (error) {
            message.error("Xóa thất bại: " + error);
        }
        dispatch(getproduct());
    };

    useEffect(() => {
        dispatch(getproduct());
        dispatch(fetchAllcategory());
    }, [dispatch]);

    const handleEditProduct = (record) => {
        setdataedit(record);
        message.info(`Bạn đang sửa sản phẩm: ${record.productName}`);
        setModal1Open(true);
    };
    const filteredProducts = listproduct.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory ? product.categoryid === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: 50,
            render: (text, record, index) => <a>{index + 1 + (currentPage - 1) * pageSize}</a>,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            render: (text) => (
                <span>
                    {text.length > 30 ? `${text.slice(0, 30)}...` : text}
                </span>
            ),
        },
        {
            title: 'Ảnh',
            dataIndex: 'img',
            render: (img) => (
                <Image
                    width={80}
                    src={img}
                    alt="Product Image"
                    style={{ borderRadius: '8px' }}
                />
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryid',
            render: (categoryid) => {
                const categoryshow = listCategory.find(cat => cat.id === categoryid);
                return categoryshow ? categoryshow.categoryName : 'Không xác định';
            },
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            ellipsis: true,
            render: (description) => {
                const maxLength = 50;
                const limitedDescription = description.length > maxLength
                    ? `${description.substring(0, maxLength)}...`
                    : description;

                return <div dangerouslySetInnerHTML={{ __html: limitedDescription }} />;
            },

        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (text) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            fixed: 'right',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Sửa sản phẩm"
                        description="Bạn có chắc chắn muốn sửa sản phẩm này?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleEditProduct(record)}
                    >
                        <Button type="primary" size="small" icon={<i className="bi bi-pen"></i>}></Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Xóa sản phẩm"
                        description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleDeleteProduct(record)}
                    >
                        <Button danger size="small" icon={<i className="bi bi-x-circle-fill"></i>}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="admin-product-page">
            <div style={{ marginBottom: '16px' }}>
                <Row gutter={[16, 16]} justify="space-between" align="middle">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Search
                            placeholder="Tìm tên sản phẩm"
                            onSearch={value => setSearchText(value)}
                            enterButton
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Select
                            placeholder="Lọc theo danh mục"
                            style={{ width: '100%' }}
                            onChange={value => setSelectedCategory(value)}
                            allowClear
                        >
                            {listCategory.map(category => (
                                <Option key={category.id} value={category.id}>
                                    {category.categoryName}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="primary"
                            icon={<i className="bi bi-bookmark-plus"></i>}
                            onClick={() => setModal2Open(true)}

                        >
                            Thêm sản phẩm
                        </Button>
                    </Col>
                </Row>
            </div>


            <Divider />

            <Table
                columns={columns}
                dataSource={isLoading ? [] : filteredProducts}
                loading={isLoading}
                pagination={{ current: currentPage, pageSize: pageSize }}
                onChange={handleTableChange}
                rowKey="id"
                scroll={{ x: 'max-content' }}
            />

            <Modal
                title="Thêm sản phẩm"
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={null}
            >
                <ModalAddProduct closeModal={() => setModal2Open(false)} />
            </Modal>

            <Modal
                title="Chỉnh sửa sản phẩm"
                centered
                open={modal1Open}
                onCancel={() => setModal1Open(false)}
                footer={null}
            >
                <ModalEditProduct closeModaledit={() => setModal1Open(false)} product={dataedit} />
            </Modal>
        </div>

    );
};

export default AdminProduct;
