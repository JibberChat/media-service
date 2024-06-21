import { Module } from "@nestjs/common";

import { ConfigurationModule } from "@infrastructure/configuration/configuration.module";

import { MediaModule } from "@modules/media.module";

@Module({
  imports: [ConfigurationModule, MediaModule],
  providers: [],
})
export class AppModule {}
