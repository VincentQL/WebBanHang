
const bcrypt = require('bcrypt');

const Shirt = require("../models/shirt");
const Shoes = require("../models/shoes");
const Clothes = require("../models/clothes");
const User = require("../models/user");
const { MongooseObject, mutiMongooseObject } = require("../util/Mongoose");

var salt = bcrypt.genSaltSync(10);

class AdminController {
    // Thêm sản phẩm
    getProduct = async (req, res, next) => {
        if (req.body) {
            Promise.all([Shirt.find({}), Shoes.find({}), Clothes.find({})])
                .then(([shirt, shoes, clothes]) => {
                    res.json({
                        shirt: mutiMongooseObject(shirt),
                        shoes: mutiMongooseObject(shoes),
                        clothes: mutiMongooseObject(clothes),
                    });
                })
                .catch(next);
        }
        else {
            return res.status(500).json({
                errCode: 1,
                mess: "Thông tin rỗng, vui lòng nhập lại",
            });
        }

    }
    // Thêm user
    createUser = async (req, res, next) => {
        console.log("req.body", req.body)
        if (req.body) {
            let hashPassword = await bcrypt.hashSync(req.body.password, salt);
            req.body.password = hashPassword;
            req.body = new User(req.body);
            req.body
                .save()
                .then(() =>
                    res.json({
                        success: true,
                    })
                )
                .catch(next);
        }
        else {
            return res.status(500).json({
                errCode: 1,
                mess: "Thông tin rỗng, vui lòng nhập lại",
            });
        }


    }
    // Lấy tất cả user
    getUser(req, res, next) {
        User.find()
            .then(users => {
                res.json({
                    users: mutiMongooseObject(users),
                });
            })
            .catch(error => {
                console.log(error);
            });

    }

    // Đăng nhập
    login = async (req, res, next) => {
        const account = req.body.account;
        const password = req.body.password;
        console.log("req.body",req.body)
        if (!account || !password) {
            return res.status(500).json({
                errCode: 1,
                mess: "Tài khoản hoặc mật khẩu rỗng",
            });
        } else {
            const user = await User.findOne({ account: account })
            if (user) {
                let result = await bcrypt.compareSync(password, user.password);
                if (result) {
                    return res.status(200).json({ errCode: 0, user: user });
                }
                else {
                    return res.status(500).json({
                        errCode: 2,
                        mess: "Mật khẩu không đúng, vui lòng thử lại",
                    });
                }
            }
            else {
                return res.status(500).json({
                    errCode: 3,
                    mess: "Tài khoản không tồn tại",
                });
            }

        }

    }

    edit(req, res, next) {
        Promise.all([
            Shirt.findById(req.params.id),
            Shoes.findById(req.params.id),
            Clothes.findById(req.params.id),
        ])
            .then(([shirt, shoes, clothes]) => {
                let value;
                if (shirt != null) {
                    value = MongooseObject(shirt);
                    res.json({ value });
                } else if (shoes != null) {
                    value = MongooseObject(shoes);
                    res.json({ value });
                } else {
                    value = MongooseObject(clothes);
                    res.json({ value });
                }
            })
            .catch(next);
    }

    update(req, res, next) {
        Promise.all([
            Shirt.updateOne({ _id: req.params.id }, req.body),
            Shoes.updateOne({ _id: req.params.id }, req.body),
            Clothes.updateOne({ _id: req.params.id }, req.body),
        ])
            .then(() => {
                return res.json({ success: true });
            })
            .catch(next);
    }

    async createProduct(req, res, next) {
        switch (req.body.type) {
            case "shirt":
                if (req.body) {
                    req.body = new Shirt(req.body);
                    req.body
                        .save()
                        .then(() =>
                            res.json({
                                success: true,
                            })
                        )
                        .catch(next);
                    break;
                }
                else {
                    return res.status(500).json({
                        errCode: 1,
                        mess: "Thông tin sản phẩm không đủ, vui lòng nhập đủ",
                    });
                }
            case "shoes":
                if (req.body) {
                    req.body = new Shoes(req.body);
                    req.body
                        .save()
                        .then(() =>
                            res.json({
                                success: true,
                            })
                        )
                        .catch(next);
                    break;
                }
                else {
                    return res.status(500).json({
                        errCode: 1,
                        mess: "Thông tin sản phẩm không đủ, vui lòng nhập đủ",
                    });
                }

            case "clothes":
                if (req.body) {
                    req.body = new Clothes(req.body);
                    req.body
                        .save()
                        .then(() =>
                            res.json({
                                success: true,
                            })
                        )
                        .catch(next);
                    break;
                }
                else {
                    return res.status(500).json({
                        errCode: 1,
                        mess: "Thông tin sản phẩm không đủ, vui lòng nhập đủ",
                    });
                }

            default:
                break;
        }
    }



    destroy(req, res, next) {
        Promise.all([
            ListCafe.delete({ _id: req.params.id }),
            ListPhindi.delete({ _id: req.params.id }),
            ListEspresso.delete({ _id: req.params.id }),
        ])
            .then(() => {
                res.json({
                    success: true,
                });
            })
            .catch(next);
    }

    destroyPower(req, res, next) {
        Promise.all([
            ListCafe.deleteOne({ _id: req.params.id }),
            ListPhindi.deleteOne({ _id: req.params.id }),
            ListEspresso.deleteOne({ _id: req.params.id }),
        ])
            .then(() => {
                res.json({
                    success: true,
                });
            })
            .catch(next);
    }
    handleForm(req, res, next) {
        switch (req.body.action) {
            case "Delete":
                Promise.all([
                    ListCafe.delete({ _id: { $in: req.body.coursesIds } }),
                    ListPhindi.delete({ _id: { $in: req.body.coursesIds } }),
                    ListEspresso.delete({ _id: { $in: req.body.coursesIds } }),
                ])
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            case "Restore":
                Promise.all([
                    ListCafe.restore({ _id: { $in: req.body.coursescoursesIds } }),
                    ListPhindi.restore({ _id: { $in: req.body.coursesIds } }),
                    ListEspresso.restore({ _id: { $in: req.body.coursesIds } }),
                ])
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            case "DeleteAll":
                Promise.all([
                    ListCafe.deleteOne({ _id: { $in: req.body.coursesIds } }),
                    ListPhindi.deleteOne({ _id: { $in: req.body.coursesIds } }),
                    ListEspresso.deleteOne({ _id: { $in: req.body.coursesIds } }),
                ])
                    .then(() => {
                        res.redirect("back");
                    })
                    .catch(next);
                break;
            default:
                break;
        }
    }
    trashMenu(req, res, next) {
        Promise.all([
            ListCafe.findDeleted(),
            ListPhindi.findDeleted(),
            ListEspresso.findDeleted(),
        ])
            .then(([cafe, phindi, espresso]) => {
                return res.json({
                    cafe: mutiMongooseObject(cafe),
                    phindi: mutiMongooseObject(phindi),
                    espresso: mutiMongooseObject(espresso),
                });
            })
            .catch(next);
    }

    restore(req, res, next) {
        console.log("req.params.id", req.params.id);
        Promise.all([
            ListCafe.restore({ _id: req.params.id }),
            ListPhindi.restore({ _id: req.params.id }),
            ListEspresso.restore({ _id: req.params.id }),
        ])
            .then(() => res.redirect("back"))
            .catch(next);
    }
}
module.exports = new AdminController();


