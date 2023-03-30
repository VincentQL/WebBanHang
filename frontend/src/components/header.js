import styled from 'styled-components';
import Logo from "./../images/logo/logo.png"
import { Link } from "react-router-dom";

const HeaderStyled = styled.div`
    .search{
        min-width: 212px;
    max-height: 36px;
    border-radius: 6px;
    border: 1px solid;
    margin: 6px;
    }
`

function Header() {
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

                                <li className="navbar__item"> <Link to="/ao" className="">Áo thời trang</Link>

                                </li>
                                <li className="navbar__item"> <Link to="/quan" className="">Quần thời trang</Link>

                                </li>
                                <li className="navbar__item"> <Link to="/giay" className="">Giày thời trang</Link>

                                </li>
                            </ul>
                            <input className="search" type='text' placeholder='Tìm kiếm sản phẩm'/>
                        </div>
                    </div>
                    <div className="col-xl-2 user">
                        <Link to="/dangnhap" className=""> <i className="fas fa-user-circle icon-user"></i></Link>
                        <Link to="/giohang" className=""><i className="fas fa-shopping-cart icon-cart"></i></Link>
                    </div>
                </div>
            </div>
        </HeaderStyled>
    );
}

export default Header;
