import {Injectable, NotFoundException} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                status: true,
                profileImage: true,
                lastLogin: true,
                verified: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findOne(id: number) {
        if (!id) throw new NotFoundException('ID not found');
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');

        const { password, ...safeUser } = user;
        return safeUser;
    }


    async update(id: number, updateUserDto: UpdateUserDto) {
        if (!id) throw new NotFoundException('ID not found');

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                updatedAt: true,
            },
        });
    }

    async remove(id: number) {
        if (!id) throw new NotFoundException('ID not found');

        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
}
