import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
const client = new S3Client({ region: "us-east-1" });

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as { type: string; name?: string };

    const ext =
      body?.name?.split?.(".")?.pop() ?? body?.type.split?.("/")?.pop();
    const fileName = `${randomUUID()}.${ext}`;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET as string,
      Key: fileName,
      ContentType: body.type,
      ACL: "public-read",
    });

    const url = await getSignedUrl(client, command);

    return NextResponse.json(
      {
        message: "success",
        url,
        fileName,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    const error = err as { message: string };
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      },
    );
  }
};

