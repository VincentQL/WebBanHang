import React, { Component } from "react";
import PersonAdd from '@mui/icons-material/PersonAdd';
import styled from "styled-components"

const AddUserStyled = styled.div`
   
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
.addUser {
  width: 100%;
  margin: 0 10%;
  .login-left {
    font-size: 21px;
    label {
      color: black;
      font-weight: 500;
    }

    .login-left-header {
      font-size: 24px;
      font-weight: bold;

    }
.error{
  color: red;
}
    input {
      border-radius: 25px;
      border: 1px solid;
      padding:21px;
    }


    input:focus {
      border: 1px solid rgb(36, 32, 82);
    }
  }

  .div-btn {
    justify-content: end;
    display: flex;

    .btn-submit {
      color: white;
      background-color: rgb(0, 30, 60)
    }
    .btn-submit:hover{
          opacity: 0.8
      }
  }
}
`

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => {
        val.length > 0 && (valid = false);
    });
    return valid;
};

function AddUser() {


    // handleInput = (e) => {
    //     e.preventDefault();
    //     let target = e.target;
    //     let name = target.name;
    //     let value = target.value;
    //     let errors = this.state.errors;
    //     switch (name) {
    //         case "fullname":
    //             errors.fullname =
    //                 value.length < 6 ? "Full Name must be 5 characters long!" : "";
    //             break;
    //         case "email":
    //             errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
    //             break;
    //         case "password":
    //             errors.password =
    //                 value.length < 6 ? "Password must be 6 characters long!" : "";
    //             break;
    //         case "numberPhone":
    //             errors.numberPhone =
    //                 value.length < 9 ? "Number must be 9 characters long!" : "";
    //             break;
    //         case "address":
    //             errors.address = value.length < 6 ? "Address is Null" : "";
    //             break;
    //         default:
    //             break;
    //     }

    //     this.setState({ errors, [name]: value });
    // };

    // SubmitDK = async (e) => {
    //     e.preventDefault();
    //     let { fullname, email, numberPhone, address, password, roleID } =
    //         this.state;
    //     // if (fullname && email && numberPhone && address && password) {
    //     //     let check = validateForm(this.state.errors);
    //     //     if (check) {
    //     //         let value = await services.userServices.createUser({
    //     //             fullname,
    //     //             email,
    //     //             numberPhone,
    //     //             address,
    //     //             password,
    //     //             roleID,
    //     //         });
    //     //         if (value.data && value.data.errCode === 0) {
    //     //             toast.success("Thêm người dùng thành công!!!");
    //     //             this.setState({
    //     //                 currentCode: "",
    //     //                 fullname: "",
    //     //                 email: "",
    //     //                 numberPhone: "",
    //     //                 address: "",
    //     //                 password: "",
    //     //                 roleID: 0,
    //     //                 errors: {
    //     //                     fullname: "",
    //     //                     email: "",
    //     //                     numberPhone: "",
    //     //                     address: "",
    //     //                     password: "",
    //     //                 },
    //     //             })
    //     //         } else {
    //     //             toast.warn("Người dùng tồn tại!!!");
    //     //         }
    //     //     } else {
    //     //         toast.warn("Thêm người dùng thất bị!!!");
    //     //     }
    //     // }
    // };

    return (
        <AddUserStyled>
            <div className="addUser col-xl-12">
                <div className="login-left col-xl-8 ">
                    <p className="admin-title"> <PersonAdd className="icon" />Thêm người dùng</p>
                    <form noValidate>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Tên:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="fullname"
                                // value={this.state.fullname}
                                // onChange={this.handleInput}
                                placeholder="Vui lòng nhập tên của bạn"
                                required
                            />
                            {/* {errors.fullname.length > 0 && (
                                    <span className="error">{errors.fullname}</span>
                                )} */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="email"
                                // value={this.state.email}
                                // onChange={this.handleInput}
                                aria-describedby="emailHelp"
                                placeholder="Vui lòng nhập nhập email"
                            />
                            {/* {errors.email.length > 0 && (
                                    <span className="error">{errors.email}</span>
                                )} */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Mật khẩu:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                // value={this.state.password}
                                // onChange={this.handleInput}
                                placeholder="Vui lòng nhập mật khẩu"
                                required
                            />
                            {/* {errors.password.length > 0 && (
                                    <span className="error">{errors.password}</span>
                                )} */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPhone">Số điện thoại liên hệ:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputPhone"
                                name="numberPhone"
                                // value={this.state.numberPhone}
                                // onChange={this.handleInput}
                                aria-describedby="emailHelp"
                                placeholder="Vui lòng nhập số điện thoại"
                                required
                            />
                            {/* {errors.numberPhone.length > 0 && (
                                    <span className="error">{errors.numberPhone}</span>
                                )} */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputAddress">Địa chỉ:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputAddress"
                                name="address"
                                // value={this.state.address}
                                // onChange={this.handleInput}
                                aria-describedby="emailHelp"
                                placeholder="Vui lòng nhập địa chỉ"
                                required
                            />
                            {/* {errors.address.length > 0 && (
                                    <span className="error">{errors.address}</span>
                                )} */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputAddress">Ngày/tháng/năm sinh:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                // value={this.state.address}
                                // onChange={this.handleInput}
                                required
                            />
                            {/* {errors.address.length > 0 && (
                                    <span className="error">{errors.address}</span>
                                )} */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputAddress">Giới tính:</label>
                            <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                            //   value={this.state.roleID}
                            //   onChange={this.changeSelect}
                            >
                                <option >---Chọn giới tính của bạn---</option>
                                <option value={1}>Nam</option>
                                <option value={0}>Nữ</option>
                            </select>
                            {/* {errors.address.length > 0 && (
                                    <span className="error">{errors.address}</span>
                                )} */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputAddress">Quyền truy cập:</label>
                            <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                            //   value={this.state.roleID}
                            //   onChange={this.changeSelect}
                            >
                                <option >---Admin hay user---</option>
                                <option value={1}>Admin</option>
                                <option value={0}>User</option>
                            </select>
                            {/* {errors.address.length > 0 && (
                                    <span className="error">{errors.address}</span>
                                )} */}
                        </div>
                        <div className={"div-btn"}>
                            <button
                                type="submit"
                                className="btn btn-submit mb-4"
                            // onClick={this.SubmitDK}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AddUserStyled>
    );
}


export default AddUser;
