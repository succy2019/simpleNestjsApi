import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactService {
  constructor (private readonly databaseService: DatabaseService) {}
  async create(createContactDto: Prisma.MemberCreateInput) {
    // Use await to wait for the database operation to complete
    const newMember = await this.databaseService.member.create({
      data: createContactDto,
    });

    // Return a success message along with the created member (optional)
    return { message: 'Created', member: newMember };
  }

  async findAll() {
    return this.databaseService.member.findMany();
  }

  async findOne(id: number) {
    const member = await this.databaseService.member.findUnique({
      where: { id },
    });
  
    if (!member) {
      throw new Error(`Member with ID ${id} not found`);
    }
    return member; // Return the found member
  }
  async update(id: number, updateContactDto: Prisma.MemberUpdateInput) {

    const updatedMember = await this.databaseService.member.update({
      where: { id },
      data: updateContactDto,
    });
    return { message: `Updated member with ID #${id}`, member: updatedMember };
  }

  async remove(id: number) {
    try {
      const deletedMember = await this.databaseService.member.delete({
        where: { id },
      });

      return { message: `Removed member with ID #${id}`, member: deletedMember };
    } catch (error) {
      // If the error is a "not found" error, throw a NotFoundException
      if (error.code === 'P2025') { // Prisma error code for "Record to delete not found"
        throw new NotFoundException(`Member with ID ${id} not found`);
      }
      // Handle other potential errors as needed
      throw new Error('An error occurred while removing the member');
    }
  }
}
