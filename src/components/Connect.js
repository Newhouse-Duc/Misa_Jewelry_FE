import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';
const Connect = (props) => {
    return (
        <>

            <Header />
            <Banner />

            <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#4a4a4a', lineHeight: '1.6' }}>
                <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>HỢP TÁC TRUYỀN THÔNG</h1>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                    CẢM ƠN BẠN ĐÃ QUAN TÂM VÀ YÊU THƯƠNG MISA JEWELRY.<br />
                    MỌI LIÊN HỆ HỢP TÁC TRUYỀN THÔNG BẠN VUI LÒNG GỬI QUA MAIL <strong>contact@Misa.vn</strong>
                </p>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                    MISA JEWELRY CẢM ƠN BẠN!
                </p>
                <div style={{ textAlign: 'center' }}>
                    <img src="https://bizweb.dktcdn.net/100/302/551/files/compressed-kat-jewelry-x-bloomode.png?v=1710584295315" alt="Misa Jewelry" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            </div>


            <Footer />
        </>
    );
}

export default Connect;