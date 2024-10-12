import React, { useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Upload, message, Button, Select, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateProductadmin, getproduct } from '../redux/slices/productSlices';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ModalEditProduct = ({ closeModaledit, product }) => {

    const defaultInput = {
        isValidName: true,
        isValidImg: true,
        isValidPrice: true,
        isValidDescription: true,
        isValidCategoryId: true,
    };

    const [productData, setProductData] = useState({
        productname: product?.productName || '',
        img: product?.img || null,
        valueprice: product?.price || '',
        valuedescription: product?.description || '',
        categoryid: product?.categoryid || null,
    });

    const [checkInput, setObjCheckInput] = useState(defaultInput);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const dispatch = useDispatch();
    const listCategory = useSelector((state) => state.category.listCategory);
    const categoryOptions = listCategory.map((category) => ({
        value: category.id,
        label: category.categoryName,
    }));
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    useEffect(() => {
        if (product) {
            setProductData({
                productname: product.productName || '',
                img: product.img || null,
                valueprice: product.price || '',
                valuedescription: product.description || '',
                categoryid: product.categoryid || null,
            });


            if (product.img) {
                setFileList([{ url: product.img }]);
            } else {
                setFileList([]);
            }
        }
    }, [product, closeModaledit]);

    const handleInputChange = (name, value) => {
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeUpload = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList[0]?.originFileObj) {
            handleInputChange('img', newFileList[0].originFileObj);
        }
    };

    const handleRemoveImage = () => {
        setFileList([]);
        handleInputChange('img', null);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const validateInput = () => {
        setObjCheckInput(defaultInput);

        if (!productData.productname || productData.productname.trim() === '') {
            message.error("Hãy nhập tên sản phẩm");
            setObjCheckInput({ ...defaultInput, isValidName: false });
            return false;
        }

        if (!productData.img) {
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

    const handlechangeproduct = () => {
        if (validateInput()) {
            dispatch(updateProductadmin({ productId: product.id, datanewproduct: productData }));
            closeModaledit();
            dispatch(getproduct());
        }
    };

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>

                <div style={{ flex: '1', marginRight: '16px' }}>
                    <label>Chọn ảnh</label>
                    <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChangeUpload}
                        onRemove={handleRemoveImage}
                        onPreview={handlePreview}
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
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={productData.productname}
                            onChange={(event) => handleInputChange('productname', event.target.value)}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label>Giá</label>
                        <input
                            type="number"
                            placeholder="Nhập giá"
                            value={productData.valueprice}
                            onChange={(event) => handleInputChange('valueprice', event.target.value)}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                </div>
            </div>


            <div style={{ marginBottom: '16px' }}>
                <label>Danh mục</label>
                <Select
                    showSearch
                    placeholder="Chọn danh mục"
                    options={categoryOptions}
                    value={productData.categoryid}
                    onChange={(value) => handleInputChange('categoryid', value)}
                    style={{ width: '100%' }}
                />
            </div>


            <div style={{ marginBottom: '16px' }}>
                <label>Mô tả</label>
                <ReactQuill
                    theme="snow"
                    value={productData.valuedescription}
                    onChange={(value) => handleInputChange('valuedescription', value)}
                />
            </div>


            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <Button onClick={() => closeModaledit()}>Hủy bỏ</Button>
                <Button
                    type="primary"
                    style={{ marginLeft: '8px' }}
                    onClick={() => handlechangeproduct()}
                >
                    Cập nhật sản phẩm
                </Button>
            </div>
        </>
    );

};

export default ModalEditProduct;
