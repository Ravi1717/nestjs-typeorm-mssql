import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('value check', value, metadata)
        return value;
    }
}