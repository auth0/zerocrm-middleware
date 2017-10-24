const jsonParser=require('body-parser').json();

function createZeroCRMMiddleware() {
  return (req, res, next) => {
    const ctx = req.webtaskContext;
    const compiler = ctx.compiler;
      
    return compiler.nodejsCompiler(compiler.script, (error, webtaskFn) => {
      if (error) return next(error);
      jsonParser(req,res,(parseError) => {
        if (parseError)
          return next(parseError);
        webtaskFn.secrets = ctx.secrets;  
        return webtaskFn(req.body, (error, result) => {
          if (error) return next(result);

          res.writeHead(200, {
            'content-type': 'application/json',
          });
          res.end(JSON.stringify(result, null, 2));
        });
      });
    });
  }
}

module.exports = createZeroCRMMiddleware;