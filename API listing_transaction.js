app.get('/api/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    // Calculate the start and end date for the selected month
    const startDate = new Date(`2023-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Build search query
    const searchQuery = search
        ? {
              $or: [
                  { title: { $regex: search, $options: 'i' } },
                  { description: { $regex: search, $options: 'i' } },
                  { price: { $regex: search, $options: 'i' } }
              ],
              dateOfSale: { $gte: startDate, $lt: endDate }
          }
        : {
              dateOfSale: { $gte: startDate, $lt: endDate }
          };

    try {
        const transactions = await Transaction.find(searchQuery)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        const totalRecords = await Transaction.countDocuments(searchQuery);

        res.json({
            page: parseInt(page),
            perPage: parseInt(perPage),
            totalRecords,
            transactions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
