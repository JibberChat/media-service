import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { AppModule } from "./app.module";

import { ConfigurationService } from "@infrastructure/configuration/services/configuration.service";
import { GlobalExceptionFilter } from "@infrastructure/filter/global-exception.filter";
import { LoggerInterceptor } from "@infrastructure/logger/logger.interceptor";
import { LoggerService } from "@infrastructure/logger/services/logger.service";

import { GlobalExceptionFilter } from "@helpers/filter/global-exception.filter";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: new ConfigurationService(new ConfigService()).appConfig.port,
    },
  });
  const configService = app.get(ConfigurationService);
  const loggerSerivce = app.get(LoggerService);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter, loggerSerivce));
  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen();
  loggerSerivce.info("Microservice is running on port: " + configService.appConfig.port, "Bootstrap");
}
bootstrap();
