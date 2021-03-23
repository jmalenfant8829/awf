var dbUrl = process.env.DB_URL;
if (process.env.NODE_ENV === "test") {
    dbUrl = process.env.TEST_DB_URL;
}

module.exports = {
    'jwt-secret': process.env.JWT_SECRET,
    'database': dbUrl,
};