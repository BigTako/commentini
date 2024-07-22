import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { PostGateway } from './post.gateway';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, PostGateway, PostService],
})
export class PostModule {}
