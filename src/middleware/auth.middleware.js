const auth = async (req, res, next) =>{
  console.log(req.payload.id);
}

module.exports = { 
  auth
}