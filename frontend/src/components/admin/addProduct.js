import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { useState } from "react";


const AddProductStyled = styled.div`
    .admin-title {
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
  color: rgb(36, 32, 82);
}

.admin {
  padding: 0 10%;

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
    font-size: 18px;
    font-weight: 600;
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
      top: 0;
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
const mdParser = new MarkdownIt();

function AddProduct() {
    const [isOpen, setIsOpen] = useState(false)
    const [avatar, setAvatar] = useState()
    const [reviewImg, setReviewImg] = useState(null)
    const [name, setName] = useState()
    const [type, setType] = useState()
    const [price, setPrice] = useState()
    const [currentQuantity, setCurrentQuantity] = useState()
    const [size, setSize] = useState()
    const [color, setColor] = useState()

    const handleChange = async (selectedOption) => {
        // this.setState({ selectedOption });
    };

    const handleEditorChange = ({ html, text }) => {
        // this.setState({
        //   contentMarkdown: text,
        //   contentHTML: html,
        // });
    };

    const onChangeFormInput = (e) => {
        // let target = e.target;
        // let name = target.name;
        // let value = target.value;
        // this.setState({
        //   [name]: value,
        // });
    };
    async function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleFile = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await getBase64(file);
            let objectURL = URL.createObjectURL(file);
            setAvatar(base64)
            setReviewImg(objectURL)
        }
    };



    const submitForm = async () => {
        let today = new Date().toISOString().slice(0, 10)

        if (name && type && price && currentQuantity && size && color && avatar) {
            const config = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    type: type,
                    status: true,
                    price: price,
                    sale: '0',
                    img: avatar,
                    currentQuantity: currentQuantity,
                    currentSold: 0,
                    size: size,
                    color: color,
                    date: today,
                    updateDate: today
                })
            }
            const response = await fetch("http://localhost:4000/admin/create-product", config)
            const data = await response.json()
            console.log('data',data)
        }
        else {
            toast.warn("Vui lòng nhập đầy đủ thông tin!")
        }
        // let value = await services.userServices.addProduct({
        //   name: this.state.name,
        //   descriptionHTML: this.state.contentHTML,
        //   descriptionMarkdown: this.state.contentMarkdown,
        //   img: this.state.avatar,
        //   roleID: this.state.roleID,
        //   price: this.state.price,
        // });
        // if (value.data && value.data.errCode === 0) {
        //   this.setState({
        //     isOpen: false,
        //     contentMarkdown: "",
        //     contentHTML: "",
        //     reviewImg: null,
        //     roleID: "",
        //     name: "",
        //     price: "",
        //     avatar: "",
        //   });
        //   toast.success("Thêm sản phẩm thành công!!!");
        // } else {
        //   toast.warn("Thêm sản phẩm thành công!!!");
        // }
    };
    return (
        <AddProductStyled>


            < ToastContainer
                position="top-right"
                autoClose={5000}
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
            <div className="col-xl-12">
                <p className="admin-title mt-4">Thêm sản phẩm</p>
                <div className="admin">
                    <div className="admin-right ">
                        <p className="admin-right-text">Nhập vào đây: </p>
                        <form className="form-group col-xl-12">
                            <div className="d-flex">
                                <div className="form-group col-xl-6">
                                    <label htmlFor="exampleInputPassword1">Tên sản phẩm:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="name"
                                        //   value={this.state.name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Tên sản phẩm"
                                        required
                                    />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label htmlFor="exampleInputPassword1">Giá:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="price"
                                        //   value={this.state.price}
                                        onChange={(e) => setPrice(e.target.value)}

                                        placeholder="Giá"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="form-group col-xl-6">
                                    <label htmlFor="exampleInputPassword1">Số lượng sản phẩm:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="name"
                                        //   value={this.state.name}
                                        onChange={(e) => setCurrentQuantity(e.target.value)}
                                        placeholder="Nhập số lượng sản phẩm"
                                        required
                                    />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label htmlFor="exampleInputPassword1">Kích cỡ:</label>
                                    <select
                                        class="form-control"
                                        id="exampleFormControlSelect1"
                                        //   value={this.state.roleID}
                                        onChange={(e) => setSize(e.target.value)}
                                    >
                                        <option >---Kích cỡ sản phẩm---</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="form-group col-xl-6">
                                    <label htmlFor="exampleInputPassword1">Màu sắc:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="name"
                                        //   value={this.state.name}
                                        onChange={(e) => setColor(e.target.value)}

                                        placeholder="Màu sản phẩm"
                                        required
                                    />
                                </div>
                                <div className="form-group col-xl-6">
                                    <label htmlFor="exampleInputPassword1">Danh mục sản phẩm:</label>
                                    <select
                                        class="form-control"
                                        id="exampleFormControlSelect1"
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option >---Chọn danh mục---</option>
                                        <option value="shirt">Áo</option>
                                        <option value="clothes">Quần</option>
                                        <option value="shoes">Giày</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex">

                                <div className="form-group col-xl-6">
                                    <p htmlFor="exampleInputEmail1">Ảnh sản phẩm:</p>
                                    <input
                                        type="file"
                                        name="reviewImg"
                                        className="inputImg"
                                        onChange={handleFile}
                                    />
                                    <div
                                        className="reviewimg"

                                    >
                                        {reviewImg !== null && (
                                            <img
                                                src={reviewImg}
                                                className="img"
                                                alt="reviewImg"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="exampleInputPassword1">Thông tin liên quan: </label>

                            <MdEditor
                                style={{ height: "500px" }}
                                renderHTML={(text) => mdParser.render(text)}
                            //   onChange={this.handleEditorChange}
                            //   value={this.state.contentMarkdown}
                            />
                        </form>
                        <div className={"div-btn"}>
                            <button
                                type="submit"
                                className="btn btn-submit btn-primary"
                                onClick={submitForm}
                            >
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AddProductStyled>
    );
}


export default AddProduct;
