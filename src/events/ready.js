module.exports = {
    name: 'ready',
    once: true,
    execute(db, client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        db.sync({ force: true }); // remove force option once finished testing
        db.authenticate()
            .then(() => console.log("Database connection successfully establised."))
            .catch(err => console.log(err));
    },
};