import { default as mime } from 'mime';
import type { FilesSource } from 'nft.storage';

export type IMetadataPrams = IMetadata;

export interface IMetadata {
  name: string;
  description: string;
  price: number;
  thumbnail: File;
  audio: File;
}

export class Metadata implements IMetadata {
  name: string;
  description: string;
  price: number;
  thumbnail: File;
  audio: File;

  constructor({ name, description, price, thumbnail, audio }: IMetadata) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.audio = audio;
  }

  getMetadataFile(): File {
    return new File(
      [
        JSON.stringify(
          {
            name: this.name,
            description: this.description,
            price: this.price,
            thumbnail: {
              name: `thumbnail.${mime.getExtension(this.thumbnail.type)}`,
              originalName: this.thumbnail.name,
              type: this.thumbnail.type,
              size: this.thumbnail.size,
              datetime: this.thumbnail.lastModified
            },
            audio: {
              name: `audio.${mime.getExtension(this.audio.type)}`,
              originalName: this.audio.name,
              type: this.audio.type,
              size: this.audio.size,
              datetime: this.audio.lastModified
            }
          },
          null,
          2
        )
      ],
      'metadata.json'
    );
  }

  toFilesSource(): FilesSource {
    return [
      new File([this.thumbnail], `thumbnail.${mime.getExtension(this.thumbnail.type)}`),
      new File([this.audio], `audio.${mime.getExtension(this.audio.type)}`),
      this.getMetadataFile()
    ];
  }
}
