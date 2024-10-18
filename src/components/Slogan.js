import React from "react";

const Slogan = (props) => {
    return (

        <>

            <div className="container" style={{
                fontFamily: '"Taken by Vultures Demo", sans-serif',
                fontSize: '70px',
                textAlign: 'center',
                padding: '40px 20px',
                backgroundColor: '#f5f4f3',
                color: '#42210b',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: '15px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}>
                Misa Jewelry
            </div>

        </>
    );

}
export default Slogan;