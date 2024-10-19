import { PartialType } from '@nestjs/swagger';
import { ListFilterDto } from '#shares/dto/list-filter.dto';

export class QuizListDto extends PartialType(ListFilterDto) {}
