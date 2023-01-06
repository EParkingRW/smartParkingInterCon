import DB from "../../database";
import Response from "../../system/helpers/Response";
import convertToSlug from "../../system/helpers/convertToSlug";

const { Companies } = DB;
export default class CompanyControllers{

    static async create(req,res){
        try {
            const slug = convertToSlug(req.body.name);
            let company = await Companies.findOne({
                where:{
                    slug
                }
            });
            if (company) {
                return Response.error(res, 400, {
                    message: 'Company is already exist',
                });
            }
            await Companies.create({...req.body,slug}).then((resp)=>{
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
                        data:resp
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
            let company:any = await Companies.findByPk(`${req.params.id}`);
            if (!company) {
                return Response.error(res, 404, {
                    message: 'Company not found',
                });
            }
            company.slug = req.body.name ? convertToSlug(req.body.name) : company.slug;
            company.set(req.body);
            company.save();
            return Response.success(res,200,{
                message:"company updated successfully",
                data:company
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