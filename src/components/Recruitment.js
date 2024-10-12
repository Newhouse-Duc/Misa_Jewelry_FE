import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';

const Recruitment = () => {
    return (
        <>
            <Header />
            <Banner />

            <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#4a4a4a', lineHeight: '1.6' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Misa Jewelry Tuyển Dụng</h1>

                <p><strong>Bồ Tèoooo ơiii, Misa Jewelry cần bạn ngay đây!</strong></p>
                <p>‼️ <strong>TEAM SALE ASSISTANT</strong> đang đợi các bạn gia nhập! </p>

                <ul>
                    <li><strong>Lương:</strong> Từ 21-29K/giờ (theo cấp bậc)</li>
                    <li><strong>Địa điểm:</strong> Làm việc tại cửa hàng</li>
                </ul>

                <p><strong>Ca làm việc:</strong></p>
                <ul>
                    <li><strong>Ca 1:</strong> 9:00 AM - 3:30 PM</li>
                    <li><strong>Ca 2:</strong> 3:30 PM - 10:00 PM</li>
                </ul>

                <p><strong>Yêu cầu:</strong> Chúng tôi cần các bạn làm việc lâu dài (cam kết trên 6 tháng), nhanh nhẹn, chịu học hỏi. Không cần kinh nghiệm, chỉ cần sự trung thực, trách nhiệm, và tình yêu dành cho trang sức!</p>
                <p><strong>Quyền lợi:</strong> Môi trường làm việc thân thiện, vui vẻ, được mua sản phẩm với giá ưu đãi và có thêm kinh nghiệm quý giá.</p>

                <h2 style={{ fontSize: '20px', marginTop: '20px' }}>Sơ lược về công việc:</h2>
                <ul>
                    <li>Tư vấn khách hàng (online và offline)</li>
                    <li>Chăm sóc cửa hàng</li>
                    <li>Kiểm kê hàng hóa</li>
                    <li>Và nhiều hơn nữa...</li>
                </ul>

                <p><strong>Cách thức ứng tuyển:</strong></p>
                <p>Vui lòng gửi CV về địa chỉ <strong>hr@misa.vn</strong>. Misa chỉ nhận CV và phản hồi qua email.</p>

                <p><strong>CV cần có:</strong></p>
                <ul>
                    <li>01 ảnh chân dung</li>
                    <li>Giới thiệu bản thân, lý lịch, kỹ năng và kinh nghiệm làm việc (nếu có)</li>
                </ul>

                <p><em>Hãy gửi CV của bạn với tiêu đề: "Gia nhập đại gia đình Misa Jewelry"</em></p>
                <p>Misa mong chờ và hân hoan chào đón các thành viên mới để cùng xây dựng đại gia đình Misa Jewelry!</p>
            </div>

            <Footer />
        </>
    );
}

export default Recruitment;
