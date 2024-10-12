import React from 'react';
import { Form, Input, Typography } from 'antd';

const MdAddcategory = ({ categoryname, setcategoryname }) => {
    return (
        <>
            <Typography.Title level={4}>Thêm danh mục mới</Typography.Title>
            <Form
                layout="vertical"
            >
                <Form.Item
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                >
                    <Input
                        value={categoryname}
                        onChange={(event) => setcategoryname(event.target.value)}
                        placeholder="Nhập tên danh mục"
                        size="large"
                        style={{ borderRadius: '8px' }}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default MdAddcategory;
