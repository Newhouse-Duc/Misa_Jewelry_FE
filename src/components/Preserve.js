import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';

const Preserve = () => {
    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        lineHeight: '1.6',
    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '15px',
    };

    const subtitleStyle = {
        fontSize: '20px',
        fontWeight: '600',
        marginTop: '20px',
        marginBottom: '10px',
    };

    const listStyle = {
        marginLeft: '20px',
    };

    return (
        <div style={containerStyle}>
            <Header />
            <Banner />

            <div style={{
                maxWidth: '800px',
                width: '80%',
                margin: 'auto',
                padding: '20px',
                boxSizing: 'border-box',
            }}>
                <h1 style={titleStyle}>Chính Sách Bảo Hành và Bảo Quản</h1>

                <h2 style={subtitleStyle}>Bảo Hành</h2>
                <p>Khi mua sản phẩm trang sức bạc tại Misa, quý khách sẽ nhận được các quyền lợi bảo hành áp dụng từ 1/8/2019 như sau:</p>
                <ul style={listStyle}>
                    <li>Bảo hành vệ sinh trắng sáng MIỄN PHÍ vô thời hạn.</li>
                    <li>Đối với các trường hợp đứt/gãy/thay khóa trong 1 tháng kể từ ngày mua, Misa nhận bảo hành MIỄN PHÍ 1 lần với điều kiện quý khách mang theo PHIẾU BẢO HÀNH.</li>
                    <li>Từ tháng thứ 2, Misa sẽ tính phí bảo hành tùy vào tình trạng sản phẩm.</li>
                    <li>Thời gian bảo hành từ 3 - 5 tuần kể từ ngày nhận sản phẩm.</li>
                </ul>

                <h2 style={subtitleStyle}>Điều Khoản Không Nhận Bảo Hành</h2>
                <p>Chúng tôi không nhận bảo hành trong các trường hợp sau:</p>
                <ul style={listStyle}>
                    <li>Sản phẩm biến dạng hoặc hư hỏng nặng trên 40%.</li>
                    <li>Không chứng thực được lịch sử mua hàng.</li>
                    <li>Các sản phẩm đá phong thủy, đá CZ dạng đặc biệt, xà cừ, ngọc trai sẽ không được bảo hành.</li>
                </ul>

                <h2 style={subtitleStyle}>Chính Sách Đổi Sản Phẩm</h2>
                <p>Thời gian đổi hàng là 3 ngày kể từ lúc mua hàng với điều kiện sản phẩm còn nguyên vẹn. Khách hàng chỉ được đổi sản phẩm một lần.</p>

                <h2 style={subtitleStyle}>Bạc 925 Là Gì?</h2>
                <p>Bạc 925 là hợp kim chứa 92.5% bạc nguyên chất. Tại Misa, mỗi sản phẩm đều được kiểm tra nghiêm ngặt về tỷ lệ bạc.</p>

                <h2 style={subtitleStyle}>Nguyên Nhân Đeo Bạc Bị Đen và Cách Khắc Phục</h2>
                <p>Bạc có thể bị đen do nhiều nguyên nhân, chủ yếu là do tiếp xúc với lưu huỳnh trong không khí và môi trường. Để làm sáng bạc, bạn có thể áp dụng các phương pháp như:</p>
                <ul style={listStyle}>
                    <li>Ngâm bạc trong giấm táo đun sôi.</li>
                    <li>Dùng kem đánh răng và bàn chải để làm sạch.</li>
                    <li>Rửa trong dung dịch xà phòng.</li>
                </ul>

                <h2 style={subtitleStyle}>Vì Sao Có Khách Đeo Bạc Bị Ngứa, Bị Dị Ứng?</h2>
                <p>Bạc rất lành tính nhưng một số khách hàng có thể bị ngứa do sản phẩm xi mạ Niken hoặc do bạc không đạt tiêu chuẩn. Tại Misa, sản phẩm luôn đảm bảo chất lượng.</p>
            </div>

            <Footer />
        </div>
    );
}

export default Preserve;
