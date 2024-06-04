/* eslint-disable no-unreachable */



import config from "../config/config.js";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (e) {
     console.log(e);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletPost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
        console.log(error)
        return null
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
        console.log(error)
        return null
    }
  }

  async getAllPost(){
    try{
       return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("status","active")]
       )
    }
    catch(error) {
     console.log(error)
    }
  }

//file upload service

async uploadFile(file){
    try{
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    }
    catch(e){
        console.log(e)
        return null
    }
}

async deleteFile(fileId){
    try{
         await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true
    }
    catch(e){
        console.log(e)
        return false
    }
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(config.appwriteBucketId,
        fileId
    )
}

}

const service = new Service();
export default service;
