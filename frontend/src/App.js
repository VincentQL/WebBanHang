import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import NotFound from './components/NotFound';
import AddProduct from './components/admin/addProduct';
import AddUser from './components/admin/addUser';
import AdminDashboard from './components/admin/adminDashboard';
import ViewOrder from './components/admin/viewOrder';
import ViewProduct from './components/admin/viewProduct';
import ViewUsers from './components/admin/viewUsers';
import BodyAo from './components/ao/bodyAo';
import DetailProduct from './components/detailProduct';
import Footer from './components/footer';
import BodyGiay from './components/giay/bodyGiay';
import GioHang from './components/giohang/giohang';
import Header from './components/header';
import BodyHomePage from './components/homePage/bodyHomePage';
import DangKy from './components/login/dangky';
import DangNhap from './components/login/dangnhap';
import BodyQuan from './components/quan/bodyQuan';
import UserAccount from './components/userAccount';
import EditUser from './components/admin/editUser';
import EditProduct from './components/admin/editProduct';
import { ToastContainer, toast } from 'react-toastify';
import CalculateMoney from './components/admin/calculateMoney';
import HistoryOrder from './components/admin/historyOrder';
import AddSale from './components/admin/addSale';


const AdminPageStyled = styled.div`
    .adminPage {
    min-height: 721px;
    padding: 0;
    cursor: pointer;

    .adminPage-dashboard {
        background: #4d5df9;
        color: white;
        font-size: 24px;
        min-height: 721px;
        padding: 0;

        .adminPage-body {
            width: 100%;

            .admin-title {
                margin-top: 24px;
            }
        }

        .logo {
            width: 100%;
            display: flex;
            padding: 12px;
            background-color: black;

            .img-logo {
                width: 150px;
                margin: auto;
                background: white;
                margin: 0 auto;
            }
        }

        .name-admin {
            text-align: center;
            margin-top: 12px;

            .icon {
                margin: 0 12px;
            }
        }

        .manage {
            background: white;
            padding: 6px 12px;
            text-align: center;
            margin-bottom: 12px;
            font-weight: bold;
            color: black;
            margin-left: -32px;

            .icon {
                margin: 0 12px;
            }

        }

        .dashboard-items {
            list-style: none;
            padding: 0;

            .dashboard-item {
                padding: 12px 0 12px 12px;
                text-decoration: none;

                .nav-link {
                    color: white;
                    opacity: 0.6;
                }
                .active{
                    opacity: 1;
                                font-weight: bold;
                                color: black;
                                line-height: 60px;
                                border-top-left-radius: 25px;
                                border-bottom-left-radius: 25px;
                                width: 100%;
                                background: white
                }

                .icon {
                    margin: 0 12px;
                }
            }

        }

    }
}
`


function App() {
    const [isLogin, setIsLogin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [profile, setProfile] = useState()
    const [statusLogin, setStatusLogin] = useState(false)
    const [productEdit, setProductEdit] = useState()
    const [cart, setCart] = useState([])
    const [productInCart, setProductInCart] = useState([])

    useEffect(() => {
        async function fetchData() {
            setIsLogin(localStorage.getItem('isLogin'))
            setProfile(localStorage.getItem('profile'))
            setIsAdmin(localStorage.getItem('isAdmin'))
        }
        fetchData();
    }, [statusLogin]);
    useEffect(() => {
        let result = [];
        cart.forEach(function (a) {
            if (!this[a.item._id]) {
                this[a.item._id] = { id: a.item._id, sizeS: 0, sizeM: 0, sizeL: 0, item: a.item };
                result.push(this[a.item._id]);
            }
            if (a.size === 'S') {
                this[a.item._id].sizeS += Number(a.amount);
            }
            else if (a.size == 'M') {
                this[a.item._id].sizeM += Number(a.amount);
            }
            else if (a.size == 'L') {
                this[a.item._id].sizeL += Number(a.amount);
            }
        }, Object.create(null));
        setProductInCart(result)
        console.log(result);

    }, [cart]);
    const renderMainPage = () => {
        if (isLogin && isAdmin) {
            return <AdminPageStyled>
                <Router>
                    <div className={"adminPage col-xl-12 d-flex"}>
                        <AdminDashboard statusLogin={statusLogin} setStatusLogin={setStatusLogin} />
                        <div style={{ width: "100%" }}>
                            <Routes>
                                <Route path='admin/order' element={isLogin ? <ViewOrder /> : <NotFound />} />
                                <Route path='admin/add-user' element={<AddUser />} />
                                <Route path='admin/revenue' element={<CalculateMoney />} />
                                <Route path='admin/edit-user/:id' element={<EditUser />} />
                                <Route path='admin/add-product' element={<AddProduct />} />
                                <Route path='admin/edit-product' element={<EditProduct productEdit={productEdit} />} />
                                <Route path='admin/view-products' element={<ViewProduct setProductEdit={setProductEdit} />} />
                                <Route path='admin/view-users' element={<ViewUsers />} />
                                <Route path='admin/history' element={<HistoryOrder />} />
                                <Route path='admin/sale' element={<AddSale />} />
                                <Route path='*' exact={true} element={<NotFound />} />


                            </Routes>
                        </div>
                    </div>
                    <Footer />
                </Router></AdminPageStyled >
        }
        else {
            return (<Router>
                <div >
                    <Header isLogin={isLogin} isAdmin={isAdmin} />
                    <Routes>
                        <Route path='/' element={<BodyHomePage setCart={setCart} />} />
                        <Route path='/shirt' element={<BodyAo setCart={setCart} />} />
                        <Route path='/clothes' element={<BodyQuan setCart={setCart} />} />
                        <Route path='/shoes' element={<BodyGiay setCart={setCart} />} />
                        <Route path='/login' element={<DangNhap statusLogin={statusLogin} setStatusLogin={setStatusLogin} setIsLogin={setIsLogin} />} />
                        <Route path='/register' element={<DangKy />} />
                        <Route path='/cart' element={<GioHang listproducts={cart} setCart={setCart} sortCart={productInCart} userLoggedIn={isLogin} />} />
                        <Route path='/detail' element={<DetailProduct />} />
                        <Route path="/profile" element={isLogin ? <UserAccount statusLogin={statusLogin} setStatusLogin={setStatusLogin} /> : <NotFound />} />
                        <Route path='*' exact={true} element={<NotFound />} />

                    </Routes>
                    <Footer />
                </div>

            </Router>)

        }
    }
    return (
        <>
            < ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            < ToastContainer />
            <>{renderMainPage()}</>

        </>
    )

}

export default App;
