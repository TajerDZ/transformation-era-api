import {createWriteStream, existsSync} from "fs";
import {GraphQLError} from "graphql";
import path from "path";
import { v4 as UUID } from 'uuid';
import {fileURLToPath} from "url";
import sharp from 'sharp';

import 'dotenv/config'
import {createReadStream as fsCreateReadStream} from "node:fs";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


export const Upload = async (image: any) => {
    const listType = ["JPEG", "JPG", "PNG"]
    try {
        const { createReadStream, filename, mimetype, encoding } = await image;

        const imgType = filename.split(".")[filename.split(".").length-1].toUpperCase()

        // const isImage = listType.indexOf(imgType) !== -1

        // if(!isImage) { return new GraphQLError("This file is not image") }

        const imgName: string = `${UUID()}.${imgType}`;
        const uploadPath = path.join(__dirname,   `./../../uploads/${imgName}`);
        const stream = createReadStream();
        await stream.pipe( createWriteStream(uploadPath) );

        return imgName
    } catch (e) {
        console.log(e)
        throw new GraphQLError(e)
    }
}


export const UploadMulti = async (files: any[]) => {
    let listFiles = []

    for (let i = 0; i < files.length; i++) {
        const fileName = await Upload(files[i])

        listFiles.push(fileName)
    }

    return listFiles
}