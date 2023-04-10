import ReceiptIcon from "@mui/icons-material/Receipt";
import * as React from "react";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import styled from "styled-components";

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const CartStyled = styled.div`
    .cart-title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
    color: rgb(36, 32, 82);
}

.cart-active {
    min-height: 55vh;
}

.cart {
    padding: 0 10%;
    min-height: 100wh;

    .text {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        width: 100%;
        margin: auto;
    }

    .text-active {
        color: green
    }

    .cart-left {
        .cart-left-header {
            font-size: 24px;
            font-weight: bold;
        }

        input {
            border-radius: 25px;
        }

        input:focus {
            border: 1px solid rgb(36, 32, 82);
        }
    }

    .cart-right {
        .div-btn {
            display: flex;
            justify-content: space-around;
            margin-bottom: 16px;

            .btn-submit {
                border: 1px solid;
                border-radius: 250px;
            }

            .btn-submit:hover {
                background-color: rgb(36, 32, 82);
                color: white;
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
}
`
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).find((val) => {
        val.length > 0 && (valid = false);
    });

    return valid;
};

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
            sumProduct: 0,
            a: false,
            isLogin: false,
            name: "",
            email: "",
            numberPhone: "",
            address: "",
            errors: {
                name: "",
                email: "",
                numberPhone: "",
                address: "",
            },
        };
    }

    componentDidMount() {
        let { listproducts } = this.props;
        if (listproducts && listproducts.length > 0) {
            this.sumValue(listproducts);
            this.setState({
                listProduct: listproducts,
                isLogin: this.props.userLoggedIn,
            });
        }
        this.setState({
            isLogin: this.props.userLoggedIn,
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.listproducts !== prevProps.listproducts) {
            this.setState({
                listProduct: this.props.listproducts,
            });
        }
        if (this.props.userLoggedIn !== prevProps.userLoggedIn) {
            this.setState({
                isLogin: this.props.userLoggedIn,
            });
        }
    }

    handleValue = (type, index) => {
        let { listProduct } = this.state;
        let copylistProduct = listProduct;

        if (type === "add") {
            copylistProduct[index].amount = typeof copylistProduct[index].amount === 'string' ? Number(copylistProduct[index].amount) : copylistProduct[index].amount
            console.log(copylistProduct[index].amount, typeof copylistProduct[index].amount)
            copylistProduct[index].amount += 1;
            copylistProduct[index].sum =
                copylistProduct[index].amount * copylistProduct[index].price;
        } else {
            if (
                copylistProduct[index].amount &&
                copylistProduct[index].amount > 1
            ) {
                copylistProduct[index].amount =
                    copylistProduct[index].amount - 1;
                copylistProduct[index].sum =
                    copylistProduct[index].amount * copylistProduct[index].price;
            }
        }
        this.sumValue(copylistProduct);
        this.setState({
            listProduct: copylistProduct,
        });
    };

    sumValue = (listProduct) => {
        let value = 0;
        if (listProduct && listProduct.length > 0) {
            value = listProduct.reduce((total, item) => {
                return total + Number(item.amount) * item.item.price;
            }, 0);
        }
        this.setState({
            sumProduct: value,
        });
    };

    renderListProduct = (listProduct) => {
        let result = [];

        if (listProduct && listProduct.length > 0) {
            result = listProduct.map((item, index) => {
                this.state.sum += item.sum;
                return (
                    <li className="cart-right-item col-xl-12" key={item.item._id}>
                        <span className={"cart-right-item-header col-xl-4"}>
                            {item.item.name}
                        </span>
                        <div className={"col-xl-3"}>
                            <div className="gr-icon-change">
                                <RemoveCircleIcon
                                    className={
                                        Number(item.amount) > 1
                                            ? "icon-change "
                                            : "icon-change icon-disabled"
                                    }
                                    onClick={() =>
                                        this.handleValue(
                                            "remove",
                                            index,
                                            Number(item.amount),
                                            item.price
                                        )
                                    }
                                />
                                <span className="current-value">
                                    {Number(item.amount) >= 10
                                        ? Number(item.amount)
                                        : `0${Number(item.amount)}`}
                                </span>
                                <AddCircleIcon
                                    className="icon-change"
                                    onClick={() =>
                                        this.handleValue(
                                            "add",
                                            index,
                                            Number(item.amount),
                                            item.price
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <span className={"col-xl-2"}>{item.size}</span>
                        <span className={"col-xl-3 sumPrice"}>
                            {Number(item.amount) * item.item.price} VND{" "}
                            <ClearIcon
                                className={"icon-clear"}
                                onClick={() => this.deleteItem(item)}
                            />
                        </span>
                    </li>
                );
            });
        } else {
            return (
                <li className="cart-right-item col-xl-12">
                    <p className="w-100 text-center">
                        Giỏ hàng rỗng, vui lòng thêm sản phẩm!
                    </p>
                </li>
            );
        }
        return result;
    };

    deleteItem = (item) => {
        let { listProduct } = this.state;
        this.setState({ a: !this.state.a });
        if (listProduct && listProduct.length > 0) {
            this.props.deleteItemInCart(item);
            this.sumValue(listProduct);
            this.renderListProduct(this.state.listProduct);
        }
    };

    handleInput = (e) => {
        e.preventDefault();
        let target = e.target;
        let name = target.name;
        let value = target.value;
        let errors = this.state.errors;
        switch (name) {
            case "name":
                errors.name =
                    value.length < 5 ? "Full Name must be 5 characters long!" : "";
                break;
            case "email":
                errors.email = validEmailRegex.test(value)
                    ? ""
                    : "Vui lòng nhập email của bạn!!!";
                break;
            case "numberPhone":
                errors.numberPhone =
                    value.length < 8 ? "SDT ít nhất phải có 8 chữ số!!!" : "";
                break;
            case "address":
                errors.address =
                    value.length < 8 ? "Người anh em cho tôi xin cái địa chỉ!!!" : "";
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    };

    submitCart = async () => {
        console.log("this.props.userInfo", this.props)
        let today = new Date().toISOString().slice(0, 10)

        if (this.props.userLoggedIn) {
            const getProfile = JSON.parse(localStorage.getItem('profile'))
            console.log("getProfile", getProfile)
            let result = []
            this.state.listProduct.forEach(function (a) {
                if (!this[a.item._id]) {
                    this[a.item._id] = { id: a.item._id, sizeS: 0, sizeM: 0, sizeL: 0, item: a.item };
                    result.push(this[a.item._id]);
                }
                if (a.size === 'S') {
                    console.log("this[a.item._id].sizeS", typeof this[a.item._id].sizeS)
                    this[a.item._id].sizeS += Number(a.amount);
                }
                else if (a.size == 'M') {
                    this[a.item._id].sizeM += Number(a.amount);
                }
                else if (a.size == 'L') {
                    this[a.item._id].sizeL += Number(a.amount);
                }
            }, Object.create(null));
            console.log(result);

            let obj = {
                user: JSON.stringify(getProfile),
                arrProduct: JSON.stringify(result),
                price: this.state.sumProduct,
                status: 0,
                time: today
            };

            console.log("obj", obj)
            const config = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            }
            const response = await fetch("http://localhost:4000/admin/create-bill", config)
            const data = await response.json()
            console.log("data", data)
            if (data) {
                this.setState({
                    sumProduct: 0,
                    listProduct: [],
                });
                this.props.setCart([])
                toast.success("Bạn đã đặt hàng thành công")
            }
            else {
                toast.warn("Vui lòng nhập thông tin để xác nhận!");
            }
        } else {
            // name: "",
            // email: "",
            // numberPhone: "",
            // address: "",
            alert("day la truogn hop chua login");
            let obj = {
                name: this.state.name,
                listProduct: JSON.stringify(this.state.listProduct),
                price: this.state.sumProduct,
                address: this.state.address,
                numberPhone: this.state.numberPhone,
                email: this.state.email,
            };
            let checkForm = validateForm(this.state.errors);
            if (checkForm && this.state.listProduct.length > 0 && this.state.numberPhone.length > 0) {
                const config = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj)
                }
                const response = await fetch("http://localhost:4000/admin/create-product", config)
                const data = await response.json()
                console.log('data')
                if (data) {
                    this.setState({
                        listProduct: [],
                        sumProduct: 0,
                        a: false,
                        isLogin: false,
                        name: "",
                        email: "",
                        numberPhone: "",
                        address: "",
                    });
                    toast.success("Bạn đã đặt hàng thành công")
                }
                // let value = await services.userServices.OderConfirm(obj);
                // if (value.data && value.data.errCode === 0) {

                //   toast.success("Đặt hàng thành công!");
                //   this.props.clearListCart();
                // }
            }
            else {
                toast.warn("Vui lòng nhập thông tin để xác nhận!");
            }
        }
    };

    render() {
        let { errors } = this.state;
        return (
            <CartStyled>
                <p className="cart-title">
                    <ReceiptIcon /> Xác nhận đơn hàng
                </p>
                <div className="cart col-xl-12 d-flex">
                    {this.state.isLogin ? (
                        <div className="cart-right col-xl-8 " style={{ margin: "0 auto" }}>
                            <p className="cart-right-text">Thông tin đơn hàng</p>
                            <ul className="table cart-right-items">
                                <li className="cart-right-header col-xl-12">
                                    <span className="cart-right-header-item col-xl-4">Tên</span>
                                    <span className="cart-right-header-item col-xl-3">
                                        Số lượng
                                    </span>
                                    <span className="cart-right-header-item col-xl-2">Kích cỡ</span>
                                    <span className="cart-right-header-item col-xl-3">Tổng</span>
                                </li>

                                {this.renderListProduct(this.state.listProduct)}
                                <div className="cart-right-footer">
                                    <span>Tổng tiền:</span>
                                    <span>{this.state.sumProduct} VND</span>
                                </div>
                            </ul>

                            <div className={"div-btn"}>
                                <button
                                    type="submit"
                                    className="btn  btn-submit"
                                    onClick={this.submitCart}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="col-xl-12 d-flex">
                            <div className="cart-left col-xl-6 p-4">
                                <p className="cart-left-header">Thông tin của bạn</p>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Tên:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            name="name" value={this.state.name}
                                            onChange={this.handleInput}
                                            placeholder="Vui lòng nhập tên của bạn"
                                            required
                                        />
                                        {errors.name.length > 0 && (
                                            <span className="error">{errors.name}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email:</label>
                                        <input
                                            onChange={this.handleInput}
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            name="email"
                                            value={this.state.email}
                                            aria-describedby="emailHelp"
                                            placeholder="Vui lòng nhập nhập email"
                                        />
                                        {errors.email.length > 0 && (
                                            <span className="error">{errors.email}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPhone">
                                            Số điện thoại liên hệ:
                                        </label>
                                        <input
                                            onChange={this.handleInput}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPhone"
                                            name="numberPhone" value={this.state.numberPhone}
                                            aria-describedby="emailHelp"
                                            placeholder="Vui lòng nhập số điện thoại"
                                        />
                                        {errors.numberPhone.length > 0 && (
                                            <span className="error">{errors.numberPhone}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                                        <input
                                            onChange={this.handleInput}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputAddress"
                                            name="address" value={this.state.address}
                                            aria-describedby="emailHelp"
                                            placeholder="Vui lòng nhập địa chỉ"
                                        />
                                        {errors.address.length > 0 && (
                                            <span className="error">{errors.address}</span>
                                        )}
                                        <small id="emailHelp" className="form-text text-muted">
                                            *Thanh toán trực tiếp khi nhận hàng!!!
                                        </small>
                                    </div>
                                </form>
                            </div>
                            <div className="cart-right col-xl-6">
                                <p className="cart-right-text">Thông tin đơn hàng</p>
                                <ul className="table cart-right-items">
                                    <li className="cart-right-header col-xl-12">
                                        <span className="cart-right-header-item col-xl-4">Tên</span>
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

                                    {this.renderListProduct(this.props.listproducts)}
                                    <div className="cart-right-footer">
                                        <span>Tổng tiền:</span>
                                        <span>{this.state.sumProduct} VND</span>
                                    </div>
                                </ul>

                                <div className={"div-btn"}>
                                    <button
                                        type="submit"
                                        className="btn  btn-submit"
                                        onClick={this.submitCart}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CartStyled>
        );
    }
}


export default Cart;
