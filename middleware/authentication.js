const JWT = require('jsonwebtoken');

// FUNCTION TO AUTHENTICATE EACH USER ACCESSING A PROTECTED ROUTE
const authenticateUser = async (req, res, next) => {
  // CHECK IF HEADERS HAVE THE BEAR WITH JWT TOKEN
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // console.log('Error occurred');
    res.status(401).send('Unauthorized');
  } else {
    // SPLIT THE TOKEN INTO TWO(AN ARRAY) AND GET THE SECOND PART(THE ACTUAL TOKEN - LEAVE 'Bear' TEXT)
    const token = authHeader.split(' ')[1];
    try {
      // JWT.verify() method returns a payload which holds userId()that is then used to
      // modify the database,other returned values is when the token was initialized and when it will expire.
      const payload = JWT.verify(token, process.env.JWT_SECRET);
      // console.log(payload);
      // payload is: { userId: '63e69ee471eea96576349459', iat: 1676480115, exp: 1676566515 }
      req.user = { userId: payload.userId };
      // USE JWT TOKEN TO AUTHENTICATE USER AND GET AND PASS THE USER ID IN THE req TO USE
      // TO IDENTITY THE USER HENCE FORTH AND MANIPULATE THE DATABASE USING THIS USER ID
      next();
    } catch (error) {
      // Reomove the second call to `send` on `res`
      res.status(401).send(error.message);
      // throw new Error('Authentication invalid');
    }
  }
};

module.exports = { authenticateUser };
