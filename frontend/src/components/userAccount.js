import React, { useEffect, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";


const UserAccountSytled = styled.div`
.login-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
    color: rgb(36, 32, 82);
}

.login {
    padding: 0 10%;

    form {
        padding: 24px;
        border-radius: 5px;
        border: 1px solid black;
    }

    .div-btn {
        display: flex;
        justify-content: center;

        .btn-submit {
            color: white;
            background-color: rgb(0, 30, 60)
        }
    }

    .login-left {
        .login-left-header {
            font-size: 24px;
            font-weight: bold;
        }

        .error {
            color: red;
        }

        input {
            border-radius: 25px;
        }


        input:focus {
            border: 1px solid rgb(36, 32, 82);
        }
    }

    .login-right {
        padding: 36px;

        .login-right-header {
            font-size: 24px;
            font-weight: bold;
        }

        .error {
            color: red;
        }

        input {
            border-radius: 25px;
        }

    }
}
.login {
    .login-left {
        .login-left-header-items {
            margin-left: 36px;

            .login-left-header-item {
                cursor: pointer;

                .icon {
                    margin: 0 12px;
                }
            }

            .active {
                font-weight: bold;
            }

            .login-left-header-logout {
                cursor: pointer;

            }
        }

    }

    .login-right {
        .user-form {
            border: none;
        }

        .div-btn {
            display: flex;
            justify-content: space-around;

            .btn-clear {}

            .btn-submit {
                border: 1px solid;
                border-radius: 250px;
            }
        }

        padding-top: 36px;

        .cart-right-text {
            font-size: 24px;
            font-weight: bold;
        }

        .cart-right-items {
            list-style: none;
            padding: 0;
            border: 2px solid rgb(36, 32, 82);
            border-radius: 10px;

            span {
                margin: auto;

            }

            .cart-right-header,
            .cart-right-item {
                padding: 12px;
                display: flex;
                font-size: 18px;
                justify-content: space-between;
                border-bottom: 1px solid;
                cursor: pointer;
                text-align: center;

                .sumPrice {
                    .icon-clear {
                        position: absolute;
                        top: -29px;
                        right: -14px;
                    }

                    .icon-clear:hover {
                        opacity: 0.8;
                        background-color: #ccc;
                    }
                }

                .gr-icon-change {
                    padding: 12px 0;
                    cursor: pointer;

                    .icon-change {
                        font-size: 24px;
                        color: #53382c;
                    }

                    .icon-disabled {
                        color: #ccc;
                    }

                    .current-value {
                        padding: 0 12px;
                        line-height: 36px;
                    }

                }

            }

            .cart-right-header,
            .cart-right-footer {
                font-size: 24px;
                font-weight: bold;
            }

            .cart-right-footer {
                display: flex;
                justify-content: space-around;
                padding: 6px;

            }
        }
    }

}`

function UserAccount({ statusLogin, setStatusLogin }) {
    const navigate = useNavigate();
    const [currentActive, setCurrentActive] = useState(0)
    const [listCurrentOrder, setListCurrentOrder] = useState([])
    const [listHistory, setListHistory] = useState([])
    const [profile, setProfile] = useState()
    const [isLogin, setIsLogin] = useState()

    useEffect(() => {
        const getProfile = JSON.parse(localStorage.getItem('profile'))
        setProfile(getProfile)
    }, [])
    const logoutUser = () => {
        setStatusLogin(!statusLogin)
        localStorage.clear()
        navigate('/')
    }
    const renderListProduct = (listProduct) => {
        let sum = 0;
        let result = [];
        if (listProduct && listProduct.length > 0) {
            result = listProduct.map((item, index) => {
                let currentSize = "";
                if (item.size === -1) {
                    currentSize = "S";
                }
                if (item.size === 0) {
                    currentSize = "M";
                }
                if (item.size === 1) {
                    currentSize = "L";
                }
                sum += item.sum;
                return (
                    <li className="cart-right-item col-xl-12" key={item}>
                        <span className={"cart-right-item-header col-xl-4"}>
                            {item.name}
                        </span>
                        <div className={"col-xl-3"}>
                            <div className="gr-icon-change">
                                <span className="current-value">
                                    {item.currentValue > 10
                                        ? item.currentValue
                                        : `0${item.currentValue}`}
                                </span>
                            </div>
                        </div>
                        <span className={"col-xl-2"}>{currentSize}</span>
                        <span className={"col-xl-3 sumPrice"}>
                            {item.currentValue * item.price} VND{" "}
                        </span>
                    </li>
                );
            });
        } else {
            return (
                <li className="cart-right-item col-xl-12">
                    Số lượng sản phẩm trong giỏ bằng với số lượng tiền trong túi thằng
                    viết cái web này!!!
                </li>
            );
        }
        return result;
    };

    const handleInput = (e) => {

    }


    return (
        <UserAccountSytled>
            <p className="login-title"> TÀI KHOẢN</p>
            <div className="login col-xl-12 d-flex">
                <div className="login-left col-xl-4 p-4">
                    <p className="login-left-header">Xin chào! </p>
                    <div className="login-left-header-items">
                        <p
                            className={
                                currentActive === 0
                                    ? "login-left-header-item active"
                                    : "login-left-header-item"
                            }
                            onClick={() => setCurrentActive(0)}
                        >
                            <AccountCircleIcon className="icon" />
                            Thông tin tài khoản
                        </p>
                        <p
                            className={
                                currentActive === 1
                                    ? "login-left-header-item active"
                                    : "login-left-header-item"
                            }
                            onClick={() => setCurrentActive(1)}
                        >
                            <ReceiptIcon className="icon" />
                            Đơn hàng hiện tại
                        </p>
                        <p
                            className={
                                currentActive === 2
                                    ? "login-left-header-item active"
                                    : "login-left-header-item"
                            }
                            onClick={() => setCurrentActive(2)}
                        >
                            <HistoryIcon className="icon" />
                            Lịch sử đơn hàng
                        </p>
                        <p className="login-left-header-logout" onClick={logoutUser} >
                            <LogoutIcon className="icon" />
                            Đăng xuất
                        </p>
                    </div>
                </div>
                <div className="login-right col-xl-8">
                    {currentActive === 0 && profile && (
                        <div>
                            <p className="login-right-header">Thông tin tài khoản</p>
                            <form className="user-form">
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Tên:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        value={profile.name ? profile.name : ''}
                                        name="name"
                                        onChange={handleInput}
                                        placeholder="Vui lòng nhập tên của bạn"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        value={profile.account ? profile.account : ''}
                                        name="email"
                                        onChange={handleInput}
                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập nhập email"
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPhone">
                                        Số điện thoại liên hệ:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPhone"
                                        name="numberPhone"
                                        value={profile.numberPhone ? profile.numberPhone : ''}
                                        onChange={handleInput}
                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập số điện thoại"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPhone">
                                        Ngày/tháng/năm sinh:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="exampleInputPhone"
                                        name="date"
                                        value={profile.birthday ? profile.birthday : ''}
                                        onChange={handleInput}
                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập số điện thoại"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="exampleInputAddress"
                                        name="address"
                                        value={profile.address ? profile.address : ''}
                                        onChange={handleInput}
                                        aria-describedby="emailHelp"
                                        placeholder="Vui lòng nhập địa chỉ"
                                    />
                                </div>
                                <div className={"div-btn"}>
                                    <button
                                        type="submit"
                                        className="btn btn-submit"
                                    // onClick={EditUser}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    {currentActive === 1 && (
                        <div>
                            <p className="cart-right-text">Thông tin đơn hàng</p>
                            <ul className="table cart-right-items">
                                <li className="cart-right-header col-xl-12">
                                    <span className="cart-right-header-item col-xl-4">Mã đơn hàng</span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Số lượng
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">
                                        Size
                                    </span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Tổng
                                    </span>
                                </li>

                                {listCurrentOrder &&
                                    listCurrentOrder.map((item) => {
                                        let currentSum
                                        let sum = 0;
                                        JSON.parse(item.listProduct).map((item) => {
                                            sum += item.currentValue;
                                        });
                                        return (
                                            <li
                                                className="cart-right-item col-xl-12"
                                                key={item.token}
                                            >
                                                <span className={"cart-right-item-header col-xl-4"}>
                                                    {item.token}
                                                </span>
                                                <span className={"cart-right-item-header col-xl-2"}>
                                                    {sum}
                                                </span>
                                                <span className={"col-xl-3"}> {item.createdAt}</span>
                                                <span className={"col-xl-3 sumPrice"}>
                                                    {item.price} VND
                                                </span>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    )}
                    {currentActive === 2 && (
                        <div>
                            <p className="cart-right-text">Lịch sử đơn hàng</p>
                            <ul className="table cart-right-items">
                                <li className="cart-right-header col-xl-12">
                                    <span className="cart-right-header-item col-xl-4">
                                        Mã đơn hàng
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">
                                        Số lượng
                                    </span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Ngày mua
                                    </span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Tổng
                                    </span>
                                </li>
                                {listHistory &&
                                    listHistory.map((item) => {
                                        console.log("item", item);
                                        let sum = 0;
                                        JSON.parse(item.listProduct).map((item) => {
                                            sum += item.currentValue;
                                        });
                                        return (
                                            <li
                                                className="cart-right-item col-xl-12"
                                                key={item.token}
                                            >
                                                <span className={"cart-right-item-header col-xl-4"}>
                                                    {item.token}
                                                </span>
                                                <span className={"cart-right-item-header col-xl-2"}>
                                                    {sum}
                                                </span>

                                                <span className={"col-xl-3"}> {item.createdAt}</span>
                                                <span className={"col-xl-3 sumPrice"}>
                                                    {item.price} VND
                                                </span>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </UserAccountSytled>
    );
}

export default UserAccount;
