import Response from '../helpers/Response';
import * as uuid from 'uuid';
import { v2 } from 'cloudinary';

const cloudinary = v2;
const uuids = uuid.v4();
const public_id = `projects/smartparking/${uuids}_${Date.now()/1000}`

  export default class cloudinari {
    static async uploadPhoto(req: any, res: any,file: { tempFilePath: any; }) {
        try {
          cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
          });
          const opts ={
            public_id,
            overwrite:true,
            invalidate:true,
            //resource_type:"auto",
            tags: 'basic_sample'
          }
          return new Promise((resolve,reject)=>{
            cloudinary.uploader.upload(file.tempFilePath,{...opts},(error,result)=>{
              if(result && result.secure_url){
                return resolve(result.secure_url);
              }
              return reject(error.message)
            })
          })
        } catch (error) {
            return Response.error(res,403,{message:"Fail to save image on cloudinary", error:error.message})
        }
      }
  }

