import DB from "../../database";
import Response from "../../system/helpers/Response";
import GaragesService from "../../services/garageServices";
import { io } from "../../..";
import cloudinari from "../../system/fileUploader/cloudinary";
import SocketRooms from "../../system/sockets/rooms";
import VehicleService from "../../services/vehicleServices";

const {Vehicles, Garages } = DB
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
            if(vehicle){//if car was inside or is returning to park again
                imageUrl = vehicle?.imageUrl;
                if(vehicle.isInside === true){ // check if it is inside

                    vehicle.set('isInside',!vehicle?.isInside); 
                    await vehicle.save();

                    garage.set('takenSlots',garage?.takenSlots-1); 
                    await garage.save({
                        include:[ {
                            model: Garages,
                            attributes:['name','slots','takenSlots'],
                            as:'garage'
                          }]
                    });

                    //socket
                    // io.sockets.emit("vehicle",{data:vehicle.dataValues})
                    io.sockets.emit("garage",{data:garage.dataValues})
                    SocketRooms.room(`${garageId}`);
                    io.to(`${garageId}`).emit("garageRoom",{data:garage.dataValues})
                    io.to(`${garageId}`).emit("vehicleRoom",{data:vehicle.dataValues})

                   return Response.success(res,200,{
                        message:"vehicle exit successfully",
                        data:vehicle
                   })
                } 
                else{ //car was in this parking before and is returning
                    garage.set('takenSlots',garage?.takenSlots+1); 
                    garage = await garage.save();

                    vehicle.set('isInside',!vehicle?.isInside); 
                    await vehicle.save({
                        include:[ {
                            model: Garages,
                            attributes:['name','slots','takenSlots'],
                            as:'garage'
                          }]
                    });

                    // io.sockets.emit("vehicle",{data:vehicle.dataValues})
                    io.sockets.emit("garage",{data:garage.dataValues})



                    // SocketRooms.room(`${garageId}`);
                    // // io.to(`${garageId}`).emit("GarageRoom",{garage:garage.dataValues})
                    // io.to(`${garageId}`).emit("vehicleRoom",{data:vehicle.dataValues})

                    SocketRooms.room(`${garageId}`);
                    io.to(`${garageId}`).emit("garageRoom",{data:garage.dataValues});
                    io.to(`${garageId}`).emit("vehicleRoom",{data:vehicle.dataValues});

                    return Response.success(res,201,{
                        message:"Vehicle saved successfuly",
                        data:vehicle
                    })
                }
            }
            else{ // here is when car is new in this parking
                try {
                    imageUrl = await cloudinari.uploadPhoto(req, res, req.files.photo);
                  } catch (error) {
                    return res.status(400).json({
                      message: 'image fail to be saved',
                      error,
                    });
                  }
                Vehicles.create({plateText,garageId,imageUrl},{
                    include:[ {
                        model: Garages,
                        attributes:['name','slots','takenSlots'],
                        as:'garage'
                      }]
                }).then(async(resp)=>{
                    garage.set('takenSlots',garage?.takenSlots+1); 
                    garage = await garage.save();
                    
                    // vehicle.set('isInside',!vehicle?.isInside); 
                    // await vehicle.save();

                    //socket
                    // io.sockets.emit("vehicle",{data:resp.toJSON()})
                    io.sockets.emit("garage",{data:garage?.dataValues})

                    SocketRooms.room(`${garageId}`);
                    io.to(`${garageId}`).emit("garageRoom",{data:garage.dataValues});
                    io.to(`${garageId}`).emit("vehicleRoom",{data:resp.toJSON()});
                    
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
            await Vehicles.findAndCountAll({
                include:[ {
                    model: Garages,
                    attributes:['name','slots','takenSlots'],
                    as:'garage'
                  }]
            }).then((resp)=>{
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

    static async getVehiclesByDateRange(req,res){
        const toTimeStamp = (strDate) => { 
            const dt = Date.parse(strDate); 
            return dt; 
           }
        try {
            const { userId } = req;
            const { startingDate, endingDate} = req.body;
            const garage:any = await GaragesService.findOne({userId});
            if(!garage){
                return Response.error(res,404,{
                    mesage:"you don't have any garage of your own",
                    data:[]
                })
            }
            const garageId = garage.id;
            await VehicleService.findvehiclesByDateRange({garageId,startingDate:toTimeStamp(startingDate),endingDate:toTimeStamp(endingDate)}).then((resp)=>{
                return Response.success(res,201,{
                    message:"Vehicles retreived successfuly",
                    data:resp
                })
            }).catch((error)=>{
                return Response.error(res,403,{message:"Failed to retreive vehicles",erraor:error.message})
            })
        } catch (error) {
            return Response.error(res,500,{message:"server error",error:error.message})
        }
    }

    static async leavingSocketRoom(req,res){
        try {
            const { id } = req.params;
            SocketRooms.leave(id).then(()=>{
                return Response.success(res,200,{
                    message:"You leave room successfully",
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"Fail to let you leave the room",
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