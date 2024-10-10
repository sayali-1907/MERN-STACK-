app.get('/api/bar-chart', async (req, res) => {
    const { month } = req.query;

    const startDate = new Date(`2023-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    try {
        // Grouping by price ranges
        const priceRangeData = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
            {
                $bucket: {
                    groupBy: '$price',
                    boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901],
                    default: '901-above',
                    output: { count: { $sum: 1 } }
                }
            }
        ]);

        res.json(priceRangeData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
