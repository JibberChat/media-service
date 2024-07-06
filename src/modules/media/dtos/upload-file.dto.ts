import { IsNotEmpty, IsString } from "class-validator";

class FileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  buffer: Buffer;
}

export class UploadFileDto {
  @IsNotEmpty()
  file!: FileDto;

  @IsNotEmpty()
  @IsString()
  path!: string;
}
