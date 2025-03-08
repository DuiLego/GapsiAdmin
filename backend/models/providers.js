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

const createProvider = async (provider) => {
    const db = await readDb();

    let new_provider = {
        ...provider, 
        id: db.providers.length ? db.providers[db.providers.length - 1].id + 1 : 1
    };

    db.providers.push(new_provider);
    await writeDb(db);

    return new_provider;
}

const getProviders = async () => {
    const db = await readDb();

    return db.providers;
}

const getProviderById = async (id) => {
    const db = await readDb();

    let provider = db.providers.find(provider => provider.id === id);

    return provider;
}

const getProviderByName = async (name) => {
    const db = await readDb();

    let provider = db.providers.find(provider => provider.name === name);

    return provider;
}

const getProviderByCompanyName = async (company_name) => {
    const db = await readDb();

    let provider = db.providers.find(provider => provider.company_name === company_name);

    return provider;
}

const updateProvider = async (id, provider) => {
    const db = await readDb();
    const provider_index = db.providers.findIndex(provider => provider.id === id);

    if (provider_index !== -1) {
        db.providers[provider_index] = { ...db.providers[provider_index], ...provider };

        await writeDb(db);

        return db.providers[provider_index];
    }

    return null;
}

const removeProvider = async (id) => {
    const db = await readDb();
    const provider_index = db.providers.findIndex(provider => provider.id === id);

    if (provider_index !== -1) {
        const deleted_provider = db.providers.splice(provider_index, 1);

        await writeDb(db);

        return deleted_provider;
    }

    return null;
}

module.exports = {
    createProvider,
    getProviders,
    getProviderById, 
    getProviderByName, 
    getProviderByCompanyName, 
    updateProvider,
    removeProvider
};
