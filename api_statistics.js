app.get('/api/statistics', async (req, res) => {
    const { month } = req.query;

    const startDate = new Date(`2023-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    try {
        // Total sale amount
        const totalSale = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lt: endDate }, sold: true } },
            { $group: { _id: null, totalSaleAmount: { $sum: '$price' } } }
        ]);

        // Total sold and unsold items
        const totalSoldItems = await Transaction.countDocuments({
            dateOfSale: { $gte: startDate, $lt: endDate },
            sold: true
        });

        const totalUnsoldItems = await Transaction.countDocuments({
            dateOfSale: { $gte: startDate, $lt: endDate },
            sold: false
        });

        res.json({
            totalSaleAmount: totalSale[0]?.totalSaleAmount || 0,
            totalSoldItems,
            totalUnsoldItems
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
