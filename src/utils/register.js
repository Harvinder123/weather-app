const fs = require('fs')
const register = (username,password,callback) => {
    const users_data =  fs.readFileSync('./src/utils/user_details.json').toString();
    const users = JSON.parse(users_data);
    const duplicate_user = users.find((user) =>  user.username === username)
    if(!duplicate_user) {
        users.push({
            username:username,
            password:password
        })
        const user_json = JSON.stringify(users);
        fs.writeFileSync('./src/utils/user_details.json', user_json);
        callback(undefined, 'User Registered Successfully');
    }else{
        callback('Username Already Exists', undefined);
    }
}

module.exports = {
    register:register
}