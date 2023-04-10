import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "./sanpham.css";



function ProductSale({ setCart }) {
    const [localPath, setLocalPath] = useState()
    const [product, setProduct] = useState([])
    const [currentID, setCurrentID] = useState()
    const [currentSize, setActive] = useState("S")
    const [size, setSize] = useState("S")


    const AddToCart = (item) => {
        // eslint-disable-next-line no-unused-expressions
        if (!currentID || item._id != currentID) {
            toast.warn("Vui lòng chọn sản phẩm ")
        }
        else {
            const amount = currentID && document.getElementsByClassName(currentID)[0].value ? document.getElementsByClassName(currentID)[0].value : "1"
            if (size === 'S') {
                Number(amount) < item.sizeS ? setCart(cart => [...cart, { item, amount, size }]) : toast.warn("Vượt quá số lượng sản phẩm hiện có, vui lòng thử lại")

            }
            else if (size === 'M') {
                Number(amount) < item.sizeM ? setCart(cart => [...cart, { item, amount, size }]) : toast.warn("Vượt quá số lượng sản phẩm hiện có, vui lòng thử lại")

            }
            else {
                Number(amount) < item.sizeL ? setCart(cart => [...cart, { item, amount, size }]) : toast.warn("Vượt quá số lượng sản phẩm hiện có, vui lòng thử lại")
            }
            toast.success("Bạn đã thêm sản phẩm vào giỏ thành công!")

        }
    }

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
            console.log("data", data)
            setProduct({
                shirt: data.shirt,
                clothes: data.clothes,
                shoes: data.shoes
            });

        }

        fetchMyAPI()

    }, [])
    useEffect(() => {
        async function fetchData() {
            setLocalPath(window.location.pathname)
        }
        // console.log(contractStakingETH, account);
        fetchData();
    }, [window.location.pathname]);




    const renderProductSale = () => {
        if (localPath == '/shirt') {
            return product.shirt && product.shirt.length > 0 && product.shirt.length > 0 && product.shirt.map((item, i) => {
                return (<div className="col-lg-3 col-md-6 col-sm-12 mb-30" key={item._id}>
                <div className="product__new-item">
                    <div className="card" style={{ width: "100%" }}>
                        <div>
                            <img className="card-img-top" src={item.img} alt={item.img} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title custom__name-product">
                                {item.name}
                            </h5>
                             <div className= "product__price  d-flex justify-content-between font-weight-bold " >
                                    <p className="card-text ">
                                        {`Đã bán ${Number(item.currentSold)}`}</p>

                                <p className="card-text price-color product__price-new text-bold">

                                    {item.price} đ
                                </p>
                            </div>
                            <div className="home-product-item__action">

                                <div className="product__size d-flex" style={{ alignItems: "center" }}>
                                    <div className="title" style={{ fontSize: "16px", marginRight: "10px" }}>
                                        Kích thước:
                                    </div>
                                    <div className="select-swap">
                                        <div className="swatch-element" data-value={item._id} >
                                            <input type="radio" className={`variant-1 `} id={`swatch-giay-${item._id}-1`} name={item._id} checked={currentSize === `S-${item._id}`}
                                                value="S" />
                                            <label for={`swatch-giay-${item._id}-1`} className="sd" onClick={() => {
                                                setActive(`S-${item._id}`)
                                                setSize("S")
                                                setCurrentID(item._id)
                                            }}><span>S</span></label>
                                        </div>
                                        <div className="swatch-element" data-value={item._id}>
                                            <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-2`} name={item._id} checked={currentSize === `M-${item._id}`}
                                                value="M" />
                                            <label for={`swatch-giay-${item._id}-2`} className="sd" onClick={() => {
                                                setActive(`M-${item._id}`)
                                                setSize("M")
                                                setCurrentID(item._id)

                                            }}><span>M</span></label>
                                        </div>
                                        <div className="swatch-element" data-value={item._id}>
                                            <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-3`} name={item._id} checked={currentSize === `L-${item._id}`}
                                                value="L" />
                                            <label for={`swatch-giay-${item._id}-3`} className="sd" onClick={() => {
                                                setActive(`L-${item._id}`)
                                                setSize("L")
                                                setCurrentID(item._id)
                                            }}><span>L</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__wrap">
                                <div className="product__amount w-100">
                                    <div className="product__wap-change d-flex justify-content-center">
                                        <p for="" className="soluong">Nhập số lượng: </p>
                                        <input type="number" onChange={() => { setCurrentID(item._id) }} className={`text-input ${item._id}`} placeholder='1' />
                                    </div>
                                </div>
                            </div>
                            <div className="product__shopnow">
                                <button className="shopnow2" onClick={() => AddToCart(item)}>Mua ngay</button>
                            </div>
                        </div>
                        {item.sale > 0 && <div className="sale-off">
                            <span className="sale-off-percent">{item.sale}%</span>
                            <span className="sale-off-label">GIẢM</span>
                        </div>}
                    </div>
                </div>
            </div>)
            })
        }
        else if (localPath == '/clothes') {
            return product.clothes && product.clothes.length > 0 && product.clothes.length > 0 && product.clothes.map((item, i) => {
                return (<div className="col-lg-3 col-md-6 col-sm-12 mb-30" key={item._id}>
                <div className="product__new-item">
                    <div className="card" style={{ width: "100%" }}>
                        <div>
                            <img className="card-img-top" src={item.img} alt={item.img} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title custom__name-product">
                                {item.name}
                            </h5>
                             <div className= "product__price  d-flex justify-content-between font-weight-bold " >
                                    <p className="card-text ">
                                        {`Đã bán ${Number(item.currentSold)}`}</p>

                                <p className="card-text price-color product__price-new text-bold">

                                    {item.price} đ
                                </p>
                            </div>
                            <div className="home-product-item__action">

                                <div className="product__size d-flex" style={{ alignItems: "center" }}>
                                    <div className="title" style={{ fontSize: "16px", marginRight: "10px" }}>
                                        Kích thước:
                                    </div>
                                    <div className="select-swap">
                                        <div className="swatch-element" data-value={item._id} >
                                            <input type="radio" className={`variant-1 `} id={`swatch-giay-${item._id}-1`} name={item._id} checked={currentSize === `S-${item._id}`}
                                                value="S" />
                                            <label for={`swatch-giay-${item._id}-1`} className="sd" onClick={() => {
                                                setActive(`S-${item._id}`)
                                                setSize("S")
                                                setCurrentID(item._id)
                                            }}><span>S</span></label>
                                        </div>
                                        <div className="swatch-element" data-value={item._id}>
                                            <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-2`} name={item._id} checked={currentSize === `M-${item._id}`}
                                                value="M" />
                                            <label for={`swatch-giay-${item._id}-2`} className="sd" onClick={() => {
                                                setActive(`M-${item._id}`)
                                                setSize("M")
                                                setCurrentID(item._id)

                                            }}><span>M</span></label>
                                        </div>
                                        <div className="swatch-element" data-value={item._id}>
                                            <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-3`} name={item._id} checked={currentSize === `L-${item._id}`}
                                                value="L" />
                                            <label for={`swatch-giay-${item._id}-3`} className="sd" onClick={() => {
                                                setActive(`L-${item._id}`)
                                                setSize("L")
                                                setCurrentID(item._id)
                                            }}><span>L</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__wrap">
                                <div className="product__amount w-100">
                                    <div className="product__wap-change d-flex justify-content-center">
                                        <p for="" className="soluong">Nhập số lượng: </p>
                                        <input type="number" onChange={() => { setCurrentID(item._id) }} className={`text-input ${item._id}`} placeholder='1' />
                                    </div>
                                </div>
                            </div>
                            <div className="product__shopnow">
                                <button className="shopnow2" onClick={() => AddToCart(item)}>Mua ngay</button>
                            </div>
                        </div>
                        {item.sale > 0 && <div className="sale-off">
                            <span className="sale-off-percent">{item.sale}%</span>
                            <span className="sale-off-label">GIẢM</span>
                        </div>}
                    </div>
                </div>
            </div>)
            })
        }
        else if (localPath == '/shoes') {

            return product.shoes && product.shoes.length > 0 && product.shoes.length > 0 && product.shoes.map((item, i) => {
                return (<div className="col-lg-3 col-md-6 col-sm-12 mb-30" key={item._id}>
                    <div className="product__new-item">
                        <div className="card" style={{ width: "100%" }}>
                            <div>
                                <img className="card-img-top" src={item.img} alt={item.img} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title custom__name-product">
                                    {item.name}
                                </h5>
                                 <div className= "product__price  d-flex justify-content-between font-weight-bold " >
                                    <p className="card-text ">
                                        {`Đã bán ${Number(item.currentSold)}`}</p>

                                    <p className="card-text price-color product__price-new text-bold">

                                        {item.price} đ
                                    </p>
                                </div>
                                <div className="home-product-item__action">

                                    <div className="product__size d-flex" style={{ alignItems: "center" }}>
                                        <div className="title" style={{ fontSize: "16px", marginRight: "10px" }}>
                                            Kích thước:
                                        </div>
                                        <div className="select-swap">
                                            <div className="swatch-element" data-value={item._id} >
                                                <input type="radio" className={`variant-1 `} id={`swatch-giay-${item._id}-1`} name={item._id} checked={currentSize === `S-${item._id}`}
                                                    value="S" />
                                                <label for={`swatch-giay-${item._id}-1`} className="sd" onClick={() => {
                                                    setActive(`S-${item._id}`)
                                                    setSize("S")
                                                    setCurrentID(item._id)
                                                }}><span>S</span></label>
                                            </div>
                                            <div className="swatch-element" data-value={item._id}>
                                                <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-2`} name={item._id} checked={currentSize === `M-${item._id}`}
                                                    value="M" />
                                                <label for={`swatch-giay-${item._id}-2`} className="sd" onClick={() => {
                                                    setActive(`M-${item._id}`)
                                                    setSize("M")
                                                    setCurrentID(item._id)

                                                }}><span>M</span></label>
                                            </div>
                                            <div className="swatch-element" data-value={item._id}>
                                                <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-3`} name={item._id} checked={currentSize === `L-${item._id}`}
                                                    value="L" />
                                                <label for={`swatch-giay-${item._id}-3`} className="sd" onClick={() => {
                                                    setActive(`L-${item._id}`)
                                                    setSize("L")
                                                    setCurrentID(item._id)
                                                }}><span>L</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product__wrap">
                                    <div className="product__amount w-100">
                                        <div className="product__wap-change d-flex justify-content-center">
                                            <p for="" className="soluong">Nhập số lượng: </p>
                                            <input type="number" onChange={() => { setCurrentID(item._id) }} className={`text-input ${item._id}`} placeholder='1' />
                                        </div>
                                    </div>
                                </div>
                                <div className="product__shopnow">
                                    <button className="shopnow2" onClick={() => AddToCart(item)}>Mua ngay</button>
                                </div>
                            </div>
                            {item.sale > 0 && <div className="sale-off">
                                <span className="sale-off-percent">{item.sale}%</span>
                                <span className="sale-off-label">GIẢM</span>
                            </div>}
                        </div>
                    </div>
                </div>)
            })
        }
        else {
            return product.clothes && product.clothes.length > 0 && product.clothes.length > 0 && product.clothes.map((item, i) => {
                return (<div className="col-lg-3 col-md-6 col-sm-12 mb-30" key={item._id}>
                <div className="product__new-item">
                    <div className="card" style={{ width: "100%" }}>
                        <div>
                            <img className="card-img-top" src={item.img} alt={item.img} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title custom__name-product">
                                {item.name}
                            </h5>
                             <div className= "product__price  d-flex justify-content-between font-weight-bold " >
                                    <p className="card-text ">
                                        {`Đã bán ${Number(item.currentSold)}`}</p>

                                <p className="card-text price-color product__price-new text-bold">

                                    {item.price} đ
                                </p>
                            </div>
                            <div className="home-product-item__action">

                                <div className="product__size d-flex" style={{ alignItems: "center" }}>
                                    <div className="title" style={{ fontSize: "16px", marginRight: "10px" }}>
                                        Kích thước:
                                    </div>
                                    <div className="select-swap">
                                        <div className="swatch-element" data-value={item._id} >
                                            <input type="radio" className={`variant-1 `} id={`swatch-giay-${item._id}-1`} name={item._id} checked={currentSize === `S-${item._id}`}
                                                value="S" />
                                            <label for={`swatch-giay-${item._id}-1`} className="sd" onClick={() => {
                                                setActive(`S-${item._id}`)
                                                setSize("S")
                                                setCurrentID(item._id)
                                            }}><span>S</span></label>
                                        </div>
                                        <div className="swatch-element" data-value={item._id}>
                                            <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-2`} name={item._id} checked={currentSize === `M-${item._id}`}
                                                value="M" />
                                            <label for={`swatch-giay-${item._id}-2`} className="sd" onClick={() => {
                                                setActive(`M-${item._id}`)
                                                setSize("M")
                                                setCurrentID(item._id)

                                            }}><span>M</span></label>
                                        </div>
                                        <div className="swatch-element" data-value={item._id}>
                                            <input type="radio" className="variant-1" id={`swatch-giay-${item._id}-3`} name={item._id} checked={currentSize === `L-${item._id}`}
                                                value="L" />
                                            <label for={`swatch-giay-${item._id}-3`} className="sd" onClick={() => {
                                                setActive(`L-${item._id}`)
                                                setSize("L")
                                                setCurrentID(item._id)
                                            }}><span>L</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__wrap">
                                <div className="product__amount w-100">
                                    <div className="product__wap-change d-flex justify-content-center">
                                        <p for="" className="soluong">Nhập số lượng: </p>
                                        <input type="number" onChange={() => { setCurrentID(item._id) }} className={`text-input ${item._id}`} placeholder='1' />
                                    </div>
                                </div>
                            </div>
                            <div className="product__shopnow">
                                <button className="shopnow2" onClick={() => AddToCart(item)}>Mua ngay</button>
                            </div>
                        </div>
                        {item.sale > 0 && <div className="sale-off">
                            <span className="sale-off-percent">{item.sale}%</span>
                            <span className="sale-off-label">GIẢM</span>
                        </div>}
                    </div>
                </div>
            </div>)
            })
        }

    }

    return (
        <>
           

            <div className="product__new">
                <h3 className="product__ne title-product1"><ins>Hàng Mới Về</ins></h3>
                <div className="row" id="quanmoive">
                    {renderProductSale()}
                </div>
            </div>
        </>
    );
}

export default ProductSale;
