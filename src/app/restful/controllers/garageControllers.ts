import Response from "../../system/helpers/Response";
import { fileUploader } from "../../system/fileUploader";
import GaragesService from "../../services/garageServices";
import { io } from "../../..";

export default class GarageControllers{

    static async create(req,res){
        try {
            const { name } = req.body
            let garage = await GaragesService.findOne({name});
            if (garage) {
                return Response.error(res, 400, {
                    message: 'garage is already exist',
                });
            }
            let imageUrl = fileUploader(req.files.image).filepath;
            await GaragesService.create({...req.body,imageUrl}).then((resp)=>{
                io.sockets.emit("garage",{data:resp?.toJSON()})
                return Response.success(res,201,{
                    message:"Garage created successfully",
                    data:resp
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"garage fail to be saved",
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

    static async getOne(req,res){
        try {
            let garage:any = await GaragesService.findByPk(`${req.params.id}`);
            if (!garage) {
                return Response.error(res, 404, {
                    message: 'garage not found',
                });
            }
            io.sockets.emit("garage",{data:garage?.dataValues})
            return Response.success(res,200,{
                message:"Garage retreived successfully",
                data:garage
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
            await GaragesService.findAllAndCount().then((resp)=>{
                if(!resp?.count){
                    return Response.error(res,203,{
                        message:"there is not garage in the system",
                    })
                }
                io.sockets.emit("garages",{data:resp})
                return Response.success(res,200,{
                    message:"garages retreived successfully",
                    data:resp
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"there is problem in retreiving garages",
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

    static async update(req,res){
        try {
            let garage:any = await GaragesService.findByPk(`${req.params.id}`);
            if (!garage) {
                return Response.error(res, 404, {
                    message: 'garage not found',
                });
            }
            let imageUrl = req.files? fileUploader(req.file.image).filepath :garage?.imageUrl;
            await GaragesService.update({...req.body,imageUrl},{
              id:req.paarams.id
            }).then((resp)=>{
                return Response.success(res,200,{
                    message:"garage updated successfully",
                    data:resp[0]
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"there is problem in updating garage",
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
            let garage = await GaragesService.findByPk(`${req.params.id}`);
            if (!garage) {
                return Response.error(res, 404, {
                    message: 'garage not found',
                });
            }
            await GaragesService.destroy({
                    id:`${req.params.id}`
            }).then((resp)=>{
                return Response.success(res,200,{
                    message:"garage deleted successfully",
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"there is problem in deleting garage",
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