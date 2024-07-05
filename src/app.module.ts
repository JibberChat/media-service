import { Module } from "@nestjs/common";

import { ConfigurationModule } from "@infrastructure/configuration/configuration.module";
import { LoggerModule } from "@infrastructure/logger/logger.module";

import { MediaModule } from "@modules/media.module";

import { MediaModule } from "@modules/media.module";

@Module({
  imports: [ConfigurationModule, MediaModule, LoggerModule],
  providers: [],
})
export class AppModule {}
