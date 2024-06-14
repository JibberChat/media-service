import { MediaModule } from "@modules/media.module";

import { Module } from "@nestjs/common";

import { ConfigurationModule } from "@infrastructure/configuration/configuration.module";

@Module({
  imports: [ConfigurationModule, MediaModule],
  providers: [],
})
export class AppModule {}
