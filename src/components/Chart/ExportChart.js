import React, { useRef, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { MDBBtn } from 'mdb-react-ui-kit';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { fetchAllUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { getproduct } from "../../redux/slices/productSlices";
import { getallorder, getAlldetail } from "../../redux/slices/orderSlices";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement

);

const ExportableChart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUser());
        dispatch(getproduct());
        dispatch(getallorder());
        dispatch(getAlldetail())
    }, [dispatch]);

    const listOrder = useSelector((state) => state.order.listOrder);
    const allDetail = useSelector((state) => state.order.allDetail)
    const chartRef = useRef(null);
    const paymentChartRef = useRef(null);
    const bestSellingChartRef = useRef(null);
    const calculateMonthlyData = (orders) => {
        const monthlyRevenue = new Array(12).fill(0);
        const monthlyOrderCount = new Array(12).fill(0);

        orders.forEach(order => {
            const month = new Date(order.createdAt).getMonth();
            monthlyRevenue[month] += order.total_price;
            monthlyOrderCount[month] += 1;
        });

        return { monthlyRevenue, monthlyOrderCount };
    };

    const { monthlyRevenue, monthlyOrderCount } = calculateMonthlyData(listOrder);

    const data = {
        labels: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5',
            'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10',
            'Tháng 11', 'Tháng 12'
        ],
        datasets: [
            {
                label: 'Doanh thu',
                data: monthlyRevenue,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
            {
                label: 'Số lượng đơn hàng',
                data: monthlyOrderCount,
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                fill: true,
            },
        ],
    };

    const paymentData = {
        labels: ['COD', 'MOMO'],
        datasets: [
            {
                label: 'Số lượng đơn hàng theo phương thức thanh toán',
                data: [
                    listOrder.filter(order => order.payment_id === 1).length,
                    listOrder.filter(order => order.payment_id === 2).length,
                ],
                backgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
            },
        ],
    };

    const paymentOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Số lượng đơn hàng theo phương thức thanh toán',
            },

        },
    };
    const calculateBestSellingProducts = (details) => {
        const productCount = {};

        details.forEach(detail => {
            if (productCount[detail.product_name]) {
                productCount[detail.product_name] += detail.quantity;
            } else {
                productCount[detail.product_name] = detail.quantity;
            }
        });

        const labels = Object.keys(productCount);
        const data = Object.values(productCount);

        return { labels, data };
    };
    const colors = [
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',

    ];

    const { labels: productLabels, data: productData } = calculateBestSellingProducts(allDetail);
    const productColors = productLabels.map((_, index) => colors[index % colors.length]);
    const bestSellingData = {
        labels: productLabels,
        datasets: [
            {
                label: 'Số lượng bán ra',
                data: productData,
                backgroundColor: productColors,
            },
        ],
    };

    const bestSellingOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sản phẩm bán chạy',
            },

        },
    };


    const exportChart = (chartRef) => {
        const chart = chartRef.current;
        if (chart) {
            const url = chart.toBase64Image();
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Thống kê.png';
            link.click();
        }
    };

    return (
        <div >

            <div style={{

                margin: '20px',
                borderRadius: '12px',
                padding: '10px',
                backgroundColor: "#F5F5F5"
            }}>
                <div style={{ width: '100%', height: 'auto' }}>
                    <Line
                        ref={chartRef}
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Doanh thu và số lượng đơn hàng hàng tháng',
                                    font: {
                                        size: '14px',
                                    },
                                },
                            },
                        }}
                        style={{
                            width: '100%',
                            height: '50vh',
                        }}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '3vh' }}>
                    <MDBBtn rounded className='mx-2' color='danger' onClick={() => exportChart(chartRef)}>
                        Xuất biểu đồ
                    </MDBBtn>
                </div>
            </div>
            <div style={{

                margin: '20px',
                borderRadius: '12px',
                padding: '10px',
                backgroundColor: "#F5F5F5"
            }}>
                <div style={{ width: '100%', height: '400px' }}>
                    <Doughnut
                        ref={paymentChartRef}
                        data={paymentData}
                        options={{
                            ...paymentOptions,
                            maintainAspectRatio: false,
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '3vh' }}>
                    <MDBBtn rounded className='mx-2' color='danger' onClick={() => exportChart(paymentChartRef)}>
                        Xuất biểu đồ
                    </MDBBtn>
                </div>
            </div>





            <div style={{

                margin: '20px',
                borderRadius: '12px',
                padding: '10px',
                backgroundColor: "#F5F5F5"
            }}>
                <div style={{
                    margin: 'auto',
                    width: '100%',
                    height: 'auto',
                }}>
                    <Bar
                        ref={bestSellingChartRef}
                        data={bestSellingData}
                        options={{
                            ...bestSellingOptions,
                            maintainAspectRatio: false,
                            plugins: {
                                ...bestSellingOptions.plugins,
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            let productName = tooltipItem.label;
                                            if (productName.length > 20) {
                                                return productName.substring(0, 20) + '...';
                                            }
                                            return productName;
                                        }
                                    }
                                },
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        callback: function (value, index, values) {
                                            let label = this.getLabelForValue(value);
                                            return label.length > 15 ? label.substring(0, 15) + '...' : label;
                                        },
                                    },
                                },
                            },
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '3vh' }}>
                    <MDBBtn rounded className='mx-2' color='danger' onClick={() => exportChart(bestSellingChartRef)}>
                        Xuất biểu đồ
                    </MDBBtn>
                </div>
            </div>

        </div>



    );
};

export default ExportableChart;
