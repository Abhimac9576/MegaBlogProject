import {Client , Databases , Storage,Query ,ID} from "appwrite"
import conf from "../conf/conf"


export class Services {
client = new Client()
databases;
bucket;

constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
}

async createPost({title,slug,content,featuredImage, status, userId}){
try {
    return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
            userId
        }
    )
} catch (error) {
    console.log("Appwrite Service :: create Post :: error ",error)
}
}

async updatePost(slug,{title,content,featuredImage, status}){
    try {
        await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
    } catch (error) {
        console.log("Appwrite Service :: update post :: error",error);
    }
}

async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true
    } catch (error) {
        console.log("Appwrite service :: DeletePost :: error ",error);
        return false
    }
}

async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite Service :: getPost :: error ",error);
        return false
    }

}

async getPosts(queries=[Query.equal("status","active")]){
try {
    return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
    )
} catch (error) {
    console.log("Appwrite Services :: getAllPost :: error ",error);
    return false
}
}


//Upload file
async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("appwrite Service :: upload File :: error",error);
        return false
    }
}

async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("Appwrite Service :: deleteFile :: error",error);
        return false
    }
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
}

downloadFile(fileId){
    return this.bucket.getFileDownload(
        conf.appwriteBucketId,
        fileId
    )
}

}

const service =  new Services()

export default service