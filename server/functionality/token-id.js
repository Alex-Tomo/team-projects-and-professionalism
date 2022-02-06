
/**
 * Work in progress.
 * 
 */
 exports.tokenId = (req, res, next) => {
  const token = req.headers["x-access-token"].split('.');
  const encodedPayload = token[1];
  const rawPayload = Buffer.from(encodedPayload, 'base64');
  const user = JSON.parse(rawPayload)
  
  const bill = await User.findAll({
      where: {
        id: user.id
      }
    });

    req.tokenUserId = bill[0].dataValues.username;
}