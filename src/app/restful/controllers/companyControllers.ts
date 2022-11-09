import DB from "../../database";
import Response from "../../system/helpers/Response";

const { Companies } = DB;
export default class CompanyControllers{

    static async create(req,res){
        try {
            let company = await Companies.findOne({
                where:{
                    name:req.body.name
                }
            });
            if (company) {
                return Response.error(res, 400, {
                    message: 'Company is already exist',
                });
            }
            await Companies.create({...req.body}).then((resp)=>{
                return Response.success(res,201,{
                    message:"company created successfully",
                    data:resp
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"there is problem in saving new company",
                    error:error.message
                })
            })
            
        } catch (error) {
            return Response.error(res,500,{
                message:"server error",
                error:error.message
            })
        }
    }
    static async getAll(req,res){
        try {
            await Companies.findAndCountAll().then((resp)=>{
                if(!resp?.count){
                    return Response.error(res,203,{
                        message:"there is not company in the system",
                    })
                }
                return Response.success(res,200,{
                    message:"companies retreived successfully",
                    data:resp
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"there is problem in retreiving companies",
                    error:error.message
                })
            })
            
        } catch (error) {
            return Response.error(res,500,{
                message:"server error",
                error:error.message
            })
        }
    }

    static async  getOne(req,res){
        try {
            let company = await Companies.findByPk(`${req.params.id}`);
            if (!company) {
                return Response.error(res, 404, {
                    message: 'Company not found',
                });
            }

            return Response.success(res,200,{
                message:"company retreived successful",
                data:company
            })
        } catch (error) {
            return Response.error(res,500,{
                message:"server error",
                error:error.message
            })
        }
    }

    static async update(req,res){
        try {
            let company = await Companies.findByPk(`${req.params.id}`);
            if (!company) {
                return Response.error(res, 404, {
                    message: 'Company not found',
                });
            }
            await Companies.update({...req.body},{
                where:{id:req.paarams.id}
            }).then((resp)=>{
                return Response.success(res,200,{
                    message:"company updated successfully",
                    data:resp[0]
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"there is problem in updating companies",
                    error:error.message
                })
            })
            
        } catch (error) {
            return Response.error(res,500,{
                message:"server error",
                error:error.message
            })
        }
    }

    static async delete(req,res){
        try {
            let company = await Companies.findByPk(`${req.params.id}`);
            if (!company) {
                return Response.error(res, 404, {
                    message: 'Company not found',
                });
            }
            await Companies.destroy({
                where:{
                    id:`${req.params.id}`
                }
            }).then((resp)=>{
                return Response.success(res,200,{
                    message:"company deleted successfully",
                    data:resp[0]
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"there is problem in deleting company",
                    error:error.message
                })
            })
            
        } catch (error) {
            return Response.error(res,500,{
                message:"server error",
                error:error.message
            })
        }
    }

}