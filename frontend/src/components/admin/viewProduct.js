import ReceiptIcon from "@mui/icons-material/Receipt";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OrderStyled = styled.div`
    .admin-title {
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
  color: rgb(36, 32, 82);
}

.admin {
  padding: 0 5%;

  .admin-left {
    margin: 0 auto;
    .admin-left-header {
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

  .admin-right {
    .div-btn {
      display: flex;
      justify-content: end;
      margin-right:24px;
      .btn-submit{
        border: 1px solid;
        border-radius:250px;
      }

    }
    .admin-right-text {
      font-size: 24px;
      font-weight: bold;
    }
    .inputImg{
      width: 60%;
    }
    .reviewimg{
      position: absolute;
      width: 100px;
      height: 200px;
      top: -20px;
      right: 0;
      .img{
          width: 100%;
      }
  }

    .admin-right-items {
      list-style: none;
      padding: 0;
      border: 2px solid rgb(36, 32, 82);
      border-radius: 10px;
      .text-cart{
        width: 100%;
        text-align: center;
        margin: 0 auto;
      }
      span {
        margin: auto;

      }

      .admin-right-header,
      .admin-right-item {
        padding: 12px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid;
        cursor: pointer;
        text-align: center;
    font-size: 18px;

        .btn-all-item{
          background: #001e3c;
          color: white;
          border-radius:25px;
        }
        .btn-delete{
          background:red;
          color: white;
          border-radius:25px;
        }
        .btn-edit{
          background:orange;
          color: white;
          border-radius:25px;
        }
        .btn-all-item:hover{
            opacity: 0.8
        }

      }

      .admin-right-header, .admin-right-footer {
        font-size: 24px;
        font-weight: bold;
      }

      .admin-right-footer {
        display: flex;
        justify-content: space-around;
        padding: 6px;

      }
    }
  }
}
`
function ViewProduct() {
    const [product, setProduct] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {

        async function fetchMyAPI() {
            const config = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },

            }
            const response = await fetch("http://localhost:4000/admin/get-product", config)
            const data = await response.json()
            setProduct({
                shirt: data.shirt,
                clothes: data.clothes,
                shoes: data.shoes
            });
        }

        fetchMyAPI()

    }, [])

    console.log(product)

    const renderListShirt = () => {
        let currentIndex = index
        return product.shirt && product.shirt.length > 0 && product.shirt.map((item) => {
            currentIndex++
            return (
                <li className="admin-right-item col-xl-12" key={item._id}>
                    <span className="admin-right-header-item col-xl-1">{index}</span>
                    <span className="admin-right-header-item col-xl-3">
                        {item.name}
                    </span>

                    <span className="admin-right-header-item col-xl-2">
                        Áo
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        {item.currentQuantity}
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        <Link to={`/admin/item-order/type=$item.token?id=1`}>
                            <button type="submit" className="btn btn-edit btn-all-item">
                                Chỉnh sửa
                            </button>
                        </Link>
                    </span>

                    <span className="admin-right-header-item col-xl-2 bg-red">
                        <Link to={`/admin/item-order/?token=$item.token`}>
                            <button type="submit" className="btn btn-delete btn-all-item">
                                Xóa
                            </button>
                        </Link>
                    </span>
                </li>
            );
        })
        setIndex(currentIndex)

    };
    const renderListClothes = () => {
        let currentIndex = index
        return product.clothes && product.clothes.length > 0 && product.clothes.map((item) => {
            currentIndex++
            return (
                <li className="admin-right-item col-xl-12" key={item._id}>
                    <span className="admin-right-header-item col-xl-1">{index}</span>
                    <span className="admin-right-header-item col-xl-3">
                        {item.name}
                    </span>

                    <span className="admin-right-header-item col-xl-2">
                        Áo
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        {item.currentQuantity}
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        <Link to={`/admin/item-order/type=$item.token?id=1`}>
                            <button type="submit" className="btn btn-edit btn-all-item">
                                Chỉnh sửa
                            </button>
                        </Link>
                    </span>

                    <span className="admin-right-header-item col-xl-2 bg-red">
                        <Link to={`/admin/item-order/?token=$item.token`}>
                            <button type="submit" className="btn btn-delete btn-all-item">
                                Xóa
                            </button>
                        </Link>
                    </span>
                </li>
            );
        })
        setIndex(currentIndex)

    };
    const renderListShoes = () => {
        let currentIndex = index
        return product.shoes && product.shoes.length > 0 && product.shoes.map((item) => {
            currentIndex++
            return (
                <li className="admin-right-item col-xl-12" key={item._id}>
                    <span className="admin-right-header-item col-xl-1">{index}</span>
                    <span className="admin-right-header-item col-xl-3">
                        {item.name}
                    </span>

                    <span className="admin-right-header-item col-xl-2">
                        Áo
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        {item.currentQuantity}
                    </span>
                    <span className="admin-right-header-item col-xl-2">
                        <Link to={`/admin/item-order/type=$item.token?id=1`}>
                            <button type="submit" className="btn btn-edit btn-all-item">
                                Chỉnh sửa
                            </button>
                        </Link>
                    </span>

                    <span className="admin-right-header-item col-xl-2 bg-red">
                        <Link to={`/admin/item-order/?token=$item.token`}>
                            <button type="submit" className="btn btn-delete btn-all-item">
                                Xóa
                            </button>
                        </Link>
                    </span>
                </li>
            );
        })
        setIndex(currentIndex)


    };

    return (
        <OrderStyled>
            <div className="adminPage-body ">
                <p className="admin-title">
                    <ReceiptIcon />
                    Tất cả sản phẩm
                </p>
                <div className="admin">
                    <div className="admin-right ">
                        <p className="admin-right-text">Danh sách sản phẩm</p>
                        <ul className="table admin-right-items">
                            <li className="admin-right-header col-xl-12">
                                <span className="admin-right-header-item col-xl-1">STT</span>
                                <span className="admin-right-header-item col-xl-3">
                                    Tên sản phẩm
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Danh mục
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Số lượng còn lại
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Chỉnh sửa
                                </span>
                                <span className="admin-right-header-item col-xl-2">
                                    Xóa
                                </span>
                            </li>
                            {renderListShirt()}
                            {renderListClothes()}
                            {renderListShoes()}

                        </ul>
                    </div>
                </div>
            </div>
        </OrderStyled>
    );
}



export default ViewProduct;
