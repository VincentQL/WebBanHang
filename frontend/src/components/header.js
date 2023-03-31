import styled from 'styled-components';
import Logo from "./../images/logo/logo.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

const HeaderStyled = styled.div`
    .search{
        min-width: 212px;
    max-height: 36px;
    border-radius: 6px;
    border: 1px solid;
    margin: 6px;
    }
    nav .sidebar-button {
        display: flex;
        align-items: center;
        font-size: 24px;
        font-weight: 500;
    }

    nav .sidebar-button i {
        font-size: 35px;
        margin-right: 10px;
    }

    .home-section nav .search-box {
        position: relative;
        height: 50px;
        max-width: 550px;
        width: 100%;
        margin: 0 20px;
    }

    nav .search-box input {
        height: 100%;
        width: 100%;
        outline: none;
        background: #F5F6FA;
        border: 2px solid #EFEEF1;
        border-radius: 6px;
        font-size: 18px;
        padding: 0 15px;
    }

    nav .search-box .bx-search {
        position: absolute;
        height: 40px;
        width: 40px;
        background: #2697FF;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 4px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        transition: all 0.4 ease;
    }
`

function Header({ isLogin, isAdmin }) {
    console.log('isLogin', isLogin)
    const renderProfile = () => {
        if (isLogin) {
            if (isAdmin) {
                return <Link to="/admin/order" className=""> <i className="fas fa-user-circle icon-user"></i></Link>

            }
            else {
                return <Link to="/profile" className=""> <i className="fas fa-user-circle icon-user"></i></Link>

            }
        }
        else {

            return <Link to="/login" className=""> <i className="fas fa-user-circle icon-user"></i></Link>

        }
    }
    return (
        <HeaderStyled>
            <div className="header">
                <div className="header__logo d-flex col-xl-12">
                    <div href="#" className="div-img col-xl-2">
                        <Link to="/" >  <Link to="/" ><img src={Logo} alt="" /></Link> </Link>
                        <Link to="/" className="trangchu">Trang chủ</Link>
                    </div>
                    <div className="col-xl-8 my-auto">
                        <div className="header__navbar justify-content-between ">
                            <Link to="/" className="trangchu">Trang chủ</Link>
                            <ul className="navbar__items d-flex">

                                <li className="navbar__item"> <Link to="/shirt" className="">Áo thời trang</Link>

                                </li>
                                <li className="navbar__item"> <Link to="/clothes" className="">Quần thời trang</Link>

                                </li>
                                <li className="navbar__item"> <Link to="/shoes" className="">Giày thời trang</Link>

                                </li>
                            </ul>
                            <nav>

                                <div className="search-box">
                                    <input type="text" placeholder="Search..." />
                                    <i className='bx bx-search'></i>
                                </div>

                            </nav>

                        </div>
                    </div>
                    <div className="col-xl-2 user">
                        {renderProfile()}
                        <Link to="/cart" className=""><i className="fas fa-shopping-cart icon-cart"></i></Link>
                    </div>
                </div>
            </div>
        </HeaderStyled>
    );
}

export default Header;
