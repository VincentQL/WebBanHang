import styled from 'styled-components';
import { Link } from "react-router-dom";
import "./login.css"

function DangKy() {
    return (
        <div class="containers">
            <h1>Đăng ký tài khoản</h1>
            <form>
                <div class="form-controls">
                    <input type="email" id="name" placeholder="Họ và tên" />
                    <span></span>
                    <small></small>
                </div>
                <div class="form-controls">
                    <input type="email" id="email" placeholder="Email" />
                    <span></span>
                    <small></small>
                </div>
                <div class="form-controls">
                    <input type="password" id="password" placeholder="Mật khẩu" />
                    <span></span>
                    <small></small>
                </div>

                <div class="form-controls">
                    <input type="password" id="re_password" placeholder="Nhập lại mật khẩu" />
                    <span></span>
                    <small></small>
                </div>
                <div class="form-controls">
                    <input type="password" id="address" placeholder="Địa chỉ" />
                    <span></span>
                    <small></small>
                </div>
                <div class="form-controls">
                    <input type="tel" id="numberPhone" placeholder="Số điện thoại" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    <span></span>
                    <small></small>
                </div>

                <div class="form-controls">
                    <input type="date" id="birthday" placeholder="Ngày sinh" name="birthday" />
                    <span></span>
                    <small></small>
                </div>
                <div class="form-controls">
                    <select name="cars" id="cars" style={{ width: "100%" }}>
                        <option>Giới tính</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                    </select>
                </div>



                <p class="submit" onclick="userLogin()">Đăng ký</p>
                <div class="signup_link">Bạn đã có tài khoản? <Link to="/dangky">Đăng nhập</Link></div>
            </form>
        </div>
    );
}

export default DangKy;
