const fs = require('fs');
const contact = (firstname,lastname,email,message,callback) => {
    const contact_data =  fs.readFileSync('./src/utils/contact_details.json').toString();
    const users = JSON.parse(contact_data);
    if(users){
        users.push({
            firstname:firstname,
            lastname:lastname,
            email:email,
            message:message
        })
    }
        const user_json = JSON.stringify(users);
        fs.writeFileSync('./src/utils/contact_details.json', user_json);
        callback(undefined, 'Mail Sent Successfully');
}

module.exports = {
    contact:contact
}