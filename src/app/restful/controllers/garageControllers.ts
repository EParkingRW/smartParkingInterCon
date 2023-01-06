import Response from "../../system/helpers/Response";
import cloudinari from "../../system/fileUploader/cloudinary";
import GaragesService from "../../services/garageServices";
import convertToSlug from "../../system/helpers/convertToSlug";
import { io } from "../../..";


export default class GarageControllers{

    static async create(req, res) {
        try {
          const { name } = req.body;
          const { userId } = req;
          const { image } = req.files;
          const slug = convertToSlug(name);
          let imageUrl: any;
      
          let garage = await GaragesService.findOne({ slug });
          if (garage) {
            return res.status(400).json({
              message: 'garage is already exist',
            });
          }
      
          try {
            imageUrl = await cloudinari.uploadPhoto(req, res, image);
          } catch (error) {
            return res.status(400).json({
              message: 'image fail to be saved',
              error,
            });
          }
      
          try {
            const resp = await GaragesService.create({ ...req.body, userId, imageUrl,slug });
            io.sockets.emit('garage', { data: resp.toJSON() });
            const garages = await GaragesService.findAllAndCount();
            io.sockets.emit('garages', { data: garages });
            return res.status(201).json({
              message: 'Garage created successfully',
              data: resp,
            });
          } catch (error) {
            return res.status(401).json({
              message: 'garage fail to be saved',
              error: error.message,
            });
          }
        } catch (error) {
          return res.status(500).json({
            message: 'server error',
            error: error.message,
          });
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
            const { id } = req.params;
            let garageExist:any = await GaragesService.findByPk(`${id}`);
            if (!garageExist) {
                return Response.error(res, 404, {
                    message: 'garage not found',
                });
            }
            const imageUrl = req.files
            ? await cloudinari.uploadPhoto(req, res, req.files.image).catch((error) =>
                Response.error(res,400,{
                    message: 'image fail to be saved',
                    error, 
                })
              )
            : garageExist?.imageUrl;
            const slug = req.body.name ? convertToSlug(req.body.name): garageExist.slug;
            garageExist.imageUrl = imageUrl;
            garageExist.slug=slug;
            garageExist.set(req.body);
            garageExist.save();
            return Response.success(res,200,{
                message:"garage updated successfully",
                data:garageExist
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