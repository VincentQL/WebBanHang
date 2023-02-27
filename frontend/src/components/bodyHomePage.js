import styled from 'styled-components';
import Logo from "./../images/logo/NHOM6.png"
import Sanphamphobien from './sanphamphobien';
import HomeBanner from './banner';
import "./index.css"
import Sanphammoi from './sanphammoi';
import Sanphamhot from './sanphamhot';

function BodyHomePage() {
    return (
        <>
            <HomeBanner />


            <div>
                <div className="product">
                    <div className="container">
                        <Sanphamphobien />
                        <Sanphammoi />
                        <Sanphamhot />
                        <section className="awe-section-9">
                            <div className="section_policy clearfix">
                                <div className="col-12">
                                    <div className="owl-policy-mobile">
                                        <div className="owl-stage-outer">
                                            <div className="owl-stage">
                                                <div className="owl-item">
                                                    <div className="section_policy_content">
                                                        <a href="">
                                                            <img src="https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_1.png?1628514159582"
                                                                alt="" />
                                                            <div className="section-policy-padding">
                                                                <h3>Miễn phí vận chuyển</h3>
                                                                <div className="section_policy_title">Cho các đơn hàng</div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="owl-item">
                                                    <div className="section_policy_content">
                                                        <a href="">
                                                            <img src="https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_2.png?1628514159582"
                                                                alt="" />
                                                            <div className="section-policy-padding">
                                                                <h3>Hỗ trợ 24/7</h3>
                                                                <div className="section_policy_title">Liên hệ hỗ trợ 24h/ngày</div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="owl-item">
                                                    <div className="section_policy_content">
                                                        <a href="">
                                                            <img src="	https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_3.png?1628514159582"
                                                                alt="" />
                                                            <div className="section-policy-padding">
                                                                <h3>Hoàn tiền 100%</h3>
                                                                <div className="section_policy_title">Nếu sản phẩm bị lỗi, hư hỏng</div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="owl-item">
                                                    <div className="section_policy_content">
                                                        <a href="">
                                                            <img src="https://bizweb.dktcdn.net/100/344/983/themes/704702/assets/policy_images_4.png?1628514159582"
                                                                alt="" />
                                                            <div className="section-policy-padding">
                                                                <h3>Thanh toán</h3>
                                                                <div className="section_policy_title">Được bảo mật 100%</div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="product__yml">
                            <h3 className="product__yml title-product">Có thể bạn sẽ thích</h3>
                            <div className="row" id="listProductYml">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BodyHomePage;
