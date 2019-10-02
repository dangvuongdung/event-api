const encryption = require("../utils/encryption");

class UserService {
    async boot() {
        const admin = await User.findOne({ email: getEnv("DEFAULT_ADMIN_EMAIL") }).lean();
        if (!admin) {
            const newPasswordHash = await encryption.hashPassword(getEnv("DEFAULT_ADMIN_PASSWORD"));
            if (!newPasswordHash.success) return newPasswordHash;

            const newAdmin = new User({
                email: getEnv("DEFAULT_ADMIN_EMAIL"),
                password: newPasswordHash.data,
                role: User.constants.ROLE.ADMIN,
            });
            await newAdmin.save();
        }
        return jsonSuccess();
    }
}

module.exports = UserService;
