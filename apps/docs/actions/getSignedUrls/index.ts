'use server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { failure: 'Not authenticated' };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    Metadata: {
      userId: session.user.id.toString(),
    },
  });
  const signedUrl = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  );
  return { success: { url: signedUrl } };
}
