
export default (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal error';
    return res.status(status).json({ 
      success: false,
      message,
      status,
      hi:'hello'
    });
  };
  