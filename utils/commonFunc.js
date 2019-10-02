const pagination = (total, page = 1, limit = 10) => {
    return {
        total,
        page,
        limit,
        offset: (page - 1) * limit,
        pages: (total % limit) ? Math.floor(total / limit) + 1 : total / limit
    }
};

module.exports = { pagination };
