const bcrypt = require('bcrypt');

let password = "$2b$10$V.WmP5LjSb5l0lPlcbTu4uDNrZkh.dZK4Sy/cKGs.D0OzQzG71ayq"

let passwordLogin = "user123"
const main = async () => {
    let result = await bcrypt.compareSync( passwordLogin,password);

    console.log('result', result)
}
main()
