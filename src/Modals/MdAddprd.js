import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message, Button } from 'antd';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createProduct, getproduct } from '../redux/slices/productSlices';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ModalAddProduct = ({ closeModal }) => {
    const defaultData = {
        productname: '',
        valueprice: '',
        valuedescription: '',
        categoryid: '',
        img: ''
    };

    const defaultInput = {
        isValidName: true,
        isValidImg: true,
        isValidPrice: true,
        isValidDescription: true,
        isValidCategoryId: true,
    };

    const [productData, setProductData] = useState(defaultData);
    const [checkInput, setObjCheckInput] = useState(defaultInput);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const dispatch = useDispatch();
    const listCategory = useSelector((state) => state.category.listCategory);
    const categoryOptions = listCategory.map((category) => ({
        value: category.id,
        label: category.categoryName,
    }));

    const handleInputChange = (name, value) => {
        setProductData({
            ...productData,
            [name]: value,
        });
    };


    const resetForm = () => {
        setProductData(defaultData);
        setFileList([]);
        setObjCheckInput(defaultInput);
    };

    const validateInput = () => {
        setObjCheckInput(defaultInput);

        if (!productData.productname || productData.productname.trim() === '') {
            message.error("Hãy nhập tên sản phẩm");
            setObjCheckInput({ ...defaultInput, isValidName: false });
            return false;
        }

        if (!productData.img || productData.img.length === 0) {
            message.error("Hãy thêm ảnh");
            setObjCheckInput({ ...defaultInput, isValidImg: false });
            return false;
        }

        if (!productData.valueprice || productData.valueprice <= 0) {
            message.error("Hãy điền giá");
            setObjCheckInput({ ...defaultInput, isValidPrice: false });
            return false;
        }

        if (!productData.valuedescription || productData.valuedescription.trim() === '') {
            message.error("Hãy điền mô tả");
            setObjCheckInput({ ...defaultInput, isValidDescription: false });
            return false;
        }

        if (!productData.categoryid) {
            message.error("Hãy chọn danh mục cho sản phẩm");
            setObjCheckInput({ ...defaultInput, isValidCategoryId: false });
            return false;
        }

        return true;
    };

    const handleSubmitProduct = () => {
        if (validateInput()) {
            dispatch(createProduct({ newProduct: productData }))
                .unwrap()
                .then(() => {
                    message.success("Sản phẩm được thêm thành công!");
                    dispatch(getproduct());
                    resetForm();
                    closeModal();
                })
                .catch((error) => {
                    message.error(error || 'Tạo sản phẩm thất bại!');
                });
        }
    };

    const handleChangeUpload = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList[0]?.originFileObj) {
            handleInputChange('img', newFileList[0].originFileObj);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ flex: '1', marginRight: '16px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Chọn ảnh</label>
                    <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChangeUpload}

                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>

                <div style={{ flex: '2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Tên sản phẩm</label>
                        <input
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={productData.productname}
                            onChange={(event) => handleInputChange('productname', event.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Giá</label>
                        <input
                            type="number"
                            placeholder="Nhập giá"
                            value={productData.valueprice}
                            onChange={(event) => handleInputChange('valueprice', event.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Danh mục</label>
                <Select
                    showSearch
                    placeholder="Chọn danh mục"
                    options={categoryOptions}
                    value={productData.categoryid || undefined}
                    onChange={(value) => handleInputChange('categoryid', value)}
                    style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Mô tả</label>
                <ReactQuill
                    theme="snow"
                    value={productData.valuedescription}
                    onChange={(value) => handleInputChange('valuedescription', value)}
                    style={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button onClick={() => { resetForm(); closeModal(); }} style={{ marginRight: '8px' }}>
                    Hủy bỏ
                </Button>
                <Button
                    type="primary"
                    onClick={() => { resetForm(); handleSubmitProduct(); }}
                    style={{ marginLeft: '8px' }}
                >
                    Thêm sản phẩm
                </Button>
            </div>

        </>
    );



};

export default ModalAddProduct;
