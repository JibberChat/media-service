import { S3 } from "@aws-sdk/client-s3";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { APP_NAME, APP_PORT, APP_VERSION, AppConfiguration, NODE_ENV } from "../model/app-configuration";
import {
  AWSConfiguration,
  AWS_ACCESS_KEY_ID,
  AWS_BUCKET_NAME,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
} from "../model/aws-configuration";

import { LoggerService } from "@infrastructure/logger/services/logger.service";

@Injectable()
export class ConfigurationService {
  private logger = new LoggerService();

  private _appConfig!: AppConfiguration;
  private _awsConfig!: AWSConfiguration;

  public isProd!: boolean;

  get appConfig(): AppConfiguration {
    return this._appConfig;
  }

  get awsConfig(): AWSConfiguration {
    return this._awsConfig;
  }

  constructor(private nestConfigService: ConfigService) {
    this.setupEnvironment();
    this.logger.log("Configuration service initialized.", this.constructor.name);
    this.logger.log(`App name: ${this._appConfig.name}`, this.constructor.name);
  }

  private setupEnvironment(): void {
    // APP
    const appEnv = this.getVariableFromEnvFile(NODE_ENV);

    this._appConfig = {
      name: this.getVariableFromEnvFile(APP_NAME),
      version: this.getVariableFromEnvFile(APP_VERSION),
      port: parseInt(this.getVariableFromEnvFile(APP_PORT)),
      env: appEnv,
    };

    this.isProd = appEnv.includes("prod");

    // AWS
    const awsRegion = this.getVariableFromEnvFile(AWS_REGION);
    const awsAccessKeyId = this.getVariableFromEnvFile(AWS_ACCESS_KEY_ID);
    const awsSecretAccessKey = this.getVariableFromEnvFile(AWS_SECRET_ACCESS_KEY);
    const awsBucketName = this.getVariableFromEnvFile(AWS_BUCKET_NAME);

    this._awsConfig = {
      S3: {
        region: awsRegion,
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
        awsBucketName: awsBucketName,
        client: new S3({
          region: awsRegion,
          credentials: { accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKey },
        }),
      },
    };
  }

  private getVariableFromEnvFile(key: string): string {
    const variable = this.nestConfigService.get<string>(key);
    if (!variable) {
      this.logger.error(`No ${key} could be found from env file.`, this.constructor.name);
      throw new Error(`No ${key} could be found from env file.`);
    }
    return variable;
  }
}
