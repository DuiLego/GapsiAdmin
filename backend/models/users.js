const fs = require('fs');
const path = require('path');

const dbPath = path.join('config/', 'db.json');

const readDb = async () => {
    const data = await fs.readFileSync(dbPath);

    return JSON.parse(data);
}

const writeDb = async (data) => {
    await fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

const createUser = async (user) => {
    const db = await readDb();

    let new_user = {
        ...user, 
        id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1
    };

    db.users.push(new_user);
    await writeDb(db);

    const package_json = JSON.parse(fs.readFileSync(path.join('', 'package.json'), 'utf8'));

    return {
        ...new_user, 
        version: package_json.version
    };
}

const getUsers = async () => {
    const db = await readDb();

    return db.users;
}

const getUserById = async (id) => {
    const db = await readDb();

    let user = db.users.find(user => user.id === id);
    const package_json = JSON.parse(fs.readFileSync(path.join('', 'package.json'), 'utf8'));

    if(user){
        return {
            ...user, 
            version: package_json.version
        };
    }

    return null;
}

const getUserByUsername = async (username) => {
    const db = await readDb();

    let user = db.users.find(user => user.username === username);
    const package_json = JSON.parse(fs.readFileSync(path.join('', 'package.json'), 'utf8'));

    if(user){
        return {
            ...user, 
            version: package_json.version
        };
    }

    return null;
}

module.exports = {
    createUser,
    getUsers,
    getUserById, 
    getUserByUsername
};
