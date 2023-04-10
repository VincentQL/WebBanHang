import styled from 'styled-components';
import Logo from "./../images/logo/logo.png"
import { Link, NavLink } from "react-router-dom";
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
        width: 42px;
        background: #2697FF;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 4px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 22px;
        transition: all 0.4 ease;
    }
    nav .search-box .bx-search:hover{
        opacity: 0.8;
        cursor: pointer
    }
`

function Header({ isLogin, isAdmin }) {
    console.log('isLogin', isLogin)
    const [active, setActive] = useState(false)
    const [textSearch, setTextSearch] = useState('')
    const [products, setProducts] = useState([])

    async function fetchMyAPI() {
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },

        }
        const response = await fetch("http://localhost:4000/admin/get-product", config)
        const data = await response.json()
        let result = data.shirt.concat(data.clothes).concat(data.shoes)
        setProducts(result);
    }



    useEffect(() => {
        fetchMyAPI()
    }, [])




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

    function searchProduct(keyword) {
        return products.filter((product) => {
          return (
            product.deleted === false &&
            (product.name.toLowerCase().includes(keyword) || product._id.toLowerCase().includes(keyword))
          );
        });
      }

    return (
        <HeaderStyled>
            <div className="header">
                <div className="header__logo d-flex col-xl-12">
                    <div href="#" className="div-img col-xl-2">
                        <NavLink to="/" >  <NavLink to="/" ><img src={Logo} alt="" /></NavLink> </NavLink>
                        <NavLink to="/" className="trangchu">Trang chủ</NavLink>
                    </div>
                    <div className="col-xl-6 my-auto">
                        <div className="header__navbar justify-content-between ">
                            <Link to="/" className="trangchu">Trang chủ</Link>
                            <ul className="navbar__items d-flex">

                                <li className="navbar__item"> <NavLink to="/shirt" >Áo thời trang</NavLink>

                                </li>
                                <li className="navbar__item"> <NavLink to="/clothes">Quần thời trang</NavLink>

                                </li>
                                <li className="navbar__item"> <NavLink to="/shoes">Giày thời trang</NavLink>

                                </li>
                            </ul>



                        </div>
                    </div>
                    <div className="col-xl-4 user">
                        <nav className='col-xl-6 m-auto d-flex justify-content-end'>
                            <div className={active ? "search-box open" : "search-box"} >
                                <input type="text" value={textSearch} onChange={(e) => {
                                    setTextSearch(e.target.value)
                                    let arr = searchProduct(e.target.value)
                                    console.log('arr',arr)
                                }} placeholder="Search..." />
                                <i className='bx bx-search' onClick={() => {
                                    active === false && setTextSearch('')
                                    setActive(!active)
                                }}></i>
                            </div>
                        </nav>
                        <div className="col-xl-6 d-flex">
                            {renderProfile()}
                            <Link to="/cart" className=""><i className="fas fa-shopping-cart icon-cart"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderStyled>
    );
}

export default Header;
