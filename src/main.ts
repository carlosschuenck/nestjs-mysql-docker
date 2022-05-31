import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

declare const module: any;

function swaggerConfig(app) {
    const config = new DocumentBuilder()
        .setTitle('Calendar API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
}


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    swaggerConfig(app);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT || 3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
