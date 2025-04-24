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

        const isImage = listType.indexOf(imgType) !== -1

        if(!isImage) { return new GraphQLError("This file is not image") }

        const imgName: string = `${UUID()}.${imgType}`;
        const uploadPath = path.join(__dirname,   `./../../uploads/${imgName}`);
        const stream = createReadStream();
        await stream.pipe( createWriteStream(uploadPath) );

        if (existsSync(uploadPath)) {
            console.log("Image exist")

            const pathWebp = path.join(__dirname,   `./../../uploads/${imgName}.webp`);
            const image = sharp(uploadPath);
            const metadata = await image.metadata();

            await image.resize({ width: Math.floor(metadata.width! / 1.5), height: Math.floor(metadata.height! / 1.5) })
                .webp({quality: 15}).toFile(pathWebp)

            const pathWebpBlur = path.join(__dirname,   `./../../uploads/blured/${imgName}.webp`);
            await image.resize({ width: Math.floor(metadata.width! / 8), height: Math.floor(metadata.height! / 8) })
                .webp({quality: 1}).blur(10).toFile(pathWebpBlur);
        }

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