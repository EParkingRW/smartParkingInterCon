import UserService from '../../services/userServices';
import Response from '../../system/helpers/Response';

export default class userControllers{

    static async getAll(req,res){
      try {
        const {rows,count} = await UserService.findAllAndCount();
        return Response.success(res,200,{
            rows,count
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
            const { id } = req.params;
            const user = await UserService.findByPk(id);
            if(!user){
                return Response.error(res,404,{
                    message:"user not found"
                })
            }
            return Response.success(res,200,{
                message:"user found successfully",
                data:user
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
            const user = await UserService.findByPk(id);
            if(!user){
                return Response.error(res,404,{
                    message:"user not found"
                })
            }
            user.set({...req.body});
            user.save();
            return Response.success(res,200,{
                message: 'user updated successfully',
                data:user
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
            
            const { id } = req.params;
            const user = await UserService.findByPk(id);
            if(!user){
                return Response.error(res,404,{
                    message:"user not found"
                })
            }
            UserService.destroy({id}).then(()=>{
                return Response.success(res,200,{
                    message:"user deleted successfully"
                })
            }).catch((error)=>{
                return Response.error(res,401,{
                    message:"unable to delete user",
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