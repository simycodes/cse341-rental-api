// THIS IS A CONTROLLER FILE

// GET AS SINGLE CONTACT
const displayHome = async (req, res) => {
  try {
    res
      .status(200)
      .json('Api is working! - See the routes.rest file for all api supported routes. Thanks');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { displayHome };
