const encryption = require('../utils/encryption');

class UserService {
    async boot() {
        const admin = await User.findOne({ email: getEnv('DEFAULT_ADMIN_EMAIL') }).lean();
        if (!admin) {
            const newPasswordHash = await encryption.hashPassword(getEnv('DEFAULT_ADMIN_PASSWORD'));
            if (!newPasswordHash.success) return newPasswordHash;

            const newAdmin = new User({
                email: getEnv('DEFAULT_ADMIN_EMAIL'),
                password: newPasswordHash.data,
                role: User.constants.ROLE.ADMIN,
            });
            await newAdmin.save();
        }
        return jsonSuccess();
    }

    async login(principal, params) {
        const { email, password } = params;

        //-- check email
        const user = await User.findOne({ email }).lean();
        if (!user)
            return jsonError(errors.INVALID_CREDENTIAL);

        //-- check the password
        const passwordCheckResult = await encryption.comparePassword(password, user.password);
        if (!passwordCheckResult.success) return passwordCheckResult;

        //-- generate token
        const { _id, role } = user;
        const tokenResult = await encryption.generateToken(
            { _id, role },
            getEnv('JWT_SECRET'),
            getEnv('JWT_LOGIN_EXPIRED_IN')
        );
        if (!tokenResult.success) return tokenResult;

        return jsonSuccess({
            token: tokenResult.data,
        });
    }
}

module.exports = UserService;
