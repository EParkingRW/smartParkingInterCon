export default class Response {
    static error(res, status: number, error: object) {
      return res.status(status).json({status,...error});
    }
  
    static success(res, status: number, data: object) {
      return res.status(status).json({status,...data});
    }
  }
  