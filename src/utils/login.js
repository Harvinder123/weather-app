const fs = require('fs')

const login = (username,password, callback) => {
    const users_data =  fs.readFileSync('./src/utils/user_details.json').toString();
    const users_parse_data = JSON.parse(users_data);
    const check_user = users_parse_data.filter(function(user) {
        if(user.username === username && user.password === password) {
            return true;
        }
    })
    if(check_user.length) {
        callback(undefined,'Login Successfully');
    } else {
        callback('Incorrect username or password', undefined);
    }
}

module.exports = {
    login:login
}