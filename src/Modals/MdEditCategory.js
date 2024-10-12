import { Form, Input, Typography } from "antd";

const EditCategory = ({ editcategory, seteditcategoryname }) => {
    return (
        <>
            <Typography.Title level={4}>Sửa tên danh mục</Typography.Title>
            <Form
                layout="vertical"
            >
                <Form.Item
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                >
                    <Input
                        value={editcategory}
                        onChange={(event) => seteditcategoryname(event.target.value)}
                        placeholder="Nhập tên danh mục mới"
                        size="large"
                        style={{ borderRadius: '8px' }}
                    />
                </Form.Item>
            </Form>
        </>
    );
};

export default EditCategory;
