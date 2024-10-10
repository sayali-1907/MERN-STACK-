app.get('/api/pie-chart', async (req, res) => {
    const { month } = req.query;

    const startDate = new Date(`2023-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    try {
        const categoryData = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
            { $group: { _id: '$category', itemCount: { $sum: 1 } } }
        ]);

        res.json(categoryData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
