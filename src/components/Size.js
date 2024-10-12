import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';

const Size = () => {
    return (
        <>
            <Header />
            <Banner />
            <div style={{
                maxWidth: '800px',
                width: '80%',
                margin: 'auto',
                padding: '20px',
                boxSizing: 'border-box',
            }}>
                <h1 style={{ textAlign: 'center', color: '#333', fontSize: '2em', marginBottom: '20px' }}>
                    Cách Đo Kích Cỡ Tay Đeo Trang Sức
                </h1>
                <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '20px' }}>
                    Chắc rằng các bạn đã nhiều lần gặp khó khăn khi nhẫn và vòng tay có quá nhiều cỡ với số đo đa dạng, bạn không biết tay mình là số mấy mới vừa? Từ giờ bạn không phải băng khoăn nữa, vì Misa Jewelry sẽ mách bạn những cách đo nhẫn cực kỳ dễ và hiệu quả nhé.
                </p>
                <h2>Có hai cách rất đơn giản để biết được size nhẫn và vòng của bạn:</h2>

                <h3>Cách Thứ Nhất: Nếu Bạn Có Sẵn Chiếc Nhẫn Hoặc Vòng Tay</h3>
                <ol>
                    <li>Dùng thước đặt ngang ở giữa nhẫn của bạn để đo đường kính, nhớ đo khoảng cách lòng bên trong của nhẫn.</li>
                    <li>Gửi Misa Jewelry số đo theo đơn vị cm nhé (centi mét).</li>
                </ol>
                <img src='https://bizweb.dktcdn.net/100/302/551/files/ringsize1.png?v=1526066732119' alt="Cách đo kích thước nhẫn" style={{ width: '100%', height: 'auto', borderRadius: '5px', margin: '10px 0' }} />

                <h3>Cách Thứ Hai:</h3>
                <ol>
                    <li>Dùng một sợi chỉ, quấn quanh ngón tay/cổ tay bạn muốn đo, làm dấu lại.</li>
                    <li>Đo chiều dài sợi chỉ, chiều dài đó là chu vi của ngón tay/cổ tay bạn. Đối với cổ tay các bạn nhớ trừ hao, nới lỏng ra nhen.</li>
                    <li>Gửi số đo cho Misa Jewelry với đơn vị là cm nhe (centi mét).</li>
                </ol>
                <img src='https://bizweb.dktcdn.net/100/302/551/files/edited-download-1.jpg?v=1584990767436' alt="Cách đo cổ tay" style={{ width: '100%', height: 'auto', borderRadius: '5px', margin: '10px 0' }} />
                <img src='https://bizweb.dktcdn.net/100/302/551/files/edited-download-copy.jpg?v=1584990860831' alt="Hình ảnh minh họa" style={{ width: '100%', height: 'auto', borderRadius: '5px', margin: '10px 0' }} />

                <h2>Bảng Giá Dây Chuyền</h2>
                <p>
                    Lưu ý: Các bạn nên đo khớt đốt ngón tay trước bụng ngón tay, chu vi của phần nào lớn hơn bạn sẽ lấy số chu vi đó làm size nhẫn. Vì nhẫn phải lọt qua khớp đốt ngón tay mới vào được tới bụng ngón tay được nè :D.
                </p>
                <img src='https://bizweb.dktcdn.net/100/302/551/files/sod-necklace-size-02-1024x1024-3f92e076-0f03-4a1a-a0d9-cb4bea02df16.jpg?v=1584990951171' alt="Bảng giá dây chuyền" style={{ width: '100%', height: 'auto', borderRadius: '5px', margin: '10px 0' }} />


                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px',
                    textAlign: 'center',
                }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}></th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Dài 40 cm</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Dài 45 cm</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Dài 50 cm</th>
                            <th style={{ border: '1px solid #ccc', padding: '10px' }}>Dài 55 cm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>Mắt xích nhỏ</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>140k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>180k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>220k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>không có</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>Mắt xích trung</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>180k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>220k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>260k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>Không có </td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>Mắt xích lớn</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>220k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>260k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>300k</td>
                            <td style={{ border: '1px solid #ccc', padding: '10px' }}>340k</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default Size;
