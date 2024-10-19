import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    const S3Host = this.configService.get('MINIO_ENDPOINT');
    const S3Port = this.configService.get('MINIO_PORT');

    this.s3 = new S3Client({
      endpoint: `http://${S3Host}:${S3Port}`,
      region: 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get('MINIO_ACCESS_KEY'),
        secretAccessKey: this.configService.get('MINIO_SECRET_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async ensureBucketExists(bucketName: string): Promise<void> {
    try {
      await this.s3.send(new HeadBucketCommand({ Bucket: bucketName }));
    } catch (err) {
      if (err.name === 'NotFound' || err.name === 'NoSuchBucket') {
        await this.s3.send(new CreateBucketCommand({ Bucket: bucketName }));
      } else {
        throw err;
      }
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const bucket = this.configService.get('MINIO_BUCKET');

    await this.ensureBucketExists(bucket);

    const uploadParams = {
      Bucket: bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return this.s3.send(new PutObjectCommand(uploadParams));
  }

  async getObjectUrl(key: string): Promise<string> {
    const bucket = this.configService.get('MINIO_BUCKET');

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    // Generate a signed URL
    const signedUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 3600, // URL expiry time in seconds (1 hour in this case)
    });

    console.log('Signed URL:', signedUrl);

    return signedUrl;
  }
}
