import DB from "../../database";
import Response from "../../system/helpers/Response";
import { fileUploader } from "../../system/fileUploader";
import GaragesService from "../../services/garageServices";
import { io } from "../../..";

const {Vehicles} = DB
export default class vehicleControllers{
    static async savePlateText(req,res){
        try {
            const {plateText, garageId} = req.body;
            let imageUrl: string;
            let garage:any = await GaragesService.findByPk(`${garageId}`);
            if (!garage) {
                return Response.error(res, 404, {
                    message: 'garage not found',
                });
            }
            const vehicle:any = await Vehicles.findOne({
                where:{
                    plateText, garageId
                }
            })
            if(vehicle){
                imageUrl = vehicle?.imageUrl;
                if(vehicle.isInside === true){

                    vehicle.set('isInside',!vehicle?.isInside); 
                    await vehicle.save();

                    garage.set('takenSlots',garage?.takenSlots-1); 
                    await garage.save();

                    //socket
                    io.sockets.emit("vehicle",{data:vehicle.dataValues})
                    io.sockets.emit("garage",{data:garage.dataValues})

                   return Response.success(res,200,{
                        message:"vehicle exit successfully",
                        data:vehicle
                   })
                } 
                else{
                    garage.set('takenSlots',garage?.takenSlots+1); 
                    garage = await garage.save();

                    vehicle.set('isInside',!vehicle?.isInside); 
                    await vehicle.save();

                    io.sockets.emit("vehicle",{data:vehicle.dataValues})
                    io.sockets.emit("garage",{data:garage.dataValues})

                    return Response.success(res,201,{
                        message:"Vehicle saved successfuly",
                        data:vehicle
                    })
                }
            }
            else{
                imageUrl = fileUploader(req.files.photo).filepath
                Vehicles.create({plateText,garageId,imageUrl}).then(async(resp)=>{
                    garage.set('takenSlots',garage?.takenSlots+1); 
                    garage = await garage.save();
                    
                    // vehicle.set('isInside',!vehicle?.isInside); 
                    // await vehicle.save();

                    //socket
                    io.sockets.emit("vehicle",{data:resp.toJSON()})
                    io.sockets.emit("garage",{data:garage?.dataValues})
                    
                    return Response.success(res,201,{
                        message:"Vehicle saved successfuly",
                        data:resp
                    })
    
                }).catch((err)=>{
                    return Response.error(res,401,{message:"fails to save This vehicle",error:err.message})
                })
            }
      
        } catch (error) {
            return Response.error(res,500,{message:"server error",error:error.message})
        }
    }

    static async getAllSaveVehicles(req,res){
        try {
            await Vehicles.findAndCountAll().then((resp)=>{
                return Response.success(res,201,{
                    message:"Vehicles retreived successfuly",
                    data:resp
                })
            }).catch((err)=>{
                return Response.error(res,401,{message:"fails to retreive all vehicles",error:err.message})
            })
        } catch (error) {
            return Response.error(res,500,{message:"server error",error:error.message})
        }
    }

    static async delete(req,res){
        try {
            const { id } = req.params;
            const vehicle = await Vehicles.findByPk(id);
            if(!vehicle){
                return Response.error(res,404,{
                    message:"Vehicle not found"
                })
            }
            await Vehicles.destroy({where:{
                id
            }}).then((resp)=>{
                return Response.success(res,200,{
                    message:"vehicle deleted successfull",
                    data:resp[0]
                })
            }).catch((error)=>{
                return Response.error(res,400,{
                    message:"Vehicle fails to be deleted",
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